import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InvestorsComponent } from './component/investors/investors.component';
import { ManagersComponent } from './component/managers/managers.component';
import { UnlocksComponent } from './component/unlocks/unlocks.component';
import {AngelsUpgradesComponent} from './component/angels-upgrades/angels-upgrades.component';
import { CashUpgradesComponent } from './component/cash-upgrades/cash-upgrades.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    InvestorsComponent,
    ManagersComponent,
    UnlocksComponent,
    CashUpgradesComponent,
    AngelsUpgradesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
