# Introduction-to-ngrx-store-Angular
Simple Shopping list using ngrx/store with angular

Video - https://www.youtube.com/watch?v=KZkRGm1xC_I&ab_channel=PaulHalliday

Article - https://developer.school/introduction-to-ngrx-store/

# 1 - Setting up the project

// Ensure you've got the Angular CLI installed
$ npm i @angular/cli -g

// Create a new Angular project
$ ng new ngrx-shopping-list

> Don't add routing at this stage
> Style: SCSS

// Change directory
$ cd ngrx-shopping-list
We can then go ahead and install @ngrx/store and run this in the browser:

$ npm install @ngrx/store

$ ng serve

// In VSCode Create empty directory 'store' under src/app folder

# 2 - Adding the Shopping List

// Under store create new folder called 'models' and inside a new file called 'shopping-item.model.ts'

For this project, users are going to use a simple form to add items to a shopping list, therefore, we’ll need a model to represent this. Create the ShoppingItem model at: src/app/store/models/shopping-item.model.ts:

export interface ShoppingItem {
   id?: string;
   name: string;
}

# 3 - Adding an Action

In @ngrx/store, Actions represent the main building blocks that express the unique events occurring throughout the Angular application. Every user interaction that triggers a state update should be described using Actions.

Actions have two main properties: type and an optional payload:

type is a read-only string that represents the type of action dispatched into the application.
payload is an optional property that adds any related data required for completing the action.
We can go ahead and add two main actions to our application at src/app/store/actions/shopping.actions.ts:

import { Action } from '@ngrx/store';
import { ShoppingItem } from '../models/shopping-item.model';

export enum ShoppingActionTypes {
  ADD_ITEM = '[SHOPPING] Add Item',
}

export class AddItemAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM

  constructor(public payload: ShoppingItem) { }
}

export type ShoppingAction = AddItemAction
We're creating an enum which contains the ADD_ITEM Action type. This can then be used inside of the AddItemAction class which contains a payload (i.e. a new ShoppingItem).


