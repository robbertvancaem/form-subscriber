import Subscriber from './src/subscriber.js';
const scope = document.querySelector('.container');

const subscriber = new Subscriber(scope);
subscriber.subscribe(values => {
  console.log({values});
})
