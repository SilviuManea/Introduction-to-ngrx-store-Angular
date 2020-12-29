import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ShoppingReducer } from './store/reducers/shopping.reducer';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // we add the formsmodule
    StoreModule.forRoot({ // we register the storemodule for root(since the app is very small)
      shopping: ShoppingReducer, //we pass in the reducer.
    })
    //StoreModule.forFeature() //if we had shopping 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
