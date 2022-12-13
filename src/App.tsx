import React, { useState } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import FillDetail from './pages/FillDetail'
import Share from './pages/FillDetail/Share'
import Analysis from './pages/FillDetail/Analysis'
import Question from './pages/FillDetail/Question'
import FillForm from './pages/FillForm'
import { IlistStar, IQuesRes, IQuestion } from './libs/model'
import { StoreProvider } from '../src/hooks/store'
import NewForm from './pages/NewForm'
import Preview from './pages/Preview'
import PerCenter from './pages/PerCenter'

function App () {
  const [QuestionList, setQuestionList] = useState<IQuestion[]>([])
  const [title, setTitle] = useState('未命名标题')
  const [subTitle, setSubTitle] = useState('')
  const [draftId, setDraftId] = useState('')
  const [QuesResList, setQuesResList] = useState<IQuesRes[]>([])
  const [listStar, setListStar] = useState<IlistStar[]>([])
  return (
    <StoreProvider value={{
      QuestionList,
      setQuestionList,
      title,
      setTitle,
      subTitle,
      setSubTitle,
      draftId,
      setDraftId,
      QuesResList,
      setQuesResList,
      listStar,
      setListStar
    }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/form' element={<NewForm />}></Route>
          <Route path='/preview' element={<Preview />}></Route>
          <Route path='detail' element={<FillDetail />}>
            <Route path='analysis' element={<Analysis />}></Route>
            <Route path='question' element={<Question />}></Route>
            <Route path='share' element={<Share />}></Route>
          </Route>
          <Route path='/fill' element={<FillForm />}></Route>
          <Route path='/person' element={<PerCenter />}></Route>
          <Route path='/detail/' element={<Navigate to='/detail/analysis' />}></Route>
          <Route path='/detail/*' element={<Navigate to='/detail/analysis' />}></Route>
          <Route path='*' element={<Navigate to='/login' />}></Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
