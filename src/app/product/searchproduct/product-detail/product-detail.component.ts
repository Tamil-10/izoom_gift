import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../model/product';
import { SearchCriteria } from '../../../model/searchcriteria';
import { ProductService } from '../../../service/product.service';
//import { AgGridModule, AgGridNg2 } from 'ag-grid-angular';
import { HttpResponse, HttpRequest, HttpClient, HttpParams } from '@angular/common/http';
import { identifierModuleUrl } from "@angular/compiler";
// import { Product } from "../../shared/models/product";
// import { ProductService } from "../../shared/services/product.service";
// import { LoaderSpinnerService } from "../../shared/loader-spinner/loader-spinner";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
  providers:[Product, SearchCriteria, ProductService]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private sub: any;
  // product: Product;
  public counter : number = 1;   
  public Count : number;
  id:any;
  productId:number;
  proId:number=63;
  productList: Array<Product>;
  imgdatapreffix = "data:";
  imgdatasuffix = ";base64,";
  constructor(private product:Product,private http: HttpClient, private searchCriteria: SearchCriteria, private productService: ProductService,
    private activatedRoute: ActivatedRoute
    // private productService: ProductService,
    // private spinnerService: LoaderSpinnerService
  ) {
    // this.product = new Product();
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot);
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
     this.productId = this.id;
    
    console.log('dsjhbfdhjcb--------------'+this.productId);
    this.retrieveProductList();

    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log('...................' + params);
    //   console.log(params);
    //   this.productId = params['product'];
    //   console.log(this.productId);
      
    //  this.retrieveProductList(this.productId);
     
    // });
  }
  retrieveProductList(){
    this.productService.retrieveProductList(this.searchCriteria).subscribe(data => {
      console.log(data);
      if (data instanceof HttpResponse ) {
        console.log(data.body);
        this.productList = JSON.parse('' + data.body);        
      }
    });
  } 

  increment(product){this.counter += 1;}
  decrement(product){if(this.counter >1){this.counter -= 1;}}

  ngOnDestroy() {
   
  }
}
