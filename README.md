# Material Dialogs v2.0.0

[![npm version](https://badge.fury.io/js/material-dialogs.svg)](https://www.npmjs.com/package/material-dialogs)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Modern **Material Design 3** dialogs for web applications. Lightweight, accessible, and fully customizable.

Demo: [Live Demo](https://material-dialogs.vercel.app/)

## 🎨 Features

- ✨ **Material Design 3** - Modern and consistent styling
- 🎯 **100% Vanilla JS** - No dependencies
- 💨 **Lightweight** - Small bundle size
- 🌓 **Dark mode** - Automatic system preference support
- ♿ **Accessible** - Keyboard and screen reader support
- 📱 **Responsive** - Works on all devices
- ⌨️ **Keyboard support** - ESC to close, Enter on prompt
- 🎭 **Smooth animations** - With reduced motion support
- 🎨 **Customizable** - Colors, themes, animations
- 🔄 **100% Backward compatible** - Safe upgrade from v1
- 🚀 **Easy to use** - Simple and intuitive API

## 📦 Installation

### Via NPM
```bash
npm install material-dialogs --save
```

### Via Yarn
```bash
yarn add material-dialogs
```

## 🚀 Quick Start

### ES6 Modules
```javascript
import { xConfirm, xPrompt, xAlert } from 'material-dialogs';

// Confirmation dialog
xConfirm({
    title: 'Confirm action',
    message: 'Are you sure you want to continue?'
}).then(() => {
    console.log('Confirmed!');
}).catch(() => {
    console.log('Cancelled');
});

// Prompt with input
xPrompt({
    title: 'Enter your name',
    message: 'What is your full name?',
    placeholder: 'John Doe'
}).then((name) => {
    console.log('Name:', name);
}).catch(() => {
    console.log('Cancelled');
});

// Alert dialog
xAlert({
    title: 'Warning',
    message: 'This is an important operation!',
    textConfirm: 'Got it'
});
```

### HTML (Without build tools)
```html
<script type="module">
    import { xAlert, xConfirm, xPrompt } from "/node_modules/material-dialogs/material-dialogs.js";

    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        xAlert({title: 'Alert', message: 'Are you sure?'});
    });
</script>
```

## 📖 Documentation

### xConfirm(options)
Shows a confirmation dialog with two buttons.

```javascript
xConfirm({
    title: 'Delete item?',
    message: 'This action cannot be undone.',
    textCancel: 'Cancel',
    textConfirm: 'Delete',
    theme: 'light'
})
.then(() => console.log('Item deleted'))
.catch(() => console.log('Operation cancelled'));
```

**Options:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | string | - | Dialog title (required) |
| `message` | string | '' | Descriptive message |
| `textCancel` | string | 'Cancelar' | Cancel button text |
| `textConfirm` | string | 'Confirmar' | Confirm button text |
| `allowCloseClickBackdrop` | boolean | true | Close on backdrop click |
| `enableKeyboardEscape` | boolean | true | Close on ESC key |
| `theme` | string | 'light' | 'light', 'dark' or 'auto' |
| `primaryColor` | string | '#1976d2' | Primary color |
| `enableRippleEffect` | boolean | true | Button ripple effect |
| `borderRadius` | number | 12 | Border radius in pixels |
| `animationDuration` | number | 300 | Animation duration in ms |
| `zIndex` | number | 9999 | Z-index of modal |

### xPrompt(options)
Shows a dialog with a text input field.

```javascript
xPrompt({
    title: 'Your email',
    message: 'Enter your email address',
    placeholder: 'your@email.com',
    value: 'default@email.com',
    onValidate: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
})
.then((email) => console.log('Email:', email))
.catch(() => console.log('Cancelled'));
```

**Additional options:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `placeholder` | string | '' | Input placeholder |
| `value` | string | '' | Initial value |
| `onValidate` | function | null | Validation function |

### xAlert(options)
Shows an alert dialog with one button.

```javascript
xAlert({
    title: 'Success!',
    message: 'Operation completed successfully.',
    textConfirm: 'Ok',
    theme: 'light'
})
.then(() => console.log('Alert closed'));
```

**Note:** Set `textConfirm: null` to show alert without button (close only via backdrop or ESC).

### xCustom(options)
Creates a custom dialog with HTML content.

```javascript
xCustom({
    title: 'Custom Content',
    content: '<p>Your HTML here</p><input type="text" />',
    buttons: [
        { text: 'Cancel', onClick: () => {} },
        { text: 'Confirm', onClick: () => {} }
    ],
    theme: 'light'
});
```

## 🎨 Themes and Colors

### Automatic Theme
```javascript
xConfirm({
    title: 'Automatic',
    theme: 'auto' // Uses system preference
});
```

### Dark Theme
```javascript
xAlert({
    title: 'Dark Mode',
    theme: 'dark',
    message: 'This is a dark theme'
});
```

### Custom Colors
```javascript
xConfirm({
    title: 'Custom Colors',
    primaryColor: '#FF5722',
    colors: {
        primary: '#FF5722',
        surface: '#FFF3E0',
        onSurface: '#5D4037'
    }
});
```

## ⚙️ Global Configuration

### Set default configuration
```javascript
import { setDefaultConfig } from 'material-dialogs';

setDefaultConfig({
    theme: 'dark',
    primaryColor: '#2196F3',
    borderRadius: 16,
    animationDuration: 400,
    enableRippleEffect: true
});
```

### Get current configuration
```javascript
import { getDefaultConfig } from 'material-dialogs';

const config = getDefaultConfig();
console.log(config);
```

### Close all modals
```javascript
import { closeAllModals } from 'material-dialogs';

closeAllModals();
```

## 🎮 Interactions

### Keyboard
- `ESC` - Close modal (configurable)
- `Enter` - Confirm on xPrompt
- `Tab` - Navigate between elements

### Mouse
- Click on backdrop - Close modal (configurable)
- Buttons - Default actions

## 📱 Responsiveness

The library is fully responsive:
- **Desktop** - Horizontal layout with side-by-side buttons
- **Mobile** - Vertical layout with full-width buttons
- **Tablet** - Adapts automatically

## 🎯 Validation

```javascript
xPrompt({
    title: 'Email',
    onValidate: (value) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValid) {
            alert('Invalid email!');
        }
        return isValid;
    }
})
.then((email) => console.log('Valid email:', email))
.catch(() => console.log('Cancelled'));
```

## 🔍 Examples

### Delete Confirmation
```javascript
const deleteItem = async (itemId) => {
    try {
        await xConfirm({
            title: 'Delete item?',
            message: `Are you sure you want to delete item #${itemId}?`,
            textCancel: 'No, keep it',
            textConfirm: 'Yes, delete'
        });

        await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
        alert('Item deleted!');
    } catch (err) {
        console.log('Operation cancelled');
    }
};
```

### Get User Input
```javascript
const getUserName = async () => {
    try {
        const name = await xPrompt({
            title: 'What is your name?',
            placeholder: 'Type here...',
            onValidate: (value) => value.length >= 3
        });
        return name;
    } catch (err) {
        return null;
    }
};
```

### Custom Dialog with Form
```javascript
const formDemo = `<form>
    <div class="xmodal-input">
        <label for="name">Name</label><br>
        <input type="text" name="name"><br>
    </div>
    <div class="xmodal-input">
        <label for="email">Email</label><br>
        <input type="email" name="email"><br>
    </div>
</form>`;

xCustom({
    title: 'Register',
    content: formDemo,
    buttons: [
        { text: 'Cancel', onClick: () => console.log('Cancelled') },
        { text: 'Submit', onClick: () => console.log('Submitted') }
    ]
});
```

## 🆕 What's New in v2.0.0

- ✨ Material Design 3 modernized styles
- ✨ CSS Variables system with dynamic themes
- ✨ Dark mode support (auto, light, dark)
- ✨ Ripple effects on buttons
- ✨ Backdrop blur effect
- ✨ ESC key support
- ✨ Input validation with `onValidate`
- ✨ New `xCustom` function for custom dialogs
- ✨ Global configuration with `setDefaultConfig`
- ✨ `closeAllModals` function
- ✨ Enter key support on prompt
- ✨ Reduced motion support
- ✨ Better event listener management
- ✨ Improved animations and transitions

**100% backward compatible** - All v1 API continues to work!

## 📝 License

ISC © 2025 - Edson Santos

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: edsonlucianoms@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/edsonmsantos/material-dialogs/issues)
- 📖 Demo: See `demo/index.html` for more examples

---

**Made with ❤️ by Edson Santos**
