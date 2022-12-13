// 选项状态
export enum ESelectOptionStatus {
  // eslint-disable-next-line no-unused-vars
  delete,
  // eslint-disable-next-line no-unused-vars
  normal
}
// 题目类型
export type TProblemType =
  | 'input'
  | 'singleSelect'
  | 'multiSelect'
  | 'pullSelect'
  | 'date'
  | 'time'
  | 'score'

export interface IQuestion {
  id: string;
  title: string;
  type: TProblemType;
  required: boolean;
  isNew: boolean;
  setting?: {
    options: {
      id: string;
      title: string;
      status: 1 | 2
    }[]
  }
}

// 答案类型
export interface IRes {
  value: string | number | {
      id: string
      title: string
    } | {
      id: string
      title: string
    }[]
}
// 对象形式的答案
export type IObjRes = {
  id: string
  title: string
}

export type ISingleRes = string | number | IObjRes | IObjRes[] | undefined

// 问题和答案
export interface IQuesRes extends IQuestion {
  result?: IRes
}

export type IMultiValue = {
  id: string
  title: string
}

export interface IOption {
  id: string
  title: string,
  status: 1 | 2
}

export interface IForm {
  title: string,
  subTitle: string,
  problems: IQuestion[]
}
// 选项
export interface ISelectOption {
  id: string;
  title: string;
  status: ESelectOptionStatus;
}
export interface IProblemType {
  title: string;
  type: TProblemType;
}

// 单选题结果
export interface ISingleResult {
  value: Omit<ISelectOption, 'status'>;
}

// 多选题结果
export interface IMultiResult {
  value: Omit<ISelectOption, 'status'>[];
}

// 填空题结果
export interface IInputResult {
  value: string;
}

// 分数题结果
export interface IScoreResult {
  value: number;
}
// 选择设置
export interface ISelectSetting {
  options: ISelectOption[];
  // other: boolean;
}

// 题目设置
export type TSetting<T extends TProblemType> = T extends 'singleSelect'
  ? ISelectSetting
  : T extends 'multiSelect'
  ? ISelectSetting
  : T extends 'pullSelect'
  ? ISelectSetting
  : null;

// 题目结果
export type TResult<T extends TProblemType> = T extends 'singleSelect'
  ? ISingleResult
  : T extends 'multiSelect'
  ? IMultiResult
  : T extends 'pullSelect'
  ? ISingleResult
  : T extends 'score'
  ? IScoreResult
  : IInputResult;
// 表单类型
export type IProblem<Type extends TProblemType> = {
  id?: string;
  type: Type;
  title: string;
  required: boolean;
  setting: TSetting<Type>;
  result?: TResult<Type>;
}

// 表单状态
export enum EFormStatus {
  // eslint-disable-next-line no-unused-vars
  delete = 1,
  // eslint-disable-next-line no-unused-vars
  normal,
  // eslint-disable-next-line no-unused-vars
  ing,
  // eslint-disable-next-line no-unused-vars
  end,
}

// 单个表单
export interface singleList {
  author: string,
  ctime: number,
  id: string,
  isStar: boolean,
  status: EFormStatus,
  subTitle: string,
  title: string,
  utime: number,
  problems: IQuestion[]
}

export interface IDataSource extends singleList {
  key: string,
  time: string,
  reStatus?: string,
}
// 表单列表
export interface resList {
  items: singleList[]
}

export interface item {
  formAuthor: string,
  formId: string,
  id: string,
  result: IQuesRes[]
}
// 所有表单数据
export interface resFormResult {
  info: singleList,
  items: item[]
}

export enum EStatus {
  // eslint-disable-next-line no-unused-vars
  delete = 1,
  // eslint-disable-next-line no-unused-vars
  normal,
}
// 用户
export interface IUser {
  id: string;
  nickname: string;
  account: string;
  status: EStatus;
  pwd: string;
  avatar: string;
  ctime: number;
  utime: number;
}

export interface IlistStar {
  id: string
  problem: {
    id: string
    isNew: boolean
    required: boolean
    title: string
    type: TProblemType
  }
  status: 1 | 2
  uId: string
}
