export const AuthReducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'SET AUTH':
      return {
        ...state,
      }
    default:
      return state
  }
}