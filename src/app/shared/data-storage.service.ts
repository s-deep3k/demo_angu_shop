import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map,tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
@Injectable()
export class DataStorageService{
    constructor(private http :HttpClient,private recService : RecipeService){}
    private baseUrl='https://angularshop-71fe9-default-rtdb.asia-southeast1.firebasedatabase.app/'
    fetchRecipes(){
        return this.http.get<Recipe[]>(this.baseUrl+'/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
            })
        }),tap(recipes=>{
            this.recService.setRecipes(recipes)
        }))
    }
    saveRecipes(recipes:Recipe[]){
        this.http.put<Recipe[]>(this.baseUrl+'/recipes.json',recipes)
        .subscribe(data=>{
            console.log(data);
            alert("Data Saved Successfully!");
        })
    }
}