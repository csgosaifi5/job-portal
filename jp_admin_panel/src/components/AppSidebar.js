import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CCard, CImage, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import logoMain from 'src/assets/images/logo.svg'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoMain} height={35} /> */}
        <div className="sidebar-brand-full">
          <div className="d-flex flex-row gap-2">
            {/* <CImage src={logoMain} height={50} /> */}
            <div className="d-flex flex-column dNone">
              <p className="m-0 fs-3 fw-bolder lh-1">ATS Job Panel</p>
            </div>
          </div>
        </div>
        <div className="sidebar-brand-narrow">
          <CImage src={logoMain} height={25} />
        </div>
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
