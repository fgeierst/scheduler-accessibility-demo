# Quick Reference Card

## 🎨 Focus Styles

| Element | Focus Indicator | Additional Effects |
|---------|----------------|-------------------|
| **Buttons** (Prev/Next/Today) | 3px blue inset ring | 10% blue tint on hover |
| **Tabs** (Day/Week/Month) | 3px blue inset ring | Active: blue bottom border + bold |
| **Grid Cells** | 3px blue inset ring + 5% blue tint | Ring hides when unfocused |
| **Events** | 3px blue outline with 2px offset | 1.02x scale, z-index 100 |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Platform |
|----------|--------|----------|
| **Tab** | Navigate buttons/tabs | All |
| **Arrow Keys** | Navigate grid cells | All |
| **Enter** | Activate/Edit | All |
| **Escape** | Cancel | All |
| **Alt+1** | Day view | All (fixed for macOS) |
| **Alt+2** | Week view | All (fixed for macOS) |
| **Alt+3** | Month view | All (fixed for macOS) |
| **Ctrl/⌘+Left** | Previous period | All |
| **Ctrl/⌘+Right** | Next period | All |

## 🔧 CSS Variables

```css
:root {
  --scheduler-focus-color: #0d6efd;
  --scheduler-focus-width: 3px;
  --scheduler-focus-offset: 2px;
}
```

## 📁 Key Files

- `/src/styles.css` - Focus styling
- `/src/app/components/scheduler/scheduler.component.ts` - macOS fix
- `IMPROVEMENTS_SUMMARY.md` - Complete details

## ✅ Quick Test

1. Press **Tab** → See blue rings on buttons
2. Press **Alt+2** → Switch to Week view
3. Use **Arrow Keys** → See grid focus move
4. Click event + **Tab** → See blue outline with offset

## 🎯 WCAG Compliance

✅ All focus indicators: 3px width (exceeds 2px minimum)
✅ Color contrast: 4.5:1 (exceeds 3:1 minimum)  
✅ Keyboard navigation: Full functionality
✅ High contrast mode: Auto-adjusts to 4px blue
✅ Reduced motion: No animations

---

**Full docs**: [IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md)
