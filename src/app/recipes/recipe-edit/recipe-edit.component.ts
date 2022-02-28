import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recService: RecipeService,
    private router: Router
  ) {}
  get controls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  navigateAway(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onSubmit() {
    console.log(this.form.value);
    
    if(this.editMode){
      this.recService.updateRecipe(this.id,this.form.value)
    }else{
      this.recService.addRecipe(this.form.value)
    }
    this.navigateAway()
  }
  onAddIngredient(){
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.form.get('ingredients')).removeAt(index)
  }
  private initForm() {
    let recipeName = '';
    let recipeImg = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImg = recipe.imagePath;
      recipeDesc = recipe.desc;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
            })
          );
        }
      }
    }
    this.form = new FormGroup({
     'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImg,Validators.required),
      'desc': new FormControl(recipeDesc,Validators.required),
      'ingredients': recipeIngredients,
    });
  }
}
