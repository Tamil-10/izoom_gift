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

const appRoutes: Routes = [
  { path: '', redirectTo: '/productconfig', pathMatch: 'full' },
  { path: 'productconfig', component: ProductconfigComponent },
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
  { path: 'pricefilter', component: PricefilterComponent }
      



];

export const AppRoutingModule = RouterModule.forRoot(appRoutes, { useHash: true });

