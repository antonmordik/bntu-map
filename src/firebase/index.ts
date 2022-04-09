import { initializeApp, FirebaseApp } from 'firebase/app';
import { collection, Firestore, getFirestore, onSnapshot } from 'firebase/firestore';

import { IBuilding } from './../interfaces/IBuilding';
import { ILine } from './../interfaces/ILine';
import { IDot } from './../interfaces/IDot';
import config from './config';

class Firebase {
  static readonly DOT_COLLECTION: string = 'dots';
  static readonly LINE_COLLECTION: string = 'lines';
  static readonly BUILDING_COLLECTION: string = 'buildings';

  private app: FirebaseApp;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(config);
    this.db = getFirestore(this.app);
  }

  getEntities = <TEntity>(collectionName: string, onComplete: (entities: TEntity[]) => void): void => {
    onSnapshot(collection(this.db, collectionName), (snapshot) => {
      onComplete(snapshot.docs.map((doc) => {
        const dot = doc.data() as TEntity;
        return { ...dot, id: doc.id };
      }));
    })
  }

  getDots = (onComplete: (result: IDot[]) => void): void => {  
    this.getEntities(Firebase.DOT_COLLECTION, onComplete);
  }

  getLines = (onComplete: (result: ILine[]) => void): void  => {
    this.getEntities(Firebase.LINE_COLLECTION, onComplete);
  }

  getBuildings = (onComplete: (result: IBuilding[]) => void): void => {
    this.getEntities(Firebase.BUILDING_COLLECTION, onComplete);
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
