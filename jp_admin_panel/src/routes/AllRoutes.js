import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from '../containers/ScrollToTop'
import { GlobalProvider } from 'src/context/GlobalContext'

const DefaultLayout = React.lazy(() => import('../layout/DefaultLayout'))

const Login = React.lazy(() => import('../views/pages/login/Login'))
const ForgotPassword = React.lazy(() => import('../views/pages/login/ForgotPassword'))

function AllRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(window.user ? true : false)

  useEffect(() => {
    getUser()
  }, [isAuthenticated])

  const getUser = () => {
    if (window.user) {
      setIsAuthenticated(true)
    }
  }

  return isAuthenticated && window.user ? (
    <GlobalProvider>
      <>
        <ScrollToTop />
        <Routes>
          <Route
            path="*"
            name="Home"
            element={<DefaultLayout handleAuthState={setIsAuthenticated} />}
          />
        </Routes>
      </>
    </GlobalProvider>
  ) : (
    <GlobalProvider>
      <Routes>
        <Route
          exact
          path="/login"
          name="Login Page"
          element={<Login handleAuthState={setIsAuthenticated} />}
        />
        <Route exact path="/forgot_password" name="Forgot Password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </GlobalProvider>
  )
}

export default AllRoutes
