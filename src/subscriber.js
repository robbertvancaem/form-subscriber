/*
  Simple class that provides a subscribing mechanism to all inputs in a scope.
 */
class Subscriber {
  constructor(scope = document) {
    this.scope = scope;
    this.onChange = this.onChange.bind(this);
    this.getValues = this.getValues.bind(this);
    this.getValueByType = this.getValueByType.bind(this);

    this.inputs = Array.from(this.scope.querySelectorAll('input, select'));

    this.inputs.forEach(input => {
      input.addEventListener('change', this.onChange);
    });

    this.callbacks = [];
    this.values = this.getValues();
  }

  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw 'Callback should be a function'
    }

    this.callbacks.push(callback);
    callback(this.values);

  }

  onChange(){
    this.values = this.getValues();
    this.callbacks.forEach(fn => fn(this.values));
  }

  getValues(){
    return this.inputs.reduce((agg, cur) => {
      const key = cur.getAttribute('data-subscriber-key') || cur.name;
      const obj = {
        [key]: this.getValueByType(cur)
      }
      return {
        ...agg,
        ...obj
      }
    }, {});
  }

  getValueByType(field){
    switch(field.type) {
      case 'radio':
        const formEl = this.scope.querySelector(`[name="${field.name}"]:checked`);
        if (!formEl) {
          return undefined;
        }
        return formEl.value
      case 'checkbox':
        return field.checked;
      case 'select-one':
        return Array.from(field.options).find(o => o.selected).textContent;
      default:
        return field.value.trim();
    }
  }
}

export default Subscriber;
