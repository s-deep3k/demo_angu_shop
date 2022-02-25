import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShopListService {
  ingredientChange = new Subject<Ingredient[]>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredByID(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientChange.next(this.ingredients.slice());
  }
  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
    this.ingredientChange.next(this.ingredients.slice());
  }
}
