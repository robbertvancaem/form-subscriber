import Subscriber from '../subscriber';

describe('Subscriber', () => {
  document.body.innerHTML =
  `
    <input type="text" name="textName" value="" />
    <input type="text" name="textName" data-subscriber-key="customKey" value="defaultValue" />
    <input type="radio" name="radioName" value="yes" checked />
    <input type="radio" name="radioName" value="no"/>
    <input type="radio" name="anotherRadioName" value="" />
    <input type="checkbox" name="checkboxName" />
    <select name="selectName">
      <option value="first">First</option>
      <option value="second" selected>Second</option>
    </select>
  `
  const subscriber = new Subscriber();

  test('throws when trying to subscribe with an invalid function', () => {
    expect(() => {
      const noneFunction = 'string';
      subscriber.subscribe(noneFunction);
    }).toThrowError('Callback should be a function')
  });

  test('subscribes a function correctly', () => {
    const callback = jest.fn()
    subscriber.subscribe(callback);

    expect(callback).toBeCalledWith({
      textName: "",
      customKey: "defaultValue",
      radioName: "yes",
      anotherRadioName: undefined,
      checkboxName: false,
      selectName: "Second"
    });

    // Simulate an onChange event
    const event = new Event('change');
    const textInput = document.querySelector('[name="textName"]');
    textInput.value = 'newValue';
    textInput.dispatchEvent(event);

    expect(callback).toBeCalledWith({
      textName: 'newValue',
      customKey: 'defaultValue',
      radioName: 'yes',
      anotherRadioName: undefined,
      checkboxName: false,
      selectName: "Second"
    })
  });

})
