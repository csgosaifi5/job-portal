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
import { cilInfo, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeletePopup from 'src/components/popups/DeletePopup'
import { Pagination } from 'react-bootstrap'
import ContactFormService from 'src/services/ContactFormService'
import ViewCFMsgModal from 'src/components/modals/ViewCFMsgModal'

const ContactFormList = () => {
  const contactFormServ = new ContactFormService()
  const [showDeletePopup, setShowDeletePopup] = useState({ show: false, pId: '' })
  const [viewFormMsgPopup, setViewFormMsgPopup] = useState({ show: false, msgData: '' })
  const [totalCount, setTotalCount] = useState(0)
  const [contactFormMsgList, setContactFormMsgList] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    sortBy: { createdAt: 'desc' },
  })

  const getContactFormMsgList = async () => {
    let result = await contactFormServ.listAll(search)
    if (result.rows) {
      setContactFormMsgList((prev) => result.rows)
      setTotalCount(result.count)
      setContentLoaded(true)
    }
  }
  useEffect(() => {
    getContactFormMsgList()
  }, [search])

  const deleteRec = async () => {
    try {
      if (showDeletePopup.pId) {
        let response = await contactFormServ.delete(showDeletePopup.pId)
        if (response.message) {
          setShowDeletePopup({ show: false, pId: '' })
          getContactFormMsgList()
          toast.success(response.message)
        } else {
          toast.error('Record not deleted ')
        }
      }
    } catch (err) {
      throw err
    }
  }

  const handlePaging = (e) => {
    let currPage = e.target.text
    if (e.target.text === 'First') {
      currPage = 1
    } else if (e.target.text === 'Last') {
      currPage = Math.ceil(totalCount / search.perPage)
    }
    let tempSearch = { ...search }
    tempSearch.start = parseInt(currPage) * search.perPage - search.perPage
    setSearch(tempSearch)
  }

  let active = Math.ceil((search.start + 1) / search.perPage)
  let pages = Math.ceil(totalCount / search.perPage)

  let items = []
  let start = active - 8 > 1 ? active - 8 : 1
  let end = pages < start + 14 ? pages : start + 14
  items.push(
    <Pagination.Item key="first" onClick={handlePaging} disabled={active == 1 ? true : false}>
      First
    </Pagination.Item>,
  )
  for (let number = start; number <= end; number++) {
    items.push(
      <Pagination.Item key={number} onClick={handlePaging} active={number === active}>
        {number}
      </Pagination.Item>,
    )
  }
  items.push(
    <Pagination.Item key="last" onClick={handlePaging} disabled={active == pages ? true : false}>
      Last
    </Pagination.Item>,
  )
  return (
    <CCard style={{ margin: '0 auto 1.5rem', overflowX: 'hidden' }}>
      <CCardHeader className="d-flex flex-row justify-content-between">
        <p className="fw-bolder fs-4 m-0">Contact Form Messages</p>
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
                <CTableHeaderCell className="col-3">Name</CTableHeaderCell>
                <CTableHeaderCell className="col-4">Email Id</CTableHeaderCell>
                {/* <CTableHeaderCell className="col-3">Phone Number</CTableHeaderCell> */}
                <CTableHeaderCell className="col-2">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {contactFormMsgList.map((el) => {
                return (
                  <CTableRow key={'page' + el._id}>
                    <CTableDataCell>{el.first_name + ' ' + el.last_name}</CTableDataCell>
                    <CTableDataCell>{el.email}</CTableDataCell>
                    {/* <CTableDataCell>{el.phone_number}</CTableDataCell> */}
                    <CTableDataCell>
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <CIcon
                          icon={cilInfo}
                          onClick={() => {
                            setViewFormMsgPopup({ show: true, msgData: el })
                          }}
                          className="text-success cursorPointer"
                        />
                        <CIcon
                          icon={cilTrash}
                          onClick={() => {
                            setShowDeletePopup({ show: true, pId: el.id })
                          }}
                          className="text-danger cursorPointer"
                        />
                      </div>
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
          onSuccess={deleteRec}
        />
      )}
      {viewFormMsgPopup.show && (
        <ViewCFMsgModal
          onClose={() => setViewFormMsgPopup({ show: false, msgData: '' })}
          msgData={viewFormMsgPopup.msgData}
        />
      )}
      <div className="paginationCustom container p-2">
        <Pagination size="sm">{items}</Pagination>
      </div>
    </CCard>
  )
}

export default ContactFormList
