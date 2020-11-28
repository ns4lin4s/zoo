const reducer = (state, action) => {
  switch (action.type) {
    case 'TOKEN_REQUEST':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
