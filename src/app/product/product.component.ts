import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { World, Pallier, Product } from '../world';
import { RestserviceService } from '../restservice.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  server: string;
  product: Product = new Product();
  progressbarvalue: number = 0;
  lastupdate: number = 0;
  en_cours="false";
  qte_max = 0;
  prix_actuel= 0;
  cout_total=0;
  qtemulti: string = "";
  argent: number = 0;

  constructor(private service: RestserviceService) {
    this.server = service.getServer();
  }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
  }


  @Input()
  set prod(value: Product) {
    this.product = value;
    this.prix_actuel = this.product.cout;
  }

  @Input()
  set qtmulti(value: string) {
    this.qtemulti = value;
    if (this.qtemulti && this.product) this.calcMaxCanBuy();
  }
  @Input()
  set money(value: number) {
    this.argent = value;    
    if (this.argent && this.product) this.calcMaxCanBuy();
  }


  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyPurchase: EventEmitter<number> = new EventEmitter<number>();

  startFabrication() {
    if(this.product.quantite !=0 && this.en_cours!="true"){
      this.en_cours="true";
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
    }
  }

  calcScore() {
    if (this.product.timeleft != 0) {
      let temps = Date.now() - this.lastupdate;
      this.lastupdate = Date.now();
      this.product.timeleft = this.product.timeleft - temps;
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.progressbarvalue = 0;
        this.notifyProduction.emit(this.product);
        this.en_cours="false";
      } else {
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
      }

    }

  }
  calcMaxCanBuy() {   
    let qtemax = ((Math.log(1 - ((this.argent * (1 - this.product.croissance)) / this.product.cout)) / Math.log(this.product.croissance)));
    if (qtemax < 0) {
      this.qte_max = 0;
    }
    else {
      this.qte_max = Math.floor(qtemax);
    }
    console.log(this.product.name+" : "+this.qte_max);
  }

  achat() {
    console.log("achat: "+this.product.name);
    switch (this.qtemulti) {
      case "X1":
        this.cout_total = this.product.cout;
        this.product.cout = this.product.croissance * this.product.cout;
        this.product.quantite += 1;
        console.log(this.argent);
        break;
      case "X10":
        this.cout_total = this.product.cout *((1 - (this.product.croissance ** 10))/(1  - this.product.croissance));
        this.product.cout = (this.product.croissance ** 10) * this.product.cout;
        this.product.quantite += 10;
        break;
      case "X100":
        this.cout_total = this.product.cout *((1 - (Math.pow(this.product.croissance,100)) )/(1  - this.product.croissance));
        this.product.cout = (this.product.croissance ** 100) * this.product.cout;
        this.product.quantite += 100;
        break;
      case "XMAX":
        this.cout_total = this.product.cout *((1 - Math.pow(this.product.croissance,this.qte_max))/(1  - this.product.croissance));
        this.product.cout = (this.product.croissance ** this.qte_max) * this.product.cout;
        this.product.quantite += this.qte_max;
        break;
    }
    this.notifyPurchase.emit(this.cout_total);
  }

}



