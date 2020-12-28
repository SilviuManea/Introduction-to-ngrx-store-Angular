# Introduction-to-ngrx-store-Angular
Simple Shopping list using ngrx/store with angular

Video - https://www.youtube.com/watch?v=KZkRGm1xC_I&ab_channel=PaulHalliday

Article - https://developer.school/introduction-to-ngrx-store/

----------------------------------------------------------1 - Setting up the project

# Ensure you've got the Angular CLI installed
$ npm i @angular/cli -g

# Create a new Angular project
$ ng new ngrx-shopping-list

> Don't add routing at this stage
> Style: SCSS

# Change directory
$ cd ngrx-shopping-list
We can then go ahead and install @ngrx/store and run this in the browser:

$ npm install @ngrx/store

$ ng serve

# In VSCode Create empty directory 'store' under src/app folder

----------------------------------------------------------2 - Adding the Shopping List

# Under store create new folder called 'models' and inside a new file called 'shopping-item.model.ts'

For this project, users are going to use a simple form to add items to a shopping list, therefore, we’ll need a model to represent this. Create the ShoppingItem model at: src/app/store/models/shopping-item.model.ts:

export interface ShoppingItem {
   id?: string;
   name: string;
}
