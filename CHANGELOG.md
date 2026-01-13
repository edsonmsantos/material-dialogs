# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-13

### Added
- ✨ **Material Design 3 modernized** - Completely updated styles with Material Design 3 specifications
- ✨ **CSS Variables system** - Dynamic themes with customizable colors
- ✨ **Dark mode support** - Automatic (prefers-color-scheme), light, dark or auto
- ✨ **Ripple effects** - Click animations on buttons (can be disabled)
- ✨ **Backdrop blur** - Blur effect on background with fallback for older browsers
- ✨ **Smooth animations** - Modern cubic-bezier usage (0.34, 1.56, 0.64, 1)
- ✨ **ESC key support** - Close modal by pressing Escape (configurable)
- ✨ **Input validation** - `onValidate` function to validate xPrompt input
- ✨ **Custom dialog** - New `xCustom` function for personalized dialogs
- ✨ **Global configuration** - `setDefaultConfig` and `getDefaultConfig` functions
- ✨ **Better modal management** - `closeAllModals` function to close all
- ✨ **Improved responsiveness** - Better mobile layout with column buttons
- ✨ **Animated input underline** - Material Design 3 effect for input fields
- ✨ **Enter key on prompt** - Pressing Enter confirms the input
- ✨ **Reduced motion** - Respects system reduced motion preference
- ✨ **Multiple instances support** - Intelligent style management with multiple open modals

### Improved
- 🔧 **Optimized style management** - Styles are loaded once and reused
- 🔧 **Efficient element selection** - Reduced DOM queries
- 🔧 **Optimized events** - Better event listener management
- 🔧 **Elevation shadows** - Material 3 elevation tokens
- 🔧 **Improved typography** - Modern font stack with fallbacks
- 🔧 **Consistent spacing** - Following Material Design 3 spacing scale
- 🔧 **Color transitions** - 280ms duration following Material Design
- 🔧 **Border radius** - Default 12px on desktop, 28px on mobile (Material 3)
- 🔧 **Accessibility** - Better color contrast, keyboard support

### Fixed
- 🐛 **Multiple style loads** - Now loaded only once
- 🐛 **Memory leak** - Proper cleanup of event listeners
- 🐛 **Z-index conflicts** - Better layer management
- 🐛 **Input focus** - Automatic focus guaranteed on xPrompt

### Backward Compatibility
✅ **100% backward compatible** - All v1 API continues to work
- `xConfirm()` - Works as before
- `xPrompt()` - Works as before
- `xAlert()` - Works as before
- All old parameters maintain identical behavior

### Migrating from v1 to v2

Migration is optional - your current code continues to work. But you can take advantage of new features:

```javascript
// v1 (still works in v2)
xConfirm({
    title: 'Confirm',
    message: 'Are you sure?'
}).then(() => {
    // confirmed
});

// v2 with new features
xConfirm({
    title: 'Confirm',
    message: 'Are you sure?',
    theme: 'dark',
    enableRippleEffect: true,
    primaryColor: '#FF5722'
}).then(() => {
    // confirmed
});

// New dialog type
xCustom({
    title: 'Custom',
    content: '<p>HTML content here</p>',
    buttons: [
        { text: 'Cancel', onClick: () => {} },
        { text: 'OK', onClick: () => {} }
    ]
});
```

## [1.0.9] - 2024-XX-XX

### Changed
- Minor bug fixes and improvements

## [1.0.8] - 2024-XX-XX

### Changed
- Updated demo examples

## [1.0.7] - 2024-XX-XX

### Initial
- Initial release of material-dialogs
- Basic xAlert, xConfirm, and xPrompt functions
- Material Design styling
- Promise-based API
