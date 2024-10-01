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
  CFormSwitch
} from '@coreui/react'
import { cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import PagesService from 'src/services/PagesService'

const CasesList = () => {
  const pagesService = new PagesService()
  const [pagesList, setPagesList] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const getPagesList = async () => {
    let result = await pagesService.listAll({ screen_name: 'FAQ' })
    if (result.data) {
      setPagesList((prev) => result.data)
      setContentLoaded(true)
    }
  }
  useEffect(() => {
    getPagesList()
  }, [])

  const activeButton = (data) => {
    return (
      <CFormSwitch
        label={
          data?.is_publish ? (
            <p className="fw-bolder ms-1 fs-5 m-0">Show</p>
          ) : (
            <p className="fw-bolder ms-1 fs-5 m-0">Hide</p>
          )
        }
        id="formSwitchCheckChecked"
        className="m-0"
        checked={data?.is_publish}
        onChange={() => activeToggleHandler(data)}
      />
    )
  }

  const activeToggleHandler = async (value) => {
    try {
      let isActive = value.is_publish
      const formData = new FormData()

      formData.append('_id', pagesList.find((el) => el.section_name === 'Is_Publish')?._id)

      let screen_content = {
        is_publish: !isActive,
      }
      formData.append('screen_content', JSON.stringify(screen_content))

      let response = await pagesService.editPage(formData)
      if (response.error) {
        toast.error(response.error)
      } else if (response.data) {
        toast.success(response.message)
        getPagesList()
      }
    } catch (err) {
      toast.error('something went wrong!')
      throw err
    }
  }
  return (
    <CCard style={{ margin: '0 auto 1.5rem', overflowX: 'hidden' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">Edit FAQ Sections</p>
        <CTableDataCell>
          {activeButton(pagesList.find((el) => el.section_name === 'Is_Publish')?.screen_content)}
        </CTableDataCell>
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
              {pagesList.filter(item => item.section_name !== 'Is_Publish').map((el) => {
                return (
                  <CTableRow key={'page' + el._id}>
                    <CTableDataCell>{el.section_name}</CTableDataCell>
                    <CTableDataCell style={{textAlign:"center"}}>
                       
                        <Link
                          to={`/edit/faq/${el.section_name
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


export default CasesList