import db from "./firestore.config";
export function collectionSnapshot<T>(collectionName: string, callback: (list: T) => any) {
    db.collection(collectionName).orderBy('timestamp',"desc").onSnapshot((resp) => {
        const list: T = resp.docs.map((doc) => ({...doc.data(),id:doc.id})) as any;
        callback && callback(list);
    });
}
export function collectionSnapshotTwo<T>(collectionName: string, callback: (list: T) => any) {
    db.collection(collectionName).orderBy('timestamp',"desc").onSnapshot((resp) => {
        const list: T = resp.docs.map((doc) => ({id:doc.id})) as any;
        callback && callback(list);
    });
}
