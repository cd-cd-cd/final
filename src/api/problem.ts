import request from '../utils/request'
import { IProblemType, IProblem, TProblemType } from '../libs/model'

type resList = {
  problemTypes: IProblemType[]
}

type resBasicProblem = {
  basicProblems: Omit<IProblem<TProblemType>, 'result'>[]
}

interface resStar {
  id: string
}

export interface resGetStarList {
  items: {
    id: string
    problem: {
      id: string
      isNew: boolean
      required: boolean
      title: string
      type: TProblemType
    }
    status: 1 | 2
    uId: string
  }[]
}
// 获得基础类型
export const getListType = async () => {
  return await request<resList>({
    url: '/problem/listType',
    method: 'GET'
  })
}
// 获得基础题目
export const getBasicProblems = async () => {
  return await request<resBasicProblem>({
    url: '/problem/listBasic',
    method: 'GET'
  })
}
// 收藏题目
export const collectProblem = async (problem: {
  title: string
  type: TProblemType
  required: boolean
  setting?: {
    options: {
      title: string
      status: 1 | 2
    }[]
  }
}) => {
  return await request<resStar>({
    url: '/problem/star',
    method: 'POST',
    data: {
      problem
    }
  })
}

// 获得收藏题目
export const getStars = async () => {
  return await request<resGetStarList>({
    url: '/problem/listStar',
    method: 'POST'
  })
}

// 删除收藏题目
export const deleteStar = async (id: string) => {
  return await request({
    url: '/problem/cancelStar',
    method: 'POST',
    data: {
      id
    }
  })
}
