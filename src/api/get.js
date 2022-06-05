import request from '../utils/request.js'
export function getData(data) {
  return request({
    url: data,
    method: 'get'
  })
}
