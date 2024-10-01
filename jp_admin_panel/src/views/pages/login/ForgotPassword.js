import React, { useRef, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import UserService from 'src/services/UserService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import ResetPassword from './ResetPassword'

const ForgotPassword = () => {
  const emailAddressInputRef = useRef()
  const userService = new UserService()
  const [forgotOtpGen, setForgotOtpGen] = useState({ show: false, emailId: '' })
  const navigate = useNavigate()

  const loginhandler = () => {
    navigate('/login')
  }

  const submitHandler = (event) => {
    try {
      event.preventDefault()
      const enteredEmailAddress = emailAddressInputRef.current.value
      emailAddressInputRef.current.value = ''
      const formData = {
        email: enteredEmailAddress,
        flag: 'admin_fogot_password',
      }
      userService
        .forgotPassword(formData)
        .then((response) => {
          if (response.message) {
            toast.success(response.message)
            // navigate('/reset-password')
            setForgotOtpGen({ show: true, emailId: enteredEmailAddress })
          } else {
            toast.error(response?.error)
          }
        })
        .catch(console.log)
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup
              className={'d-flex ' + (window.innerWidth > 576 ? 'flex-row' : 'flex-column-reverse')}
            >
              {!forgotOtpGen.show ? (
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={submitHandler}>
                      <h1>Forgot</h1>
                      <p className="text-medium-emphasis">Enter Email Id</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Email Id" ref={emailAddressInputRef} required />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={8}>
                          <CButton color="primary" className="px-4" type="submit">
                            Send OTP
                          </CButton>
                        </CCol>
                        <CCol xs={4} className="text-right">
                          <CButton
                            color="link"
                            className="px-0 text-decoration-none"
                            onClick={loginhandler}
                          >
                            Log In
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
              ) : (
                forgotOtpGen.emailId && <ResetPassword emailId={forgotOtpGen.emailId} />
              )}

              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>{forgotOtpGen.show ? 'Reset Your Password' : 'Forgot Your Password'}</h2>
                    <p>
                      We started our journey with the sole purpose of helping sellers make their
                      online selling journey smooth and easy.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />
    </div>
  )
}

export default ForgotPassword
