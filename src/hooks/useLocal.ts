import { EFormStatus } from '../libs/model'

interface IState {
  id: string,
  title: string,
  status: EFormStatus
}
export default function useLocal () {
  const getState = (state?: IState) => {
    let currentState: IState
    if (state) {
      currentState = state
      localStorage.setItem('state', JSON.stringify(state))
    } else {
      currentState = JSON.parse(localStorage.getItem('state') as string)
    }
    return currentState
  }

  return {
    getState
  }
}
