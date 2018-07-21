import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../service/product.service';
@Component({
  selector: 'app-ordersummary',
  templateUrl: './ordersummary.component.html',
  styleUrls: ['./ordersummary.component.css'],
  providers: [ProductService]
})
export class OrdersummaryComponent implements OnInit {
  userId: string;
  userName: string;
  successMsg: string;
  orderList: any;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  total = 0;
  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
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
        this.total = 0;
        this.orderList.forEach(element => {
          console.log(element);
          this.total = this.total + element.price * element.quantity;
        });
      }
    });
  }

  proceedToPayment() {
    this.router.navigateByUrl('paymentgatway')
  }

}
