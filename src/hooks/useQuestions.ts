import { useCallback, useContext } from 'react'
import { nanoid } from 'nanoid'
import { context } from './store'
import { message } from 'antd'
import useType from './useType'
import { TProblemType } from '../libs/model'
export default function useQuestions () {
  const { QuestionList, setQuestionList } = useContext(context)
  const { classType } = useType()

  // 生成题目
  const addQuestion = useCallback((_type: TProblemType, _title: string) => {
    if (classType(_type) === 'BASE_TYPE') {
      const question = {
        id: nanoid(),
        title: _title,
        type: _type,
        required: false,
        isNew: true
      }
      setQuestionList([...QuestionList, question])
    } else if (classType(_type) === 'OPTION_TYPE') {
      const question = {
        id: nanoid(),
        title: _title,
        type: _type,
        required: false,
        isNew: true,
        setting: {
          options: [{
            id: nanoid(),
            title: '',
            status: 2 as 1 | 2
          },
          {
            id: nanoid(),
            title: '',
            status: 2 as 1 | 2
          }]
        }
      }
      setQuestionList([...QuestionList, question])
    }
  },
  [QuestionList, setQuestionList]
  )
  // 获得题目标题
  const getTitle = (_id: string) => {
    return QuestionList.filter(item => item.id === _id)[0].title
  }
  // 获得题目选项
  const getOptions = (_id: string) => {
    return QuestionList.filter(item => item.id === _id)[0].setting?.options
  }

  // 删除题目选项(不能小于1个，否则全局题型)
  const deleteOption = useCallback((_id: string, optionId: string) => {
    setQuestionList(QuestionList.map(item => {
      if (item.id === _id) {
        const len = item.setting?.options.length
        if (len as number < 2) {
          message.info('至少设置1个选项')
        } else {
          const index = item.setting?.options.findIndex(option => option.id === optionId)
          item.setting?.options.splice(index as number, 1)
        }
      }
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 增加选项
  const addOption = useCallback((_id: string) => {
    const newOption = {
      id: nanoid(),
      title: '',
      status: 2 as 1 | 2
    }
    setQuestionList(QuestionList.map(question => {
      if (question.id === _id) {
        question.setting?.options.push(newOption)
      }
      return question
    }))
  },
  [QuestionList, setQuestionList]
  )
  // 更换选项标题
  const addOptionTitle = useCallback((_id: string, optionTitle: string, optionId: string) => {
    setQuestionList(QuestionList.map(item => {
      if (item.id === _id) {
        item.setting?.options.map(option => {
          if (option.id === optionId) {
            option.title = optionTitle
          }
          return option
        })
      }
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )
  // 更换题目标题
  const addTitle = useCallback((_title: string, _id: string) => {
    setQuestionList(QuestionList.map(item => {
      if (item.id === _id) {
        item.title = _title
      }
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 删除题目
  const deleteQuestion = useCallback((_id: string) => {
    setQuestionList(QuestionList.filter(item => item.id !== _id))
  },
  [QuestionList, setQuestionList]
  )

  // 取消、添加必填
  const toggleRequire = useCallback((_id: string) => {
    setQuestionList(QuestionList.map(item => {
      if (item.id === _id) {
        item.required = !item.required
      }
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 更换题型
  const changeType = useCallback((_id: string, _type: 'input' | 'singleSelect' | 'multiSelect' | 'pullSelect' | 'date' | 'time' | 'score') => {
    setQuestionList(QuestionList.map(item => {
      if (item.id === _id) {
        item.type = _type
        delete item.setting
      }
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 将所有题都设置为必填
  const allRequired = useCallback(() => {
    setQuestionList(QuestionList.map(item => {
      item.required = true
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 将所有题都设为非必填
  const unRequired = useCallback(() => {
    setQuestionList(QuestionList.map(item => {
      item.required = false
      return item
    }))
  },
  [QuestionList, setQuestionList]
  )

  // 复制题目
  const copyQuestion = useCallback((_id: string) => {
    const copy = JSON.parse(JSON.stringify(QuestionList.filter(item => item.id === _id)[0]))
    copy.id = nanoid()
    setQuestionList([...QuestionList, copy])
  },
  [QuestionList, setQuestionList]
  )

  return {
    getTitle,
    QuestionList,
    addQuestion,
    deleteQuestion,
    toggleRequire,
    changeType,
    allRequired,
    unRequired,
    addTitle,
    getOptions,
    deleteOption,
    addOption,
    addOptionTitle,
    copyQuestion
  }
}
