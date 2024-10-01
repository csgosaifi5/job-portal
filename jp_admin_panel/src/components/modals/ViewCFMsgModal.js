import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const ViewCFMsgModal = ({ onClose, msgData }) => {
  return (
    <>
      <CModal
        alignment="center"
        visible={true}
        onClose={onClose}
        aria-labelledby="TooltipsAndPopoverExample"
      >
        <CModalHeader>
          <CModalTitle id="TooltipsAndPopoverExample">New Message</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex align-items-center gap-1 mb-2">
            <h6 className="m-0">Name -</h6>
            <p className="m-0">{msgData.first_name + ' ' + msgData.last_name}</p>
          </div>
          <div className="d-flex align-items-center gap-1 mb-2">
            <h6 className="m-0">Phone Number -</h6>
            <p className="m-0">{msgData.phone_number}</p>
          </div>
          <div className="d-flex align-items-center gap-1 mb-2">
            <h6 className="m-0">Email Id -</h6>
            <p className="m-0">{msgData.email_id}</p>
          </div>
          <hr />
          <h5>Message</h5>
          <p>{msgData.message}</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ViewCFMsgModal
