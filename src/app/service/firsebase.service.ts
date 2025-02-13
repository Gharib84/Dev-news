import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, from } from 'rxjs';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { Comment } from '../core/interfaces/comment';
@Injectable({
  providedIn: 'root'
})
export class FirsebaseService {
  private collectioName: string = "comments";
  private fireStore = inject(Firestore);

  constructor() { }

  //create a new comment

  // Create a new comment
  addComment(): Observable<any> {
    const addCommentPromise = addDoc(collection(this.fireStore, this.collectioName), {
      name: "Los Angeles",
      description: "LA is a city"
    });

    return from(addCommentPromise);
  }
}
