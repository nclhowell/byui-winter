import { Component } from '@angular/core';
import { Recipe } from '../recipe.model'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Description of the Test Recipe', 'https://img.freepik.com/free-psd/restaurant-vintage-badge-template-psd-set-remixed-from-public-domain-artworks_53876-141767.jpg?w=740&t=st=1675393339~exp=1675393939~hmac=1187a537ad4c56c4cca6d28b2954d7834f85d0b20a243e5e7ef69b60d7b9cfbe'),

    new Recipe('A Test Recipe', 'Description of the Test Recipe', 'https://img.freepik.com/free-psd/restaurant-vintage-badge-template-psd-set-remixed-from-public-domain-artworks_53876-141767.jpg?w=740&t=st=1675393339~exp=1675393939~hmac=1187a537ad4c56c4cca6d28b2954d7834f85d0b20a243e5e7ef69b60d7b9cfbe')];
}
