import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ProductService } from '../service/product.service';
import { ProductInst } from '../model/product_inst';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [ProductService, ProductInst]
})
export class MyOrdersComponent implements OnInit {
  userId: string;
  cookieValue = 'UNKNOWN';
  orderList:any;
  term:any;
  tcode:string;
  status:string;
  orders:number[];
  

  constructor(private cookieService: CookieService,
    private productService: ProductService, 
    private product:ProductInst) { }


    
    stausValues = [
      { id: '1', name: 'Delivered', "isSelected": false },
       { id: '2', name: 'Shipped', "isSelected": false },
       { id: '3', name: 'Intransit', "isSelected": false }       

 ];
     
  ngOnInit() {
    this.cookieValue = this.cookieService.get('LoggedUser');
    this.userId = this.cookieService.get('userId');
    console.log('cookie'+this.cookieValue);
    this.retrieveOrders();
  }

  
  
  retrieveOrders() {
   if(this.cookieValue = 'izoomstudios@gmail.com'){
    console.log('admin');
    this.productService.retrieveAdminOrders().subscribe(data => {
      if (data instanceof HttpResponse ) {
        console.log('sdf---'+data.body);
        this.orderList = JSON.parse('' + data.body);
      }
    });
   }
   else  if(this.cookieValue !=='UNKNOWN'){
   
      this.productService.retrieveOrders(this.userId).subscribe(data => {
        if (data instanceof HttpResponse ) {
          console.log('sdf---'+data.body);
          this.orderList = JSON.parse('' + data.body);
        }
      }); 
  }
  else{
    console.log(this.cookieValue);
  }
}
    submit(){
      console.log("the code :" + this.tcode);
      this.productService.retrieveOrdersbyId(this.tcode).subscribe(data => {
        if (data instanceof HttpResponse ) {
          console.log('sdf---'+data.body);
          this.orderList = JSON.parse('' + data.body);
          console.log('byId'+this.orderList);
          
        }
      });
    }
     selectedstatustValue(statusValue){
      this.status = statusValue;
     console.log('status value is'+this.status); 
      }
    changeStatus(){
      this.orders = this.orderList.filter(opt => opt.isSelected).map(opt => opt.order_id);             
       console.log(this.orders+''+''+this.status);
       this.productService.updateStatus(this.orders, this.status).subscribe(kv => {
        console.log(kv);
        if (kv.type == 4) {
      console.log('success');
          
        }
      });
      
    }
  }