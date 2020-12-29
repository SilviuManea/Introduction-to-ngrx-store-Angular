import { Action } from '@ngrx/store';
import { ShoppingItem } from '../models/shopping-item.model';

export enum ShoppingActionTypes {
    ADD_ITEM = '[SHOPPING] Add Item',
    //ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
    //ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure',
    DELETE_ITEM = '[SHOPPING] Delete Item'
}

export class AddItemAction implements Action {
    readonly type = ShoppingActionTypes.ADD_ITEM; //represents the type of action we are going to dispatch to the store

    constructor(public payload:ShoppingItem){} //the payload is some optional data that goes alongside this action, in this case when a user adds an item is of type ShoppingItem

}

export class DeleteItemAction implements Action {
    readonly type = ShoppingActionTypes.DELETE_ITEM;

    constructor(public payload:string){} //this payload will be the id(of type string) of the object



}

export type ShoppingAction = AddItemAction | DeleteItemAction; //add or delete action