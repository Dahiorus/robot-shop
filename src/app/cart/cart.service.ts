import { Injectable } from '@angular/core';
import { Product } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<Product[]>('/api/cart').subscribe({
      next: cart => this.cart.next(cart),
    })
  }

  getCart(): Observable<Product[]> {
    return this.cart.asObservable();
  }
  
  add(product: Product): void {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart)
      .subscribe(() => {
        console.log(`Added ${product.name} to the cart`);
      });
  }

  remove(product: Product) {
    let newCart = this.cart.getValue().filter(p => p !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart)
      .subscribe(() => {
        console.log(`Removed ${product.name} from the cart`);
      });
  }
}
