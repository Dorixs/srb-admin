import request from "@/utils/request"

export default {
  list() {
    return request({
      url: "/admin/core/integralGrade/list",
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: "/admin/core/integralGrade/remove/" + id,
      method: 'delete'
    })
  },
  save(integralGrade) {
    return request({
      url: "/admin/core/integralGrade/save",
      method: 'post',
      data: integralGrade
    })
  },
  getById(id) {
    return request({
      url: "/admin/core/integralGrade/get/" + id,
      method: 'get'
    })
  },
  update(integralGrade) {
    return request({
      url: "/admin/core/integralGrade/update",
      method: 'put',
      data: integralGrade
    })
  }
}