import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = [
    new Recipe(
      'Sticky Tofu',
      'bheri tasty, khaba!?',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sweet-and-sticky-tofu-with-baby-bok-choy-1642786258.jpg?crop=0.731xw:0.486xh;0.139xw,0.257xh&resize=640:*',
      [new Ingredient('BokChoy', 2), new Ingredient('Eggs', 1)]
    ),
    new Recipe(
      'Paneer Khurchan',
      'bheri tasty, gilba!?',
      'https://www.vegrecipesofindia.com/wp-content/uploads/2014/12/paneer-khurchan-recipe-280x280.jpg',
      [new Ingredient('Paneer', 8), new Ingredient('Coriander', 2)]
    ),
  ];
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }
  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
