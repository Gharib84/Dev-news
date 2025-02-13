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

  addComment(): Observable<any> {
    const addCommentPromise = addDoc(collection(this.fireStore, this.collectioName), {
      name: "Hard Rock",
      description: "Metallica",
    });

    return from(addCommentPromise);
  }

  
  getComments(): Observable<Comment[]> {
    const comments = getDocs(query(collection(this.fireStore, this.collectioName)));
    return from(comments).pipe(
      map((querySnapshot) => {
        const comments: Comment[] = [];
        querySnapshot.forEach((doc) => {
          comments.push(doc.data() as Comment);
        });
        return comments;
      })
    );
  }
}
