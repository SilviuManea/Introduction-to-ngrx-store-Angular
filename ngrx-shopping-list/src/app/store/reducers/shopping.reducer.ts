import { ShoppingAction, ShoppingActionTypes } from "../actions/shopping.actions";
import { ShoppingItem } from "../models/shopping-item.model";


const initialState: Array<ShoppingItem> = [ //we represent one item inside of the array
    {
      id: "1775935f-36fd-467e-a667-09f95b917f6d",
      name: 'Diet Coke',
    },
    {
      id: "1775935f-36fd-467e-a667-09f95b917f6d",
      name: 'Fanta',
    }
  ];

  export function ShoppingReducer(state:Array<ShoppingItem> = initialState, action:
    ShoppingAction){
        switch(action.type){
            case ShoppingActionTypes.ADD_ITEM://if we have a add_item action
                //console.log(action.type, action.payload);
                return[...state,action.payload];//we return a new version of our state that takes the previus state and adds a new item(payload)
            case ShoppingActionTypes.DELETE_ITEM:
                //console.log(action.type, action.payload);  
                return state.filter(item => item.id !== action.payload); //it returns a new array(without mutating the state) and this allows us to remove the item if we dont want it inside of the list. Never use Array.splice to mutate the state itself.           
            default://when no action matcher a shopping action we return the initial state
                return state;
        }
    }