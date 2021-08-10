/** 发布订阅 */
import mitt from "mitt";

const emitter = mitt();

export default {
  on(event, func) {
    emitter.on(event, func);
    return () => {
      emitter.off(event, func);
    };
  },
  off(event, func) {
    emitter.off(event, func);
  },
  emit(event, ...args) {
    emitter.emit(event, ...args);
  }
};
