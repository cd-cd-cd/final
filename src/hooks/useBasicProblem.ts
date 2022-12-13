import { useEffect, useState } from 'react'
import { getBasicProblems } from '../api/problem'
import { IProblem, TProblemType } from '../libs/model'

export default function useBasicProblem () {
  const [problems, setProblems] = useState<Omit<IProblem<TProblemType>, 'result'>[]>()

  // 获得基础题目
  const getProblem = async () => {
    const res = await getBasicProblems()
    setProblems(res?.data.basicProblems)
  }

  useEffect(() => {
    getProblem()
  }, [])

  return {
    problems
  }
}
