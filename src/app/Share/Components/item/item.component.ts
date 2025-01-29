import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevService } from '../../../service/dev.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/interfaces/item';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  private routerService = inject(ActivatedRoute);
  private devService = inject(DevService);
  itemId: number | undefined;
  data: Item[] = [];
  item: Item | undefined;

  constructor() { }

  ngOnInit(): void {
    this.routerService.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (id) {
        this.itemId = parseInt(id)
      }
    });

    this.getArticles()
  }

  getArticles(): void {
    this.devService.articles().subscribe({
      next: (articles) => {
        if(articles){
          this.data = articles; 
          if(this.data){
            this.item =  this.data.find((item) => item.id === this.itemId);
            console.log(this.item)
          }
        }
      },
      error: (err) => console.error('Error fetching articles:', err),
    });
  }
  


}
