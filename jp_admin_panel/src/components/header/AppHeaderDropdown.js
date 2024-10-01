import React, { useContext } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilHome } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/8.jpg'
import logoMain from 'src/assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import GlobalContext from 'src/context/GlobalContext'

const AppHeaderDropdown = ({ handleAuthState }) => {
  const globalCtx = useContext(GlobalContext)
  const [isAuthentiCated, setIsAuthentiCated] = globalCtx.auth
  const [user, setUser] = globalCtx.user
  const [cookie, setCookie, removeCookie] = useCookies(['token'])
  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.clear()
    handleAuthState(false)
    setIsAuthentiCated(false)
    setUser([])
    removeCookie('token', {
      path: '/',
      domain: process.env.REACT_APP_PUBLIC_DOMAIN,
    })
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={logoMain} size="md" className="bg-black" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem className="mt-2" onClick={() => navigate('/dashboard')}>
          <CIcon icon={cilHome} className="me-2" />
          Dashboard
        </CDropdownItem>
        <CDropdownItem href="#" onClick={() => logoutHandler()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
