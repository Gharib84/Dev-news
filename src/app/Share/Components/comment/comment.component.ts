import { Component, inject, OnDestroy, OnInit, Input } from '@angular/core';
import { Comment } from '../../../core/interfaces/comment';
import { FirsebaseService } from '../../../service/firsebase.service';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup, UserCredential } from '@angular/fire/auth';
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

  constructor(private formBuilder: FormBuilder) {}


  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }
}
