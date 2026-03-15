# Testing the Focus Management Fix

## Quick Test Instructions

### Automated Testing (Keyboard Navigation)
1. Start Storybook: `npm run storybook`
2. Navigate to "Components/Scheduler/With Keyboard Navigation"
3. Follow the manual test steps below

### Manual Test Steps

#### Test 1: Focus Persistence on View Change
1. **Tab** to the scheduler (you should see focus indicators on the calendar grid)
2. Use **arrow keys** to navigate (verify you can move between time slots)
3. Press **Alt+1** (or click "Day" tab)
   - ✅ **Expected**: Focus remains in the calendar - you can immediately use arrow keys
   - ❌ **Before fix**: Focus was lost - you'd need to Tab back
4. Press **Alt+2** (or click "Week" tab)
   - ✅ **Expected**: Focus remains in the calendar
5. Press **Alt+3** (or click "Month" tab)
   - ✅ **Expected**: Focus remains in the calendar

#### Test 2: Focus Visibility on Calendar Grid
1. Tab to the scheduler
2. Verify you see a visible focus indicator (outline) on the calendar grid
3. Switch between views using Alt+1, Alt+2, Alt+3
4. Verify the focus indicator remains visible after each view change

#### Test 3: Grid Focus Over Empty Time Slots
1. Tab to the scheduler
2. Use arrow keys to navigate to a time slot WITHOUT an event
3. **Expected**: Grid cell should have:
   - Blue outline (visible)
   - Light blue background tint
4. The focus indicator should be clearly visible

#### Test 4: Grid Focus Over Events
1. Use arrow keys to navigate to a time slot WITH an event
2. **Expected**: Grid focus should have TWO visible outlines ABOVE the event:
   - Inner white outline (2px) for contrast against event
   - Outer blue outline (3px) as the focus indicator
3. Navigate over events with different colors (blue, red, green)
4. **Expected**: 
   - White ring provides contrast against all event colors
   - Blue outer ring is visible
   - Focus indicator appears ABOVE events (not hidden behind them)

#### Test 5: Event Focus Indicator
1. Tab to the scheduler
2. Press 'E' to select the first event (or click an event)
3. **Expected**: Event should have:
   - Blue outline (3px) around it
   - 2px offset between event and outline
4. Press 'E' again to cycle to next event
5. **Expected**: 
   - Previous event loses outline
   - New event gains outline
6. Test with events of different colors
7. **Expected**: Blue outline visible on all event backgrounds

#### Test 6: Screen Reader Support
If using a screen reader (NVDA, JAWS, VoiceOver):
1. Tab to the scheduler
2. Verify you hear "Calendar grid" when focus enters the data area
3. Switch views with Alt+1/2/3
4. Verify you hear "Calendar grid" after each view change

### Expected Behavior Summary

| Action | Before Fix | After Fix |
|--------|-----------|-----------|
| Switch to Day view (Alt+1) | Lost focus | Focus maintained ✅ |
| Switch to Week view (Alt+2) | Lost focus | Focus maintained ✅ |
| Switch to Month view (Alt+3) | Lost focus | Focus maintained ✅ |
| Click view tab | Lost focus | Focus maintained ✅ |
| Screen reader announces grid | No label | "Calendar grid" ✅ |
| Grid focus over events | Hidden/invisible | White+blue visible above events ✅ |
| Grid focus z-index | Low (~5) | High (150) - above events ✅ |
| Event focus outline | None/inconsistent | Blue outline (3px) with offset ✅ |
| Event focus visibility | Unclear which is selected | Clear blue outline ✅ |

### Browser Testing
Test on:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (especially for macOS Alt+number shortcuts)

### Accessibility Tools
Run axe DevTools or similar:
- No new accessibility violations should appear
- Focus order should remain logical
- Keyboard trap test should pass

## Troubleshooting

### Focus not restoring?
- Check browser console for errors
- Verify the `.dhx_cal_data` element exists in the DOM
- Ensure the `onViewChange` event is firing (add console.log in handler)

### Alt+number not working on macOS?
- The custom handler in `setupMacOSAltNumberShortcuts()` should handle this
- Try using the keyboard shortcut viewer (Shift+?) if available
- Click the tabs directly as an alternative

## Code Review Checklist

When reviewing the fix:
- [x] `setupDataAreaAccessibility()` is called in `ngOnInit()`
- [x] `tabindex="-1"` is set on `.dhx_cal_data`
- [x] `aria-label="Calendar grid"` is set for screen readers
- [x] `onViewChange` event handler is attached
- [x] `setTimeout` is used to wait for DOM update
- [x] `restoreFocusToDataArea()` focuses the data area
- [x] No TypeScript compilation errors
- [x] Builds successfully
