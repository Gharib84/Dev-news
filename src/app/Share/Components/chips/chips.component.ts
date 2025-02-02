import { Component,Output,EventEmitter, inject,OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { DevService } from '../../../service/dev.service';
import { Subscription } from 'rxjs';
import { Item } from '../../../core/interfaces/item';

@Component({
  selector: 'app-chips',
  imports: [NgFor,FontAwesomeModule],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent implements OnInit, OnDestroy {
  faAtom = faAtom;
  programmingLanguages:Item[] = []
  @Output('tag') tag = new EventEmitter<string>();
  private devService = inject(DevService);
  private subscription!:Subscription;
  elements:string[] = [];

  constructor(){}

  ngOnInit(): void {
    this.getTags();
  }

  getNameTage(message:any):void
  {
    this.tag.emit(message);
  }

  getTags(): void {
    this.subscription = this.devService.articles().subscribe({
      next: (items) => {
        if (items && Array.isArray(items)) {
          this.programmingLanguages = items.filter((item) => item.tag_list);
          this.elements = [];
          const uniqueTags = new Set<string>();
  
          for (let i = 0; i < this.programmingLanguages.length && uniqueTags.size < 10; i++) {
            const tag = this.programmingLanguages[i];
            if (tag.tags) {
              const tagsArray = tag.tags.split(',').map(t => t.trim());
              for (const t of tagsArray) {
                if (!uniqueTags.has(t) && uniqueTags.size < 10) {
                  uniqueTags.add(t);
                }
              }
            }
          }
  
          this.elements = Array.from(uniqueTags);
        }
      },
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

  
}
