import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from '../chips/chips.component';
import { NgFor } from '@angular/common';
import { DevService } from '../../../service/dev.service';

@Component({
  selector: 'app-item-layouts',
  imports: [CommonModule, ChipsComponent,NgFor,RouterLink],
  templateUrl: './item-layouts.component.html',
  styleUrl: './item-layouts.component.css'
})
export class ItemLayoutsComponent implements OnInit {
  data: any[] = [];
  devService = inject(DevService);
  constructor() { }

  ngOnInit(): void {
    this.articles();

  }

  articles(): void {
    this.devService.articles().subscribe({
      next: (value) => {
        this.data = value;
      },
      error: (err) => {
        console.error('Error fetching articles:', err); // Handle errors if needed
      }
    });
  }
}
