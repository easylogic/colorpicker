export default class BaseStore {

  constructor (opt) {
    this.callbacks = [];
    this.actions = [];
    this.modules = opt.modules || [];
    this.initialize();
  }

  initialize() {
    this.initializeModule();
  }

  initializeModule () {
    this.modules.forEach(Module => {
      const instance = new Module(this);
    })
  }

  action (action, context) {
    this.actions[action] = { context, callback: context[action] };
  }

  dispatch(action) {
    const args = [...arguments];
    action = args.shift();
    const m = this.actions[action];
    if (m) {
      return m.callback.apply(m.context, [this, ...args]);
    }
  }

  module(ModuleObject) {
    // this.action()
  }

  on(event, callback) {
    this.callbacks.push({ event, callback })
  }

  off(event, callback) {
    switch (arguments.length) {
      case 0:
        this.callbacks = [];
        break;
      case 1:
        this.callbacks = this.callbacks.filter(f => {
          return f.event !== event;
        });
        break;
      case 2:
        this.callbacks = this.callbacks.filter(f => {
          return f.event !== event && f.callback !== callback;
        });
        break;
    }
  }

  emit() {
    const args = [...arguments];
    const event = args.shift();
    this.callbacks
      .filter(f => {
        return (f.event === event);
      })
      .forEach(f => {
        if (f && typeof f.callback == 'function') f.callback(...args);
      });
  }

}
