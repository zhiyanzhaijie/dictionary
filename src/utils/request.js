import axios from 'axios'
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const instance = axios.create({
  baseURL: url,
  timeout: 5000
})
instance.interceptors.response.use(
  response => {
    const { data } = response
    return data
  },
  error => {
    console.log(JSON.parse(error))
    return Promise.reject(error)
  }
)
export default instance
