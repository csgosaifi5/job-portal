import {
  CButton,
  CCol,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import UserService from 'src/services/UserService'

const userServ = new UserService()
const ViewAFDetailModal = ({ onClose, afData, onAddUser }) => {
  const [emailExist, setEmailExist] = useState(false)
  const verifyEmail = async () => {
    let result
    try {
      result = await userServ.verifyEmail(afData.email_id)
      if (result.message == 'Available') {
        setEmailExist(true)
      } else {
        setEmailExist(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    verifyEmail()
  }, [])

  return (
    <>
      <CModal
        alignment="center"
        size="lg"
        visible={true}
        onClose={onClose}
        aria-labelledby="TooltipsAndPopoverExample"
      >
        <CModalHeader>
          <CModalTitle id="TooltipsAndPopoverExample">New Apply Form Request</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Applied For -</h6>
                <p className="m-0">{afData.job_name}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Full Name -</h6>
                <p className="m-0">
                  {afData.first_name} {afData.last_name}
                </p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Phone Number -</h6>
                <p className="m-0">{afData.phone_number}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Email Id -</h6>
                <p className="m-0">{afData.email_id}</p>
              </div>
            </CCol>
            <CCol>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Date of birth -</h6>
                <p className="m-0">
                  {afData.dob_day}/{afData.dob_month}/{afData.dob_year}
                </p>
              </div>

              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Gender -</h6>
                <p className="m-0">{afData.gender.toUpperCase()}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Know English -</h6>
                <p className="m-0">{afData.know_english ? 'Yes' : 'No'}</p>
              </div>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <div className="d-flex gap-1 mb-2 flex-column">
              <h6 className="m-0">Reason for Wanting Job -</h6>
              <p className="m-0">{afData.reason_for_job}</p>
            </div>
          </CRow>
          <CRow>
            <div className="d-flex gap-1 mb-2 flex-column">
              <h6 className="m-0">Bio -</h6>
              <p className="m-0">{afData.bio}</p>
            </div>
          </CRow>
          <hr />
          <h5 className="underline">Images :-</h5>
          <CRow>
            <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-12' : 'col-6')}>
              <h6 className="mb-2">Head and Shoulders Photo</h6>
              <a href={afData.body_pic_one} target="_blank" rel="noreferrer">
                <CImage rounded thumbnail src={afData.body_pic_one} />
              </a>
            </CCol>
            <CCol>
              <h6 className="mb-2">Full Body Shot wearing clothes(Casual)</h6>
              <a href={afData.body_pic_two} target="_blank" rel="noreferrer">
                <CImage rounded thumbnail src={afData.body_pic_two} />
              </a>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            onClick={() => {
              onAddUser(afData)
              onClose()
            }}
            disabled={emailExist ? true : false}
          >
            {emailExist ? 'Already User' : 'Add User'}
          </CButton>
          <CButton color="secondary" onClick={onClose}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ViewAFDetailModal
