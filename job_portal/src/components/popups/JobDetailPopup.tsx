import React from "react";

const JobDetailPopup = ({ onClose, jobData, employerData }: any) => {
  let tags = JSON.parse(jobData.tags);
  let labels = tags.map((tag: { label: string }) => tag.label).join(", ");
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
              <div>
                {/* <img alt="image" src={jobData.image} className="img-fluid" style={{ height: "50px" }} /> */}
                <h5 className="modal-title ms-2" style={{ color: "#6f6f6f", alignSelf: "center" }}>
                  {employerData.company_name}
                </h5>
              </div>

              <button type="button" className="close" data-dismiss="modal" onClick={() => onClose()}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="d-flex">
                <strong className="me-3 fw-bold">Job Title :</strong>
                <p> {jobData.title} – {labels} </p>
              </div>
              <div className="d-flex">
                <strong className="me-3 fw-bold">Experience :</strong>
                <p>{jobData.experience} Year</p>
              </div>
              <div className="d-flex">
                <strong className="me-3 fw-bold">Deseription:</strong>
                <p>{jobData.description}</p>
              </div>
            </div>
            <div className="modal-footer bg_footer">
              <button type="button" className="btn cncle_btn" data-dismiss="modal" onClick={() => onClose()}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPopup;
