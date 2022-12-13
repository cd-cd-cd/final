import request from '../utils/request'
import { TProblemType, IQuesRes, singleList, resFormResult } from '../libs/model'

interface resCreate {
  id: string
}

// 表单列表
interface resList {
  items: singleList[],
  total: number
}

interface resForm {
  item: singleList
}

// 创建表单(草稿 第一次)
export const createForm = async (
  title: string,
  subTitle: string,
  problems: {
    title: string
    type: TProblemType
    required: boolean
    isNew: boolean
    setting?: {
      options: {
        title: string
        status: 1 | 2
      }[]
    }
  }[]) => {
  return await request<resCreate>({
    url: '/form/create',
    method: 'POST',
    data: {
      title,
      subTitle,
      problems
    }
  })
}

// 修改草稿表单
export const updateDraft = async (
  id: string,
  title: string,
  subTitle: string,
  problems: {
    title: string
    type: TProblemType
    required: boolean
    isNew: boolean
    setting?: {
      options: {
        title: string
        status: 1 | 2
      }[]
    }
  }[]) => {
  return await request<resCreate>({
    url: '/form/update',
    method: 'POST',
    data: {
      id,
      title,
      subTitle,
      problems
    }
  })
}

// 获取列表
export const list = async (offset?: number, limit?: number, isStar?: boolean) => {
  return await request<resList>({
    url: '/form/list',
    method: 'POST',
    data: {
      offset,
      limit,
      isStar
    }
  })
}

// 完成创建 (开始收集表单)
export const start = async (id: string) => {
  return await request({
    url: '/form/start',
    method: 'POST',
    data: {
      id
    }
  })
}

// 删除表单
export const deleteList = async (id: string) => {
  return await request({
    url: '/form/delete',
    method: 'POST',
    data: {
      id
    }
  })
}

// 收藏表单
export const formStar = async (id: string) => {
  return await request({
    url: '/form/star',
    method: 'POST',
    data: {
      id
    }
  })
}

// 取消收藏表单
export const cancelStar = async (id: string) => {
  return await request({
    url: '/form/cancelStar',
    method: 'POST',
    data: {
      id
    }
  })
}

// 获取表单
export const getList = async (id: string) => {
  return await request<resForm>({
    url: '/form/get',
    method: 'POST',
    data: {
      id
    }
  })
}

// 结束填写表单
export const end = async (id: string) => {
  return await request({
    url: '/form/end',
    method: 'POST',
    data: {
      id
    }
  })
}

// 填写表单
export const fillForm = async (
  formId: string,
  problems: IQuesRes[]) => {
  return await request({
    url: '/form/input',
    method: 'POST',
    data: {
      formId,
      problems
    }
  })
}

// 获取表单填写详情
export const formResult = async (formId: string) => {
  return await request<resFormResult>({
    url: `form/formResult/${formId}`,
    method: 'GET'
  })
}

// 获取表单单个信息
export const singleForm = async (id: string) => {
  return await request({
    url: `/form/detail/${id}`,
    method: 'POST'
  })
}
