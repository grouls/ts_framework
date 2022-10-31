import axios, { AxiosResponse } from 'axios';

import { Eventing }             from './Eventing';

const url = 'http://localhost:3000';

// the question marks make a property optional
interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(propName: string): string | number {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
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
