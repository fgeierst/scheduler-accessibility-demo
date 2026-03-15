# Keyboard Legend - Inline Variant Demo

## Visual Comparison

### Before (Full Variant)
```
┌─────────────────────────────────────────────────────────────────┐
│ Keyboard Shortcuts                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ General Navigation          Time Slots                          │
│ ──────────────────         ──────────                          │
│ Tab - Focus scheduler      Arrow Keys - Navigate               │
│ Alt+1/2/3 - Switch views   Shift+Arrow - Extend selection      │
│ Ctrl+←/→ - Navigate date   Enter - Create event                │
│ Ctrl+↑/↓ - Scroll area                                         │
│ Home - Go to today         Events                              │
│ Ctrl+Enter - New event     ──────                              │
│                            E/Shift+E - Select next/prev         │
│ Modal Windows              Arrow Keys - Navigate to slot        │
│ ─────────────             Enter - Open details                 │
│ Enter - Confirm           Ctrl+C - Copy event                   │
│ Esc - Close               Ctrl+X - Cut event                    │
│                           Ctrl+V - Paste event                  │
│                           Shift+W - Show quick info             │
└─────────────────────────────────────────────────────────────────┘

[Large box takes up vertical space above calendar]
```

### After (Inline Variant - Collapsed)
```
Quick shortcuts: Tab to focus, Arrow keys to navigate, Enter to create event,
E to select events, Ctrl+C/V to copy/paste

▶ View all keyboard shortcuts

[Minimal space, only 2-3 lines above calendar]
```

### After (Inline Variant - Expanded)
```
Quick shortcuts: Tab to focus, Arrow keys to navigate, Enter to create event,
E to select events, Ctrl+C/V to copy/paste

▼ View all keyboard shortcuts

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ General Navigation          Time Slots                          │
│ ──────────────────         ──────────                          │
│ Tab - Focus scheduler      Arrow Keys - Navigate               │
│ Alt+1/2/3 - Switch views   Shift+Arrow - Extend selection      │
│ Ctrl+←/→ - Navigate date   Enter - Create event                │
│ Ctrl+↑/↓ - Scroll area                                         │
│ Home - Go to today         Events                              │
│ Ctrl+Enter - New event     ──────                              │
│                            E/Shift+E - Select next/prev         │
│ Modal Windows              Arrow Keys - Navigate to slot        │
│ ─────────────             Enter - Open details                 │
│ Enter - Confirm           Ctrl+C - Copy event                   │
│ Esc - Close               Ctrl+X - Cut event                    │
│                           Ctrl+V - Paste event                  │
│                           Shift+W - Show quick info             │
└─────────────────────────────────────────────────────────────────┘
```

## HTML Structure

### Inline Variant
```html
<div id="scheduler-keyboard-legend" class="keyboard-legend keyboard-legend--inline">
  <!-- Compact inline shortcuts -->
  <div class="inline-shortcuts">
    <span class="inline-hint">
      <strong>Quick shortcuts:</strong>
      <kbd>Tab</kbd> to focus,
      <kbd>Arrow keys</kbd> to navigate,
      <kbd>Enter</kbd> to create event,
      <kbd>E</kbd> to select events,
      <kbd>Ctrl</kbd>+<kbd>C</kbd>/<kbd>V</kbd> to copy/paste
    </span>
  </div>
  
  <!-- Native details/summary for expandable full list -->
  <details class="full-legend-details">
    <summary class="details-summary">
      View all keyboard shortcuts
    </summary>
    <div class="legend-content">
      <!-- Full shortcuts grid here -->
    </div>
  </details>
</div>
```

### Full Variant (Legacy)
```html
<div id="scheduler-keyboard-legend" class="keyboard-legend">
  <div class="legend-header">
    <h2>Keyboard Shortcuts</h2>
  </div>
  
  <div class="legend-content">
    <!-- Full shortcuts grid always visible -->
  </div>
</div>
```

## Key Features

### Inline Variant
1. **Space Efficient**: Only 2-3 lines when collapsed
2. **Essential Info Visible**: Most common shortcuts always shown
3. **Native Accessibility**: Uses `<details>` element for built-in support
4. **Progressive Disclosure**: Full list available on demand
5. **Animated Expansion**: Smooth slide-down animation

### Benefits
- ✅ More calendar visible on screen
- ✅ Less overwhelming for new users
- ✅ Expert users can still access full list
- ✅ Better mobile experience
- ✅ Native keyboard support (Space/Enter to toggle)
- ✅ Screen reader friendly
- ✅ No JavaScript state management needed

## Accessibility Features

### Native `<details>` Benefits
- **Keyboard Support**: Space and Enter toggle expansion
- **ARIA Attributes**: Browser automatically provides:
  - `aria-expanded` state
  - Proper role announcements
- **Screen Reader Support**: Announces "collapsed" or "expanded"
- **Focus Management**: Summary is properly focusable

### Custom Enhancements
- **Focus Outline**: Clear 2px blue outline on focus
- **Visual Indicator**: Rotating arrow shows state
- **Color Contrast**: Link-blue color meets WCAG AA
- **Hover Feedback**: Underline and darker color on hover

## Mobile Responsiveness

```css
@media (max-width: 768px) {
  .inline-hint {
    font-size: 0.85rem;  /* Smaller on mobile */
  }
  
  .shortcuts-grid {
    grid-template-columns: 1fr;  /* Single column */
  }
}
```

## Usage Recommendation

**Use Inline Variant** when:
- ✅ Screen space is limited
- ✅ Calendar should be the primary focus
- ✅ Users are likely familiar with keyboard shortcuts
- ✅ Mobile users are a significant audience

**Use Full Variant** when:
- ✅ Keyboard shortcuts are unfamiliar to users
- ✅ Training/onboarding context
- ✅ Plenty of screen space available
- ✅ Shortcuts are the primary focus
