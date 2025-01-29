import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './Share/Components/chips/chips.component';
import { NgFor } from '@angular/common';
import { DevService } from './service/dev.service';
import { Item } from './core/interfaces/item';


@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'youtube';
  data: Item[] = [];
  devService = inject(DevService);
  constructor() { }

  ngOnInit(): void {
    this.articles();

  }

  articles(): void {
    this.devService.articles().subscribe({
      next: (value) => {
        if(value){
          this.data = value;
        }
      },
      error: (err) => {
        console.error('Error fetching articles:', err); // Handle errors if needed
      }
    });
  }

}
