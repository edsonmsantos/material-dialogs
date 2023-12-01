# Material Dialogs

Biblioteca Javascript para dialogs estilizados com Material Design sem dependências.

## Instalação
Instale com npm ou yarn
````shell
npm i material-dialogs --save
````
````shell
yarn add material-dialogs
````

Importe em seu projeto

**ES6**
````shell
import {xAlert, xConfirm, xPrompt} from 'material-dialogs.js';
````

Caso esteja trabalhando com página HTML padrão sem biblioteca, você pode utilizar o seguinte:
````html
<script type="module">
    import {xAlert} from "/node_modules/material-dialogs/material-dialogs.js";

    const button = document.querySelector('button');
    button.addEventListener('click', () => {
        xAlert({title: 'Alert', message: 'Are you sure?'});
    })
    //...
</script>
````

## Modo de uso

Todas as funções retornam uma promise, ou seja, você pode executar uma ação condicionalmente a ação do usuário, veja os exemplos abaixo:

### Alerta

Sem ação
````javascript
xAlert({title: 'Alert', message: 'Are you sure?'});
````

Com ação ao clicar no botão
````javascript
xAlert({title: 'Alert', message: 'Are you sure?', textConfirm: 'Yes', textCancel: 'No'}).then(() => {
    console.log('alert');
}).catch(() => {
    console.log('cancel');
});
````

### Confirmação

````javascript
xConfirm({title: 'Confirm', message: 'Are you sure?', textConfirm: 'Yes', textCancel: 'No'}).then(() => {
    console.log('confirm');
}).catch(() => {
    console.log('cancel');
});
````

### Prompt

````javascript
xPrompt({title: 'Prompt', message: 'Enter your name', textConfirm: 'Save', textCancel: 'Cancel', value: 'Mark'}).then((value) => {
    console.log(value);
}).catch(() => {
    console.log('cancel');
});
````

### Personalizado
````javascript
const formDemo = `<form>
                    <div class="xmodal-input">
                        <label for="name">Name</label><br>
                        <input type="text" class="xmodal-input" name="name"><br>
                    </div> 
                    <div class="xmodal-input">
                        <label for="email">Email</label><br>
                        <input type="email" class="xmodal-input" name="email"><br>
                    </div>
                    <div class="xmodal-buttons">
                        <button type="submit" class="xmodal-button">Submit</button>
                    </div>
                </form>`;
           xAlert({title: 'Personalized', message: formDemo, textConfirm: null}).then(() => {
               console.log('alert');
           }).catch(() => {
               console.log('cancel');
           });
        });
````

Para mais detalhes, consulte o arquivo de exemplo `demo\index.html`