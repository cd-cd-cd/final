import React from 'react'
import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import TemplateBtn from '../../../components/Btn/TemplateBtn'
import BaseBtn from '../../../components/Btn/BaseBtn'
import style from './index.module.scss'
import './index.css'
import useBtnType from '../../../hooks/useBtnType'
import StarBtn from '../../../components/Btn/StarBtn'
import useStarList from '../../../hooks/useListStar'
import useBasicProblem from '../../../hooks/useBasicProblem'
const { Panel } = Collapse

export default function CreateLeft () {
  const { typeList } = useBtnType()
  const { listStar } = useStarList()
  const { problems } = useBasicProblem()

  return (
    <div className={style.back}>
      <div className={style.title}>添加题目</div>
      <Collapse
        className={style.collapse}
        defaultActiveKey={['1', '2', '3']}
        ghost
        expandIcon={({ isActive }) => <CaretRightOutlined style={{ color: 'grey' }} rotate={isActive ? 90 : 0} />}
      >
        <Panel header="添加题目" key="1">
          <div className={style.btns}>
            {
              typeList?.map(item =>
                <BaseBtn key={item.type} type={item.type} title={item.title}></BaseBtn>)
            }
          </div>
        </Panel>
        <Panel header="题目模板" key="2" className={style.panel}>
          <div className={style.btns}>
            {
              problems?.map(item => <TemplateBtn key={item.id} id={item.id}></TemplateBtn>)
            }
          </div>
        </Panel>
        <Panel header="我的常用题" key="3" className={style.panel}>
          <div className={style.btns}>
            {
              listStar?.map(item => <StarBtn key={item.id} id={item.id} type={item.problem.type} title={item.problem.title}></StarBtn>)
            }
          </div>
        </Panel>
      </Collapse>
    </div>
  )
}
