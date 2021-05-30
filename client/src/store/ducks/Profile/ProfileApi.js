const { instance } = require('store/api')

export const profileAPI = {
  async get(id) {
    return await instance.get(`profile/${id}`)
  }
}