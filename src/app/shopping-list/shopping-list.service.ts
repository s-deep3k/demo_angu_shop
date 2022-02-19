import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShopListService {
  ingredientChange = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientChange.emit(this.ingredients.slice());
  }
  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
    this.ingredientChange.emit(this.ingredients.slice());
  }
}
