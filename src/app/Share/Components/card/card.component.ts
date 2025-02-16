import { Component, OnInit,OnDestroy,inject,Input } from '@angular/core';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Comment } from '../../../core/interfaces/comment';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
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
  private auth = inject(Auth);
  private router = inject(Router);
  @Input('id') itemId: any;

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
}
