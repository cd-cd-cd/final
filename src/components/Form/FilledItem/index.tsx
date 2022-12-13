import { Input } from 'antd'
import React, { Fragment } from 'react'
import { IObjRes, IQuesRes, ISingleRes, TProblemType } from '../../../libs/model'
import starIcon from '../../../assets/imgs/collectStar.png'
import style from './index.module.scss'

interface Props {
  result: IQuesRes,
  index: number
}
export default function FilledItem ({ result, index }: Props) {
  // 没有内容提示
  const nodata = () => {
    return <div className={style.nodata}>此题未填写</div>
  }

  const returnResult = (type: TProblemType, value: ISingleRes) => {
    // 记录星星数量
    const starArray = []
    if (type === 'score') {
      for (let i = 0; i < (value as number); i++) {
        starArray.push(<img key={index} src={starIcon} className={style.star}></img>)
      }
    }
    // 根据type返回不同格式
    switch (type) {
      case 'input': {
        return <div className={style.res}>{value as string}</div>
      }
      case 'pullSelect':
      case 'singleSelect': {
        return <div className={style.res}>{(value as IObjRes).title }</div>
      }
      case 'date':
      case 'time': {
        return (
        <div className={style.input_box}>
          <Input value={value as string} bordered={false} className={style.input}></Input>
        </div>
        )
      }
      case 'multiSelect': {
        return (
        <Fragment>
          {
            (value as IObjRes[])
              .map(item =>
              <div key={item.id} className={style.multi}>{item.title}</div>
              )
          }
        </Fragment>
        )
      }
      case 'score': {
        return (
          <div className={style.star_box}>
            {starArray.map((_, index) => <img key={index} src={starIcon} className={style.star}></img>)}
            <span>{starArray.length}.0分</span>
          </div>
        )
      }
    }
  }
  return (
    <Fragment>
      {result.required ? <span className={style.require}>*</span> : null}
      <span className={style.rank}>{index + 1}.</span>
      <span className={style.question_title}>{result.title}</span>
      {result.result?.value ? returnResult(result.type, result.result?.value) : nodata()}
    </Fragment>
  )
}
