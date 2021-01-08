import firebase from "./firebase";

export const db = firebase.firestore().collection("borci");

export type Borec = {
    jmeno: string;
    obrazek: string;
    vyhry: number;
}

export const indexBorci = async () => {
    const getDb = await db.get();
    return getDb.docs.map(item => {
        const borec = item.data();
        return {
            jmeno: borec.jmeno,
            obrazek: borec.obrazek,
            vyhry: borec.vyhry
        }
    }).sort((boreca, borecb) => boreca.vyhry - borecb.vyhry).reverse();
}

export const addBorec = (newBorec: Borec, setCallback: React.Dispatch<React.SetStateAction<Borec[]>>) => {
    db.add(newBorec)
        .then(() => indexBorci().then(borci => setCallback(borci))).catch(err => console.log(err));
}

export const rollBorci = (borci: Borec[] | firebase.firestore.DocumentData[]) => {
    const borec = borci[Math.floor(Math.random() * borci.length)];
    borec.vyhry += 1;
    db.where("jmeno", "==", borec.jmeno).get().then(result => {
        const toUpdate = result.docs.map(item => item.id)[0];
        db.doc(toUpdate).update(borec);
    });
    return {
        jmeno: borec.jmeno,
        obrazek: borec.obrazek,
        vyhry: borec.vyhry
    };
}