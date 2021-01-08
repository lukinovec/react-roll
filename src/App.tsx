import './App.css';
import { useSpring, animated } from 'react-spring'
import { getBarGraph } from "./chart";
import { useState, useEffect } from "react";
import { Borec, rollBorci, addBorec, indexBorci } from "./fetchBorci";

import hdvideo from "./hd-video.mp4";

function App() {
    const prazdnyBorec = { jmeno: "", obrazek: "", vyhry: 0 }
    const [vsichniBorci, setVsichniBorci] = useState([prazdnyBorec]);
    const [state, setState] = useState(prazdnyBorec);
    const [loaded, setLoaded] = useState(false);

    const backgroundLoader = (url: string) => {
        let loaded = false;
        const image = new Image();
        // this will occur when the image is successfully loaded
        // no matter if seconds past
        image.onload = function () {
            const div: any = document.getElementById("pozadi");
            loaded = true;
            div.style.backgroundImage = "url('" + url + "')";
        }
        setTimeout(function () {
            // if when the time has passed image.onload had already occurred,
            // run success()
            setLoaded(loaded);
        }, 0.5 * 1000);
        image.src = url;
    }

    const getBorci = () => {
        if (state.jmeno === "") {
            indexBorci().then(borci => {
                setLoaded(false)
                setVsichniBorci(borci);
                setState(rollBorci(borci));
                backgroundLoader(state.obrazek);
            })
        } else {
            setLoaded(false);
            setState(prazdnyBorec);
            setState(rollBorci(vsichniBorci));
            backgroundLoader(state.obrazek)
        }
    }

    useEffect(() => {
        backgroundLoader(state.obrazek);
    });

    const [add, setAdd] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const graphStyle = useSpring({
        from: { opacity: 0 },
        to: {
            opacity: showGraph ? 1 : 0
        }
    });
    const startStyle = useSpring({
        from: { opacity: 0 },
        to: {
            opacity: state === prazdnyBorec ? 1 : 0
        }
    });
    const loaderStyle = useSpring({
        from: { opacity: 1 },
        to: {
            opacity: loaded ? 0 : 1
        }
    });
    const mainStyle = useSpring({
        from: { opacity: 1 },
        to: {
            opacity: state === prazdnyBorec ? 0 : 1
        }
    });
    const [newBorec, setNewBorec] = useState(prazdnyBorec as Borec);

    return (
        <div className="w-full h-full">
            <animated.div style={startStyle}>
                {state === prazdnyBorec &&
                    <div>
                        <video className={"text-white opacity-70 w-full fixed justify-center items-center"} autoPlay muted loop id="video">
                            <source src={hdvideo} type="video/mp4" />
                        </video>
                        <button className="fixed p-2 m-3 text-6xl font-extrabold text-center text-white bg-transparent border-2 border-white top-1/2 left-1/3 hover:bg-black" onClick={() => getBorci()}>
                            <span className="shadow-2xl ">Roll</span>
                        </button>
                    </div>
                }
            </animated.div>

            <animated.div style={mainStyle}>
                {state !== prazdnyBorec &&
                    <span>
                        {!loaded &&
                            <animated.div style={loaderStyle} id="loader" className={"text-white fixed left-5 top-4 text-8xl font-extrabold flex"}  >
                                Loading...
                        </animated.div>
                        }
                        <header className="fixed top-0 flex flex-col items-center justify-center w-full p-6 text-4xl font-bold text-center bg-black bg-opacity-80">
                            <span className={"text-white shadow-md"}>{state.jmeno.toUpperCase()} ({state.vyhry}x)</span>
                            <section className="flex space-x-3 buttons">
                                <button className="p-2 m-3 text-2xl font-bold text-white bg-transparent border-2 border-white hover:bg-black" style={{ left: "50%" }} onClick={() => { getBorci() }}>
                                    <span className="shadow-2xl ">Roll</span>
                                </button>
                                <button onClick={() => { setAdd(!add); setShowGraph(false) }} className="p-2 m-3 text-2xl font-bold text-white bg-transparent border-2 border-white w-44 hover:bg-black">{add ? "Schovat" : "Přidat borca"}</button>
                                <button onClick={() => { setShowGraph(!showGraph); setAdd(false) }} className="p-2 m-3 text-2xl font-bold text-white bg-transparent border-2 border-white w-44 hover:bg-black">{showGraph ? "Schovat graf" : "Ukázat graf"}</button>
                            </section>
                        </header>


                        <div id="pozadi" className={"text-white h-screen flex justify-center items-center bg-opacity-70"} style={
                            {
                                backgroundSize: "100% 100%"
                            }
                        } >
                            <animated.div style={graphStyle} className="absolute w-1/2 p-3 mx-auto bg-white rounded-xl bg-opacity-80 top-1/4 left-1/4 h-1/2">
                                {getBarGraph(vsichniBorci)}
                            </animated.div>

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
                    </span>
                }
            </animated.div>

        </div>
    );
}

export default App;
