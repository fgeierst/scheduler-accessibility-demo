# macOS Keyboard Shortcut Fix

## Problem: Alt+Number Shortcuts Don't Work on macOS

### Root Cause

On macOS, the **Alt/Option key + number** produces special characters instead of being recognized as keyboard shortcuts:

- **Alt+1** → `¡` (inverted exclamation)
- **Alt+2** → `™` (trademark)
- **Alt+3** → `£` (pound sterling)
- **Alt+4** → `¢` (cent)
- **Alt+5** → `∞` (infinity)
- **Alt+6** → `§` (section)
- **Alt+7** → `¶` (pilcrow)
- **Alt+8** → `•` (bullet)
- **Alt+9** → `ª` (ordinal indicator)

When DHTMLX Scheduler tries to detect Alt+1 through Alt+9, it looks for the `keyCode` of the number, but instead gets the `keyCode` of these special characters.

### DHTMLX Code Analysis

The scheduler's keyboard navigation code at line 11192:

```javascript
keys: { 
  "alt+1, alt+2, alt+3, alt+4, alt+5, alt+6, alt+7, alt+8, alt+9": function(e) {
    var tabs = scheduler2.$keyboardNavigation.HeaderCell.prototype.getNodes(".dhx_cal_navline .dhx_cal_tab");
    var key = e.key;
    if (key === void 0) {
      key = e.keyCode - 48;  // ❌ This fails on macOS!
    }
    if (tabs[key * 1 - 1]) {
      tabs[key * 1 - 1].click();
    }
  },
  // ...
}
```

The issue is in the keyboard shortcut parsing (line 10673):

```javascript
getCommandFromEvent: function(domEvent) {
  var command = this.createCommand();
  command.modifiers.alt = !!domEvent.altKey;
  command.keyCode = domEvent.which || domEvent.keyCode;  // ❌ Gets special char code
  // ...
}
```

## Solution

### Custom Event Listener Using `e.code`

We bypass DHTMLX's shortcut system for Alt+number combinations and use the `KeyboardEvent.code` property, which gives us the **physical key code** regardless of what character it produces:

```typescript
private setupMacOSAltNumberShortcuts(): void {
  const container = this.schedulerContainer().nativeElement;
  
  container.addEventListener('keydown', (e: KeyboardEvent) => {
    // Check if only Alt key is pressed (no Ctrl, Meta, or Shift)
    if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      // e.code gives us "Digit1", "Digit2", etc. regardless of special chars
      const numberKey = e.code.match(/^(Digit|Numpad)([1-9])$/);
      
      if (numberKey) {
        const num = parseInt(numberKey[2], 10);
        const tabs = container.querySelectorAll('.dhx_cal_navline .dhx_cal_tab');
        
        if (tabs[num - 1]) {
          e.preventDefault();  // Prevent special character insertion
          (tabs[num - 1] as HTMLElement).click();
        }
      }
    }
  });
}
```

### Key Differences

| Property | Windows/Linux | macOS with Alt | Why It Matters |
|----------|---------------|----------------|----------------|
| `e.key` | "1" | "¡" | ❌ Different characters |
| `e.keyCode` | 49 | 161 | ❌ Different codes |
| `e.code` | "Digit1" | "Digit1" | ✅ **Same! Physical key** |

## Implementation

### 1. Added to `scheduler.component.ts`

The fix is automatically applied in the `setupKeyboardShortcuts()` method:

```typescript
private setupKeyboardShortcuts(): void {
  // Existing shortcuts...
  
  // Fix Alt+number shortcuts for macOS
  this.setupMacOSAltNumberShortcuts();
}
```

### 2. Works for Both Keyboards

The regex handles both:
- **Main keyboard**: `Digit1` through `Digit9`
- **Numpad**: `Numpad1` through `Numpad9`

## Testing

### On macOS:

1. **Alt+1** → Switches to Day view
2. **Alt+2** → Switches to Week view  
3. **Alt+3** → Switches to Month view
4. **Alt+4-9** → Switches to other tabs if present

### On Windows/Linux:

The native DHTMLX shortcuts continue to work, and our custom handler also works as a fallback.

## Benefits

✅ **Cross-platform**: Works on macOS, Windows, and Linux
✅ **Non-invasive**: Doesn't modify DHTMLX code
✅ **Prevents special characters**: Calls `preventDefault()` to stop ¡™£ insertion
✅ **Future-proof**: Based on physical key position, not character output

## Alternative Approaches Considered

### ❌ Override DHTMLX's keyboard handler
- **Issue**: Too invasive, could break on updates

### ❌ Use Cmd+number instead of Alt+number
- **Issue**: Conflicts with browser/system shortcuts (Cmd+1 = first tab in browser)

### ❌ Patch DHTMLX source code
- **Issue**: Not maintainable, breaks on library updates

### ✅ **Event listener using `e.code`** (chosen solution)
- **Benefit**: Clean, maintainable, works alongside DHTMLX

## Browser Support

| Browser | `KeyboardEvent.code` Support |
|---------|------------------------------|
| Chrome  | ✅ 48+ |
| Firefox | ✅ 38+ |
| Safari  | ✅ 10.1+ |
| Edge    | ✅ 79+ |

All modern browsers support `KeyboardEvent.code`, making this a safe solution.

## Related Issues

- [MDN: KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
- [macOS Special Characters with Option Key](https://support.apple.com/en-us/HT201586)
- [DHTMLX Scheduler Keyboard Navigation](https://docs.dhtmlx.com/scheduler/keyboard_navigation.html)

## Summary

The Alt+number shortcuts now work perfectly on macOS by:
1. Listening for `keydown` events
2. Using `e.code` instead of `e.key` or `e.keyCode`
3. Detecting physical key position (Digit1-9 or Numpad1-9)
4. Preventing default to stop special character insertion
5. Programmatically clicking the corresponding tab

🎉 **Result**: Seamless keyboard navigation across all platforms!
