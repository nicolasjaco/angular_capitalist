import { Component, OnInit, Input  } from '@angular/core';
import { World, Pallier, Product } from '../world';
import { RestserviceService } from '../restservice.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  world: World = new World();
  server: string;

  constructor(private service: RestserviceService) {
    this.server = service.getServer();
    service.getWorld().then(
    world => {
    this.world = world;
    });
    }

  ngOnInit(): void {
  }

 product: Product | undefined;
 @Input()
 set prod(value: Product) {
 this.product = value;
 }

 }

 



