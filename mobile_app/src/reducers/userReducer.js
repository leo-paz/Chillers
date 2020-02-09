import {TEST_ACTION} from '../actions/index.actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
  case TEST_ACTION: {
    return {...state, test_action: action.payload}
  }
  default:
    return state;
  }
};

export default userReducer;