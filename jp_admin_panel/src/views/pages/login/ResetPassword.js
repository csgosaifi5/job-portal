import React, { useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilLockUnlocked, cilTouchApp, cilUser } from '@coreui/icons'
import UserService from 'src/services/UserService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

const ValidateSchema = Yup.object({
  otp: Yup.string().required().min(6).max(6),
  newPassword: Yup.string().required('Password is a required field'),
  verifyPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Password must match')
    .required('Confirm Password is a required field'),
})
const ResetPassword = ({ emailId }) => {
  const userService = new UserService()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showVerifyPassword, setShowVerifyPassword] = useState(false)
  const navigate = useNavigate()
  const [value, setValue] = useState({
    newPassword: '',
    verifyPassword: '',
    otp: '',
    email: emailId,
  })

  const onSubmit = async (values) => {
    let response
    let obj = { ...values }
    try {
      response = await userService.resetPassword(obj)
      if (response.message) {
        toast.success(response.message)
        setTimeout(() => {
          navigate('/losin')
        }, 1500)
      } else {
        toast.error(response?.error)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const formik = useFormik({
    initialValues: value,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  })
  return (
    <CCard className="p-4">
      <CCardBody>
        <CForm onSubmit={formik.handleSubmit}>
          <h1>Reset</h1>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              OTP
              {/* <CIcon icon={cilLockLocked} /> */}
            </CInputGroupText>
            <CFormInput
              type="text"
              placeholder="Enter OTP"
              name="otp"
              autoComplete="current-password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.otp}
              required
              maxLength={6}
            />
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={showNewPassword ? cilLockUnlocked : cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              autoComplete="new-password"
              name="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              required
            />
            <CInputGroupText>
              <CIcon
                icon={cilTouchApp}
                className="text-warning cursorPointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              />
            </CInputGroupText>
          </CInputGroup>
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={showVerifyPassword ? cilLockUnlocked : cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              type={showVerifyPassword ? 'text' : 'password'}
              placeholder="Verify Password"
              autoComplete="verify-password"
              name="verifyPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.verifyPassword}
              className={
                formik.touched.verifyPassword && formik.errors.verifyPassword
                  ? ' border-danger'
                  : ''
              }
              required
            />
            <CInputGroupText>
              <CIcon
                icon={cilTouchApp}
                className="text-warning cursorPointer"
                onClick={() => setShowVerifyPassword(!showVerifyPassword)}
              />
            </CInputGroupText>
          </CInputGroup>
          <CRow>
            <CCol xs={6}>
              <CButton
                color="primary"
                className="px-4"
                type="submit"
                disabled={!(formik.isValid && formik.dirty) ? true : false}
              >
                Reset Password
              </CButton>
            </CCol>
            <CCol xs={6} className="text-right">
              <CButton
                color="link"
                className="px-0 text-decoration-none"
                onClick={() => navigate('/login')}
              >
                Go Back
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default ResetPassword
