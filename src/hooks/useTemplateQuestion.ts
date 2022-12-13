import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { IOption, IQuestion } from '../libs/model'
import { context } from './store'
import useBasicProblem from './useBasicProblem'
import useType from './useType'

export default function useTemplateQuestion () {
  const { problems } = useBasicProblem()
  const { QuestionList, setQuestionList } = useContext(context)
  const { classType } = useType()

  // 生成模板
  const addBasic = (_id?: string) => {
    const basic = problems?.filter(item => item.id === _id)[0]
    if (classType(basic?.type!) === 'BASE_TYPE') {
      const newQues = JSON.parse(JSON.stringify(basic)) as IQuestion
      newQues.title = `请输入${newQues.title}`
      newQues.id = nanoid()
      setQuestionList([...QuestionList, newQues])
    } else if (classType(basic?.type!) === 'OPTION_TYPE') {
      const newQues = JSON.parse(JSON.stringify(basic)) as IQuestion
      newQues.id = nanoid()
      newQues.title = `请输入${newQues.title}`
      const newOptions = newQues.setting?.options.map(item => {
        item.id = nanoid()
        return item
      })
      newQues.setting!.options = newOptions as IOption[]
      setQuestionList([...QuestionList, newQues])
    }
  }

  return {
    addBasic
  }
}
