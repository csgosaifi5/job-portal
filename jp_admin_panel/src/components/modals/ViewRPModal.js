import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import moment from 'moment'
import React from 'react'

const ViewRPModal = ({ onClose, pkgData }) => {
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
          <CModalTitle id="TooltipsAndPopoverExample">New Package Request</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol className={window.innerWidth < 576 ? 'col-12' : 'col-6'}>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Full Name -</h6>
                <p className="m-0">
                  {pkgData.first_name} {pkgData.last_name}
                </p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Package Name -</h6>
                <p className="m-0">{pkgData.package_name}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Package Amount -</h6>
                <p className="m-0">$ {pkgData.package_amount}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Email Id -</h6>
                <p className="m-0">{pkgData.email_id}</p>
              </div>
            </CCol>
            <CCol>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Arrival Date -</h6>
                <p className="m-0">{moment(pkgData.arrival_date).format('DD-MM-YYYY')}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Arrival Time -</h6>
                <p className="m-0">{pkgData.arrival_time}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Phone Country -</h6>
                <p className="m-0">{pkgData.phone_country}</p>
              </div>
              <div className="d-flex align-items-center gap-1 mb-2">
                <h6 className="m-0">Phone Area Code -</h6>
                <p className="m-0">{pkgData.phone_area_code}</p>
              </div>
            </CCol>
          </CRow>
          <hr />
          <CRow>
            <div className="d-flex flex-column gap-1 mb-2">
              <h6 className="m-0">Special Requests -</h6>
              <p className="m-0">
                {pkgData.special_request ? pkgData.special_request : '(No Special Request)'}
              </p>
            </div>
          </CRow>
          <hr />
          <h5 className="underline">User details :-</h5>
          <CRow>
            <div className="d-flex gap-1 mb-2 align-items-center">
              <h6 className="m-0">Address -</h6>

              <p className="mb-0">{pkgData.address_line_1}</p>
              <p className="mb-0">{pkgData.address_line_2}</p>
            </div>
          </CRow>
          <CRow>
            <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-6' : 'col-4')}>
              <div className="d-flex gap-1 mb-2 align-items-center">
                <h6 className="m-0">State -</h6>

                <p className="mb-0">{pkgData.state}</p>
              </div>
            </CCol>
            <CCol className={'mb-2 ' + (window.innerWidth < 576 ? 'col-6' : 'col-4')}>
              <div className="d-flex gap-1 mb-2 align-items-center">
                <h6 className="m-0">City -</h6>

                <p className="mb-0">{pkgData.city}</p>
              </div>
            </CCol>
            <CCol>
              <div className="d-flex gap-1 mb-2 align-items-center">
                <h6 className="m-0">Zip -</h6>

                <p className="mb-0">{pkgData.zip}</p>
              </div>
            </CCol>
          </CRow>
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

export default ViewRPModal
