export default function useType () {
  const classType = (type: 'input' | 'singleSelect' | 'multiSelect' | 'pullSelect' | 'date' | 'time' | 'score') => {
    if (type === 'input' || type === 'date' || type === 'time' || type === 'score') {
      return 'BASE_TYPE'
    }
    if (type === 'singleSelect' || type === 'multiSelect' || type === 'pullSelect') {
      return 'OPTION_TYPE'
    }
  }
  return {
    classType
  }
}
