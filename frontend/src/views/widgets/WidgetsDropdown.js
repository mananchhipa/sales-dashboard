import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { CRow, CCol, CWidgetStatsF } from '@coreui/react'
import { fetchStats } from '../../services/api'


import rupeeIcon from './../../assets/images/rupee.png';
import creditCardIcon from './../../assets/images/credit-card.png';
import scaleIcon from './../../assets/images/scale.png';
import interestRateIcon from './../../assets/images/interest-rate.png';

const WidgetsDropdown = (props) => {
  const [stats, setStats] = useState({})
  const { totalSales, totalQuantity, totalDiscountPercentage, totalProfilt } = stats

  useEffect(() => {
    fetchStats().then((data) => setStats(data.data))
  }, [])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
          className="mb-3"
          padding={false}
          color="primary"
          value={<>${totalSales?.toFixed(2)} </>}
          icon={<img  src={rupeeIcon} />}
          title="Total Sales"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF className="mb-3" padding={false} color="primary" value={<>{totalQuantity} </>} icon={<img  src={creditCardIcon} />} title="Quantity Sold" />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF
        className="mb-3"
        padding={false}
          color="primary"
          value={<>{totalDiscountPercentage?.toFixed(2)}% </>}
          icon={<img  src={scaleIcon} />}
          title="Discount%"
        />
      </CCol>
      <CCol sm={6} xl={4} xxl={3}>
        <CWidgetStatsF className="mb-3" padding={false} color="primary" value={<>${totalProfilt?.toFixed(2)} </>} icon={<img  src={interestRateIcon} />} title="Profit" />
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
