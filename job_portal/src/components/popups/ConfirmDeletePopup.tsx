import React from "react";

const ConfirmDeletePopup = ({ onClose, onConfirm, extraData }: any) => {
  return (
    <>
      <div
        className="modal show"
        style={{ display: "block" }}
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-white">
              <div className="d-flex">
                <img alt="image" src="/images/Vector_modalError2.svg" className="img-fluid" />
                <h5 className="modal-title ms-2" style={{color:"red"}}>Alert!</h5>
              </div>

              <button type="button" className="close" data-dismiss="modal" onClick={() => onClose()}>
                ×
              </button>
            </div>
            <div className="modal-body para_content">
              <p>Are you sure to delete the {extraData} ?</p>
            </div>
            <div className="modal-footer bg_footer">
              <button type="button" className="btn cncle_btn" data-dismiss="modal" onClick={() => onClose()}>
                CANCEL
              </button>
              <button
                type="button"
                className="btn btn-danger border-0"
                data-dismiss="modal"
                onClick={() => onConfirm()}
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeletePopup;
