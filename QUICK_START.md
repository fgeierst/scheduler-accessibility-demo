# Quick Start Guide - Keyboard Navigation

## Getting Started

This scheduler demo showcases full keyboard navigation and accessibility features.

## Running the Demo

### Development Server
```bash
npm start
```
Open http://localhost:4200 in your browser.

### Storybook
```bash
npm run storybook
```
Open http://localhost:6006 and navigate to "Components/Scheduler/With Keyboard Navigation"

## Try It Out!

### Step 1: Focus the Scheduler
1. Load the application
2. Press **Tab** to focus the scheduler
3. Notice the focus indicator on the scheduler

### Step 2: Navigate Time Slots
1. Use **Arrow Keys** (↑↓←→) to navigate between time slots
2. Notice how the focus moves between different time slots
3. Hold **Shift** while pressing arrow keys to extend selection

### Step 3: Create an Event
1. Navigate to a time slot using arrow keys
2. Press **Enter** to create a new event
3. Fill in the event details in the modal
4. Press **Enter** again to save, or **Esc** to cancel

### Step 4: Navigate Events
1. Press **E** to select the next event
2. Press **Shift+E** to select the previous event
3. With an event selected, press **Enter** to edit it

### Step 5: Copy/Paste Events
1. Select an event using **E**
2. Press **Ctrl+C** to copy the event
3. Navigate to a different time slot
4. Press **Ctrl+V** to paste the event

### Step 6: Try Custom Shortcuts
1. Select an event using **E**
2. Press **Shift+W** to show quick info
3. This demonstrates custom keyboard shortcuts

### Step 7: Switch Views
1. Press **Alt+1** for day view
2. Press **Alt+2** for week view
3. Press **Alt+3** for month view

### Step 8: Navigate Dates
1. Press **Ctrl+Right Arrow** to go to next period
2. Press **Ctrl+Left Arrow** to go to previous period
3. Press **Home** to go to today

## Keyboard Shortcut Legend

The keyboard legend is always visible above the scheduler. Click the arrow button to collapse/expand it.

### Categories

#### 🎯 General Navigation
Quick navigation and view switching

#### 📅 Time Slots
Navigate and select time slots

#### 📝 Events
Work with events (create, edit, copy, paste)

#### 🗨️ Modal Windows
Dialog interaction shortcuts

## Accessibility Features

### Screen Reader Support
- The scheduler has `role="application"`
- Linked to keyboard legend via `aria-describedby`
- Proper ARIA labels throughout

### Keyboard-Only Navigation
- Everything is accessible via keyboard
- No mouse required
- Clear focus indicators
- Logical tab order

### Focus Management
- Automatic focus on modal open/close
- Focus returns to scheduler after modal closes
- Never lose your place

## Tips & Tricks

### Productivity Shortcuts
- **Ctrl+Enter** - Quick create event (from anywhere in scheduler)
- **Home** - Jump to today instantly
- **E** - Quickly jump between events
- **Shift+W** - Quick preview of event details

### Selection Techniques
- Use **Shift+Arrows** to create multi-slot selections for longer events
- Use **Tab** to move focus in/out of scheduler efficiently
- Use **Esc** to cancel operations and close modals

### Best Practices
1. **Learn the basics first** - Tab, Enter, Arrow Keys, Esc
2. **Use the legend** - Keep it open while learning
3. **Practice common tasks** - Create, edit, delete events
4. **Try advanced features** - Copy/paste, quick info
5. **Customize if needed** - Add your own shortcuts

## Common Workflows

### Creating Multiple Events Quickly
1. **Tab** to focus scheduler
2. Navigate to first slot with **Arrow Keys**
3. **Enter** to create event
4. Fill details, **Enter** to save
5. **Arrow Keys** to next slot
6. **Enter** to create another event
7. Repeat!

### Reorganizing Events
1. Select event with **E**
2. **Ctrl+X** to cut
3. Navigate to new slot with **Arrow Keys**
4. **Ctrl+V** to paste
5. Event moved!

### Reviewing Today's Schedule
1. **Home** to go to today
2. **Alt+1** to switch to day view
3. **E** to jump between events
4. **Shift+W** on each to see quick info
5. **Enter** to edit if needed

## Troubleshooting

### Shortcuts Not Working?
- Make sure scheduler has focus (press **Tab**)
- Check if modal is open (close with **Esc**)
- Verify browser isn't capturing the shortcut

### Lost Focus?
- Press **Tab** until scheduler is focused again
- Look for the focus indicator (outline)

### Can't Find a Feature?
- Check the keyboard legend
- Try **Shift+W** for event quick info
- Consult `KEYBOARD_NAVIGATION.md` for details

## Next Steps

- **Read the docs**: Check `KEYBOARD_NAVIGATION.md` for technical details
- **Explore Storybook**: Interactive component documentation
- **Customize**: Add your own shortcuts in `scheduler.component.ts`
- **Test**: Try with a screen reader for full accessibility experience

## Feedback & Contributions

This is a demo application showcasing accessibility best practices. Feel free to:
- Suggest new shortcuts
- Report accessibility issues
- Contribute improvements
- Share your experience

---

**Happy scheduling with keyboard navigation! ⌨️📅**
