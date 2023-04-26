import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
    ingredients: Ingredient[] = [
      new Ingredient('Aardvarks', 4),
      new Ingredient('Shmoley', 3),
    ];

  constructor() {}

}
