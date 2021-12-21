let defaultState = {
  selectedAddress: { address: "" },
};

let addressReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_ADDRESS": {
      let newState = { ...state };

      if (action.payload) {
        console.log("ADD NEW ADDRESS");
        newState.selectedAddress = { address: action.payload };
        return newState;
      }
    }

    case "UPDATE_ADDRESS": {
      console.log("UPDATE ADDRESS");
      let newState = { ...state };

      if (action.payload.item != null) {
        newState.selectedAddress = {
          address: newState.selectedAddress.items.map((item, index) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
          }),
        };
      }
      return newState;
    }

    default:
      return state;
  }
};

export default addressReducer;
