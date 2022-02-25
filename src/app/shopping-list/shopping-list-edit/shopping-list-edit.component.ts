import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') sform: NgForm;
  editMode = false;
  editIndex: number;
  editingSub: Subscription;
  editItem: Ingredient;
  constructor(private shopService: ShopListService) {}
  ngOnInit(): void {
    this.editingSub = this.shopService.startEditing.subscribe((index) => {
      this.editMode = true;
      this.editIndex = index;
      this.editItem = this.shopService.getIngredByID(this.editIndex);
      this.sform.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      });
    });
  }
  addIng(form: NgForm) {
    const value = form.value;
    const ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shopService.updateIngredient(this.editIndex, ing);
    } else {
      this.shopService.addIngredient(ing);
    }
    this.editMode = false;
  }
  onClear() {
    this.sform.reset();
    this.editMode = false;
  }
  onDelete() {
    this.onClear();
    this.shopService.deleteIngredient(this.editIndex);
  }
  ngOnDestroy(): void {
    this.editingSub.unsubscribe();
  }
}
