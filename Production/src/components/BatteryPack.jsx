
import { useEffect, useState, useRef } from "react";
import { Cells } from "./Cells";
import { CacheDialogBox } from "./CacheDialogBox";
import { verifyModuleId } from "../data/verifyModuleId";
import { addRecords } from "../data/addRecords";
import { Message } from "./Message";
import { Loading } from "./Loading";



export function BatteryPack(){
    const map=useRef(new Map());
    const[cache,setCache]=useState(null);
    const[dialog,setDialog]=useState(null);
    const[submit,setSubmit]=useState(null);
    const[message,setMessage]=useState(null);
    const[loading,setLoading]=useState(false);

    useEffect(()=>{
        if(localStorage.length>0)setDialog(true);
    },[])

    async function test(e){
        if(await verifyModuleId(e.target.value)){
            e.target.style="background: #5cb55c";
        }
        else{
            e.target.value='';
            e.target.style='background:#DB4C39';
        }
    }

    async function handleSubmit(formData){
        setLoading(true);
        setTimeout(async() => {
            const data={"data":[{"SubForm":[]}]};
            for(const pair of formData.entries()){
                if(pair[0]=="min_Voltage" || pair[0]=="max_Voltage" || pair[0]=="Scan_Cell" || pair[0]=="Cell_Makes" || pair[0]=="min_IR" || pair[0]=="max_IR"){
                    data.data[0][pair[0]]=pair[1];
                }
                else{
                    const temp={
                        "Number":pair[0],
                        "Cell_Number":pair[1],
                    }
                    data.data[0]["SubForm"].push(temp);
                }
            }

            const response=await addRecords(data);
            if(response.code==3000){
                localStorage.clear();
                map.current.clear();
                setMessage(response.message);
                setCache((curr)=>!curr);
                setSubmit(false);
            }
            else{
                setMessage("Failed to submit data");
            }
            setLoading(false);
        }, 500);
        // const data={"data":[{"SubForm":[]}]};
        // for(const pair of formData.entries()){
        //     if(pair[0]=="min_Voltage" || pair[0]=="max_Voltage" || pair[0]=="Scan_Cell" || pair[0]=="Cell_Makes" || pair[0]=="min_IR" || pair[0]=="max_IR"){
        //         data.data[0][pair[0]]=pair[1];
        //     }
        //     else{
        //         const temp={
        //             "Number":pair[0],
        //             "Cell_Number":pair[1],
        //         }
        //         data.data[0]["SubForm"].push(temp);
        //     }
        // }

        // const response=await addRecords(data);
        // if(response.code==3000){
        //     localStorage.clear();
        //     map.current.clear();
        //     setMessage(response.message);
        //     setCache((curr)=>!curr);
        //     setSubmit(false);
        // }
        // else{
        //     setMessage("Failed to submit data");
        // }
        // setLoading(false);


    }

    return(
        // overflow-scroll md:overflow-x-hidden
        <>
        <form className="flex flex-col gap-6 pt-4 mb-8 items-center justify-center w-dvw min-w-3xl h-max" action={handleSubmit}>
            <div className="flex w-9/10 py-5 sticky top-0 left-0 bg-black">
                <div className="flex flex-col items-center gap-4 w-1/2">
                    <div className="flex justify-evenly w-full">
                        <input autoComplete="off" required name="Scan_Cell" type="text" className="Button" placeholder="Module ID" onBlur={test}></input>
                        <select required name="Cell_Makes" className="Button">
                            <option className="bg-gray-800">Ten Power</option>
                            <option className="bg-gray-800">BAK</option>
                            <option className="bg-gray-800">Samsung</option>
                        </select>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <input autoComplete="off" required name="min_IR" type="text" className="Button" placeholder="min IR"></input>
                        <input autoComplete="off" required name="max_IR" type="text" className="Button" placeholder="max IR"></input>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <input autoComplete="off" required name="min_Voltage" type="text" className="Button" placeholder="min Voltage"></input>
                        <input autoComplete="off" required name="max_Voltage" type="text" className="Button" placeholder="max Voltage"></input>
                    </div>
                    
                </div>
                <div className="flex flex-col items-center gap-4 w-1/2">
                    <p className="w-12 px-2 py-1 text-center italic rounded-xl bg-white/30" id="Current cell">&nbsp;</p>
                    <p className="py-1 inline-block w-3/5 truncate text-center px-2 rounded-xl bg-white/30" id="Current value">&nbsp;</p>
                    <p className="font-mono relative"><span id="Progress Number" className="absolute right-10 animate-slideInUp">0</span>/192</p>
                    <div className="w-[80%] h-3 border border-gray-300 rounded-4xl bg-gray-200">
                        <div id="Progress Bar" className="w-0 h-full rounded-4xl bg-[#5CB55C]"></div>
                    </div>
                </div>
            </div>
            <Cells cache={cache} submit={setSubmit} message={setMessage} map={map}/>
            {submit && <button type="submit" className="bg-gray-500 rounded-xl p-3 px-3 m-1 hover:bg-green-300" >Submit</button>}
        </form>
        {dialog && <CacheDialogBox cache={setCache} close={()=>setDialog(false)}/>}
        {message && <Message text={message} close={()=>setMessage(false)}/>}
        {loading && <Loading/>}
        </>
    );
}