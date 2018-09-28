import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductconfigComponent } from './product/productconfig/productconfig.component';
import { ManageproductconfigComponent } from './product/manageproductconfig/manageproductconfig.component';
import { SearchproductComponent } from './product/searchproduct/searchproduct.component';
import { PollconfigComponent } from './poll/pollconfig/pollconfig.component';
import { ManagepollconfigComponent } from './poll/managepollconfig/managepollconfig.component';
import { PublishedpollsComponent } from './poll/publishedpolls/publishedpolls.component';
import { OrdersummaryComponent } from './product/ordersummary/ordersummary.component';
import { PaymentgatwayComponent } from './payment/paymentgatway/paymentgatway.component';
import { GiftsComponent } from './gifts/gifts.component';
import { GiftsCarouselComponent } from './giftscarousel/giftscarousel.component';
import { PricefilterComponent } from './pricefilter/pricefilter.component';
import { CategoryComponent } from './product/searchproduct/category/category.component';
import { WeddinggiftsComponent } from './product/searchproduct/weddinggifts/weddinggifts.component';
import { ProductDetailComponent } from './product/searchproduct/product-detail/product-detail.component';
import { CheckoutComponent } from './product/searchproduct/checkout/checkout.component';
import { RegisterComponent } from './register/index';
import { LoginComponent } from './login/index';


const appRoutes: Routes = [
  { path: '', redirectTo: '/gifts', pathMatch: 'full' },
  { path: 'productconfig', component: ProductconfigComponent },
  { path: 'ProductDetailComponent/:id',component: ProductDetailComponent },
  { path: 'manageproductconfig', component: ManageproductconfigComponent },
  { path: 'searchproduct', component: SearchproductComponent },
  { path: 'pollconfigcreate', component: PollconfigComponent },
  { path: 'pollconfigupdate', component: PollconfigComponent },
  { path: 'managepollconfig', component: ManagepollconfigComponent },
  { path: 'publishedpolls', component: PublishedpollsComponent },
  { path: 'ordersummary', component: OrdersummaryComponent },
  { path: 'paymentgatway', component: PaymentgatwayComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: 'giftscarousel', component: GiftsCarouselComponent },
  { path: 'pricefilter', component: PricefilterComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'weddinggifts', component: WeddinggiftsComponent },
  { path: 'CheckoutComponent', component:CheckoutComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },


      



];

export const AppRoutingModule = RouterModule.forRoot(appRoutes, { useHash: true });

