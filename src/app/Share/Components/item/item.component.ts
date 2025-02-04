import { Component, inject, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevService } from '../../../service/dev.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../../core/interfaces/item';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommentComponent } from "../comment/comment.component";

@Component({
  selector: 'app-item',
  imports: [CommonModule, NgIf, CommentComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit, OnDestroy {
  private routerService = inject(ActivatedRoute);
  private devService = inject(DevService);
  itemId: number | undefined;
  data: Item[] = [];
  item: Item | undefined;
  imageLoad:boolean = false;
  private subscription!:Subscription;

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
    this.subscription = this.devService.articles().subscribe({
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
  
  oneImageLoad():void
  {
    this.imageLoad = true;
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
