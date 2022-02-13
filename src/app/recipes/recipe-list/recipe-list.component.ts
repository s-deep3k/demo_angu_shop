import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[]=[
    new Recipe('Sushi','bheri tasty, khaba!?','https://www.vegrecipesofindia.com/wp-content/uploads/2014/12/paneer-khurchan-recipe-280x280.jpg'),
    new Recipe('Gin','bheri tasty, gilba!?','https://www.vegrecipesofindia.com/wp-content/uploads/2014/12/paneer-khurchan-recipe-280x280.jpg')
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
