import axios from 'axios'
import { SERVER_URI } from '../config'

export async function fetchStats() {
  try {
    const response = await axios.get(`${SERVER_URI}/stats`)
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function fetchChart(selectedState='', startDate=null, endDate=null) {
  if(!selectedState) selectedState = 'Alabama';
  try {
    const response = await axios.post(`${SERVER_URI}/charts`,{
      selectedState,
      startDate,
      endDate
    })
    return response;
  } catch (error) {
    console.error(error)
  }
}

export async function fetchStates() {
  try {
    const response = await axios.get(`${SERVER_URI}/states`)
    return response;
  } catch (error) {
    console.error(error)
  }
}