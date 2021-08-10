import emitter from "@/utils/mitt";

export default function dialog(component, props = {}) {
  return create(component, props);
}

function create(component, props) {
  if (!component) throw new Error("dialogPage not fount");
  return new Promise((resolve, reject) => {
    const ref = `component-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    let destroyFunc = () => {};
    let vimRef;
    let data;
    props.onClose = () => {
      resolve(data);
    };
    props.onClosed = () => {
      destroyFunc();
    };
    props.onResolve = (result) => {
      data = result;
      vimRef.dialogVisible = false;
    };
    props.onReject = (result) => {
      data = result;
      vimRef.dialogVisible = false;
    };
    emitter.emit("push-component", {
      component,
      props,
      ref: ref
    });
    const vimEvent = ({ vim, destroy }) => {
      console.info(vim, destroy);
      vimRef = vim;
      destroyFunc = destroy;
      vim.dialogVisible = true;
    };
    emitter.on(ref, vimEvent);
  });
}
