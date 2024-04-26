import React from "react";

function Modal({ show, title, handleClose, handleConfirm }) {
  return (
    <>
      {show && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.5" }}
          id="myModal"
          role="dialog"
          data-testid="modal"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-end">
                <button
                  onClick={() => handleClose(false)}
                  type="button"
                  className="close btn btn-secondary"
                  data-dismiss="modal"
                  data-testid="closeButton"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <h5>{title}</h5>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => handleClose(false)}
                  className="btn btn-success"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
