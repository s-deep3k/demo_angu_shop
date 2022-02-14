import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipe!: Recipe;
  flag = false;
  constructor() {}

  ngOnInit(): void {}
  onDetailRcv(recipe: Recipe) {
    this.flag = true;
    this.recipe = recipe;
  }
}
