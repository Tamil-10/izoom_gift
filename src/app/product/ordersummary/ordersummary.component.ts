import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartBaseComponent } from './cart-base.component';
import { ProductInst } from '../../model/product_inst';
import { CartComponent } from '../cart/cart.component';
import { CookieService } from 'ngx-cookie-service';
import { AddCartService } from '../../service/add-cart.service';

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
  contentList:any;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  total = 0;
  cookieValue = 'UNKNOWN';
  @Output() refreshShoppingCart = new EventEmitter();
  constructor(private product:ProductInst, protected productService: ProductService,private addCartService: AddCartService, private cartComponent: CartComponent,  private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {    
    super(productService);
    this.userId = this.cookieService.get('userId');
    this.cookieValue = this.cookieService.get('LoggedUser');
    console.log('userid'+this.userId);
   
  }

  ngOnInit() {
    this.userName = 'pandian'
    this.getOrderSummary();    
    
  }







  getOrderSummary() {
  
  if(this.cookieValue=='UNKNOWN'||this.cookieValue==''||this.cookieValue==null)
  {

    this.orderList= JSON.parse(localStorage.getItem('cart'));
    this.totalPrice = 0;
    for(let product of this.orderList) {               
                  this.totalPrice += product.price * product.quantity;
                  
              }


    // //alert("product id="+JSON.parse(localStorage.getItem('cart.product_id')));
    // for(let order of this.orderList) {
    //   console.log("local data.."+order.price);

    //   this.addCartService.getContent(order.product_id)
    //   .subscribe(
    //       data => {
    //         if (data instanceof HttpResponse ) {
    //           this.product = JSON.parse('' + data.body);
    //           console.log('product'+this.product.content);
    //           //console.log(this.orderList);
    //           this.totalPrice = 0;

    //           // this.orderList.forEach(element => {
    //           //   console.log("element---"+element);
    //           //   this.totalPrice = element.price * element.quantity;
    //           // });

    //           // let product=null;
    //           // product.quantity=this.orderList.quantity;
    //           // product.price=this.orderList.price;
    //           // product.content=this.orderList.content;
    //           // product.content_type=this.orderList.content_type;

    //         //   for(let product of this.orderList) {
    //         //     product.quantity=order.quantity;

    //         //     this.totalPrice += product.price * product.quantity;
                
    //         // }

    //           this.contentList = JSON.parse('' + data.body);
    //        this.product.content_type=this.contentList.content_type;
    //         this.product.content=this.contentList.content;
    //         console.log("returned back"+this.product.content);
            
          
          
    //       }
    //       },
    //       error => {
  
    //     //    alert("error occured");
    //           // this.alertService.error(error);
    //           // this.loading = false;
    //       });

      


      //this.totalPrice += product.price * product.quantity;
      

  }

  
  else
  {
  
  
    this.productService.getOrderSummary(this.userId).subscribe(data => {
      if (data instanceof HttpResponse ) {
        //console.log(data.body);
        this.orderList = JSON.parse('' + data.body);
        //console.log(this.orderList);
        this.totalPrice = 0;
        // this.orderList.forEach(element => {
        //   console.log("element---"+element);
        //   this.totalPrice = element.price * element.quantity;
        // });
        for(let product of this.orderList) {
          this.totalPrice += product.price * product.quantity;
          
      }
      }
    });
  }
  }







//   changeQuantity = (product,quantity) => {
//     product.quantity = quantity;
//     this.productService.reloadCart(this.orderList);
// }
changeQuantity = (product,quantity) => {
  if(this.cookieValue=='UNKNOWN'||this.cookieValue=='')
  {
 
    let productInst = new ProductInst();
    alert('quantity+'+quantity);
    productInst.quantity = quantity;
    productInst.price = product.price;
    productInst.product_id = product.product_id;
    productInst.user_id = Number(this.userId);
    productInst.created_by = this.userName;
    productInst.status = 'Draft';
    productInst.content=product.content;
    productInst.content_type=product.content_type;
    console.log(productInst);


    this.addCartService.createLocalStorage(productInst)
    .subscribe(
        data => {

          alert("returned back");

            // this.alertService.success('Registration successful', true);
            // this.router.navigate(['login']);
        },
        error => {

          alert("error occured");
            // this.alertService.error(error);
            // this.loading = false;
        });
        this.getOrderSummary();  
  }
  else{
     product.quantity = quantity;   
     this.productService.reloadCart(this.orderList);
     console.log("--gfh--"+quantity);
     console.log("-sd----"+product.quantity);
     console.log('ks--sa---'+product.product_id);
      this.productService.updateCart(product.product_id,quantity).subscribe(k =>{
        if (k.type == 4) {
          console.log('reload cart');
          
          
        }
      });
      
      this.productService.cartSubject.next(true);
  // this.getOrderSummary();     
    }
}


removeFromCart(index){ 
  if(this.cookieValue=='UNKNOWN'||this.cookieValue=='')
  { console.log('sd----------'+index);
  console.log('sd----------'+this.orderList[index].product_id);  
  this.addCartService.deleteLocalStorage(this.orderList[index].product_id)
  .subscribe(
      data => {
        
        alert("deleted");

          // this.alertService.success('Registration successful', true);
          // this.router.navigate(['login']);
      },
      error => {
        
        alert("error occured");
          // this.alertService.error(error);
          // this.loading = false;
      });
      this.orderList.splice(index, 1);   
      this.getOrderSummary();  
  }
else{
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
}
  proceedToPayment() {
    this.router.navigateByUrl('paymentgatway')
  }

}
