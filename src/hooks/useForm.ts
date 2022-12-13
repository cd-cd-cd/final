import { message } from 'antd'
import { useContext } from 'react'
import { context } from './store'
import { createForm, start, updateDraft, deleteList, formStar, cancelStar, getList, end } from '../api/form'
import { IQuestion, singleList } from '../libs/model'
import { useNavigate } from 'react-router-dom'

export default function useForm () {
  const { QuestionList, setQuestionList, title, subTitle, setTitle, setSubTitle, draftId, setDraftId } = useContext(context)
  const navigate = useNavigate()
  // 更换表单标题
  const changeTitle = (title: string) => {
    setTitle(title)
  }
  // 更换表单副标题
  const changeSubTitle = (subTitle: string) => {
    setSubTitle(subTitle)
  }

  // 检验表单(标题、每个题目的标题、表单项、表单项不能重复)
  const checkForm = () => {
    if (!title) {
      message.info('请输入标题')
      return false
    }
    if (!subTitle) {
      message.info('请输入副标题')
      return false
    }
    if (QuestionList.length === 0) {
      message.info('请创建题目')
      return false
    }
    for (const item of QuestionList) {
      if (!item.title) {
        message.info('问题不能为空，请输入')
        return false
      }
      if (item.setting?.options) {
        for (const option of item.setting.options) {
          if (!option.title) {
            message.info('请填写表单项')
            return false
          }
        }
        const options = item.setting.options
        for (let i = 0; i < options.length; i++) {
          const index = options.findIndex(item => item.title === options[i].title)
          if (index !== i) {
            message.info('表单项不能重复')
            return false
          }
        }
      }
    }
    return true
  }

  // 保存草稿
  const createDraft = async () => {
    const pass = checkForm()
    if (pass) {
      // 创建草稿 同一个表单如果第一次创建
      if (!draftId) {
        const res = await createForm(title, subTitle, QuestionList)
        if (res) {
          message.success('草稿创建完成')
          setDraftId(res.data.id)
        }
      } else {
        // 创建草稿 如果同一个表单创建过一次 使用修改表单接口
        const res = await updateDraft(draftId, title, subTitle, QuestionList)
        if (res) {
          message.success('草稿创建完成')
          setDraftId(res.data.id)
        }
      }
    }
  }

  // 初始化所有缓存数据
  const resetData = () => {
    setDraftId('')
    setQuestionList([])
    setTitle('未命名标题')
    setSubTitle('')
  }

  // 创建表单(检验) 没有保存过草稿/保存过草稿 => 完成创建后删除所有缓存数据
  const createFormBtn = async () => {
    const pass = checkForm()
    if (pass) {
      // 如果没有保存过草稿 创建草稿 => 开始收集
      if (!draftId) {
        const res = await createForm(title, subTitle, QuestionList)
        if (res) {
          // 创建草稿完成 开始请求收集接口
          const resStart = await start(res.data.id)
          if (resStart) message.success('创建成功')
          navigate('/home')
          // 删除所有缓存数据
          resetData()
        }
      } else {
        // 如果保存过草稿 修改草稿 => 开始收集
        const res = await updateDraft(draftId, title, subTitle, QuestionList)
        if (res) {
          // 修改草稿完成 开始请求收集接口
          const resStart = await start(res.data.id)
          setDraftId('')
          if (resStart) message.success('创建成功')
          navigate('/home')
          // 删除所有缓存数据
          resetData()
        }
      }
    }
  }

  // 发布表单按钮功能
  const release = async (id: string) => {
    const res = await start(id)
    if (res) {
      message.success('发布成功')
    }
  }

  // 删除表单功能
  const deleteSingle = async (id: string) => {
    const res = await deleteList(id)
    if (res) {
      message.success('删除成功')
    }
  }

  // 收藏表单
  const star = async (id: string) => {
    const res = await formStar(id)
    if (res) {
      message.success('收藏成功')
    }
  }
  // 取消收藏表单
  const deleteStar = async (id: string) => {
    const res = await cancelStar(id)
    if (res) {
      message.success('取消收藏成功')
    }
  }

  // 编辑/获取表单 并保存数据
  const editForm = async (id: string) => {
    const res = await getList(id)
    const data = res?.data.item as singleList
    setDraftId(data.id)
    setQuestionList(data.problems as IQuestion[])
    setTitle(data.title as string)
    setSubTitle(data.subTitle as string)
    navigate('/form')
  }

  // 结束表单
  const endList = async (id: string) => {
    const res = await end(id)
    if (res) {
      message.success('表单收集结束')
    }
  }

  return {
    createFormBtn,
    changeTitle,
    changeSubTitle,
    checkForm,
    createDraft,
    release,
    deleteSingle,
    star,
    deleteStar,
    editForm,
    endList,
    resetData
  }
}
