import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from './giftscarousel/carousel/ngu-carousel.module';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { NgxStripeModule } from 'ngx-stripe';
import { AppComponent } from './app.component';


import { ProductconfigComponent } from './product/productconfig/productconfig.component';
import { ManageproductconfigComponent } from './product/manageproductconfig/manageproductconfig.component';
import { AppRoutingModule } from './app.routing';
import { SearchproductComponent } from './product/searchproduct/searchproduct.component';
import { PollconfigComponent } from './poll/pollconfig/pollconfig.component';
import { ManagepollconfigComponent } from './poll/managepollconfig/managepollconfig.component';
import { PublishedpollsComponent } from './poll/publishedpolls/publishedpolls.component';
import { PaymentgatwayComponent } from './payment/paymentgatway/paymentgatway.component';
import { CartComponent } from './product/cart/cart.component';
import { OrdersummaryComponent } from './product/ordersummary/ordersummary.component';
import { ProductService } from './service/product.service';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftsCarouselComponent } from './giftscarousel/giftscarousel.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { PriceFilterPipe } from './pricefilter/filter/filter.pipe';
import { FilterComponent } from './pricefilter/filter/filter.component';
import { GenderfilterComponent } from './product/searchproduct/genderfilter/genderfilter.component';
import { FilterByBrandPipe } from './product/searchproduct/genderfilter/filterByBrand.pipe';
import { FilterByPricePipe } from './product/searchproduct/genderfilter/filterByPrice.pipe';
  
@NgModule({
  declarations: [
    AppComponent,
    ProductconfigComponent,
    ManageproductconfigComponent,
    SearchproductComponent,
    PollconfigComponent,
    ManagepollconfigComponent,
    PublishedpollsComponent,
    PaymentgatwayComponent,
    CartComponent,
    OrdersummaryComponent,
    GiftsComponent,
    GiftsCarouselComponent,
    PricefilterComponent,
    PriceFilterPipe,
    FilterByBrandPipe,
    FilterByPricePipe,
    FilterComponent,
    GenderfilterComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NguCarouselModule,
    HttpClientModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    NgxStripeModule.forRoot('***your-stripe-publishable key***')
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
