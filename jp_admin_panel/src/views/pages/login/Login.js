import React, { useContext, useRef } from 'react'

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
import { cilLockLocked, cilUser } from '@coreui/icons'
import UserService from 'src/services/UserService'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import GlobalContext from 'src/context/GlobalContext'

const Login = ({ handleAuthState }) => {
  const [cookie, setCookie] = useCookies(['token'])
  const globalCtx = useContext(GlobalContext)
  const [user, setUser] = globalCtx.user
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth
  const userService = new UserService()
  const userNameInputRef = useRef()
  const passwordInputRef = useRef()
  const navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredUserName = userNameInputRef.current.value
    const enteredUserPassword = passwordInputRef.current.value

    const formData = {
      email_id: enteredUserName,
      password: enteredUserPassword,
      type: 'jp_admin_panel',
    }
    userService
      .login(formData)
      .then((res) => {
        if (res?.token) {
          toast.success(res?.message)
          userNameInputRef.current.value = ''
          passwordInputRef.current.value = ''
          handleAuthState(true)
          setIsAuthentiCated(true)
          setUser(res.data)
          setCookie('token', res.token, {
            path: '/',
            maxAge: 86400 * 7, // Expires after 7 days
            // sameSite: true,
            sameSite: 'lax',
            domain: process.env.REACT_APP_PUBLIC_DOMAIN,
          })

          navigate('/dashboard')
        } else {
          toast.error(res?.error)
        }
      })
      .catch((err) => {
        toast.error(err)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup
              className={'d-flex ' + (window.innerWidth > 576 ? 'flex-row' : 'flex-column-reverse')}
            >
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={submitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email Address"
                        autoComplete="username"
                        ref={userNameInputRef}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        ref={passwordInputRef}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0 text-decoration-none"
                          onClick={() => navigate('/forgot_password')}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5">
                <CCardBody className="text-center">
                  <div>
                    <h2>Welcome Back</h2>
                    <p>
                      We started our journey with the sole purpose of helping sellers make their
                      online selling journey smooth and easy.
                    </p>
                    {/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link> */}
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

export default Login
