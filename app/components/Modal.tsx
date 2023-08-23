import React from "react";

interface modalProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  // we can use this too to set Props for useState  (open:boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<modalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {children}
        <div className="modal-action">
          {/* <label onClick={() => setModalOpen(false)} className="btn">
            Close
          </label> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
