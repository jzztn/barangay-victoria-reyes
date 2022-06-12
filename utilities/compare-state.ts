const compareState = (newState: any, oldState: any) => {
  return JSON.stringify(newState) === JSON.stringify(oldState)
}

export default compareState
