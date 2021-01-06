import './App.css';
import firebase from "firebase";
import { useState, useEffect } from "react";
import { Borec, rollBorci, addBorec, indexBorci } from "./fetchBorci";

function App() {
    const prazdnyBorec = { jmeno: "", obrazek: "", vyhry: 0 }
    const [vsichniBorci, setVsichniBorci] = useState([prazdnyBorec] as firebase.firestore.DocumentData[]);
    useEffect(() => {
        indexBorci().then(borci => {
            setVsichniBorci(borci);
        })
    }, [])
    const [state, setState] = useState(prazdnyBorec);
    const [add, setAdd] = useState(false);
    const [newBorec, setNewBorec] = useState(prazdnyBorec as Borec);


    return (
        <div className="w-full h-full">
            <header className="fixed top-0 flex flex-col items-center justify-center w-full p-6 text-4xl font-bold text-center bg-black bg-opacity-90">
                <span className={"text-white shadow-md"}>{state.jmeno.toUpperCase()} ({state.vyhry}x)</span>
                <section className="flex space-x-3 buttons">
                    <button className="p-2 m-3 text-2xl font-bold text-white bg-transparent border-2 border-white hover:bg-black" style={{ left: "50%" }} onClick={() => setState(rollBorci(vsichniBorci))}>
                        <span className="shadow-2xl ">Roll</span>
                    </button>
                    <button onClick={() => setAdd(!add)} className="p-2 m-3 text-2xl font-bold text-white bg-transparent border-2 border-white w-44 hover:bg-black">{add ? "Schovat" : "Přidat borca"}</button>
                </section>
            </header>
            <div className={"text-white h-screen flex justify-center items-center transition ease-out bg-opacity-70"} style={
                {
                    backgroundImage: `url(${state.obrazek})`,
                    backgroundSize: "100% 100%"
                }
            } >

                {add &&
                    <div className="absolute flex flex-col flex-grow-0 w-48 p-4 space-y-2 overflow-hidden bg-black border border-white rounded-lg bg-opacity-80 top-1/3">
                        <input type="text" className="w-full h-6 p-3 text-black" placeholder="Jméno" onChange={(e) => {
                            setNewBorec({ ...newBorec, jmeno: e.target.value })
                        }} />
                        <input type="text" className="w-full h-6 p-3 text-black" placeholder="Odkaz na obrázek" onChange={(e) => {
                            setNewBorec({ ...newBorec, obrazek: e.target.value })
                        }} />
                        <button className="w-full p-2 border border-white hover:bg-black hover:bg-opacity-100" onClick={() => { addBorec(newBorec, setVsichniBorci); setNewBorec(prazdnyBorec) }}>Přidat</button>
                    </div>
                }

            </div>
        </div>
    );
}

export default App;
