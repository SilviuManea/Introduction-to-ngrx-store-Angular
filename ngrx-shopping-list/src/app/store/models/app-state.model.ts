import { ShoppingItem } from "./shopping-item.model";

//Strict type interface for our state - its easyer to understand how the state changes trough our aplication
export interface AppState {
    readonly shopping:Array<ShoppingItem>
};