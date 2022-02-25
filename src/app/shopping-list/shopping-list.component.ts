import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShopListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientSub: Subscription;
  constructor(private shopService: ShopListService) {}

  ngOnInit(): void {
    this.ingredients = this.shopService.getIngredients();
    this.ingredientSub = this.shopService.ingredientChange.subscribe((ing) => {
      this.ingredients = ing;
    });
  }
  onItemClick(index: number) {
    this.shopService.startEditing.next(index);
  }

  ngOnDestroy() {
    this.ingredientSub.unsubscribe();
  }
}
