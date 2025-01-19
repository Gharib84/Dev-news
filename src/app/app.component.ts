import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './Share/Components/chips/chips.component';
import { NgFor } from '@angular/common';
import { DevService } from './service/dev.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ChipsComponent,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'youtube';
  data: any[] = [];
  devService = inject(DevService);
  constructor() { }

  ngOnInit(): void {
    this.articles();

  }

  articles(): void {
    this.devService.articles().subscribe({
      next: (value) => {
        this.data = value; // Assign the returned value to data
        console.log(this.data); // Log the data here
      },
      error: (err) => {
        console.error('Error fetching articles:', err); // Handle errors if needed
      }
    });
  }

}
