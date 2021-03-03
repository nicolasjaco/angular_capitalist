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

  constructor(private service: RestserviceService) {
    this.server = service.getServer();
  }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
  }


  @Input()
  set prod(value: Product) {
    this.product = value;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();


  startFabrication() {
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();

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
      } else {
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
      }

    }

  }


}



