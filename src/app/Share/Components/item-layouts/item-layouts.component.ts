import { Component, OnInit, ChangeDetectionStrategy, inject,OnDestroy } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from '../chips/chips.component';
import { NgFor } from '@angular/common';
import { DevService } from '../../../service/dev.service';
import { Item } from '../../../core/interfaces/item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-layouts',
  imports: [CommonModule, ChipsComponent,NgFor,RouterLink],
  templateUrl: './item-layouts.component.html',
  styleUrl: './item-layouts.component.css'
})
export class ItemLayoutsComponent implements OnInit,OnDestroy {
  data: Item[] | undefined;
  devService = inject(DevService);
  private subscription!:Subscription;
  constructor() { }

  ngOnInit(): void {
    this.articles();

  }

  articles(): void {
     this.subscription = this.devService.articles().subscribe({
      next: (value) => {

        if (value && Array.isArray(value)) {
          this.data = value.filter((item)=> item.tags.includes("ai"));
          console.log(this.data)
        }
      },
      error: (err) => {
        console.error('Error fetching articles:', err); // Handle errors if needed
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  searchByTagName(tage:string):string
  {
    return tage;
  }
}
