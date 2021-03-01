import { Component, OnInit, Input } from '@angular/core';
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

  startFabrication() {
    if (this.progressbarvalue < 100) {
      while (this.progressbarvalue < 100) {
        this.progressbarvalue += 1;;
      }
    } else {
      this.progressbarvalue = 0;
    }
  }

  calcScore() { }


}



