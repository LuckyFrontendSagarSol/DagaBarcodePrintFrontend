const initialState = {
    showProgressBar: false,
  };

  
  const progressBarReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SHOW_PROGRESS_BAR':
        return {
          ...state,
          showProgressBar: true,
        };
      case 'HIDE_PROGRESS_BAR':
        return {
          ...state,
          showProgressBar: false,
        };
      default:
        return state;
    }
  };
  
  export default progressBarReducer;