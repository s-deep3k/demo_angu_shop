import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShopListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeEl: Recipe;
  index: number;
  constructor(
    private shopService: ShopListService,
    private recService: RecipeService,
    private route: ActivatedRoute,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.recipeEl = this.recService.getRecipeById(this.index);
    });
  }
  addToShopList() {
    this.shopService.addIngredients(this.recipeEl.ingredients);
  }
  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete(){
    this.recService.deleteRecipe(this.index)
    this.router.navigate(['/recipes'])
  }
}
