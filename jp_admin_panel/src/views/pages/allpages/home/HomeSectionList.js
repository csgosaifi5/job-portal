import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import PagesService from 'src/services/PagesService'
import DeletePopup from 'src/components/popups/DeletePopup'

const HomeSectionList = () => {
  const pagesService = new PagesService()
  const [showDeletePopup, setShowDeletePopup] = useState({ show: false, pId: '' })
  const [pagesList, setPagesList] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const getPagesList = async () => {
    let result = await pagesService.listAll({ screen_name: 'Home' })
    if (result.data) {
      setPagesList((prev) => result.data)
      setContentLoaded(true)
    }
  }
  useEffect(() => {
    getPagesList()
  }, [])

  const deletePage = async () => {
    try {
      if (showDeletePopup.pId) {
        let response = await pagesService.deletePage(showDeletePopup.pId)
        if (response.message) {
          setShowDeletePopup({ show: false, pId: '' })
          getPagesList()
          toast.success(response.message)
        } else {
          toast.error('Page not deleted ')
        }
      }
    } catch (err) {
      throw err
    }
  }
  return (
    <CCard style={{ margin: '0 auto 1.5rem', overflowX: 'hidden' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">Edit Home Sections</p>
        {/* <Link to="/add/banner">
          <CButton color="primary" variant="outline">
            Add Section
          </CButton>
        </Link> */}
      </CCardHeader>
      {!contentLoaded ? (
        <div className="d-flex justify-content-center py-3">
          <CSpinner color="dark" variant="grow" />
        </div>
      ) : (
        <CCardBody style={{ overflowX: 'auto' }}>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Section Name</CTableHeaderCell>
                <CTableHeaderCell scope="col" style={{textAlign:"center"}}>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pagesList.map((el) => {
                return (
                  <CTableRow key={'page' + el._id}>
                    <CTableDataCell>{el.section_name}</CTableDataCell>
                    <CTableDataCell style={{textAlign:"center"}}>
                        <Link
                          to={`/edit/home/${el.section_name.replaceAll(' ', '-').toLowerCase()}/${
                            el._id
                          }`}
                        >
                          <CIcon icon={cilPencil} className="text-info" size="lg" />
                        </Link>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      )}
      <ToastContainer />
      {showDeletePopup.show && (
        <DeletePopup
          onClose={() => setShowDeletePopup({ show: false, pId: '' })}
          onSuccess={deletePage}
        />
      )}
    </CCard>
  )
}

export default HomeSectionList
