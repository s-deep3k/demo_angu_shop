import { Component, Input, OnInit } from '@angular/core';
import { ShopListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeEl: Recipe;
  constructor(private shopService: ShopListService) {}

  ngOnInit(): void {}
  addToShopList() {
    this.shopService.addIngredients(this.recipeEl.ingredients);
  }
}
