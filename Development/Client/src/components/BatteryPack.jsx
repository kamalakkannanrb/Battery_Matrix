
import { useEffect, useState } from "react";
import { Cells } from "./Cells";
import { CacheDialogBox } from "./CacheDialogBox";

export function BatteryPack(){
    const[cache,setCache]=useState(null);
    const[dialog,setDialog]=useState(null);
    const[submit,setSubmit]=useState(null);
    // const[sticky,setSticky]=useState(null);
    useEffect(()=>{
        if(localStorage.length>0)setDialog(true);
        // function handleScroll(){
        //     if (window.scrollY > 150) {
        //         setSticky(true);
        //     } else {
        //         setSticky(false);
        //     }
        // }
        // window.addEventListener("scroll", handleScroll);
        // return () => window.removeEventListener("scroll", handleScroll);
    },[])

    function handleSubmit(formData){
        for (const pair of formData.entries()) {
            console.log(pair[0]+"-"+pair[1]);
        }
    }

    return(
        // overflow-scroll md:overflow-x-hidden
        <form className="flex flex-col gap-6 pt-4 items-center w-dvw min-w-3xl h-dvh min-h-max" action={handleSubmit}>
            <div className="flex w-full py-5 sticky top-0 left-0 bg-white">
                <div className="flex flex-col items-center gap-4 w-1/2">
                    <div className="flex justify-evenly w-full">
                        <input name="Scan_Cell" type="text" className="Button" placeholder="Module ID"></input>
                        <select name="Cell_Makes" className="Button">
                            <option>Ten Power</option>
                            <option>BAK</option>
                            <option>Samsung</option>
                        </select>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <input name="min_IR" type="text" className="Button" placeholder="min IR"></input>
                        <input name="max_IR" type="text" className="Button" placeholder="max IR"></input>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <input name="min_Voltage" type="text" className="Button" placeholder="min Voltage"></input>
                        <input name="max_Voltage" type="text" className="Button" placeholder="max Voltage"></input>
                    </div>
                    
                </div>
                <div className="flex flex-col items-center gap-4 w-1/2">
                    <p className="font-bold" id="Current cell"></p>
                    <p className="inline-block w-3/5 truncate text-center font-bold" id="Current value">&nbsp;</p>
                    <p className="font-mono relative"><span id="Progress Number" className="absolute right-10 animate-slideInUp">0</span>/192</p>
                    <div className="w-[70%] h-3 border border-gray-300 rounded-4xl bg-gray-200">
                        <div id="Progress Bar" className="w-0 h-full rounded-4xl bg-[#5CB55C]"></div>
                    </div>
                </div>
            </div>
            <Cells cache={cache} submit={setSubmit}/>
            {dialog && <CacheDialogBox cache={setCache} close={()=>setDialog(false)}/>}
            {submit && <button type="submit" className="border-1 p-2.5 rounded-xl
            hover:cursor-pointer hover:bg-blue-100">Submit</button>}
        </form>
    );
}