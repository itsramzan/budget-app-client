import React, { useEffect, useRef } from "react";

const Modal = ({ id, element, children, status, setStatus }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (status) {
      ref.current.checked = false;
      setStatus(false);
    }
  }, [status]);

  return (
    <>
      {element && (
        <label htmlFor={id} className="inline-block cursor-pointer">
          {element}
        </label>
      )}
      <input ref={ref} type="checkbox" id={id} className="modal-toggle" />
      <div className="modal cursor-pointer">
        <div className="modal-box relative w-12/12 md:w-5/12 max-w-5xl">
          {children}
        </div>
        <label htmlFor={id} className="modal-backdrop">
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
