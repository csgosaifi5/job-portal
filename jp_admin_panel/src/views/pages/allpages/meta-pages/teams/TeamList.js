import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
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

const TeamList = () => {
  const pagesService = new PagesService()
  const [pagesList, setPagesList] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const getPagesList = async () => {
    let result = await pagesService.listAll({ screen_name: 'Team' })
    if (result.data) {
      setPagesList((prev) => result.data)
      setContentLoaded(true)
    }
  }
  useEffect(() => {
    getPagesList()
  }, [])


  return (
    <CCard style={{ margin: '0 auto 1.5rem', overflowX: 'hidden' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">Edit Team Sections</p>
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
                <CTableHeaderCell style={{textAlign:"center"}} scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {pagesList.map((el) => {
                return (
                  <CTableRow key={'page' + el._id}>
                    <CTableDataCell>{el.section_name}</CTableDataCell>
                    <CTableDataCell style={{textAlign:"center"}}>
                       
                        <Link
                          to={`/edit/team/${el.section_name
                            .replaceAll(' ', '-')
                            .toLowerCase()}/${el._id}`}
                        >
                          <CIcon icon={cilPencil} className="text-info" size="lg"/>
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

    </CCard>
  )
}


export default TeamList