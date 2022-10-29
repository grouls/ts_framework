import { User } from './models/User';

const user = new User({});

user.on('change', () => {
  console.log('change 1 was triggered');
});
user.on('change', () => {
  console.log('change 2 was triggered');
});
user.on('save', () => {
  console.log('save was triggered');
});

user.trigger('change');
user.trigger('save');

console.log(user);
user.set({ name: 'Gary', age: 30 });
user.print();
user.set({ name: 'Gary', age: 29 });
user.print();
user.set({ name: 'Gary Roulstone', age: 29 });
user.print();
