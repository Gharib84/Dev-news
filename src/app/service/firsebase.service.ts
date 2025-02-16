import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, from } from 'rxjs';
import { Firestore, addDoc, collection, getDocs, query, deleteDoc, doc} from '@angular/fire/firestore';
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
      description: "Hard Rock",
      name: "Metallica",
      url: "https://www.google.com"
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

  deleteComment(id: string): Observable<void> {
    const deleteCommentPromise = deleteDoc(doc(this.fireStore, this.collectioName, id));

    return from(deleteCommentPromise);
  }
}
