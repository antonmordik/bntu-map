import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';

import { IDot } from './../interfaces/IDot';
import config from './config';

class Firebase {
  static app: firebase.app.App = firebase.initializeApp(config);
  static readonly DOT_COLLECTION: string = 'dots';
  static readonly LINE_COLLECTION: string = 'lines';

  async getDots(): Promise<IDot[]> {
    return (
      (await Firebase.app
        .firestore()
        .collection(Firebase.DOT_COLLECTION)
        .get()
        .then((snapshot) => {
          const dots: IDot[] = [];
          snapshot.forEach((doc) => {
            const coordinates = doc.data();
            dots.push({ id: doc.id, x: coordinates.x, y: coordinates.y });
          });
          return dots;
        })
        .catch((error) => console.log(error))) || []
    );
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
