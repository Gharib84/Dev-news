import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs';
import { Firestore, collectionData, collection, getFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirsebaseService {
  private collectioName:string = "comments";
  private fireStore = inject(Firestore);

  constructor() { }

  
}
