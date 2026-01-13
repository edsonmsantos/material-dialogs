/**
 * Material Dialogs v2.0.0
 * Modern Material Design 3 dialogs for web applications
 * GitHub: https://github.com/seu-usuario/material-dialogs
 * NPM: https://www.npmjs.com/package/material-dialogs
 */

/* ========================================================================
   Configuration and Themes
   ======================================================================== */

const defaultConfig = {
    theme: 'light', // 'light', 'dark', 'auto'
    primaryColor: '#1976d2',
    borderRadius: 12,
    animationDuration: 300,
    allowCloseClickBackdrop: true,
    enableKeyboardEscape: true,
    enableRippleEffect: true,
    zIndex: 9999,
    colors: null, // Will be set based on theme
    textCancel: 'Cancelar',
    textConfirm: 'Confirmar',
    onValidate: null
};

const lightTheme = {
    primary: '#1976d2',
    surface: '#ffffff',
    onSurface: '#1a1a1a',
    onSurfaceVariant: '#727272',
    error: '#d32f2f',
    surfaceVariant: '#f5f5f5',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.24) 100%)'
};

const darkTheme = {
    primary: '#90caf9',
    surface: '#121212',
    onSurface: '#e0e0e0',
    onSurfaceVariant: '#b0b0b0',
    error: '#ef5350',
    surfaceVariant: '#1e1e1e',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.64) 0%, rgba(0, 0, 0, 0.56) 100%)'
};

const getThemeColors = (theme = 'light') => {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? darkTheme : lightTheme;
    }
    return theme === 'dark' ? darkTheme : lightTheme;
};

const mergeConfig = (userConfig = {}) => {
    const baseTheme = userConfig.theme || defaultConfig.theme;
    const themeColors = getThemeColors(baseTheme);

    return {
        ...defaultConfig,
        ...userConfig,
        theme: baseTheme,
        colors: {
            ...themeColors,
            primary: userConfig.primaryColor || themeColors.primary,
            ...(userConfig.colors || {})
        }
    };
};

/* ========================================================================
   Styles Management
   ======================================================================== */

let styleElement = null;

const loadStyles = (config) => {
    if (styleElement) return; // Already loaded

    const colors = config.colors;
    const radius = config.borderRadius;
    const duration = config.animationDuration;
    const enableRipple = config.enableRippleEffect;

    const styleContent = `
        /* CSS Variables */
        :root {
            --x-primary: ${colors.primary};
            --x-surface: ${colors.surface};
            --x-on-surface: ${colors.onSurface};
            --x-on-surface-variant: ${colors.onSurfaceVariant};
            --x-error: ${colors.error};
            --x-surface-variant: ${colors.surfaceVariant};
            --x-radius: ${radius}px;
            --x-duration: ${duration}ms;
            --x-ripple-enabled: ${enableRipple ? '1' : '0'};
        }

        /* Base Modal Container */
        .xmodal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: ${colors.background};
            z-index: ${config.zIndex};
            animation: xmodal-enter-backdrop var(--x-duration) ease-out;
        }

        .xmodal.xmodal-closing {
            animation: xmodal-exit-backdrop var(--x-duration) ease-in;
        }

        /* Backdrop */
        .xmodal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            -webkit-backdrop-filter: blur(0px);
            backdrop-filter: blur(0px);
        }

        @supports (backdrop-filter: blur(10px)) {
            .xmodal {
                background: rgba(0, 0, 0, 0.32);
            }

            .xmodal-backdrop {
                -webkit-backdrop-filter: blur(5px);
                backdrop-filter: blur(5px);
            }
        }

        /* Content */
        .xmodal-content {
            background-color: var(--x-surface);
            color: var(--x-on-surface);
            border-radius: var(--x-radius);
            box-shadow:
                0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12);
            margin: 32px;
            position: relative;
            z-index: 1;
            overflow-y: auto;
            max-height: calc(100% - 64px);
            max-width: 600px;
            min-width: 320px;
            display: flex;
            flex-direction: column;
            animation: xmodal-enter var(--x-duration) cubic-bezier(0.34, 1.56, 0.64, 1);
            transition: all var(--x-duration) ease-out;
        }

        .xmodal.xmodal-closing .xmodal-content {
            animation: xmodal-exit var(--x-duration) cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Title */
        .xmodal-title {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            line-height: 1.4;
            letter-spacing: -0.015em;
            color: var(--x-on-surface);
            padding: 24px 24px 16px 24px;
            flex: 0 0 auto;
        }

        /* Message */
        .xmodal-message {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-size: 0.95rem;
            font-weight: 400;
            line-height: 1.6;
            letter-spacing: 0.00938em;
            color: var(--x-on-surface-variant);
            padding: 0 24px 16px 24px;
            flex: 0 0 auto;
        }

        /* Buttons Container */
        .xmodal-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 16px 8px 8px 8px;
            flex: 0 0 auto;
        }

        /* Button Base */
        .xmodal-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            background-color: transparent;
            outline: 0;
            border: none;
            margin: 0;
            border-radius: 8px;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            vertical-align: middle;
            -moz-appearance: none;
            -webkit-appearance: none;
            -webkit-text-decoration: none;
            text-decoration: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            font-weight: 600;
            font-size: 0.875rem;
            line-height: 1.75;
            letter-spacing: 0.02857em;
            text-transform: uppercase;
            min-width: 64px;
            padding: 8px 16px;
            transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        /* Ripple Effect */
        ${enableRipple ? `
        .xmodal-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: currentColor;
            opacity: 0.1;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s, opacity 0.6s;
            pointer-events: none;
        }

        .xmodal-button:active::before {
            width: 300px;
            height: 300px;
            opacity: 0;
            transition: none;
        }
        ` : ''}

        /* Button Cancel */
        .xmodal-button-cancel {
            border: 1.5px solid var(--x-on-surface-variant);
            color: var(--x-on-surface);
        }

        .xmodal-button-cancel:hover {
            background-color: var(--x-surface-variant);
            border-color: var(--x-on-surface);
        }

        .xmodal-button-cancel:active {
            background-color: rgba(26, 26, 26, 0.12);
        }

        /* Button Confirm */
        .xmodal-button-confirm {
            background-color: var(--x-primary);
            color: white;
            box-shadow:
                0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                0px 1px 5px 0px rgba(0, 0, 0, 0.12);
        }

        .xmodal-button-confirm:hover {
            background-color: var(--x-primary);
            box-shadow:
                0px 5px 5px -3px rgba(0, 0, 0, 0.2),
                0px 8px 10px 1px rgba(0, 0, 0, 0.14),
                0px 3px 14px 2px rgba(0, 0, 0, 0.12);
            transform: translateY(-2px);
        }

        .xmodal-button-confirm:active {
            box-shadow:
                0px 7px 8px -4px rgba(0, 0, 0, 0.2),
                0px 12px 17px 2px rgba(0, 0, 0, 0.14),
                0px 5px 22px 4px rgba(0, 0, 0, 0.12);
        }

        /* Input Wrapper */
        .xmodal-input-wrapper {
            padding: 16px 24px;
            flex: 0 0 auto;
        }

        .xmodal-input {
            position: relative;
            width: 100%;
        }

        .xmodal-input-field {
            font: inherit;
            letter-spacing: inherit;
            color: currentColor;
            border: none;
            border-bottom: 1px solid var(--x-on-surface-variant);
            border-radius: 0;
            box-sizing: content-box;
            background: transparent;
            height: 1.4375em;
            margin: 0;
            -webkit-tap-highlight-color: transparent;
            display: block;
            min-width: 0;
            width: 100%;
            padding: 12px 0;
            -webkit-animation: xmodal-autofill-cancel 10ms;
            animation: xmodal-autofill-cancel 10ms;
            font-size: 1rem;
            line-height: 1.4375em;
            transition: border-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .xmodal-input-field::placeholder {
            color: var(--x-on-surface-variant);
            opacity: 0.7;
        }

        .xmodal-input-field:focus {
            outline: none;
            border-bottom: 2px solid var(--x-primary);
            padding-bottom: 11px;
        }

        .xmodal-input-field.xmodal-input-error {
            border-bottom-color: var(--x-error);
            color: var(--x-error);
        }

        .xmodal-input-field.xmodal-input-error:focus {
            border-bottom-color: var(--x-error);
        }

        .xmodal-input-underline {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            width: 0;
            background-color: var(--x-primary);
            transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        }

        /* Custom Content */
        .xmodal-custom-content {
            padding: 16px 24px;
            flex: 1;
            overflow-y: auto;
        }

        /* Alert variant */
        .xmodal-content-alert {
            max-width: 500px;
        }

        /* Animations */
        @keyframes xmodal-enter {
            0% {
                opacity: 0;
                transform: scale(0.95) translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes xmodal-exit {
            0% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
            100% {
                opacity: 0;
                transform: scale(0.95) translateY(-20px);
            }
        }

        @keyframes xmodal-enter-backdrop {
            0% {
                background: transparent;
            }
            100% {
                background: ${colors.background};
            }
        }

        @keyframes xmodal-exit-backdrop {
            0% {
                background: ${colors.background};
            }
            100% {
                background: transparent;
            }
        }

        @keyframes xmodal-autofill-cancel {
            from {
                animation-delay: inherit;
            }
            to {
                animation-delay: inherit;
            }
        }

        /* Responsive */
        @media (max-width: 600px) {
            .xmodal-content {
                max-width: 90vw;
                max-height: 90vh;
                margin: 16px;
                border-radius: 28px;
            }

            .xmodal-title {
                font-size: 1.25rem;
                padding: 20px 20px 12px 20px;
            }

            .xmodal-message {
                padding: 0 20px 12px 20px;
            }

            .xmodal-buttons {
                flex-direction: column-reverse;
                gap: 12px;
                padding: 16px;
            }

            .xmodal-button {
                width: 100%;
                min-width: unset;
            }

            .xmodal-input-wrapper {
                padding: 12px 20px;
            }

            .xmodal-input-field {
                padding: 10px 0;
            }

            .xmodal-custom-content {
                padding: 12px 20px;
            }
        }

        /* Print styles */
        @media print {
            .xmodal {
                display: none;
            }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
            .xmodal,
            .xmodal-content,
            .xmodal-button,
            .xmodal-input-field {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;

    styleElement = document.createElement('style');
    styleElement.innerHTML = styleContent;
    styleElement.setAttribute('type', 'text/css');
    styleElement.id = 'xmodal-style';
    styleElement.setAttribute('data-version', '2.0.0');

    document.head.appendChild(styleElement);
};

const removeStyleXModal = () => {
    const modalsOpen = document.querySelectorAll('[data-xmodal-id]').length;

    if (modalsOpen === 0 && styleElement) {
        styleElement.remove();
        styleElement = null;
    }
};

/* ========================================================================
   Utility Functions
   ======================================================================== */

const setupBackdropListener = (modal, callback) => {
    const backdrop = modal.querySelector('.xmodal-backdrop');

    if (!backdrop) return;

    const handler = (event) => {
        if (event.target === backdrop) {
            callback();
        }
    };

    backdrop.addEventListener('click', handler, { once: false });

    modal._backdropHandler = handler;
    modal._backdropElement = backdrop;
};

const setupKeyboardListener = (modal, callback) => {
    const handler = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            event.preventDefault();
            callback();
        }
    };

    document.addEventListener('keydown', handler, { once: false });

    modal._keyboardHandler = handler;
};

const cleanupEventListeners = (modal) => {
    if (modal._backdropHandler && modal._backdropElement) {
        modal._backdropElement.removeEventListener('click', modal._backdropHandler);
        delete modal._backdropHandler;
        delete modal._backdropElement;
    }

    if (modal._keyboardHandler) {
        document.removeEventListener('keydown', modal._keyboardHandler);
        delete modal._keyboardHandler;
    }
};

/* ========================================================================
   Core Modal Functions
   ======================================================================== */

const makeModalDefault = (config) => {
    const modal = document.createElement('div');
    modal.classList.add('xmodal');
    modal.setAttribute('data-xmodal-id', `modal-${Date.now()}-${Math.random()}`);
    modal.style.zIndex = config.zIndex;

    return modal;
};

const cleanupModal = (modal) => {
    cleanupEventListeners(modal);
    modal.classList.add('xmodal-closing');

    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
        removeStyleXModal();
    }, 200);
};

/* ========================================================================
   Public API
   ======================================================================== */

export const xConfirm = (options) => {
    const config = mergeConfig(options);
    loadStyles(config);

    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(config);

        const handleConfirm = () => {
            cleanupModal(modal);
            resolve();
        };

        const handleCancel = () => {
            cleanupModal(modal);
            reject(new Error('Cancelled'));
        };

        modal.innerHTML = `
            <div class="xmodal-backdrop"></div>
            <div class="xmodal-content">
                <div class="xmodal-title">${config.title || ''}</div>
                ${config.message ? `<div class="xmodal-message">${config.message}</div>` : ''}
                <div class="xmodal-buttons">
                    <button class="xmodal-button xmodal-button-cancel" data-action="cancel">
                        ${config.textCancel}
                    </button>
                    <button class="xmodal-button xmodal-button-confirm" data-action="confirm">
                        ${config.textConfirm}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('[data-action="confirm"]').addEventListener('click', handleConfirm);
        modal.querySelector('[data-action="cancel"]').addEventListener('click', handleCancel);

        if (config.allowCloseClickBackdrop) {
            setupBackdropListener(modal, handleCancel);
        }

        if (config.enableKeyboardEscape) {
            setupKeyboardListener(modal, handleCancel);
        }
    });
};

export const xPrompt = (options) => {
    const config = mergeConfig(options);
    loadStyles(config);

    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(config);
        const inputId = `xmodal-input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const handleConfirm = () => {
            const inputElement = document.getElementById(inputId);
            const value = inputElement.value;

            if (config.onValidate && !config.onValidate(value)) {
                inputElement.classList.add('xmodal-input-error');
                inputElement.style.borderBottomColor = config.colors.error;
                return;
            }

            cleanupModal(modal);
            resolve(value);
        };

        const handleCancel = () => {
            cleanupModal(modal);
            reject(new Error('Cancelled'));
        };

        modal.innerHTML = `
            <div class="xmodal-backdrop"></div>
            <div class="xmodal-content">
                <div class="xmodal-title">${config.title || ''}</div>
                ${config.message ? `<div class="xmodal-message">${config.message}</div>` : ''}
                <div class="xmodal-input-wrapper">
                    <div class="xmodal-input">
                        <input
                            type="text"
                            id="${inputId}"
                            class="xmodal-input-field"
                            placeholder="${config.placeholder || ''}"
                            value="${config.value || ''}"
                        />
                        <div class="xmodal-input-underline"></div>
                    </div>
                </div>
                <div class="xmodal-buttons">
                    <button class="xmodal-button xmodal-button-cancel" data-action="cancel">
                        ${config.textCancel}
                    </button>
                    <button class="xmodal-button xmodal-button-confirm" data-action="confirm">
                        ${config.textConfirm}
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const inputElement = document.getElementById(inputId);
        inputElement.focus();

        // Allow Enter key to confirm
        inputElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleConfirm();
            }
        });

        modal.querySelector('[data-action="confirm"]').addEventListener('click', handleConfirm);
        modal.querySelector('[data-action="cancel"]').addEventListener('click', handleCancel);

        if (config.allowCloseClickBackdrop) {
            setupBackdropListener(modal, handleCancel);
        }

        if (config.enableKeyboardEscape) {
            setupKeyboardListener(modal, handleCancel);
        }
    });
};

export const xAlert = (options) => {
    const config = mergeConfig(options);
    loadStyles(config);

    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(config);

        const handleConfirm = () => {
            cleanupModal(modal);
            resolve();
        };

        const handleCancel = () => {
            cleanupModal(modal);
            reject(new Error('Dismissed'));
        };

        const buttonHtml = config.textConfirm !== null && config.textConfirm !== undefined
            ? `<div class="xmodal-buttons">
                   <button class="xmodal-button xmodal-button-confirm" data-action="confirm">
                       ${config.textConfirm}
                   </button>
               </div>`
            : '';

        modal.innerHTML = `
            <div class="xmodal-backdrop"></div>
            <div class="xmodal-content xmodal-content-alert">
                <div class="xmodal-title">${config.title || ''}</div>
                ${config.message ? `<div class="xmodal-message">${config.message}</div>` : ''}
                ${buttonHtml}
            </div>
        `;

        document.body.appendChild(modal);

        if (config.textConfirm !== null && config.textConfirm !== undefined) {
            modal.querySelector('[data-action="confirm"]').addEventListener('click', handleConfirm);
        }

        if (config.allowCloseClickBackdrop) {
            setupBackdropListener(modal, handleCancel);
        }

        if (config.enableKeyboardEscape) {
            setupKeyboardListener(modal, handleCancel);
        }
    });
};

export const xCustom = (options) => {
    const config = mergeConfig(options);
    loadStyles(config);

    const modal = makeModalDefault(config);
    let isOpen = true;

    const handleClose = (result = null) => {
        if (isOpen) {
            cleanupModal(modal);
            isOpen = false;
            return result;
        }
    };

    const content = typeof config.content === 'string'
        ? config.content
        : config.content.outerHTML;

    const buttonsHtml = config.buttons
        ? `<div class="xmodal-buttons">
               ${config.buttons.map((btn, idx) => `
                   <button class="xmodal-button xmodal-button-custom" data-button-index="${idx}">
                       ${btn.text}
                   </button>
               `).join('')}
           </div>`
        : '';

    modal.innerHTML = `
        <div class="xmodal-backdrop"></div>
        <div class="xmodal-content">
            <div class="xmodal-title">${config.title || ''}</div>
            <div class="xmodal-custom-content">${content}</div>
            ${buttonsHtml}
        </div>
    `;

    document.body.appendChild(modal);

    if (config.buttons) {
        modal.querySelectorAll('[data-button-index]').forEach((btn) => {
            const index = parseInt(btn.getAttribute('data-button-index'));
            btn.addEventListener('click', () => {
                const button = config.buttons[index];
                if (button.onClick) {
                    button.onClick();
                }
                handleClose(index);
            });
        });
    }

    return {
        close: handleClose,
        element: modal,
        isOpen: () => isOpen
    };
};

export const setDefaultConfig = (config) => {
    Object.assign(defaultConfig, config);
};

export const getDefaultConfig = () => {
    return { ...defaultConfig };
};

export const closeAllModals = () => {
    const modals = document.querySelectorAll('[data-xmodal-id]');
    modals.forEach(modal => {
        cleanupEventListeners(modal);
        modal.remove();
    });
    removeStyleXModal();
};

// Legacy API support (retrocompatibility)
export default {
    xConfirm,
    xPrompt,
    xAlert,
    xCustom,
    setDefaultConfig,
    getDefaultConfig,
    closeAllModals
};
