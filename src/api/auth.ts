import request from '../utils/request'

interface resRegister {
  id: string
}

export const register = async (account: string, pwd: string, confirmPwd: string) => {
  return await request<resRegister>({
    url: '/auth/register',
    method: 'POST',
    data: {
      account,
      pwd,
      confirmPwd
    }
  })
}

export const login = async (account: string, pwd: string) => {
  return await request({
    url: '/auth/login',
    method: 'POST',
    data: {
      account,
      pwd
    }
  })
}

export const logout = async () => {
  return await request({
    url: '/auth/logout',
    method: 'POST'
  })
}
