import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSwitch,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilInfo, cilPencil, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeletePopup from 'src/components/popups/DeletePopup'
import { Pagination } from 'react-bootstrap'
import ViewAFDetailModal from 'src/components/modals/ViewAFDetailModal'
import UserService from 'src/services/UserService'
import { useNavigate } from 'react-router-dom'

const userServ = new UserService()
const MembersList = () => {
  const navigate = useNavigate()
  const [showDeletePopup, setShowDeletePopup] = useState({ show: false, afId: '' })
  const [totalCount, setTotalCount] = useState(0)
  const [membersList, setMembersList] = useState([])
  const [contentLoaded, setContentLoaded] = useState(false)
  const [search, setSearch] = useState({
    start: 0,
    perPage: 10,
    sortBy: { createdAt: 'desc' },
    filter: { searchText: '', role: '3' },
  })

  const getMembersList = async () => {
    let result = await userServ.userListApi(search)
    if (result.data) {
      setMembersList((prev) => result.data)
      setTotalCount(result.total)
      setContentLoaded(true)
    }
  }
  useEffect(() => {
    getMembersList()
  }, [search])

  const deleteRec = async () => {
    try {
      if (showDeletePopup.afId) {
        let response = await userServ.deleteUserRecordApi(showDeletePopup.afId)
        if (response.message) {
          setShowDeletePopup({ show: false, afId: '' })
          getMembersList()
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

  const activeToggleHandler = async (value) => {
    try {
      let isActive = value.is_active
      let obj = {
        is_active: !isActive,
        _id: value._id,
      }
      let response = await userServ.edit(obj)
      if (response.message) {
        getMembersList()
        toast.success(response.message)
      }
    } catch (err) {
      toast.error('something went wrong!')
      throw err
    }
  }

  function changeSearchFieled(field, e) {
    let tempSearch = { ...search }
    tempSearch.start = 0
    tempSearch.filter[field] = e.target.value
    setSearch(tempSearch)
  }

  const activeButton = (data) => {
    return (
      <CFormSwitch
        label={data?.is_active ? 'Active' : 'InActive'}
        id="formSwitchCheckChecked"
        className="m-0"
        checked={data?.is_active}
        onChange={() => activeToggleHandler(data)}
      />
    )
  }

  return (
    <CCard style={{ margin: '0 auto 1.5rem', overflowX: 'hidden' }}>
      <CCardHeader>
        <CRow>
          <CCol sm="12" md="6">
            <p className={'fw-bolder fs-4 m-0 ' + (window.innerWidth < 576 ? 'mb-1' : '')}>
              Members
            </p>
          </CCol>
          <CCol sm="12" md="6" className="d-flex flex-row gap-2">
            <CFormInput
              type="text"
              placeholder="Search for member"
              onChange={(e) => {
                changeSearchFieled('searchText', e)
              }}
              value={search.filter.searchText}
            />
            <CButton
              color="primary"
              variant="outline"
              className="d-flex flex-row gap-1 align-items-center"
              onClick={() => navigate('/members/add')}
            >
              <CIcon icon={cilUserPlus} className="text-primary cursorPointer" />
              Add
            </CButton>
          </CCol>
        </CRow>
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
                <CTableHeaderCell className="col-2">User Name</CTableHeaderCell>
                <CTableHeaderCell className="col-3">Full Name</CTableHeaderCell>
                <CTableHeaderCell className="col-3">Email Id</CTableHeaderCell>
                <CTableHeaderCell className="col-1">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col-2">Status</CTableHeaderCell>
                <CTableHeaderCell className="col-1">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {membersList.map((el) => {
                return (
                  <CTableRow key={'page' + el._id}>
                    <CTableDataCell>{el.user_name}</CTableDataCell>
                    <CTableDataCell>
                      {el.first_name} {el.last_name}
                    </CTableDataCell>
                    <CTableDataCell>{el.email}</CTableDataCell>
                    <CTableDataCell>{el.gender.toUpperCase()}</CTableDataCell>
                    <CTableDataCell>{activeButton(el)}</CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex gap-3 align-items-center mt-1">
                        <CIcon
                          icon={cilPencil}
                          onClick={() => navigate(`/members/edit/${el._id}`)}
                          className="text-success cursorPointer"
                        />
                        <CIcon
                          icon={cilTrash}
                          onClick={() => {
                            setShowDeletePopup({ show: true, afId: el._id })
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
          onClose={() => setShowDeletePopup({ show: false, afId: '' })}
          onSuccess={deleteRec}
        />
      )}
      <div className="paginationCustom container p-2">
        <Pagination size="sm">{items}</Pagination>
      </div>
    </CCard>
  )
}

export default MembersList
