import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AddItemAction, DeleteItemAction, ShoppingActionTypes } from './store/actions/shopping.actions';
import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  shoppingItems$: Observable<Array<ShoppingItem>>; //we create the observable where we retreive the item
  newShoppingItem: ShoppingItem = {id:'' , name: ''};//create the new empty shopping item
  
  //the constructor tells ngrx how our store looks
  constructor(private store:Store<AppState>){}//the constructor will be injecting our store with the appstate

  ngOnInit():void{
    this.shoppingItems$ = this.store.select(store => store.shopping); //carga nuestro observable con los valores de la store

    //setTimeout(() => this.addItem(),2000); //-Just for test 
  }

  //add a new shopping item
  addItem(){
    this.newShoppingItem.id = uuid();//set the id for the new item
    this.store.dispatch(new AddItemAction(this.newShoppingItem)); // add the item
    this.newShoppingItem = { id: '' , name: ''};//once added we clear the object for the next item
  }

  //remove shopping item
  deleteItem(id: string){
    this.store.dispatch(new DeleteItemAction(id));
  }

}
