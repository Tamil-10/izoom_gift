import { Component,ViewChild, ElementRef, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
@Component({
  selector: 'app-productconfig',
  templateUrl: './productconfig.component.html',
  styleUrls: ['./productconfig.component.css'],
  providers:[Product,ProductService]
  
})
export class ProductconfigComponent implements OnInit,OnDestroy {

  file: File;
  errorMsg: string;
  successMsg: string;
  productId:string;
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private product:Product, private productService:ProductService,private router: Router, private activatedRoute: ActivatedRoute) { 
     console.log('ProductconfigComponent Constructor');
  }

  ngOnInit() {
    console.log('ProductconfigComponent Init');

    let url = this.router.url;

    if (url === '/pollconfigcreate') {
     
    } else {

      this.activatedRoute.queryParams.subscribe(params => {
        console.log('...................' + params);
        console.log(params);
        this.productId = params['product'];
        console.log(this.productId);
       // this.retrievePoll(this.pollId);
      });
    }
  }

  onFileChange(event) {
  let reader = new FileReader();
  if (event.target.files && event.target.files.length > 0) {
    this.file = event.target.files[0];    
  }
  }
  onSubmit() {
    if (this.file === undefined) {
      this.errorMsg = "Select Product Image";
      setTimeout(() => {
        this.errorMsg = undefined;
      }, 3000);
    }
    this.product.file=this.file;
   this.product.status='Active';
    console.log(this.product);
    this.productService.productConfiguration(this.product).subscribe(kv => {
      console.log(kv);
      if (kv.type == 4) {
       this.product = new Product();
        this.clearFile();
        this.successMsg = "Product Uploaded Successfully";
        setTimeout(() => {
          this.successMsg = undefined;
        }, 3000);
      }
    });


  }


  clearFile() {
    this.product.content=undefined;
    this.fileInput.nativeElement.value = '';
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnDestroy(){
    console.log('ProductconfigComponent Destroy');
  }
}
