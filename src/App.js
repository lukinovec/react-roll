import './App.css';
import { useState } from "react";
import { fetchBorci } from "./fetchBorci";

function App() {
    const [state, setState] = useState(fetchBorci());

    return (
        <div className="w-full h-full">
            <header className="text-4xl flex flex-col justify-center items-center text-center
             p-6 w-full font-bold bg-black bg-opacity-90 fixed top-0">
                <span className={"text-white uppercase shadow-md"}>{state.jmeno.toUpperCase()}</span>
                <button className="m-3 p-2 w-24 border-2 border-white text-2xl text-white font-bold bg-transparent  hover:bg-black" style={{ left: "50%" }} onClick={() => setState(fetchBorci())}>
                    <span className="shadow-2xl ">Roll</span>
                </button>
            </header>
            <div className={"text-white h-screen flex justify-center items-center transition ease-out bg-opacity-70"} style={
                {
                    backgroundImage: `url(${state.obrazek})`,
                    backgroundSize: "100% 100%"
                }
            } >
            </div>
        </div>
    );
}

export default App;
