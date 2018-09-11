import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewEncapsulation  } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../model/product';
import { ProductInst } from '../../../model/product_inst';
import { ProductService } from '../../../service/product.service';
import { SearchCriteria } from '../../../model/searchcriteria';
import { CartComponent } from '../../cart/cart.component';
import { FiltersComponent } from '../../../product/searchproduct/filters/filters.component';


@Component({
  selector: 'app-weddinggifts',
  templateUrl: './weddinggifts.component.html',
  styleUrls: ['./weddinggifts.component.css'],
  providers: [Product, SearchCriteria, ProductInst, CartComponent]
})
export class WeddinggiftsComponent implements OnInit {

  productList: Array<Product>;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  userId: number;
  userName: string;
  successMsg: string;
  filter: string;
  productType: number;
  public counter : number = 1;   
  public Count : number;

  
  
    //for price filter
  @Output() refreshShoppingCart = new EventEmitter();
  @Input() priceMinFilter: number | null;
  @Input() priceMaxFilter: number | null;

  filterPrice(filter: IProductPriceLimit) {
    this.priceMinFilter = filter.priceMin;
    this.priceMaxFilter = filter.priceMax;
  }

  constructor(private product: Product, private searchCriteria: SearchCriteria, private productService: ProductService, private cartComponent: CartComponent, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.searchCriteria.start = 0;
    this.searchCriteria.limit = 10;
    this.userId = 1;
    this.userName = 'pandian'
    this.retrieveAllProducts();
  
  }

  retrieveAllProducts() {
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      
      if (data instanceof HttpResponse ) {
        this.productList = JSON.parse('' + data.body);
      }
    });
  }
  increment(product){this.counter += 1;}
    decrement(product){if(this.counter >1){this.counter -= 1;}}
  public getCurrency(): string {  
    return 'Rs.';
  }
  // forproduct(){
  //   this.productt = this.product.type.split(',');
  //   for(var i=0; i < this.productt.length;i++){
  //     if(this.productt[i] = '2')
  //     return true;
  //     else 
  //     return false;
  //     break;
  //     console.log(this.productt[i]);

  //   }
  // }
  addToCart(product) {
    let qty = (<HTMLInputElement>document.getElementById("qty_" + product.id)).value;
    let productInst = new ProductInst();
    productInst.quantity = Number(qty);
    productInst.price = product.price;
    productInst.product_id = product.id;
    productInst.user_id = this.userId;
    productInst.created_by = this.userName;
    productInst.status = 'Draft';
    console.log(productInst);

    this.productService.addProductInst(productInst).subscribe(data => {
      console.log(data);
      if (data.type == 4) {
        this.successMsg = "Product Added Successfully";
        console.log('reload cart');
        this.productService.cartSubject.next(true);
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);
      }
      this.counter = 1;
    });
    
  }
  proceedToOrderSummary() {
    this.router.navigateByUrl('ordersummary')
  }
}

interface  IProduct {
  name:string;
  price:number;
}
