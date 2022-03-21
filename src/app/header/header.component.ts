import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit,OnDestroy {
  private authSub:Subscription
  isAuthenticated=false
  constructor(private recService:RecipeService,private dataService:DataStorageService,private authService:AuthService){}
  ngOnInit(): void {
    this.authSub = this.authService.userData.subscribe(user=>{
      this.isAuthenticated=!!user
    })
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe()
  }

  onSave(){
    this.dataService.saveRecipes(this.recService.getRecipes())
  }
  onFetch(){
    this.dataService.fetchRecipes().subscribe()
  }
  onLogout(){
    this.authService.logout()
  }
}
