import axios from 'axios'
import { API_URL } from './config'

export function getBuildingIdentity(imageToIdentify) {
  const formData = new FormData(imageToIdentify)
  formData.append('image', imageToIdentify)
  console.log(imageToIdentify)
  return axios.post(`${API_URL}/building`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
