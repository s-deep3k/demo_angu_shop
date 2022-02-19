import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('NameRef') NameRef: ElementRef;
  @ViewChild('AmtRef') AmtRef: ElementRef;
  constructor(private shopService: ShopListService) {}

  ngOnInit(): void {}
  addIng() {
    const ingName = this.NameRef.nativeElement.value;
    const ingAmt = this.AmtRef.nativeElement.value;
    const ing = new Ingredient(ingName, ingAmt);
    this.shopService.addIngredient(ing);
  }
}
