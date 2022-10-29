import { User } from './models/User';

const user = new User({});

user.set({ name: 'Gary', age: 30 });
user.print();
user.set({ name: 'Gary', age: 29 });
user.print();
user.set({ name: 'Gary Roulstone', age: 29 });
user.print();
