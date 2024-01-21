// 登录模块
import { makeAutoObservable } from "mobx"
import { http, removeToken } from '@/utils'
import { setToken, getToken } from "@/utils"
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.data.token
    setToken(this.token)
  }
  logOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore