import React, { useContext, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import GlobalContext from 'src/context/GlobalContext'
import UserService from 'src/services/UserService'
import { useNavigate } from 'react-router-dom'

const userServ = new UserService()
const DefaultLayout = ({ handleAuthState }) => {
  const navigate = useNavigate()
  const globalCtx = useContext(GlobalContext)
  const [user, setUser] = globalCtx.user

  const userDetail = async () => {
    let response
    try {
      if (window.user.token) {
        response = await userServ.checkLoginActive({ token: window.user.token })
        if (response.status == 'active') {
          setUser(response.userData)
        } else {
          navigate('/login')
          handleAuthState(false)
        }
      } else {
        navigate('/login')
        handleAuthState(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userDetail()
  }, [])
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader handleAuthState={handleAuthState} />
        <div className={'body flex-grow-1 px-3 ' + (window.innerWidth > 576 ? 'px-3' : '')}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
