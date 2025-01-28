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
  itemId: string | undefined;
  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.routerService.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (id) {
        this.itemId = id
      }
    })
  }

  getArticles(): void {
    this.devService.articles().subscribe({
      next: (articles) => {
        this.data = articles;
      },
      error: (err) => console.log(err)
    })
  }


}
