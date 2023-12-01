export const makeModalDefault = (reject, allowCloseClickBackdrop) => {
    const modal = document.createElement('div');
    if (allowCloseClickBackdrop) {
        modal.addEventListener('click', (event) => {
            if (event.target.className === 'xmodal') {
                reject();
                modal.remove();
                removeStyleXModal();
            }
        });
    }    
    return modal;
}

export const xConfirm = ({title, message = '', textCancel = 'Cancelar', textConfirm = 'Confirmar', allowCloseClickBackdrop = true}) => {
    loadStyles();
    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(reject, allowCloseClickBackdrop);
        modal.innerHTML = `
                    <div class="xmodal">
                        <div class="xmodal-content">
                            <div class="xmodal-title">${title}</div>
                            <div class="xmodal-message">${message}</div>
                            <div class="xmodal-buttons">
                                <button class="xmodal-button xmodal-button-cancel">${textCancel}</button>
                                <button class="xmodal-button xmodal-button-confirm">${textConfirm}</button>
                            </div>
                        </div>
                    </div>
                `;
        document.body.appendChild(modal);
        modal.querySelector('.xmodal-button-confirm').addEventListener('click', () => {
            resolve();
            modal.remove();
            removeStyleXModal();
        });
        modal.querySelector('.xmodal-button-cancel').addEventListener('click', () => {
            reject();
            modal.remove();
            removeStyleXModal();
        });
    });
}

export const xPrompt = ({title, message = '', placeholder = '', value = '', textCancel = 'Cancelar', textConfirm = 'Confirmar', allowCloseClickBackdrop = true}) => {
    loadStyles();
    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(reject, allowCloseClickBackdrop);
        modal.innerHTML = `
                    <div class="xmodal">
                        <div class="xmodal-content">
                            <div class="xmodal-title">${title}</div>
                            <div class="xmodal-message">${message}</div>
                            <div class="xmodal-input">
                                <input type="text" value="${value}" placeholder="${placeholder}">
                            </div>
                            <div class="xmodal-buttons">
                                <button class="xmodal-button xmodal-button-cancel">${textCancel}</button>
                                <button class="xmodal-button xmodal-button-confirm">${textConfirm}</button>
                            </div>
                        </div>
                    </div>
                `;
        document.body.appendChild(modal);
        document.querySelector('.xmodal-input input').focus();
        modal.querySelector('.xmodal-button-confirm').addEventListener('click', () => {
            resolve(modal.querySelector('.xmodal-input input').value);
            modal.remove();
            removeStyleXModal();
        });
        modal.querySelector('.xmodal-button-cancel').addEventListener('click', () => {
            reject();
            modal.remove();
            removeStyleXModal();
        });
    });
}


export const xAlert = ({title, message = '', textConfirm = 'Ok', allowCloseClickBackdrop = true}) => {
    loadStyles(true);
    return new Promise((resolve, reject) => {
        const modal = makeModalDefault(reject, allowCloseClickBackdrop);
        
        const textConfirmHtml = (textConfirm !== null && textConfirm !== undefined) ? 
            `<div class="xmodal-buttons"><button class="xmodal-button xmodal-button-confirm">${textConfirm}</button></div>` :
            '';
        modal.innerHTML = `
                    <div class="xmodal">
                        <div class="xmodal-content">
                            <div class="xmodal-title">${title}</div>
                            <div class="xmodal-message">${message}</div>
                            ${textConfirmHtml}
                        </div>
                    </div>
                `;
        document.body.appendChild(modal);
        if (textConfirm !== null && textConfirm !== undefined) {
            modal.querySelector('.xmodal-button-confirm').addEventListener('click', () => {
                resolve();
                modal.remove();
                removeStyleXModal();
            });
        }     
    });
}

const loadStyles = (isAlert = false) => {
    const styleNotAlert = !isAlert ? 'padding-left: 24px;' : '';
    const styleContent = `.xmodal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .xmodal-content {
        background-color: rgb(255, 255, 255);
        color: rgba(0, 0, 0, 0.87);
        transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
        margin: 32px;
        position: relative;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        max-height: calc(100% - 64px);
        max-width: 600px;
        min-width: 320px;
    }
    
    .xmodal-title {
        margin: 0px;
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 1.25rem;
        line-height: 1.6;
        letter-spacing: 0.0075em;
        padding: 16px 24px;
        flex: 0 0 auto;
    }
    
    .xmodal-message {
        font-size: 18px;
        margin-bottom: 20px;
        margin: 0px;
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        color: rgba(0, 0, 0, 0.6);
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 10px;
    }
    
    .xmodal-buttons {
        display: flex;
        justify-content: flex-end;
        padding-bottom: 8px;
        padding-right: 8px;
        padding-top: 15px;
    }
    
    .xmodal-button {
        display: -webkit-inline-box;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        position: relative;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        background-color: transparent;
        outline: 0;
        border: 0;
        margin: 0;
        border-radius: 0;
        padding: 0;
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
        color: inherit;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 500;
        font-size: 0.875rem;
        line-height: 1.75;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        min-width: 64px;
        padding: 6px 8px;
        border-radius: 4px;
        -webkit-transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        color: #1976d2;
    }
    
    .xmodal-button:hover {
        -webkit-text-decoration: none;
        text-decoration: none;
        background-color: rgba(25, 118, 210, 0.04);
    }
    
    .xmodal-input input {
        font: inherit;
        letter-spacing: inherit;
        color: currentcolor;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        box-sizing: content-box;
        background: none;
        height: 1.4375em;
        margin: 0px;
        -webkit-tap-highlight-color: transparent;
        display: block;
        min-width: 0px;
        width: 100%;
        animation-name: mui-auto-fill-cancel;
        animation-duration: 10ms;
        padding: 16.5px 14px;
    }
    
    .xmodal-input {
        font-family: Roboto, Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.4375em;
        letter-spacing: 0.00938em;
        color: rgba(0, 0, 0, 0.87);
        box-sizing: border-box;
        cursor: text;
        -webkit-box-align: center;
        align-items: center;
        position: relative;
        border-radius: 4px;
        ${styleNotAlert}
        padding-right: 24px;
        width: 100%;
        display: inherit;
    }`;
    const containsStyleXModal = document.getElementById('xmodal-style');
    if (!containsStyleXModal) {
        const tempStyle = document.createElement('style');
        tempStyle.innerHTML = styleContent;
        tempStyle.setAttribute('type', 'text/css');
        tempStyle.id = 'xmodal-style';
        document.head.appendChild(tempStyle);
    }
}

const removeStyleXModal = () => {
    const containsStyleXModal = document.getElementById('xmodal-style');
    if (containsStyleXModal) {
        document.head.removeChild(containsStyleXModal);
    }
}
