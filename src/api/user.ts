import { IUser } from '../libs/model'
import request from '../utils/request'

interface ResGetInfo {
  user: IUser
}

export const getInfo = async () => {
  return await request<ResGetInfo>({
    url: '/user/getInfo',
    method: 'GET'
  })
}

export const setInfo = async (nickname: string, avatar: string) => {
  return await request({
    url: '/user/setInfo',
    method: 'POST',
    data: {
      nickname,
      avatar
    }
  })
}

export const changePwd = async (oldPwd: string, pwd: string, confirmPwd: string) => {
  return await request({
    url: 'user/changePwd',
    method: 'POST',
    data: {
      oldPwd,
      pwd,
      confirmPwd
    }
  })
}
