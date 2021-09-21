
const initialState = {
  someProperty: null,
  otherProperty: null,
  // ...,
  finalProperty: null,
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOME_ACTION':
      return {
        ...state,
        someProperty: action.payload,
      }
    case 'OTHER_ACTION':
      return {
        ...state,
        someProperty: action.payload,
      }
    // ...
    case 'FINAL_ACTION':
      return {
        ...state,
        finalProperty: action.payload,
      }
    default:
      return state;
  }
};

export default MainReducer;