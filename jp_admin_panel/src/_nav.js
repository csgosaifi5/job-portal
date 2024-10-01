import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBook,
  cilEnvelopeLetter,
  cilGroup,
  cilLibrary,
  cilUser,
  cilUserFemale,
  cilQrCode,
  cilNewspaper,
  cilThumbUp,
  cilContact,
  cilTv,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Pages',
    to: '/pages/list',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Homepage',
      //   to: '/home/list',
      // },
      {
        component: CNavItem,
        name: 'About Us',
        to: '/about-us',
      },
      {
        component: CNavItem,
        name: 'Contact Us',
        to: '/contact-us',
      },
      {
        component: CNavItem,
        name: 'Services',
        to: '/services',
      },
      {
        component: CNavItem,
        name: 'Blogs',
        to: '/blogs',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Contact Form',
    to: '/contact-form/list',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Blogs',
    to: '/blogs/list-all',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Services',
    to: '/services/list-all',
    icon: <CIcon icon={cilEnvelopeLetter} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Testimonials',
  //   to: '/testimonials/list-all',
  //   icon: <CIcon icon={cilTv} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Our Team',
  //   to: '/our-team/list-all',
  //   icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Case We Handle',
  //   to: '/case-we-handle/list-all',
  //   icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Our Victories',
  //   to: '/our-victories/list-all',
  //   icon: <CIcon icon={cilThumbUp} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'FAQ Section',
  //   to: '/faq/list-all',
  //   icon: <CIcon icon={cilQrCode} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'News And Updates',
  //   to: '/news/list-all',
  //   icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Users',
  //   to: '/members/list-all',
  //   icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  // },
  
]

export default _nav
