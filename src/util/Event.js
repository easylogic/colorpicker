export default {
  addEvent (dom, eventName, callback, options) {
    if (!dom) return;
    dom.addEventListener(eventName, callback, options);
  },
  removeEvent(dom, eventName, callback) {
    if (!dom) return;
    dom.removeEventListener(eventName, callback);
  },
  pos(e) {
    if (e.touches && e.touches[0]) return e.touches[0];
    return e;
  },
  posXY(e) {
    const pos = this.pos(e);
    return { x: pos.pageX, y: pos.pageY };
  },
}
