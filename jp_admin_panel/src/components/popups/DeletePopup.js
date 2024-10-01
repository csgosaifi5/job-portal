import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const DeletePopup = ({ onClose, onSuccess }) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={true}
        onClose={onClose}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>You have selected to delete this record </p>
          <p>
            This was the action that you wanted to do, please confirm your choice, or cancel and
            return to the page
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
          <CButton color="danger" onClick={onSuccess}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DeletePopup
