import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'shop-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products!: Product[];
  filter: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
    this.route.queryParams.subscribe(params => this.filter = params['filter'] ?? '');
  }

  addToCart(product: Product): void {
    this.cartService.add(product);
    this.router.navigate(['/cart']);
  }
  
  getFilteredProducts() : Product[] {
    return this.filter === ''
      ? this.products
      : this.products.filter(product => product.category === this.filter);
  }
}
