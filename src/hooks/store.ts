import { createContext } from 'react'
import { IlistStar, IQuesRes, IQuestion } from '../libs/model'

interface StoreContext {
  // 所有任务
  QuestionList: IQuestion[],
  setQuestionList: (Question: IQuestion[]) => void

  // 保存标题
  title: string,
  setTitle: (title: string) => void

  // 副标题
  subTitle: string,
  setSubTitle: (title: string) => void

  // 保存草稿id
  draftId: string,
  setDraftId: (id: string) => void

  // 保存题目和答案
  QuesResList: IQuesRes[],
  setQuesResList: (QuesRes: IQuesRes[]) => void

  // 保存常用题
  listStar: IlistStar[],
  setListStar: (listStars: IlistStar[]) => void
}

const context = createContext<StoreContext>({
  QuestionList: [],
  setQuestionList: () => {},
  title: '',
  setTitle: () => {},
  subTitle: '',
  setSubTitle: () => {},
  draftId: '',
  setDraftId: () => {},
  QuesResList: [],
  setQuesResList: () => {},
  listStar: [],
  setListStar: () => {}
})

const StoreProvider = context.Provider

export { context, StoreProvider }
