import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  badgeManagers=0;

 constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
  this.server = service.getServer();
  service.getWorld().then(
  world => {
  this.world = world;
  this.badge();
  });
  }

  onProductionDone(p:Product){  
   this.world.money= this.world.money + p.revenu*p.quantite;
   this.world.score=this.world.score+p.revenu;     
   this.badge();
  }

  onPurchaseDone(cout_total: number){
    this.world.money -= cout_total;
    this.world.score -= cout_total;
    this.badge();
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
    if (this.world.money >= manager.seuil && this.world.products.product[manager.idcible-1].quantite>0){
      this.world.products.product[manager.idcible-1].managerUnlocked = true;
      manager.unlocked = true;
      this.world.money -= manager.seuil;
      this.popMessage("Vous venez d'engager "+manager.name);
    }
  }
  popMessage(message : string) : void {
    this.snackBar.open(message, "", { duration : 2000 })
    }

    badge(){
      this.badgeManagers=0;
      for (let manager of this.world.managers.pallier){
          if (manager.seuil <= this.world.money && this.world.products.product[manager.idcible-1].quantite>0){
            this.badgeManagers++;
          }
      }
    }
}
