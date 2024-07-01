import React from 'react'
import CIcon from '@coreui/icons-react'
import {  
  cilMonitor,
  cilCart,
  cilBell,
  cilCog,
  cilMoon,
  cilSun
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Sales Overview',
    to: '/dashboard',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Stores',
    to: '/',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Notifications',
    to: '/',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Settings',
    to: '/',
    icon: <CIcon icon={cilCog} customClassName="nav-icon" />,    
  },
  {
    component: CNavItem,
    name: 'Dark Theme',
    to: '/',
    icon: <CIcon icon={cilMoon} customClassName="nav-icon" />,    
    icon2: <CIcon icon={cilSun} customClassName="nav-icon" />
  }
]

export default _nav
