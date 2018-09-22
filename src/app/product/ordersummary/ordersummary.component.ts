import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartBaseComponent } from './cart-base.component';
import { ProductInst } from '../../model/product_inst';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
  providers: [ProductService, ProductInst, CartComponent]
})
export class OrdersummaryComponent extends CartBaseComponent implements OnInit {
  userId: string;
  product_id:any;
  userName: string;
  successMsg: string;
  orderList: any;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  total = 0;
  @Output() refreshShoppingCart = new EventEmitter();
  constructor(private product:ProductInst, protected productService: ProductService, private cartComponent: CartComponent,  private router: Router, private activatedRoute: ActivatedRoute) {    
    super(productService);
    this.userId = '1';
   
  }

  ngOnInit() {
    this.getOrderSummary();    
  }

  getOrderSummary() {
    this.productService.getOrderSummary(this.userId).subscribe(data => {
      if (data instanceof HttpResponse ) {
        //console.log(data.body);
        this.orderList = JSON.parse('' + data.body);
        //console.log(this.orderList);
        this.totalPrice = 0;
        this.orderList.forEach(element => {
          console.log(element);
          this.totalPrice = this.total + element.price * element.quantity;
        });
      }
    });
  }
//   changeQuantity = (product,quantity) => {
//     product.quantity = quantity;
//     this.productService.reloadCart(this.orderList);
// }
changeQuantity = (product,quantity) => {
     product.quantity = quantity;   
     this.productService.reloadCart(this.orderList);
     console.log("--gfh--"+quantity);
     console.log("-sd----"+product.quantity);
     console.log('ks--sa---'+product.product_id);
      this.productService.updateCart(product.product_id,quantity).subscribe(k =>{
        if (k.type == 4) {
          console.log('reload cart');
          this.productService.cartSubject.next(true);
          
        }
      });
      
      this.productService.cartSubject.next(true);
  // this.getOrderSummary();     

}


removeFromCart(index){ 
  console.log('sd----------'+index);
  console.log('sd----------'+this.orderList[index].product_id);  
  this.productService.deleteCartItem(this.orderList[index].product_id).subscribe(k =>{
    if (k.type == 4) {
      console.log('item deleted');
      this.productService.cartSubject.next(true);
    }
  });
 this.orderList.splice(index, 1);   
                
} 
  proceedToPayment() {
    this.router.navigateByUrl('paymentgatway')
  }

}
