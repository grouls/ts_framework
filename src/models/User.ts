import axios, { AxiosResponse } from 'axios';

const url = 'http://localhost:3000';

// the question marks make a property optional
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// example of type alias
type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach(callback => callback());
  }

  fetch(): void {
    axios.get(`${url}/users/${this.get('id')}`).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    const id = this.get('id');

    if (id) {
      axios.put(`${url}/users/${id}`, this.data);
    } else {
      axios.post(`${url}/users`, this.data);
    }
  }
}
