import { TEST_ACTION, ADD_ADDRESS } from "../actions/index.actions";

const userReducer = (
  state = { addresses: [], isPackageHub: false },
  action
) => {
  switch (action.type) {
    case TEST_ACTION: {
      return { ...state, test_action: action.payload };
    }
    case ADD_ADDRESS: {
      let new_state = { ...state };
      if (typeof new_state.addresses === "undefined") {
        new_state.addresses = [];
      }
      let newAddys = [...new_state.addresses];
      newAddys.push(action.payload);
      console.log("TPOOOOOO: ");
      console.log({ ...state, addresses: newAddys });
      return { ...state, addresses: newAddys };
    }
    default:
      return state;
  }
};

export default userReducer;
