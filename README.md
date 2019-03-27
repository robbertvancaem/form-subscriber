| Type     | Status     |
| :------------- | :------------- |
| Build - CircleCI     | ![Build status](https://img.shields.io/circleci/project/github/robbertvancaem/form-subscriber/master.svg)       |


# form-subscriber

A simple class to subscribe to changes of (form) values.

## Example
Let's say you have a div (or form) containing a bunch of input elements, like so:

```html
<div class='container'>
  <input type='text' name='textValue' value='Robbert' />
  <input type='checkbox' name='checkboxValue' checked />
  <input type='radio' name='radioValue' value='yes' checked />
  <input type='radio' name='radioValue' value='no' />
  <select name='selectValue'>
    <option value='1'>First value</option>
    <option value='2' selected>Second value</option>
  </selected>
</div>
```

You can then subscribe to changes by doing:
```javascript
import Subscriber from './subscriber';

// Optional scope parameter, default is `document`
const scope = document.querySelector('.container');

const subscriber = new Subscriber(scope);
subscriber.subscribe(values => console.log(values));
```

This will `console.log` an object that looks like so:
```javascript
{
  textValue: 'Robbert',
  checkboxValue: true,
  radioValue: true,
  selectValue: 'Second value'
}
```

You can also define a custom key per element by passing it a `subscriber-key` data-attribute.
```html
...
  <input type='checkbox' name='checkboxValue' data-subscriber-key='customKey' checked />
...
```

Now your object will look like so:
```javascript
{
  textValue: 'Robbert',
  customKey: true,
  radioValue: true,
  selectValue: 'Second value'
}
```
