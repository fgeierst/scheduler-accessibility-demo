#!/usr/bin/env node

import { spawn } from 'node:child_process';
import process from 'node:process';
import { setTimeout as delay } from 'node:timers/promises';

const port = Number(process.env.STORYBOOK_TEST_PORT ?? '6006');
const host = process.env.STORYBOOK_TEST_HOST ?? 'localhost';
const url = `http://${host}:${port}`;
const forwardedArgs = process.argv.slice(2);
const useShell = process.platform === 'win32';

let storybookExitCode = null;
let storybookSignal = null;
let isCleaningUp = false;

const storybookProcess = spawn(
  'pnpm',
  [
    'exec',
    'storybook',
    'dev',
    '--ci',
    '--exact-port',
    '--port',
    String(port),
    '--host',
    host,
    '--config-dir',
    '.storybook',
  ],
  {
    detached: !useShell,
    shell: useShell,
    stdio: 'inherit',
  },
);

storybookProcess.once('exit', (code, signal) => {
  storybookExitCode = code;
  storybookSignal = signal;
});

async function waitForStorybook(timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (storybookExitCode !== null || storybookSignal !== null) {
      throw new Error(
        `Storybook exited before it became ready (code: ${storybookExitCode ?? 'null'}, signal: ${storybookSignal ?? 'null'})`,
      );
    }

    try {
      const response = await fetch(url, { redirect: 'manual' });
      if (response.ok) {
        return;
      }
    } catch {
      // Storybook is still starting.
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for Storybook at ${url}`);
}

async function stopStorybook() {
  if (isCleaningUp) {
    return;
  }

  isCleaningUp = true;

  if (storybookExitCode !== null || storybookSignal !== null) {
    return;
  }

  await new Promise((resolve) => {
    const forceKillTimer = setTimeout(() => {
      try {
        if (useShell) {
          storybookProcess.kill('SIGKILL');
        } else if (storybookProcess.pid) {
          process.kill(-storybookProcess.pid, 'SIGKILL');
        }
      } catch {
        // Ignore cleanup failures.
      }
    }, 5_000);

    storybookProcess.once('exit', () => {
      clearTimeout(forceKillTimer);
      resolve();
    });

    try {
      if (useShell) {
        storybookProcess.kill('SIGTERM');
      } else if (storybookProcess.pid) {
        process.kill(-storybookProcess.pid, 'SIGTERM');
      } else {
        clearTimeout(forceKillTimer);
        resolve();
      }
    } catch {
      clearTimeout(forceKillTimer);
      resolve();
    }
  });
}

async function runStorybookTests() {
  await waitForStorybook();

  const exitCode = await new Promise((resolve, reject) => {
    const testProcess = spawn(
      'pnpm',
      ['exec', 'test-storybook', '--config-dir', '.storybook', '--url', url, ...forwardedArgs],
      {
        shell: useShell,
        stdio: 'inherit',
      },
    );

    testProcess.once('error', reject);
    testProcess.once('exit', (code) => resolve(code ?? 1));
  });

  return exitCode;
}

async function shutdownWithCode(exitCode) {
  await stopStorybook();
  process.exit(exitCode);
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    void shutdownWithCode(1);
  });
}

process.on('uncaughtException', (error) => {
  console.error(error);
  void shutdownWithCode(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error);
  void shutdownWithCode(1);
});

try {
  const exitCode = await runStorybookTests();
  await shutdownWithCode(exitCode);
} catch (error) {
  console.error(error);
  await shutdownWithCode(1);
}
