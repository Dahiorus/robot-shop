import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../catalog/product.model';

@Component({
  selector: 'shop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: Product;
  @Output() buy = new EventEmitter();

  getImageUrl() : string {
    return '/assets/images/robot-parts/' + this.product.imageName;
  }

  getDiscountedPrice() : number {
    return this.product.price * (1 - this.product.discount);
  }

  getDiscountedClasses() : string[] {
    if (this.product.discount === 0) {
      return [];
    }
    return ['strikethrough'];
  }

  buyButtonClicked() {
    this.buy.emit();
  }
}
