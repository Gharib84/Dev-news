import { Component, OnInit,OnDestroy,inject } from '@angular/core';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Comment } from '../../../core/interfaces/comment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [FirsebaseService]
})
export class CardComponent  implements OnInit, OnDestroy {
  comments: Comment[] = [];
  private subscription: Subscription = new Subscription();
  private firsebaseService = inject(FirsebaseService);
  blueEffect: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    this.subscription.add(
      this.firsebaseService.getComments().subscribe({
        next: (comments) => {
          this.comments = comments;
          console.log(this.comments);
        },
        error: (error) => {
          console.error(error);
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
