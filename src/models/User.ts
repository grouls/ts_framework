// the question marks make a property optional
interface UserProps {
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

  print(): void {
    const { name, age } = this.data;
    console.log(`
      Name: ${name}
      Age: ${age}
    `);
  }
}
