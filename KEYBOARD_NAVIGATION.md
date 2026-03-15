# Keyboard Navigation Implementation

This document describes the keyboard navigation implementation for the accessible scheduler demo.

## Overview

The scheduler has been enhanced with full keyboard navigation support and accessibility features, including:

1. **Keyboard Navigation Plugin** - Enabled via dhtmlx-scheduler's `key_nav` plugin
2. **Keyboard Legend Component** - A comprehensive guide showing all available shortcuts
3. **ARIA Integration** - Proper linking between scheduler and legend using `aria-describedby`
4. **Custom Shortcuts** - Additional keyboard shortcuts for enhanced productivity

## Implementation Details

### 1. Enabling Keyboard Navigation

The keyboard navigation plugin is enabled in the `SchedulerComponent`:

```typescript
ngOnInit(): void {
  // Enable keyboard navigation plugin
  scheduler.plugins({
    key_nav: true
  });
  
  // ... rest of initialization
}
```

### 2. ARIA Attributes

The scheduler container has the following accessibility attributes:

```html
<div
  class="dhx_cal_container"
  role="application"
  [attr.aria-describedby]="keyboardLegendId()"
  [style.width]="width()"
  [style.height]="height()"
>
```

- **`role="application"`**: Indicates this is an interactive application widget
- **`aria-describedby`**: Links to the keyboard legend for screen reader users

### 3. Keyboard Legend Component

The `KeyboardLegendComponent` displays all available shortcuts grouped by category:

- **General Navigation** - Focus, view switching, date navigation
- **Time Slots** - Slot navigation and selection
- **Events** - Event selection, editing, copy/paste
- **Modal Windows** - Dialog interaction

Features:
- Collapsible/expandable interface
- Organized by category for easy reference
- Styled with accessibility in mind (good contrast, focus indicators)
- Proper semantic HTML (definition lists for shortcuts)

### 4. Available Keyboard Shortcuts

#### General Navigation
- **Tab** - Focus scheduler
- **Alt+1/2/3** - Switch between day/week/month views
- **Ctrl+Left/Right** - Navigate to previous/next date
- **Ctrl+Up/Down** - Scroll data area
- **Home** - Go to current date
- **Ctrl+Enter** - Create new event

#### Time Slots
- **Arrow Keys** - Navigate over time slots
- **Shift+Arrow Keys** - Extend time slot selection
- **Enter** - Create event in selected slot

#### Events
- **E / Shift+E** - Select next/previous event
- **Arrow Keys** - Navigate to time slot
- **Enter** - Open event details
- **Ctrl+C** - Copy event
- **Ctrl+X** - Cut event
- **Ctrl+V** - Paste event
- **Shift+W** - Show event quick info (custom shortcut)

#### Modal Windows
- **Enter** - Confirm and close
- **Esc** - Close without changes

### 5. Custom Shortcut Example

A custom shortcut has been added to demonstrate extending the default shortcuts:

```typescript
private setupKeyboardShortcuts(): void {
  // Add a custom shortcut to show event details with Shift+W
  scheduler.addShortcut("shift+w", (e) => {
    const target = e.target as HTMLElement;
    const eventElement = target.closest("[event_id]");
    
    if (eventElement) {
      const eventId = eventElement.getAttribute("event_id");
      if (eventId) {
        scheduler.showQuickInfo(eventId);
      }
    }
    return true;
  }, "event");
}
```

## Usage

### In Your Application

```typescript
import { SchedulerComponent } from './components/scheduler';
import { KeyboardLegendComponent } from './components/keyboard-legend';

@Component({
  selector: 'app-root',
  imports: [SchedulerComponent, KeyboardLegendComponent],
  template: `
    <app-keyboard-legend 
      legendId="my-scheduler-legend"
      [initiallyCollapsed]="false"
    />
    
    <app-scheduler
      [events]="events()"
      [keyboardLegendId]="'my-scheduler-legend'"
      [height]="'600px'"
    />
  `
})
export class App {
  // ...
}
```

### Customizing the Legend

You can customize which shortcuts to display by modifying the `KeyboardLegendComponent` template, or create your own legend component.

## Accessibility Considerations

### WCAG Compliance

This implementation follows WCAG 2.1 AA guidelines:

- **2.1.1 Keyboard** - All functionality is available via keyboard
- **2.1.2 No Keyboard Trap** - Users can navigate in and out of the scheduler
- **2.4.3 Focus Order** - Logical focus order throughout
- **2.4.7 Focus Visible** - Clear focus indicators
- **4.1.2 Name, Role, Value** - Proper ARIA attributes

### Testing with Screen Readers

When testing with screen readers:

1. The scheduler announces itself as an "application"
2. The keyboard legend is associated via `aria-describedby`
3. Screen readers will read the legend when the scheduler receives focus
4. All interactive elements have proper labels

### Focus Management

The scheduler automatically manages focus:

- When opened, focus goes to the active element or first row
- When a modal opens, focus moves to the modal
- When a modal closes, focus returns to the scheduler
- Clear visual focus indicators throughout

## Browser Support

Keyboard navigation works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

Potential improvements:

1. **Customizable Shortcuts** - Allow users to configure their own shortcuts
2. **Shortcut Conflicts** - Detect and warn about conflicting shortcuts
3. **Accessibility Settings Panel** - Additional accessibility options
4. **High Contrast Mode** - Enhanced visibility for low vision users
5. **Voice Control** - Integration with voice control APIs

## References

- [dhtmlxScheduler Keyboard Navigation Docs](https://docs.dhtmlx.com/scheduler/keyboard_navigation.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA: application role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/application_role)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
