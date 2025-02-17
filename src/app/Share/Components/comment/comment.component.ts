import { Component, inject, OnDestroy, OnInit, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/comment';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential, onAuthStateChanged } from '@angular/fire/auth';
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


  constructor(private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    });

    this.commentForm.addControl('name', new FormControl(this.userName, Validators.required));
    this.commentForm.addControl('url', new FormControl(this.userAvatar, Validators.required));

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
        this.userName = user.displayName || ''; // Assign user display name to userName
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
        this.userName = user.displayName || '';
      }
    });
  }

  ngOnDestroy(): void {

  }

  onSubmit() {
    if (this.commentForm.valid) {
      const comment: Comment = {
        id: this.itemId,
        description: this.commentForm.value.comment,
        name: this.commentForm.value.name,
        url: this.commentForm.value.url,
      };

      this.firsebaseService.addComment(comment);
      this.commentForm.reset();
    }
  }
}
