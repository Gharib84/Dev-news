import { Component, inject, OnDestroy, OnInit, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/comment';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public commentForm!: FormGroup;
  private firsebaseService = inject(FirsebaseService);
  blueEffect: boolean = false;
  private auth = inject(Auth);
  private router = inject(Router);
  @Input('id') itemId: any;
  signedIn: boolean = true;
  userAvatar: string = '';
  userName: string = '';
  isAuthenticated: boolean = false;
  userAuth = getAuth();

  constructor(private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      description: ['', [Validators.required]],
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
        this.signedIn = true;
        this.userAvatar = user.photoURL || ''; // Assign user photo URL to userAvatar
        this.userName = user.displayName || ''; // Assign user display name to userName
        this.isAuthenticated = true;
        console.log('User signed in with Google:', user.displayName, ' ', user.photoURL);
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.signedIn = false;
        this.userAvatar = user.photoURL || '';
        this.userName = user.displayName || '';      }
    });
  }

  ngOnDestroy(): void {

  }

  onSubmit() {
    if (this.commentForm.valid) {
      if (!this.commentForm.contains('id')) {
        this.commentForm.addControl('id', new FormControl(this.itemId, Validators.required));
      }

      if (!this.commentForm.contains('name')) {
        this.commentForm.addControl('name', new FormControl(this.userName, Validators.required));
      }

      if (!this.commentForm.contains('url')) {
        this.commentForm.addControl('url', new FormControl(this.userAvatar, Validators.required));
      }

      const comment: Comment = this.commentForm.value;
      this.firsebaseService.addComment(comment).subscribe({
        next: (data) => {
          console.log(data);
          this.commentForm.get('description')?.reset(); // Reset only the description control
          this.router.navigate(['/item', this.itemId]);
        },
        error: (error) => {
          console.error(error);
        }
      });  
    }
  }
}
