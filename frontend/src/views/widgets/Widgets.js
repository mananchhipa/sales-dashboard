import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react'


import WidgetsDropdown from './WidgetsDropdown'

const Widgets = () => {

  return (
    <CCard className="mb-4">
      <CCardHeader>Widgets</CCardHeader>
      <CCardBody>
          <WidgetsDropdown />
        
      </CCardBody>
    </CCard>
  )
}

export default Widgets
