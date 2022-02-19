import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() itemEvent = new EventEmitter<Recipe>();
  recipes: Recipe[];
  constructor(private recService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recService.getRecipes();
  }
  onItemClick(recipe: Recipe) {
    this.itemEvent.emit(recipe);
  }
}
