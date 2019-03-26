import Subscriber from '../subscriber';

describe('Subscriber', () => {
  test('triggers a callback after initialisation', () => {
    document.body.innerHTML =
    `
      <input type="text" name="textName" value="" />
    `
    const subscriber = new Subscriber();
    const callback = jest.fn()
    subscriber.subscribe(callback);

    expect(callback).toBeCalledWith({
      textName: ""
    });
  });
})
