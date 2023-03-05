import { defineStore } from 'pinia'

class Credential {
    user: string;
    token: string;
    constructor(user: string, token: string) {
        this.user = user;
        this.token = token;
    }
}

const KEY_USER = 'user';
const KEY_TOKEN = 'token';

export const useTokenStore = defineStore('token', () => {
  function save(user: string, token: string) {
    if (user.length <= 0 || token.length <= 0) return;
    localStorage.setItem(KEY_USER, user);
    localStorage.setItem(KEY_TOKEN, token);
  }

  function reset() {
    localStorage.setItem(KEY_USER, '');
    localStorage.setItem(KEY_TOKEN, '')
  }

  function read(): Credential {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user == null || token == null) {
        throw new Error("username or token is null");
    }

    if (user.length == 0 || token.length == 0) {
        throw new Error("Empty username or token");
    }

    return new Credential(user, token);
  }

  return { save, read, reset }
})
