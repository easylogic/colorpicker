import EventMachine from '~/util/EventMachine';

const CHECK_STORE_EVENT_PATTERN = /^@/;

class UIElement extends EventMachine {

  constructor(opt) {
    super(opt);
    this.opt = (opt && opt.opt) ? opt.opt : (opt || {});
    if (opt && opt.$store) this.$store = opt.$store;
    this.initialize();
    this.initializeStoreEvent();
  }

  /**
   * initialize store event
   *
   * you can define '@xxx' method(event) in UIElement
   */
  initializeStoreEvent() {
    this.storeEvents = {};
    this.filterProps(CHECK_STORE_EVENT_PATTERN).forEach((key) => {
      const arr = key.split('@');
      arr.shift();
      const event = arr.join('@');
      this.storeEvents[event] = this[key].bind(this);
      this.$store.on(event, this.storeEvents[event]);
    });
  }

}

export default UIElement;
