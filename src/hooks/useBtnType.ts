import { useEffect, useState } from 'react'
import { getListType } from '../api/problem'
import { IProblemType } from '../libs/model'

export default function useBtnType () {
  const [typeList, setTypeList] = useState<IProblemType[]>()

  // 获取按钮类型数据
  const getType = async () => {
    const res = await getListType()
    setTypeList(res?.data.problemTypes)
  }
  useEffect(() => {
    getType()
  }, [])

  return {
    typeList
  }
}
