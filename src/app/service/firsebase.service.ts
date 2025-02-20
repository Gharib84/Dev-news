import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, from } from 'rxjs';
import { Firestore, addDoc, collection, getDocs, query, deleteDoc, doc,collectionData,where} from '@angular/fire/firestore';
import { Comment } from '../core/interfaces/comment';
@Injectable({
  providedIn: 'root'
})
export class FirsebaseService {
  private collectioName: string = "comments";
  private fireStore = inject(Firestore);
 

  constructor() { }

  addComment(comment: Comment): Observable<any> {
    const addCommentPromise = addDoc(collection(this.fireStore, this.collectioName), comment);

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

  
  getComment(id: string): Observable<Comment | undefined> {
    return this.getComments().pipe(
      map((comments) => comments.find((comment) => comment.id === id))
    );
  }

  
  getCommentsByItemId(itemId: string): Observable<Comment[]> {
    return this.getComments().pipe(
      map((comments) => comments.filter((comment) => comment.id === itemId))
    );
  }

  //get comments by item id runtimes when database updated  
  getCommentsByItemIdRealTime(itemId: string): Observable<Comment[] | undefined> {
    const commentsQuery = query(collection(this.fireStore, this.collectioName), where('id', '==', itemId));
    return collectionData(commentsQuery, { idField: 'id' }) as Observable<Comment[]>;
  }
  //get user uuid from firebase
  
}
