export class LocalStorage {
  #storageKey = '';

  constructor(key) {
    this.#storageKey = key;
    this.state = this.getState();
    this.observers = new Set();
  }

  getState() {
    const StorageItems = localStorage.getItem(this.#storageKey);
    return StorageItems;
  }

  convertState(newState) {
    const state = this.state ? this.state.concat(',', newState) : newState;
    return state;
  }

  setState(newState) {
    this.state = this.convertState(newState);
    localStorage.setItem(this.#storageKey, this.state);
  }

  removeState() {
    this.state = null;
    localStorage.removeItem(this.#storageKey);
  }

  addObserver(observer) {
    this.observers.add(observer);
  }

  observe(newState) {
    newState ? this.setState(newState) : this.removeState();
    this.observers.forEach(observer => {
      observer.notify(this.state);
    });
  }
}
