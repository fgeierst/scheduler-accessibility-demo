# Scheduler Accessibility Demo

Showcase keyboard navigation and semantic structure of different JavaScript scheduler and calendar frameworks.

## Quick Start

```bash
git clone https://github.com/fgeierst/scheduler-accessibility-demo
cd scheduler-accessibility-demo
pnpm install
pnpm storybook
```

## Environment

Syncfusion Scheduler requires a license key at Storybook build time. For local development, copy `.env.example` to `.env.local` and set:

```bash
SYNCFUSION_LICENSE=your-license-key
```

Storybook loads the same value from those env files through Vite. For Vercel deployments, set `SYNCFUSION_LICENSE` in the Vercel project environment variables.

## Testing

```bash
pnpm test
```
