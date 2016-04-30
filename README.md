# Bobun UI [![Build Status](https://travis-ci.org/neoziro/bobun-ui.png?branch=master)](https://travis-ci.org/neoziro/bobun-ui)

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

Set of UI components based on [Bobun](https://github.com/neoziro/bobun).

## Components

### Button

```js
var button = new Bobun.UI.Button({
   label: 'My Button'
});
button.set('disabled', true);
```

### IconButton

```js
var iconButton = new Bobun.UI.IconButton({
  label: 'My Icon Button',
  defaultIconClassName: 'icon-list'
});
iconButton.set('processing', true);
```

### Input

```js
var input = new Bobun.UI.Input();
input.on('keyup', function (e) {
  // keyup
});
```

### Label

```js
var label = new Bobun.UI.Label({
  label: 'My text'
});
```

### Select

```js
var select = new Bobun.UI.Select({
   choices: {
     1: 'Yes'
     0: 'No'
   }
});
select.on('change', function (e) {
  // change
});
```

### Modal

```js
var modal = new Bobun.UI.Modal({
   title: 'My title',
   buttons: [...]
});
modal.modal('show');
```

### Dropdown

```js
var dropdown = new Bobun.UI.Dropdown({
  label: 'My dropdown',
  choices: [
     {
        label: 'My choice',
        link: '#'
     }
  ]
});
```

## License

MIT
