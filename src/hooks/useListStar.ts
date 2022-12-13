import { useContext, useEffect } from 'react'
import { getStars } from '../api/problem'
import { context } from './store'
export default function useStarList () {
  const { listStar, setListStar } = useContext(context)

  // 获得收藏题目数组 存到context中
  const getListStar = async () => {
    const res = await getStars()
    if (!res?.data.items) {
      setListStar([])
    } else {
      setListStar(res?.data.items)
    }
  }

  // 刷新题目
  const refreshStar = () => {
    getListStar()
  }
  useEffect(() => {
    getListStar()
  }, [])

  // 添加题目
  return {
    listStar,
    refreshStar
  }
}
