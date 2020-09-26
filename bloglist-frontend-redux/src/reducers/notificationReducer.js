const notificationReducer = (
  state = { notification: null, isError: false },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { notification: action.data, isError: action.isError }
    default:
      return state
  }
}

export const addNewNotification = (notification, isError) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification,
    isError,
  }
}

export default notificationReducer
