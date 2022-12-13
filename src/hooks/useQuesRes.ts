import { message } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import { nanoid } from 'nanoid'
import { useCallback, useContext } from 'react'
import { fillForm } from '../api/form'
import { IMultiValue, IQuestion, IRes } from '../libs/model'
import { context } from './store'

export default function useQuesRes () {
  const { QuesResList, setQuesResList } = useContext(context)

  // 初始化QuesResList
  const initQuesRes = (QuestionList: IQuestion[]) => {
    setQuesResList(QuestionList)
  }

  // 更换答案
  const addValue = useCallback((QuesId: string, value: IRes) => {
    setQuesResList(QuesResList.map(item => {
      if (item.id === QuesId) {
        item.result = value
      }
      return item
    }))
  },
  [QuesResList, setQuesResList]
  )

  // 判断答案是否填写
  const checkRequire = (id: string) => {
    const temp = QuesResList.filter(item => item.id === id)[0]
    if (temp.required === true) {
      if (temp.type === 'score' && temp.result?.value === 0) {
        return false
      } else if (!temp.result?.value.toString() || !temp.result?.value) {
        return false
      }
    }
    return true
  }
  // 改变多选框格式
  const changeValueFormat = (checkedValues: CheckboxValueType[]) => {
    const MultiArray: IMultiValue[] = []
    checkedValues.forEach(item => {
      const obj = { id: nanoid(), title: item.toString() }
      MultiArray.push(obj)
    })
    return { value: MultiArray }
    // }
  }

  // 检验表单
  const checkFillForm = () => {
    const warnIds: string[] = []
    QuesResList.forEach(item => {
      if (item.required === true) {
        if (!item.result) {
          warnIds.push(item.id)
        } else if (item.type === 'score' && item.result?.value === 0) {
          warnIds.push(item.id)
        } else if (!item.result.value.toString() || !item.result.value) {
          warnIds.push(item.id)
        }
      }
    })
    return warnIds
  }
  // 填写后提交表单
  const submitForm = async (id: string) => {
    const res = await fillForm(id, QuesResList)
    if (res) {
      message.success('提交成功')
    }
  }

  return {
    initQuesRes,
    addValue,
    changeValueFormat,
    checkFillForm,
    submitForm,
    checkRequire
  }
}
