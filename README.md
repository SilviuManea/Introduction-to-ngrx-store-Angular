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

# 4 - Adding a Reducer

Reducers are the second essential aspect of an @ngrx/store application. They play the critical role of managing the transitions taking place from one state to the next.

As pure functions, reducers generate the same output for a given input. Reducers accept two arguments, which are the previous state as well as the latest dispatched Action, and either returns a newly changed state or the unchanged state.

To add a reducer to our project, let’s create this folder and file: /src/app/store/reducers/shopping.reducer.ts.

import { ShoppingActionTypes, ShoppingAction } from '../actions/shopping.actions';
import { ShoppingItem } from '../models/shopping-item.model';

const initialState: Array<ShoppingItem> = [
  {
    id: "1775935f-36fd-467e-a667-09f95b917f6d",
    name: 'Diet Coke',
  }
];

export function ShoppingReducer(state: Array<ShoppingItem> = initialState, action: ShoppingAction) {
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      return [...state, action.payload];
    default:
      return state;
  }
}
The reducer takes in the initial state which contains our Diet Coke and a dispatched action. It then checks which action.type has been fired and subsequently reduces this to a value that represents the same structure as before but with different data.

For example, whenever we call the ADD_ITEM action, the reducer takes the previous state and appends the action.payload (i.e. the new Shopping item) to the end of the list.

This then gives us a new version of state that matches the previous structure or in the case of no action.type being found inside of our shoppingReducer, it simply returns the state.

# 5 - App-state

Next, we can create an interface for our AppState inside of src/store/models/app-state.model.ts.

import { ShoppingItem } from './shopping-item.model';

export interface AppState {
  readonly shopping: Array<ShoppingItem>
}
This will allow us to type the structure of our Store and make it easier to select slices of state in the future. We'll be using this in a moment, until then, we need to register our shopping reducer as a root reducer.

# 6 - Adding imports to App.Module 


Let’s update the /src/app/app.module.ts file with imports of @ngrx/store and the reducer we created earlier. We'll also be using ngModel later to capture user input, ensure you've imported FormsModule too.

import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'; 

import { ShoppingReducer } from './reducers/shopping.reducer';

@NgModule({
 imports: [
   BrowserModule,
   FormsModule,
   StoreModule.forRoot({
     shopping: ShoppingReducer
   })
 ],
 
# 7 - Adding Reading, Writing, and Deleting Capabilities

Here's the fun part. We can wire the store up to our UI and see our shopping list in action!

I've elected to add some slight CSS to our list that you may want to add inside of app.component.scss:

#wrapper {
  text-align: center;
  color: white;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  width: 400px;
  margin: 0 auto;
}

#shopping-list {
  box-shadow: 20px 20px 0px #222f3e;
}

form {
  display: flex;
  flex-direction: row;
}

form > input {
  flex-grow: 1;
  outline: none;
  padding-left: 4px;
  border: 0px;
  height: 20px;
}

form > button {
  border: 0px;
  background: #10ac84;
  color: white;
  outline: none;

  &:hover {
    background: #006266;
  }
}

ul {
  list-style: none;
  background: #1dd1a1;
  padding: 10px 0px;
  margin: 0px;
}

li {
  padding-bottom: 4px;
}

h2 {
  background: #10ac84;
  padding: 10px 0px;
  margin: 0px;
}
I've also changed the background color of the body inside of styles.scss:

body {
  background-color: #576574;
}

# 8 - Selecting State

In order to display shopping items, we'll need to select the shopping slice of state from our store. @ngrx makes this easy with a select method which provides us with a reactive Observable:

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ShoppingItem } from './store/models/shopping-item.model';
import { AppState } from './store/models/app-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  shoppingItems: Observable<Array<ShoppingItem>>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping);
  }
}
Our shoppingItems observable matches the shopping reducer that we defined in our StoreModule.forRoot() earlier. We also created the AppState interface to match this and give us strong typing.

As a note, we could have also selected our shopping slice by string, providing it matched the reducer definition:

this.shoppingItems = this.store.select('shopping');
We can then display this on screen with the following mark-up:

<div id="wrapper">
  
  <div id="shopping-list">
    <div id="list">
      <h2>Shopping List</h2>

      <ul>
        <li *ngFor="let shopping of shoppingItems | async">
          {{ shopping.name }}
        </li>
      </ul>
    </div>
  </div>
  
</div>
The most important consideration here is the automatic subscription to our shoppingItems observable with the async pipe. Angular will then handle the subscription/unsubscription events for us automatically.

# 9 - Adding new items

In order to add a new item to our store, we'll need to dispatch an AddItemAction with the payload of a new ShoppingItem. Let's take a look at how we can do that:

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';
import { AddItemAction } from './store/actions/shopping.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  shoppingItems: Observable<Array<ShoppingItem>>;
  newShoppingItem: ShoppingItem = { id: '', name: '' }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.shoppingItems = this.store.select(store => store.shopping);
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddItemAction(this.newShoppingItem));

    this.newShoppingItem = { id: '', name: '' };
  }
}
We're able to generate a unique id with the uuid library. We don't have to install this into our project as it comes by default as a dependency to angular. At this point we'll also need to update our app.component.html to add our form:

<div id="wrapper">
  <div id="shopping-list">
    <div id="list">
      <h2>Shopping List</h2>

      <ul>
        <li *ngFor="let shopping of shoppingItems | async">
          {{ shopping.name }}
          <br><br>
        </li>
      </ul>
    </div>

    <form (ngSubmit)="addItem()">
      <input type="text" [(ngModel)]="newShoppingItem.name" placeholder="Item" name="itemName"/>
      <button type="submit" >+</button>
    </form>
  </div>
</div>
Here's what happens once we hit the + button:

1.The AddItemAction is fired with the payload of newShoppingItem.
2.Our shoppingReducer sees the new action and filters by action.type.
3.As the action.type is [SHOPPING] Add Item the newShoppingItem is added to the end of our array: [...state, action.payload],
4.The shopping slice of state is updated and as we're subscribed to changes with the async pipe our UI updates.

# 10 - Deleting items

If you've come this far, great job! Here's a challenge for you:

Add the ability to delete a selected item by id

When we start thinking about how we can add another feature to our project using the @ngrx pattern, things start to become systematic. We need the following:

An action
A reducer case and statement
To start with, update the shopping.actions.ts with a new DELETE action:

import { Action } from '@ngrx/store';
import { ShoppingItem } from '../models/shopping-item.model';

export enum ShoppingActionTypes {
  ADD_ITEM = '[SHOPPING] Add Item',
  DELETE_ITEM = '[SHOPPING] Delete Item'
}

export class AddItemAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM

  constructor(public payload: ShoppingItem) { }
}

export class DeleteItemAction implements Action {
  readonly type = ShoppingActionTypes.DELETE_ITEM

  constructor(public payload: string) { }
}

export type ShoppingAction = AddItemAction | DeleteItemAction
We've added an item to the ShoppingActionTypes and a new DeleteItemAction. As well as that, we've updated the ShoppingAction type to be either an AddItemAction or DeleteItemAction.

Next up, we need to add a reducer case which uses filter to return a new array that doesn't contain the selected shopping item.

It's important that you don't mutate the state itself and always return a new array. For example, never use Array.splice to mutate the state itself.

export function ShoppingReducer(state: Array<ShoppingItem> = initialState, action: ShoppingAction) {
  switch (action.type) {
    case ShoppingActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case ShoppingActionTypes.DELETE_ITEM:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
}
Now we'll need to update our app.component.ts and app.component.html to include the ability to dispatch a DeleteItemAction based on a selected id.

Starting with the HTML file, update your li to include a click event that calls a deleteItem function:

<li *ngFor="let shopping of shoppingItems | async" (click)="deleteItem(shopping.id)">
  {{ shopping.name }}
</li>
Finally, update app.component.ts with the deleteItem function which uses the specified id:

    import { AddItemAction, DeleteItemAction } from './store/actions/shopping.actions';

export class AppComponent implements OnInit {

  // Omitted

  deleteItem(id: string) {
    this.store.dispatch(new DeleteItemAction(id));
  }
}
Here's our completely empty shopping list with no items now that we've deleted everything.

# 11 Adding @ngrx/store-devtools

Adding @ngrx/store-devtools
Wouldn't it be awesome if we could visualise our state changes without needing to build out a fancy UI? As well as this, what if something goes wrong?

We can take advantage of the Redux Extension for Chrome/Firefox/X and see each action.type, payload and much more every time its fired like this:

The best part? It's one command away from being in your project! Using the Angular CLI we can add it straight-up with one command:

$ ng add @ngrx/store-devtools
This does the following:

Installing packages for tooling via npm.
+ @ngrx/store-devtools@7.4.0
added 1 package

Installed packages for tooling via npm.
UPDATE src/app/app.module.ts (977 bytes)
UPDATE package.json (1381 bytes)
As well as installing @ngrx/store-devtools, it also adds the StoreDevtoolsModule into our app.module.ts imports:

imports: [
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
],
Now any time we perform an action (such as Add or Delete) we can see the a significant amount of surrounding data:


