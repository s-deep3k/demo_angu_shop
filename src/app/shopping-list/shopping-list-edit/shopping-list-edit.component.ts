import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit {
  @Output() ingAdd = new EventEmitter<Ingredient>();
  @ViewChild('NameRef') NameRef: ElementRef;
  @ViewChild('AmtRef') AmtRef: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  addIng() {
    const ingName = this.NameRef.nativeElement.value;
    const ingAmt = this.AmtRef.nativeElement.value;
    const ing = new Ingredient(ingName, ingAmt);
    this.ingAdd.emit(ing);
  }
}
