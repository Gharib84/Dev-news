import { Component, inject, OnDestroy, OnInit, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/comment';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private commentForm!: FormGroup;
  private firsebaseService = inject(FirsebaseService);
  blueEffect: boolean = false;
  private auth = inject(Auth);
  private router = inject(Router);
  @Input('id') itemId: any;
  signedIn: boolean = true;
  userAvatar:string = '';


  constructor(private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      comment: new FormControl('', [Validators.required])
    });
  }


  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider); //Await my result
      const userCredential = result; //Assign the result to userCredential.
      const user = userCredential.user; // Access user from userCredential

      if (user) {
        this.router.navigate(['/item', this.itemId]);
        this.signedIn = false;
        this.userAvatar = user.photoURL || ''; // Assign user photo URL to userAvatar
        console.log('User signed in with Google:', user.displayName, ' ', user.photoURL);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
