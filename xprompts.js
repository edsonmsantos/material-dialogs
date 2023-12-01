      /* Usage sample
      const buttonConfirm = document.querySelector('#confirm');
        const buttonPrompt = document.querySelector('#prompt');
        buttonConfirm.addEventListener('click', () => {
            confirm('Title', 'Message').then(() => {
                console.log('Confirmed')
            }).catch(() => {
                console.log('Canceled')
            })
        });

        buttonPrompt.addEventListener('click', () => {
            xPrompt('Title', 'Message', 'Value').then((value) => {
                console.log('Confirmed', value)
            }).catch(() => {
                console.log('Canceled')
            })
        }); */

        const xConfirm = (title, message = '', textCancel = 'Cancelar', textConfirm = 'Confirmar') => {
            return new Promise((resolve, reject) => {
                const modal = document.createElement('div');
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
                });
                modal.querySelector('.xmodal-button-cancel').addEventListener('click', () => {
                    reject();
                    modal.remove();
                });
            });
        }

        const xPrompt = (title, message = '', placeholder = '', value = '', textCancel = 'Cancelar', textConfirm = 'Confirmar') => {
            return new Promise((resolve, reject) => {
                const modal = document.createElement('div');
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
                modal.querySelector('.xmodal-button-confirm').addEventListener('click', () => {
                    resolve(modal.querySelector('.xmodal-input input').value);
                    modal.remove();    
                });
                modal.querySelector('.xmodal-button-cancel').addEventListener('click', () => {
                    reject();
                    modal.remove();
                })
            })
        }
