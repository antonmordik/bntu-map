import firebase from 'firebase/app';

import 'firebase/database';
import 'firebase/firestore';

import { IBuilding } from './../interfaces/IBuilding';
import { ILine, ILineData } from './../interfaces/ILine';
import { IDot } from './../interfaces/IDot';
import config from './config';

class Firebase {
  static app: firebase.app.App = firebase.initializeApp(config);
  static readonly DOT_COLLECTION: string = 'dots';
  static readonly LINE_COLLECTION: string = 'lines';
  static readonly BUILDING_COLLECTION: string = 'buildings';

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
            dots.push({
              id: doc.id,
              x: coordinates.x,
              y: coordinates.y,
              selectable: coordinates.selectable || false,
            });
          });
          return dots;
        })
        .catch((error) => console.log(error))) || []
    );
  }

  async getLines(): Promise<ILine[]> {
    return await Firebase.app
      .firestore()
      .collection(Firebase.LINE_COLLECTION)
      .get()
      .then((snapshot) => {
        const lines: ILine[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as ILineData;
          const line: ILine = { id: doc.id, data };
          lines.push(line);
        });
        return lines;
      });
  }

  async getBuildings(): Promise<IBuilding[]> {
    return await Firebase.app
      .firestore()
      .collection(Firebase.BUILDING_COLLECTION)
      .get()
      .then((snapshot) => {
        const buildings: IBuilding[] = [];

        snapshot.forEach((doc) => {
          const building = doc.data() as IBuilding;
          buildings.push({ id: doc.id, ...building });
        });

        return buildings;
      });
  }
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
