import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevService } from '../../../service/dev.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  private routerService = inject(ActivatedRoute);
  private devService = inject(DevService);
  itemId: number | undefined;
  data: any[] = [];
  item: any[] = [];

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
        this.data = articles;
        this.item = this.data.find((item) => item.id === this.itemId);
      },
      error: (err) => console.log(err)
    })
  }


}
