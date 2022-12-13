import { useContext } from 'react'
import { context } from './store'
import { collectProblem } from '../api/problem'
import useStarList from './useListStar'
import useType from './useType'
import { TProblemType, IQuestion, IOption } from '../libs/model'
import { nanoid } from 'nanoid'
import { message } from 'antd'

export default function useStar () {
  const { QuestionList, setQuestionList } = useContext(context)
  const { listStar, refreshStar } = useStarList()
  const { classType } = useType()

  // 添加为常用题
  const addStar = async (_id: string) => {
    const question = QuestionList.filter(item => item.id === _id)[0]
    if (!question.title) {
      return message.info('请输入标题')
    } else {
      if (question.setting) {
        let success = true
        question.setting.options.forEach(item => {
          if (!item.title) {
            success = false
          }
        })
        if (!success) {
          return message.info('请输入表单项')
        }
      }
    }
    const res = await collectProblem(question)
    if (res) message.success('添加成功')
    refreshStar()
  }

  // 添加常用题到表单
  const addStarQuestion = (_id: string) => {
    const star = listStar?.filter(item => item.id === _id)[0].problem
    if (classType(star?.type as TProblemType) === 'BASE_TYPE') {
      const newQues = JSON.parse(JSON.stringify(star)) as IQuestion
      newQues.id = nanoid()
      setQuestionList([...QuestionList, newQues])
    } else if (classType(star?.type as TProblemType) === 'OPTION_TYPE') {
      const newQues = JSON.parse(JSON.stringify(star)) as IQuestion
      newQues.id = nanoid()
      const newOptions = newQues.setting?.options.map(item => {
        item.id = nanoid()
        return item
      })
      newQues.setting!.options = newOptions as IOption[]
      setQuestionList([...QuestionList, newQues])
    }
  }
  return {
    addStar,
    addStarQuestion
  }
}
