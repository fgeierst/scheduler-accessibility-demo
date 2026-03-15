# Focus Management Fix for Scheduler View Switching

## Problem
When switching between day, week, and month views in the scheduler, the grid view was losing focus. This created a poor user experience, especially for keyboard users who had to re-tab back to the scheduler to continue interacting with it.

## Root Cause
The dhtmlx-scheduler library re-renders the DOM when changing views. This DOM re-rendering causes any focused element within the scheduler to lose focus, as the elements are removed and recreated.

## Solution
Implemented automatic focus restoration using the scheduler's `onViewChange` event:

### Changes Made to `scheduler.component.ts`:

1. **Added `setupDataAreaAccessibility()` method**
   - Called during `ngOnInit()` after scheduler initialization
   - Sets `tabindex="-1"` on the `.dhx_cal_data` element to make it focusable
   - Adds `aria-label="Calendar grid"` for screen reader users
   - This ensures the data area is ready to receive focus

2. **Added `onViewChange` event handler**
   - Attached in `setupEventHandlers()` method
   - Triggers when the user switches between day/week/month views
   - Calls `restoreFocusToDataArea()` with a `setTimeout` to ensure DOM updates complete

3. **Added `restoreFocusToDataArea()` method**
   - Queries for the `.dhx_cal_data` element
   - Ensures it has `tabindex="-1"` (defensive check)
   - Calls `.focus()` to restore keyboard focus to the grid

## How It Works

1. User focuses the scheduler and uses keyboard to navigate
2. User switches view (e.g., from week to month) using Alt+1/2/3 or clicking tabs
3. dhtmlx-scheduler fires the `onViewChange` event
4. Our handler waits for the next tick (via `setTimeout`) to ensure DOM is updated
5. Focus is restored to the calendar grid (`.dhx_cal_data`)
6. User can continue keyboard navigation without needing to re-tab

## Accessibility Benefits

- ✅ Maintains keyboard focus during view transitions
- ✅ Improves user experience for keyboard-only users
- ✅ Reduces cognitive load (no need to find where focus went)
- ✅ Adds proper ARIA label to calendar grid for screen readers
- ✅ Complies with WCAG 2.1 Success Criterion 2.4.3 (Focus Order)

## Testing
To test the fix:
1. Tab to the scheduler
2. Use arrow keys to navigate (verify focus is working)
3. Press Alt+1 to switch to day view
4. Verify focus remains in the calendar grid (you can continue using arrow keys)
5. Press Alt+2 to switch to week view
6. Verify focus remains in the calendar grid
7. Press Alt+3 to switch to month view
8. Verify focus remains in the calendar grid

The fix ensures seamless keyboard navigation across all view changes.
