import { Component, ChangeDetectionStrategy, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KeyboardShortcut {
  keys: string;
  description: string;
  category: 'general' | 'timeslot' | 'event' | 'minicalendar';
}

interface KeyMapping {
  ctrl: string;
  alt: string;
  meta: string;
}

@Component({
  selector: 'app-keyboard-legend',
  imports: [CommonModule],
  template: `
    @if (variant() === 'inline') {
      <!-- Inline compact version -->
      <div [id]="legendId()" class="keyboard-legend keyboard-legend--inline">
        <div class="inline-shortcuts">
          <span class="inline-hint">
            <strong>Keyboard shortcuts:</strong>
            <kbd>Tab</kbd> focus · 
            <kbd>Arrows</kbd> navigate · 
            <kbd>Enter</kbd> create · 
            <kbd>E</kbd> select · 
            <kbd>{{ keys().ctrl }}+C/V</kbd> copy/paste
          </span>
          <details class="full-legend-details">
            <summary class="details-summary">
              More
            </summary>
            <div class="legend-content">
            <div class="shortcuts-grid">
              <div class="shortcut-category">
                <h3>General Navigation</h3>
                <dl>
                  <div class="shortcut-item">
                    <dt><kbd>Tab</kbd></dt>
                    <dd>Focus scheduler</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().alt }}</kbd> + <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd></dt>
                    <dd>Switch between views</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>←</kbd>/<kbd>→</kbd></dt>
                    <dd>Navigate to previous/next date</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd></dt>
                    <dd>Scroll data area</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Home</kbd></dt>
                    <dd>Go to current date</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>Enter</kbd></dt>
                    <dd>Create new event</dd>
                  </div>
                </dl>
              </div>

              <div class="shortcut-category">
                <h3>Time Slots</h3>
                <dl>
                  <div class="shortcut-item">
                    <dt><kbd>Arrow Keys</kbd></dt>
                    <dd>Navigate over time slots</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Shift</kbd> + <kbd>Arrow Keys</kbd></dt>
                    <dd>Extend time slot selection</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Enter</kbd></dt>
                    <dd>Create event in selected slot</dd>
                  </div>
                </dl>
              </div>

              <div class="shortcut-category">
                <h3>Events</h3>
                <dl>
                  <div class="shortcut-item">
                    <dt><kbd>E</kbd> / <kbd>Shift</kbd> + <kbd>E</kbd></dt>
                    <dd>Select next/previous event</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Arrow Keys</kbd></dt>
                    <dd>Navigate to time slot</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Enter</kbd></dt>
                    <dd>Open event details</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>C</kbd></dt>
                    <dd>Copy event</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>X</kbd></dt>
                    <dd>Cut event</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>V</kbd></dt>
                    <dd>Paste event</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Shift</kbd> + <kbd>W</kbd></dt>
                    <dd>Show event quick info</dd>
                  </div>
                </dl>
              </div>

              <div class="shortcut-category">
                <h3>Modal Windows</h3>
                <dl>
                  <div class="shortcut-item">
                    <dt><kbd>Enter</kbd></dt>
                    <dd>Confirm and close</dd>
                  </div>
                  <div class="shortcut-item">
                    <dt><kbd>Esc</kbd></dt>
                    <dd>Close without changes</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          </details>
        </div>
      </div>
    } @else {
      <!-- Full version (legacy) -->
      <div 
        [id]="legendId()" 
        class="keyboard-legend"
      >
        <div class="legend-header">
          <h2>Keyboard Shortcuts</h2>
        </div>
        
        <div class="legend-content">
          <div class="shortcuts-grid">
            <div class="shortcut-category">
              <h3>General Navigation</h3>
              <dl>
                <div class="shortcut-item">
                  <dt><kbd>Tab</kbd></dt>
                  <dd>Focus scheduler</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().alt }}</kbd> + <kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd></dt>
                  <dd>Switch between views</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>←</kbd>/<kbd>→</kbd></dt>
                  <dd>Navigate to previous/next date</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>↑</kbd>/<kbd>↓</kbd></dt>
                  <dd>Scroll data area</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Home</kbd></dt>
                  <dd>Go to current date</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>Enter</kbd></dt>
                  <dd>Create new event</dd>
                </div>
              </dl>
            </div>

            <div class="shortcut-category">
              <h3>Time Slots</h3>
              <dl>
                <div class="shortcut-item">
                  <dt><kbd>Arrow Keys</kbd></dt>
                  <dd>Navigate over time slots</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Shift</kbd> + <kbd>Arrow Keys</kbd></dt>
                  <dd>Extend time slot selection</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Enter</kbd></dt>
                  <dd>Create event in selected slot</dd>
                </div>
              </dl>
            </div>

            <div class="shortcut-category">
              <h3>Events</h3>
              <dl>
                <div class="shortcut-item">
                  <dt><kbd>E</kbd> / <kbd>Shift</kbd> + <kbd>E</kbd></dt>
                  <dd>Select next/previous event</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Arrow Keys</kbd></dt>
                  <dd>Navigate to time slot</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Enter</kbd></dt>
                  <dd>Open event details</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>C</kbd></dt>
                  <dd>Copy event</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>X</kbd></dt>
                  <dd>Cut event</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>V</kbd></dt>
                  <dd>Paste event</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Shift</kbd> + <kbd>W</kbd></dt>
                  <dd>Show event quick info</dd>
                </div>
              </dl>
            </div>

            <div class="shortcut-category">
              <h3>Modal Windows</h3>
              <dl>
                <div class="shortcut-item">
                  <dt><kbd>Enter</kbd></dt>
                  <dd>Confirm and close</dd>
                </div>
                <div class="shortcut-item">
                  <dt><kbd>Esc</kbd></dt>
                  <dd>Close without changes</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .keyboard-legend {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1rem;
        margin-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .keyboard-legend--inline {
        background: transparent;
        border: none;
        padding: 0;
        margin-bottom: 0.75rem;
        box-shadow: none;
      }

      .inline-shortcuts {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem 0;
        color: #495057;
        font-size: 0.875rem;
        line-height: 1.5;
      }

      .inline-hint {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        align-items: center;
      }

      .inline-hint strong {
        margin-right: 0.25rem;
        color: #212529;
        font-weight: 600;
      }

      .full-legend-details {
        flex-shrink: 0;
      }

      .details-summary {
        cursor: pointer;
        color: #0d6efd;
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
        list-style: none;
        user-select: none;
        border: 1px solid #0d6efd;
        border-radius: 4px;
        background: transparent;
        transition: all 0.2s ease;
      }

      .details-summary::-webkit-details-marker {
        display: none;
      }

      .details-summary::before {
        content: '▼';
        display: inline-block;
        margin-right: 0.35rem;
        font-size: 0.7rem;
        transition: transform 0.2s ease;
      }

      details[open] .details-summary::before {
        transform: rotate(180deg);
      }

      .details-summary:hover {
        background: #e7f1ff;
        border-color: #0a58ca;
      }

      .details-summary:focus {
        outline: 2px solid #0d6efd;
        outline-offset: 2px;
      }

      details[open] .legend-content {
        position: absolute;
        z-index: 1000;
        margin-top: 0.5rem;
        padding: 1rem;
        background: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideDown 0.3s ease-out;
        max-width: 800px;
      }

      .keyboard-legend--inline {
        position: relative;
      }

      .legend-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .legend-header h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: #212529;
      }

      .legend-content {
        animation: slideDown 0.3s ease-out;
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .shortcuts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      .shortcut-category h3 {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #495057;
        border-bottom: 2px solid #dee2e6;
        padding-bottom: 0.5rem;
      }

      .shortcut-category dl {
        margin: 0;
      }

      .shortcut-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 1rem;
        align-items: baseline;
        padding: 0.5rem 0;
        border-bottom: 1px solid #e9ecef;
      }

      .shortcut-item:last-child {
        border-bottom: none;
      }

      .shortcut-item dt {
        font-weight: normal;
        white-space: nowrap;
      }

      .shortcut-item dd {
        margin: 0;
        color: #6c757d;
        font-size: 0.9rem;
      }

      kbd {
        display: inline-block;
        padding: 0.125rem 0.35rem;
        font-size: 0.8rem;
        font-family: 'Courier New', monospace;
        color: #212529;
        background-color: #fff;
        border: 1px solid #adb5bd;
        border-radius: 3px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        white-space: nowrap;
      }

      .inline-shortcuts kbd {
        padding: 0.1rem 0.3rem;
        font-size: 0.75rem;
        border-color: #ced4da;
      }

      @media (max-width: 768px) {
        .shortcuts-grid {
          grid-template-columns: 1fr;
        }
        
        .inline-shortcuts {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.8rem;
        }
        
        .inline-hint {
          font-size: 0.8rem;
        }

        details[open] .legend-content {
          max-width: calc(100vw - 2rem);
          left: 0;
          right: 0;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyboardLegendComponent {
  /** ID for the legend element to be referenced by aria-describedby */
  legendId = input<string>('scheduler-keyboard-legend');
  
  /** Variant of the legend: 'inline' for compact version with details, 'full' for expanded version */
  variant = input<'inline' | 'full'>('full');

  /** Detect if the user is on macOS */
  private isMac = signal<boolean>(
    typeof navigator !== 'undefined' && 
    /Mac|iPhone|iPad|iPod/.test(navigator.platform)
  );

  /** Computed key mappings based on OS */
  keys = computed<KeyMapping>(() => {
    const mac = this.isMac();
    return {
      ctrl: mac ? '⌘' : 'Ctrl',
      alt: mac ? '⌥' : 'Alt',
      meta: mac ? '⌘' : 'Win'
    };
  });
}
