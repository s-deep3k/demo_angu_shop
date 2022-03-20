import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map,take,tap, } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
@Injectable()
export class DataStorageService{
    private baseUrl='https://angularshop-71fe9-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
    constructor(private http :HttpClient,private recService : RecipeService,private auth:AuthService){}

    fetchRecipes(){
            return this.http.get<Recipe[]>(this.baseUrl).pipe(map(recipes=>{
                return recipes.map(recipe=>{
                    return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
                })
            }),tap(recipes=>{
                this.recService.setRecipes(recipes)
            }))
    }
    saveRecipes(recipes:Recipe[]){
        this.http.put<Recipe[]>(this.baseUrl,recipes)
        .subscribe(data=>{
            console.log(data);
            alert("Data Saved Successfully!");
        })
    }
}