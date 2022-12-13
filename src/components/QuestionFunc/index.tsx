import React, { Fragment } from 'react'
import { Checkbox, Select, Button, Dropdown, Space, Menu, Popover } from 'antd'
import { ESelectOptionStatus, IProblemType, TProblemType } from '../../libs/model'
import drop from '../../assets/imgs/drop.svg'
import trash from '../../assets/imgs/trash.svg'
import omit from '../../assets/imgs/omit.svg'
import type { MenuProps } from 'antd'
import useQuestions from '../../hooks/useQuestions'
import style from './index.module.scss'
import useStar from '../../hooks/useStar'
const { Option } = Select
interface Props {
  item: {
    id: string
    title: string,
    type: TProblemType,
    required: boolean,
    isNew: boolean,
    setting?: {
      options: {
        title: string,
        status: ESelectOptionStatus
      }[]
    }
  },
  typeList: IProblemType[] | undefined
}

export default function QuestionFunc ({ item, typeList }: Props) {
  const handleChange = (value: TProblemType) => {
    changeType(item.id, value)
  }
  const { deleteQuestion, toggleRequire, changeType, allRequired, unRequired, copyQuestion } = useQuestions()
  const { addStar } = useStar()
  // 删除
  const deleteContent = (
    <div className={style.delete_content} onClick={() => { deleteQuestion(item.id) }}>删除</div>
  )
  // 添加为常用题
  const addCommonContent = (
    <div className={style.add_common_content} onClick={() => addStar(item.id)}>将此题添加为常用题</div>
  )
  // 设置全必填 全非必填
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      allRequired()
    } else if (key === '2') {
      unRequired()
    }
  }

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: '设置所有题目为必填',
          key: '1'
        },
        {
          label: '设置所有题目为非必填',
          key: '2'
        }
      ]}
    />
  )

  return (
    <Fragment>
      <div className={style.solid_line}></div>
      <div className={style.func_bottom}>
        {/* 选择题型 */}
        <div className={style.func_bottom_left}>
          <Select defaultValue={item.type} style={{ width: 80 }} size='small' onChange={handleChange} className={style.select}>
            {
              typeList?.map(item =>
                <Option key={item.title} value={item.type} className={style.select}>{item.title}</Option>
              )
            }
          </Select>
        </div>
        <div className={style.func_bottom_right}>
          {/* 复制 */}
          <Button className={style.copy_btn} size='small' onClick={() => copyQuestion(item.id)}>复制</Button>
          <div className={style.vertical_line}></div>
          {/* 必填选项 */}
          <span className={style.require}>必填</span>
          <Checkbox className={style.require_checkbox}
            checked={item.required}
            onChange={() => toggleRequire(item.id)}
          ></Checkbox>
          {/* 设置所有必填、非必填 */}
          <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                <img src={drop} className={style.dropIcon}></img>
              </Space>
            </a>
          </Dropdown>
          <div className={style.vertical_line}></div>
          {/* 删除 */}
          <div>
            <Popover content={deleteContent} trigger="hover" placement="bottom" >
              <img src={trash} className={style.dropIcon} onClick={() => { deleteQuestion(item.id) }}></img>
            </Popover>
          </div>
          <div style={{ margin: '0 0 0 5px' }}>
            {/* 设置为常用题 */}
            <Popover content={addCommonContent} trigger="click" placement="bottom">
              <img src={omit} className={style.dropIcon}></img>
            </Popover>
          </div>
        </div>
      </div>
      <div>
      </div>
    </Fragment>
  )
}
