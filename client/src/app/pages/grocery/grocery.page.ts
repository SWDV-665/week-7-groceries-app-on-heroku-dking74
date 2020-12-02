import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import Grocery from '@models/grocery';
import { GroceryItemService, GroceryDialogService } from '@services';
import { ToastClass } from '@types';

@Component({
  selector: 'grocery-tab',
  templateUrl: 'grocery.page.html',
  styleUrls: ['grocery.page.scss']
})
export class GroceryPage {
  groceries: Array<Grocery> = [];

  constructor(
      private toastController: ToastController,
      private groceryItemService: GroceryItemService,
      private groceryDialogService: GroceryDialogService,
      private socialSharing: SocialSharing
  ) {
    // Set the initial value of the groceries array and subscribe to updates to it
    this._getGroceryItems();
    this.groceryItemService.groceriesChanged
      .subscribe(groceriesChanged => this._getGroceryItems());
  }

  private _getGroceryItems() {
    this.groceryItemService.getAll()
      .subscribe((groceries: Array<Grocery>) => this.groceries = groceries);
  }

  async addGroceryItem() {
    const item: Grocery = await this.groceryDialogService.addGroceryItem();
    if (item) {
      this.displayToastMessage(`Grocery item '${item.name}' was added`, ToastClass.ADD_ITEM);
    }
  }

  async shareGroceryItem(groceryItem: Grocery) {
    this.socialSharing.share(groceryItem.toString());
  }

  async editGroceryItem(groceryItem: Grocery) {
    const item: Grocery = await this.groceryDialogService.editGroceryItem(groceryItem);
    if (item) {
      this.displayToastMessage(`Grocery item '${item.name}' was updated`, ToastClass.UPDATE_ITEM);
    }
  }

  async deleteGroceryItem(groceryItem: Grocery) {
    await this.groceryItemService.delete(groceryItem);
    this.displayToastMessage(`Grocery item '${groceryItem.name}' was removed`, ToastClass.REMOVE_ITEM);
  }

  addQuantityToGroceryItem(grocery: Grocery) {
    ++grocery.quantity;
    this.groceryItemService.update(grocery);
  }

  dropQuantityToGroceryItem(grocery: Grocery) {
    grocery.quantity = (grocery.quantity > 0) ? --grocery.quantity : grocery.quantity;
    this.groceryItemService.update(grocery);
  }

  private displayToastMessage(message: string, messageClass: ToastClass) {
    this.toastController.create({
      message,
      position: 'top',
      color: messageClass,
      duration: 3000
    }).then((ctrl) => ctrl.present());
  }
}
