import { ProductReducer } from "../../models/Product";

let defaultState: ProductReducer = {
  selectedItems: { items: [] },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };

      if (action.payload) {
        //console.log("ADD TO CART");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
        };
        return newState;
      }
    }
    case "REMOVE_FROM_CART": {
      //console.log("REMOVE FROM CART");
      let newState = { ...state };

      newState.selectedItems = {
        items: [
          ...newState.selectedItems.items.filter(
            (item) => item.id !== action.payload.id
          ),
        ],
      };
      //console.log(newState.selectedItems.items, "👉");
      return newState;
    }

    case "UPDATE_QUANTITY": {
      //console.log("ADD QUANTITY");
      let newState = { ...state };

      if (action.payload.item != null) {
        newState.selectedItems = {
          items: newState.selectedItems.items.map((item, index) => {
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

export default cartReducer;
