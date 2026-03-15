# Scheduler Focus Styles Documentation

## Overview

This document describes the unified focus styling system implemented for the DHTMLX Scheduler to ensure consistent visual feedback and accessibility compliance (WCAG 2.1 AA).

## Design Principles

### 1. **Consistency**
All interactive elements (buttons, tabs, grid cells, and events) share the same focus ring appearance:
- **Color**: `#0d6efd` (primary blue)
- **Width**: `3px`
- **Style**: Box shadow (allows for rounded corners and better visibility)

### 2. **Visibility**
Focus indicators are clearly visible with sufficient contrast against all backgrounds, meeting WCAG 2.1 AA requirements (minimum 3:1 contrast ratio).

### 3. **User Preferences**
The system respects user preferences:
- **High Contrast Mode**: Increases focus ring width to 4px and uses pure blue (#0000ff)
- **Reduced Motion**: Disables all transitions

## Implementation Details

### CSS Variables

```css
:root {
  --scheduler-focus-color: #0d6efd;
  --scheduler-focus-width: 3px;
  --scheduler-focus-offset: 2px;
  --scheduler-focus-ring: 0 0 0 var(--scheduler-focus-width) var(--scheduler-focus-color);
  --scheduler-focus-ring-inset: inset 0 0 0 var(--scheduler-focus-width) var(--scheduler-focus-color);
}
```

### Focused Elements

#### Navigation Buttons (Prev, Next, Today)
```css
.dhx_cal_prev_button:focus,
.dhx_cal_next_button:focus,
.dhx_cal_today_button:focus {
  outline: none;
  box-shadow: var(--scheduler-focus-ring-inset);
}
```

**Visual Result**: Blue inset ring when focused via keyboard navigation

#### View Tabs (Day, Week, Month)
```css
.dhx_cal_tab:focus,
.dhx_cal_tab.active:focus {
  outline: none;
  box-shadow: var(--scheduler-focus-ring-inset);
}
```

**Visual Result**: Blue inset ring when tab is focused, works on both active and inactive tabs

#### Calendar Grid Cells
```css
.dhx_focus_slot {
  outline: none !important;
  box-shadow: var(--scheduler-focus-ring-inset) !important;
  background-color: rgba(13, 110, 253, 0.05) !important;
  /* Maintain DHTMLX positioning */
  position: absolute !important;
  pointer-events: none !important;
  opacity: 1 !important;
  z-index: 5 !important;
}
```

**Visual Result**: 
- Blue inset ring
- Subtle blue background tint (5% opacity)
- Indicates the currently focused time slot for event creation
- Positioned as an overlay using DHTMLX's absolute positioning system

#### Events
```css
.dhx_cal_event_selected,
.dhx_cal_event:focus {
  outline: none;
  box-shadow: var(--scheduler-focus-ring) !important;
  z-index: 100 !important;
}
```

**Visual Result**: 
- Blue outset ring (appears outside the event)
- Elevated z-index ensures visibility above other events
- Works for all event types (regular, multi-day, month view)

## Keyboard Navigation

The following keyboard shortcuts work with the enhanced focus styles:

### Navigation
- **Tab / Shift+Tab**: Move focus between buttons, tabs, and the scheduler grid
- **Arrow Keys**: Navigate between time slots in the grid
- **Enter / Space**: Activate focused button or create event in focused slot
- **Escape**: Exit event creation/editing mode

### View Switching
- Focus on a view tab (Day/Week/Month) and press **Enter** or **Space** to switch views

### Event Management
- **Tab** to an event to focus it
- **Enter** to edit a focused event
- **Delete** to remove a focused event
- **Shift+W** to show event quick info (custom shortcut)

## Accessibility Features

### 1. **WCAG 2.1 AA Compliance**
- ✅ Focus indicators have minimum 3:1 contrast ratio
- ✅ Focus indicators are at least 2px thick (actual: 3px)
- ✅ Focus is clearly visible on all interactive elements
- ✅ Non-text contrast requirements met

### 2. **Screen Reader Support**
The scheduler container has:
- `role="application"` for proper context
- `aria-describedby` linking to keyboard instructions
- Proper semantic structure

### 3. **High Contrast Mode**
When users enable high contrast mode:
```css
@media (prefers-contrast: high) {
  :root {
    --scheduler-focus-width: 4px;
    --scheduler-focus-color: #0000ff;
  }
}
```

### 4. **Reduced Motion**
For users who prefer reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  /* All transitions disabled */
}
```

## Hover States

To complement focus styles, hover states provide additional visual feedback:

- **Buttons & Tabs**: Subtle blue background (10% opacity)
- **Events**: Slight brightness increase (110%)
- **Transitions**: 0.2s ease (disabled in reduced motion mode)

## Customization

### Changing Focus Color

To match your brand, modify the CSS variable:

```css
:root {
  --scheduler-focus-color: #your-brand-color;
}
```

### Changing Focus Width

For stronger emphasis:

```css
:root {
  --scheduler-focus-width: 4px;
}
```

### Changing Focus Offset

To adjust spacing around focused elements:

```css
:root {
  --scheduler-focus-offset: 3px;
}
```

## Browser Testing

The focus styles have been tested and work correctly in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Keyboard navigation
- ✅ Screen reader navigation (NVDA, JAWS, VoiceOver)

## Best Practices

1. **Never Remove Focus Indicators**: Focus styles are critical for keyboard and screen reader users
2. **Test with Keyboard Only**: Navigate your application using only Tab, Arrow keys, and Enter
3. **Test in High Contrast Mode**: Enable high contrast mode in your OS to verify visibility
4. **Consistent Patterns**: All interactive elements follow the same focus pattern for user familiarity

## Related Files

- `/src/styles.css` - Global scheduler focus styles and theme variables
- `/src/app/app.css` - Application-level focus styles
- `/src/app/components/scheduler/scheduler.component.ts` - Scheduler component with keyboard navigation setup

## References

- [WCAG 2.1 Focus Visible (2.4.7)](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [WCAG 2.1 Non-text Contrast (1.4.11)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)
- [DHTMLX Scheduler Keyboard Navigation](https://docs.dhtmlx.com/scheduler/keyboard_navigation.html)
- [DHTMLX Scheduler Custom Skins](https://docs.dhtmlx.com/scheduler/custom_skins.html)
