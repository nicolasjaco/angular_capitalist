import { Component } from '@angular/core';
import { RestserviceService } from './restservice.service';
import { World, Product, Pallier } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IsisCapitalist';
  world: World = new World();
  server: string;
  qtmulti:string="X1";
  p:Product=new Product();
  showManagers=false;

 constructor(private service: RestserviceService) {
  this.server = service.getServer();
  service.getWorld().then(
  world => {
  this.world = world;
  });
  }

  onProductionDone(p:Product){  
   this.world.money= this.world.money + p.revenu*p.quantite;
   this.world.score=this.world.score+p.revenu;     
   console.log(this.world.money);
  }

  onPurchaseDone(cout_total: number){
    this.world.money -= cout_total;
    this.world.score -= cout_total;
  }
  cycle(){
    switch(this.qtmulti){
        case "X1":
          this.qtmulti="X10";
          break;
        case "X10":
          this.qtmulti="X100";
          break;
        case "X100":
          this.qtmulti="XMAX";
          break;
        case  "XMAX":
          this.qtmulti="X1";
          break;
    }
  }
  hireManager(manager:Pallier){
    if (this.world.money >= manager.seuil && this.world.products.product[manager.idcible].quantite>0){
      this.world.products.product[manager.idcible].managerUnlocked = true;
      manager.unlocked = true;
      this.world.money -= manager.seuil;
    }
  }
}
