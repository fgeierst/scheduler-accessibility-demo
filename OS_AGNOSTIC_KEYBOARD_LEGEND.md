# OS-Agnostic Keyboard Legend

## Overview

The keyboard legend now **automatically detects the user's operating system** and displays the appropriate keyboard modifier symbols.

## Features

### 1. **Automatic OS Detection**

The component detects if the user is on macOS by checking the navigator platform:

```typescript
private isMac = signal<boolean>(
  typeof navigator !== 'undefined' && 
  /Mac|iPhone|iPad|iPod/.test(navigator.platform)
);
```

### 2. **Dynamic Key Symbols**

Based on OS detection, the legend shows platform-specific symbols:

| Modifier | Windows/Linux | macOS |
|----------|---------------|-------|
| Control  | `Ctrl`        | `⌘` (Command) |
| Alt      | `Alt`         | `⌥` (Option) |
| Meta     | `Win`         | `⌘` (Command) |

### 3. **Computed Key Mappings**

```typescript
keys = computed<KeyMapping>(() => {
  const mac = this.isMac();
  return {
    ctrl: mac ? '⌘' : 'Ctrl',
    alt: mac ? '⌥' : 'Alt',
    meta: mac ? '⌘' : 'Win'
  };
});
```

## Visual Examples

### On macOS
```
Keyboard shortcuts:
⌥ + 1/2/3    Switch between views
⌘ + ←/→      Navigate to previous/next date
⌘ + Enter    Create new event
⌘ + C        Copy event
⌘ + V        Paste event
```

### On Windows/Linux
```
Keyboard shortcuts:
Alt + 1/2/3       Switch between views
Ctrl + ←/→        Navigate to previous/next date
Ctrl + Enter      Create new event
Ctrl + C          Copy event
Ctrl + V          Paste event
```

## Implementation Details

### Modified Shortcuts

All shortcuts that use `Ctrl` or `Alt` now use the computed `keys()` signal:

**Before:**
```html
<dt><kbd>Ctrl</kbd> + <kbd>C</kbd></dt>
<dt><kbd>Alt</kbd> + <kbd>1</kbd></dt>
```

**After:**
```html
<dt><kbd>{{ keys().ctrl }}</kbd> + <kbd>C</kbd></dt>
<dt><kbd>{{ keys().alt }}</kbd> + <kbd>1</kbd></dt>
```

### Affected Shortcuts

1. **View switching**: `Alt` → `⌥` on macOS
2. **Navigation**: `Ctrl` → `⌘` on macOS
3. **Copy/Paste**: `Ctrl` → `⌘` on macOS
4. **Event creation**: `Ctrl` → `⌘` on macOS

## Benefits

### ✅ **User Familiarity**
- macOS users see familiar `⌘` and `⌥` symbols
- Windows/Linux users see `Ctrl` and `Alt`

### ✅ **Accurate Representation**
- Shows exactly what keys users should press
- No confusion about which modifier to use

### ✅ **Professional Appearance**
- Matches OS conventions (like macOS apps showing ⌘ symbols)
- Platform-native feel

### ✅ **Accessibility**
- Screen readers can still read the text properly
- Visual users get familiar symbols

## Technical Notes

### Platform Detection

The component checks these platforms for macOS detection:
- `Mac` - macOS
- `iPhone` - iOS (mobile)
- `iPad` - iPadOS (tablet)
- `iPod` - iPod Touch

### Server-Side Rendering (SSR)

The code safely handles SSR by checking:
```typescript
typeof navigator !== 'undefined'
```

This prevents errors when rendering on the server where `navigator` doesn't exist.

### Key Symbol Reference

macOS key symbols (Unicode):
- `⌘` - Command (U+2318)
- `⌥` - Option (U+2325)
- `⇧` - Shift (U+21E7) - currently using text "Shift"
- `⌃` - Control (U+2303) - not used (Ctrl on macOS does different things)

## Browser Compatibility

The OS detection works in all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ All mobile browsers

## CSS Styling

The `<kbd>` elements are styled to look like physical keyboard keys:

```css
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
}
```

macOS symbols render beautifully in monospace fonts!

## Future Enhancements

Potential improvements (not implemented):

1. **Shift symbol**: Could use `⇧` instead of "Shift" on macOS
2. **Arrow symbols**: Could use `←↑→↓` instead of "Arrow Keys"
3. **Enter symbol**: Could use `↵` or `⏎` on macOS
4. **User preference**: Allow manual OS override in settings

## Testing

### Test on macOS
1. Open the scheduler
2. View the keyboard legend
3. Verify you see `⌘` and `⌥` symbols
4. Try the shortcuts (they work with the actual keys)

### Test on Windows/Linux
1. Open the scheduler
2. View the keyboard legend
3. Verify you see `Ctrl` and `Alt` text
4. Try the shortcuts

### Test SSR (if applicable)
1. Build for production with SSR
2. Check no errors during server render
3. Verify symbols appear correctly after hydration

## Related Files

- `/src/app/components/keyboard-legend/keyboard-legend.component.ts` - Main component
- `/src/app/components/scheduler/scheduler.component.ts` - Uses the legend

## Summary

The keyboard legend now provides a **native, platform-appropriate experience** by:
- 🔍 Detecting the user's OS
- 🎨 Showing familiar modifier symbols
- ⌨️ Matching platform conventions
- ♿ Maintaining accessibility

Users on macOS see `⌘` and `⌥`, while Windows/Linux users see `Ctrl` and `Alt` - no more confusion! 🎉
