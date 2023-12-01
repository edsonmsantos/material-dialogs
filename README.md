# Material Dialogs

Javascript library for styled dialogs with Material Design without dependencies.

## Install
Install with npm or yarn
````shell
npm i material-dialogs --save
````
````shell
yarn add material-dialogs
````

Import into your project

**ES6**
````shell
import {xAlert, xConfirm, xPrompt} from 'material-dialogs.js';
````

If you are working with a standard HTML page without a library, you can use the following:
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

## How to use

All functions return a promise, that is, you can perform an action conditionally on the user's action,
See the examples below:

### Alert

No action
````javascript
xAlert({title: 'Alert', message: 'Are you sure?'});
````

With action when clicking the button
````javascript
xAlert({title: 'Alert', message: 'Are you sure?', textConfirm: 'Yes', textCancel: 'No'}).then(() => {
    console.log('alert');
}).catch(() => {
    console.log('cancel');
});
````

### Confirm

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

### Custom
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

For more details, see the example file `demo\index.html`