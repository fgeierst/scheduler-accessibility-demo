# Scheduler Accessibility Demo

An accessible event scheduler built with Angular and dhtmlx-scheduler, featuring comprehensive keyboard navigation and WCAG 2.1 AA compliance.

## ✨ Features

- ✅ **Full Keyboard Navigation** - Navigate and interact with the scheduler using only your keyboard
- ✅ **ARIA Support** - Proper ARIA attributes for screen readers
- ✅ **Keyboard Shortcut Legend** - Interactive guide showing all available shortcuts
- ✅ **Custom Shortcuts** - Extensible keyboard shortcut system
- ✅ **WCAG 2.1 AA Compliant** - Meets accessibility standards
- ✅ **Focus Management** - Intelligent focus handling and visual indicators

## 🚀 Quick Start

### Development Server

```bash
npm start
```

Open your browser to `http://localhost:4200/`

### Storybook

```bash
npm run storybook
```

Open your browser to `http://localhost:6006`

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Try out keyboard navigation features
- **[Keyboard Navigation Details](./KEYBOARD_NAVIGATION.md)** - Technical implementation details
- **[Implementation Summary](./IMPLEMENTATION_SUMMARY.md)** - Overview of changes and features

## ⌨️ Keyboard Shortcuts

### General Navigation
- **Tab** - Focus scheduler
- **Alt+1/2/3** - Switch views (day/week/month)
- **Ctrl+Left/Right** - Navigate dates
- **Home** - Go to today
- **Ctrl+Enter** - Create new event

### Time Slots & Events
- **Arrow Keys** - Navigate slots/events
- **Shift+Arrows** - Extend selection
- **Enter** - Create/edit event
- **E / Shift+E** - Next/previous event
- **Ctrl+C/X/V** - Copy/cut/paste events
- **Shift+W** - Show event quick info (custom)

See the in-app keyboard legend for the complete list!

## 🧪 Testing

### Build

```bash
npm run build
```

### Accessibility Testing

The application includes:
- Keyboard-only navigation support
- Screen reader compatibility
- Focus management
- ARIA attributes
- WCAG 2.1 AA compliance

## 📦 Project Structure

```
src/app/
├── components/
│   ├── scheduler/
│   │   ├── scheduler.component.ts        # Main scheduler component
│   │   ├── scheduler.stories.ts          # Storybook stories
│   │   └── scheduler-with-keyboard.stories.ts  # Complete demo
│   └── keyboard-legend/
│       ├── keyboard-legend.component.ts  # Keyboard shortcuts legend
│       └── keyboard-legend.stories.ts    # Legend stories
├── app.ts                                # Main app component
├── app.html                              # App template with scheduler
└── app.css                               # App styles
```

## 🛠️ Technologies

- **Angular 21** - Modern web framework
- **dhtmlx-scheduler** - Event scheduler library
- **TypeScript** - Type-safe development
- **Storybook** - Component documentation
- **Accessibility** - WCAG 2.1 AA compliant

## 🎯 Accessibility Features

### Keyboard Navigation
All functionality is accessible via keyboard with clear focus indicators and logical tab order.

### ARIA Integration
- `role="application"` on scheduler
- `aria-describedby` linking to keyboard legend
- Proper labels and descriptions throughout

### Focus Management
- Automatic focus handling for modals
- Focus returns to previous position
- No keyboard traps
- Clear visual focus indicators

### Screen Reader Support
- Semantic HTML structure
- Descriptive ARIA labels
- Keyboard legend accessible to screen readers

## 📖 Learn More

- [Angular Documentation](https://angular.dev)
- [dhtmlx-scheduler Docs](https://docs.dhtmlx.com/scheduler/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

## 🤝 Contributing

Contributions are welcome! This project demonstrates accessibility best practices for scheduler components.






