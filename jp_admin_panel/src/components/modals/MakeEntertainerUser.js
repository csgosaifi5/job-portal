import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CImage,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import UserService from 'src/services/UserService'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked, cilTouchApp } from '@coreui/icons'

const userServ = new UserService()

const MakeEntertainerUser = ({ onClose, afData }) => {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [initialValues, setInitialValues] = useState({
    first_name: afData.first_name || '',
    last_name: afData.last_name || '',
    email: afData.email_id || '',
    user_name: '',
    gender: afData.gender || '',
    bio: afData.bio || '',
    password: '',
  })

  const ValidateSchema = Yup.object({
    first_name: Yup.string(),
    last_name: Yup.string(),
    email: Yup.string(),
    user_name: Yup.string().required('Required'),
    gender: Yup.string(),
    password: Yup.string().required('Required').min(8).max(20),
  })
  const onSubmit = async (values) => {
    let response
    let obj = { ...values }
    const formData = new FormData()
    try {
      formData.append('first_name', obj.first_name)
      formData.append('last_name', obj.last_name)
      formData.append('email', obj.email)
      formData.append('user_name', obj.user_name)
      formData.append('gender', obj.gender)
      formData.append('password', obj.password)
      formData.append('role', '2')

      response = await userServ.addUser(formData)
      if (response.error) {
        toast.error(response.error)
      } else if (response.data) {
        toast.success(response.message)
        onClose()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  })
  return (
    <>
      <CModal
        alignment="center"
        visible={true}
        onClose={onClose}
        aria-labelledby="TooltipsAndPopoverExample"
      >
        <CForm onSubmit={formik.handleSubmit}>
          <CModalHeader>
            <CModalTitle id="TooltipsAndPopoverExample">
              Add User - {afData.first_name} {afData.last_name}
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol>
                <CFormLabel htmlFor="user_name">Username*</CFormLabel>
                <CFormInput
                  type="text"
                  id="user_name"
                  placeholder="Enter Username"
                  value={formik.values.user_name}
                  name={`user_name`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    'mb-2' +
                    (formik.touched.user_name && formik.errors.user_name ? ' border-danger' : '')
                  }
                />
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={showNewPassword ? cilLockUnlocked : cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="New Password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className={
                      formik.touched.password && formik.errors.password ? ' border-danger' : ''
                    }
                  />
                  <CInputGroupText>
                    <CIcon
                      icon={cilTouchApp}
                      className="text-warning cursorPointer"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  </CInputGroupText>
                </CInputGroup>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" type="submit">
              Create
            </CButton>
            <CButton color="secondary" onClick={onClose}>
              Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default MakeEntertainerUser
