import firebase from "./firebase";

export const db = firebase.firestore();

export type Borec = {
    jmeno: string;
    obrazek: string;
    vyhry: number;
}

export const indexBorci = async () => {
    const getDb = await db.collection("borci").get();
    return getDb.docs.map(item => item.data());
}

export const addBorec = (newBorec: Borec, setCallback: React.Dispatch<React.SetStateAction<firebase.firestore.DocumentData[]>>) => {
    db.collection("borci").add(newBorec)
        .then(() => indexBorci().then(borci => setCallback(borci))).catch(err => console.log(err));
}

export const rollBorci = (borci: Borec[] | firebase.firestore.DocumentData[]) => {
    const borec = borci[Math.floor(Math.random() * borci.length)];
    borec.vyhry += 1;
    db.collection("borci").where("jmeno", "==", borec.jmeno).get().then(result => {
        const toUpdate = result.docs.map(item => item.id)[0];
        console.log(toUpdate)
        db.collection("borci").doc(toUpdate).update(borec);
    });
    return borec;
}