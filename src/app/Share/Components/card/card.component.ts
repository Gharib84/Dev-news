import { Component, OnInit, OnDestroy, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Comment } from '../../../core/interfaces/comment';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [FirsebaseService]
})
export class CardComponent implements OnInit, OnDestroy, OnChanges {
  comments: Comment[] = [];
  private subscription: Subscription = new Subscription();
  private firsebaseService = inject(FirsebaseService);
  blueEffect: boolean = false;
  private auth = inject(Auth);
  private router = inject(Router);
  @Input('id') itemId: any;
  commentsByItemId!: Comment[]
  @Input('isAuthenticated') isAuthenticated!: boolean;


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

    this.subscription = this.firsebaseService.getCommentsByItemIdRealTime(this.itemId).subscribe({
      next: (comments) => {
        if (comments) {
          this.commentsByItemId = comments || [];
          console.log(this.commentsByItemId);
        }
      },
      error: (error) => {
        console.error(error + 'Error fetching comments by item id');
      }
    })
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider); //Await my result
      const userCredential = result; //Assign the result to userCredential.
      const user = userCredential.user; // Access user from userCredential

      if (user) {
        this.router.navigate(['/item', this.itemId]);
        console.log('User signed in with Google:', user.displayName, ' ', user.photoURL);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isAuthenticated']) {
      console.log('Card isAuthenticated:', this.isAuthenticated);
    }
  }
  trackByCommentId(index: number, comment: Comment): string {
    return comment.id || index.toString();
  }
}