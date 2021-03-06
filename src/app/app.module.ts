import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { DropDownDirective } from './shared/dropdown.directive';
import { ShopListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './loader/loader.component'
import { AuthInterceptorService } from './shared/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    ShoppingListEditComponent,
    RecipeItemComponent,
    DropDownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  providers: [ShopListService,RecipeService,DataStorageService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
