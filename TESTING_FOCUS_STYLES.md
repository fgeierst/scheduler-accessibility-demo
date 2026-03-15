# Testing Focus Styles - Verification Guide

## 🐛 Issue Fixed: Grid Focus Positioning

**Problem**: The focus indicator (blue ring) was appearing one page below the actual scheduler grid.

**Root Cause**: The `.dhx_focus_slot` is an absolutely positioned overlay element created by DHTMLX. Our initial CSS was interfering with its positioning by setting `position: relative`.

**Solution**: Maintain DHTMLX's original positioning (`position: absolute`) and add proper z-index layering.

## ✅ Testing Checklist

### 1. **Calendar Grid Focus (Main Fix)**

**Steps to test**:
1. Click on the scheduler to give it focus
2. Press **Tab** until the scheduler grid is focused
3. Use **Arrow Keys** (↑ ↓ ← →) to navigate time slots
4. Observe the blue focus ring

**Expected Result**:
- ✅ Blue ring appears **exactly** on the current time slot
- ✅ Ring moves smoothly as you press arrow keys
- ✅ Ring stays within the visible grid area
- ✅ Subtle blue background tint (5% opacity) fills the cell
- ✅ Ring appears **above** the grid lines but **below** any events

**NOT Expected**:
- ❌ Ring appearing below the scheduler
- ❌ Ring offset from the actual cell
- ❌ Ring disappearing or flickering

---

### 2. **Navigation Buttons Focus**

**Steps to test**:
1. Reload the page
2. Press **Tab** to focus the first button (usually "Prev")
3. Continue pressing **Tab** through all navigation buttons

**Expected Result**:
- ✅ Blue **inset** ring around each button
- ✅ Ring is 3px thick
- ✅ Ring appears immediately when focused
- ✅ Hover effect (10% blue tint) works when mousing over

---

### 3. **View Tabs Focus**

**Steps to test**:
1. Press **Tab** until you reach a view tab (Day/Week/Month)
2. Press **Arrow Keys** to switch between tabs
3. Press **Enter** to activate a tab

**Expected Result**:
- ✅ Blue **inset** ring around the focused tab
- ✅ Active tab has **blue bottom border** (3px)
- ✅ Active tab has **bold text**
- ✅ When switching tabs, active indicator moves to new tab

---

### 4. **Event Focus**

**Steps to test**:
1. Create or click on an event
2. Press **Tab** to focus the event
3. Try focusing multiple events

**Expected Result**:
- ✅ Blue **outset** ring around the event (outside the event box)
- ✅ Event slightly scales up (1.02x)
- ✅ Event appears above other events (z-index 100)
- ✅ Ring is visible even when event is near edge of scheduler

---

### 5. **Month View Grid Focus**

**Steps to test**:
1. Switch to **Month** view
2. Press **Tab** to focus the calendar
3. Use **Arrow Keys** to navigate days

**Expected Result**:
- ✅ Focus indicator appears on the correct day cell
- ✅ No positioning issues or offset

---

### 6. **Week View Grid Focus**

**Steps to test**:
1. Switch to **Week** view
2. Press **Tab** to focus the calendar
3. Use **Arrow Keys** to navigate time slots
4. Navigate across different days and time slots

**Expected Result**:
- ✅ Focus indicator appears on the correct time slot
- ✅ Works correctly for all 7 days
- ✅ Works correctly for all time slots (morning, afternoon, evening)

---

## 🔍 Detailed Focus Slot Inspection

If you still see positioning issues, you can inspect the element:

### Using Browser DevTools:

1. Open DevTools (F12)
2. Navigate grid with arrow keys to show focus slot
3. Click "Select Element" tool (or Ctrl+Shift+C)
4. Click on the blue focus ring
5. Check the **Computed** tab

**Expected CSS Properties**:
```css
.dhx_focus_slot {
  position: absolute;      /* ✅ NOT relative */
  pointer-events: none;    /* ✅ Doesn't block clicks */
  opacity: 1;              /* ✅ Fully visible */
  z-index: 5;              /* ✅ Above grid, below events */
  box-shadow: inset 0 0 0 3px #0d6efd;
  background-color: rgba(13, 110, 253, 0.05);
}
```

**Check Position**:
- The element should have `top`, `left`, `width`, `height` values that match the cell position
- Parent element should be `.dhx_cal_data` (the scheduler container)

---

## 🎨 Visual Reference

### Correct Grid Focus
```
┌─────────────────┐
│    Monday       │
├─────────────────┤
│ 08:00          │
├─────────────────┤
│╔═══════════════╗│  ← Focus ring INSIDE this cell
│║ 09:00        ║│  ← Subtle blue background
│╚═══════════════╝│
├─────────────────┤
│ 10:00          │
└─────────────────┘
```

### Incorrect Grid Focus (BEFORE FIX)
```
┌─────────────────┐
│    Monday       │
├─────────────────┤
│ 08:00          │
├─────────────────┤
│ 09:00          │  ← Should be here
├─────────────────┤
│ 10:00          │
└─────────────────┘

(far below on the page)
╔═══════════════╗
║  Focus ring   ║  ← But appears here (WRONG!)
╚═══════════════╝
```

---

## 🌐 Browser Testing

Test in multiple browsers to ensure consistency:

- [ ] **Chrome** (latest)
- [ ] **Firefox** (latest)
- [ ] **Safari** (latest)
- [ ] **Edge** (latest)

---

## ♿ Accessibility Testing

### Keyboard Only
- [ ] Navigate entire scheduler using only keyboard
- [ ] Create event using only keyboard
- [ ] Edit event using only keyboard
- [ ] Delete event using only keyboard

### Screen Reader
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (Mac)
- [ ] Ensure focus position is announced correctly

### High Contrast Mode
- [ ] Enable high contrast in OS
- [ ] Verify focus ring increases to 4px
- [ ] Verify color changes to pure blue (#0000ff)

### Reduced Motion
- [ ] Enable reduced motion in OS
- [ ] Verify no transitions/animations
- [ ] Verify focus ring still visible (no animation needed)

---

## 🐛 Troubleshooting

### Issue: Focus ring still appears in wrong position

**Possible causes**:
1. Browser cache - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. CSS not applied - Check DevTools for overridden styles
3. DHTMLX version issue - Verify you're using v7.0+

**Debug steps**:
```bash
# 1. Clear build cache
rm -rf dist/

# 2. Rebuild
npm run build

# 3. Check compiled CSS
grep -A10 "dhx_focus_slot" dist/scheduler-accessibility-demo/browser/styles*.css
```

### Issue: Focus ring has wrong color

Check CSS variables are loaded:
```javascript
// In browser console:
getComputedStyle(document.documentElement).getPropertyValue('--scheduler-focus-color')
// Should return: "#0d6efd" or "rgb(13, 110, 253)"
```

### Issue: No focus ring appears at all

1. Verify keyboard navigation plugin is enabled (it is in the component)
2. Check if focus styles are being overridden
3. Inspect element to see if `.dhx_focus_slot` class is being added

---

## ✅ Sign-off Checklist

Before considering the fix complete, verify:

- [ ] Grid focus appears in correct position (Week view)
- [ ] Grid focus appears in correct position (Day view)
- [ ] Grid focus appears in correct position (Month view)
- [ ] Navigation buttons have focus rings
- [ ] View tabs have focus rings
- [ ] Events have focus rings
- [ ] No layout shifts or jumps when focusing
- [ ] Keyboard navigation is smooth
- [ ] All focus indicators are visible and accessible

---

## 📝 Notes

- The `.dhx_focus_slot` is a **special overlay element** created by DHTMLX
- It uses **absolute positioning** relative to `.dhx_cal_data`
- It has **pointer-events: none** so it doesn't interfere with clicks
- Our custom styles enhance it without breaking the positioning

## 🎉 Success Criteria

✅ **You should see**:
- Blue ring appears exactly on the focused time slot
- Ring moves smoothly with arrow key navigation
- Ring stays within the scheduler boundaries
- Consistent focus appearance across all interactive elements

🚀 If all tests pass, the focus styling is working perfectly!
