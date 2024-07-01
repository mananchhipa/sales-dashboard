import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCol, CFormSelect, CRow, CFormLabel } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { fetchChart, fetchStates } from '../../services/api'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
}

const Dashboard = () => {
  const [states, setStates] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [salesByCity, setSalesByCity] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        axis: 'y',
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const [salesByProducts, setSalesByProducts] = useState({
    labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
    datasets: [
      {
        axis: 'y',
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const [salesByCategory, setSalesByCategory] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const [salesBySubCategory, setSalesBySubCategory] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const [salesBySegment, setSalesBySegment] = useState({
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const getChartOneData = async (event = null, startDate = null, endDate = null) => {
    const selectedState = event?.target?.value
    const data = await fetchChart(selectedState, startDate, endDate)
    const { salesByCity, salesByProducts, salesByCategory, salesBySubCategory, salesBySegment } =
      data.data
    setSalesByCity((prev) => ({
      ...prev,
      labels: Object.keys(salesByCity).slice(0, 15),
      datasets: [{ ...prev.datasets[0], data: Object.values(salesByCity).slice(0, 15) }],
    }))
    setSalesByProducts((prev) => ({
      ...prev,
      labels: Object.keys(salesByProducts).slice(0, 15),
      datasets: [{ ...prev.datasets[0], data: Object.values(salesByProducts).slice(0, 15) }],
    }))
    setSalesByCategory((prev) => ({
      ...prev,
      labels: Object.keys(salesByCategory).slice(0, 15),
      datasets: [{ ...prev.datasets[0], data: Object.values(salesByCategory).slice(0, 15) }],
    }))
    setSalesBySubCategory((prev) => ({
      ...prev,
      labels: Object.keys(salesBySubCategory).slice(0, 15),
      datasets: [{ ...prev.datasets[0], data: Object.values(salesBySubCategory).slice(0, 15) }],
    }))
    setSalesBySegment((prev) => ({
      ...prev,
      labels: Object.keys(salesBySegment).slice(0, 15),
      datasets: [{ ...prev.datasets[0], data: Object.values(salesBySegment).slice(0, 15) }],
    }))
  }

  const getStates = async () => {
    const { data } = await fetchStates()
    if (data) setStates(data.data)
  }

  const handleDateChange = () => {
    getChartOneData(
      null,
      moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD'),
    )
  }

  useEffect(() => {
    getStates()
    getChartOneData()
  }, [])

  useEffect(() => {
    if (startDate || endDate) {
      handleDateChange()
    }
  }, [startDate, endDate])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CFormSelect
        label="Select State"
        aria-label="Default select example"
        options={states.map((s) => ({ label: s, value: s }))}
        onChange={getChartOneData}
      />
      <br />
      <CRow>
        <CCol xs>
          <CFormLabel className="col-sm-2 col-form-label">From Date</CFormLabel>
          <DatePicker
            onChange={(date) => setStartDate(date)}
            selected={startDate}
            dateFormat="yyyy-MM-dd"
          />
        </CCol>
        <CCol xs>
          <CFormLabel className="col-sm-2 col-form-label">To Date</CFormLabel>
          <DatePicker
            onChange={(date) => setEndDate(date)}
            selected={endDate}
            dateFormat="yyyy-MM-dd"
          />
        </CCol>
      </CRow>

      <br />
      <CRow className="mb-4" xs={{ gutter: 4 }}>
        <CCol sm={12} xl={4} xxl={12}>
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-0">Sales by City</h5>
              <Bar options={options} data={salesByCity} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={12} xl={4} xxl={12}>
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-0">Sales by Products</h5>
              <Bar options={options} data={salesByProducts} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow className="mb-4" xs={{ gutter: 3 }}>
        <CCol sm={12} xl={4} xxl={4}>
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-0">Sales by Category</h5>
              <Pie data={salesByCategory} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={12} xl={4} xxl={4}>
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-0">Sales by Sub Category</h5>
              <Bar options={options} data={salesBySubCategory} />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={12} xl={4} xxl={4}>
          <CCard>
            <CCardBody>
              <h5 className="card-title mb-0">Sales by Segment</h5>
              <Pie data={salesBySegment} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
