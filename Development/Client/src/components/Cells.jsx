
import { useEffect,memo } from "react";

export const Cells=memo(function Cells({cache,submit}){
    const map=new Map();
    useEffect(()=>{
        
        if(cache){
            const bar=document.getElementById("Progress Bar");
            const num=document.getElementById("Progress Number");
            bar.style.width=`${(localStorage.length/192)*100}%`;
            num.textContent=`${localStorage.length}`;
            Object.keys(localStorage).forEach(function(key){
                map.set(localStorage.getItem(key),key);
            }); 
        }

    },[cache])
    
    function handleBlur(e){
        
        if(e.target.value.trim().length>0){
            map.delete(localStorage.getItem(e.target.id));
            if(!map.has(e.target.value.trim())){
                map.set(e.target.value.trim(),e.target.id);
                localStorage.setItem(e.target.id,e.target.value.trim());
                e.target.style="background: #5cb55c";
            }
            else if(map.get(e.target.value.trim())!=e.target.id){
                e.target.value='';
                localStorage.removeItem(e.target.id);
                e.target.style="background:rgba(255, 255, 255, 0.2)";
            }
            else{
                map.set(e.target.value.trim(),e.target.id);
                localStorage.setItem(e.target.id,e.target.value.trim());
                e.target.style="background: #5cb55c";
            }
        }   
        else{
            e.target.value='';
            map.delete(localStorage.getItem(e.target.id));
            localStorage.removeItem(e.target.id);
            e.target.style="background:rgba(255, 255, 255, 0.2)";

        }

        if(map.size==3){
            submit(true);
        }
        else{
            submit(false);
        }
        const bar=document.getElementById("Progress Bar");
        const num=document.getElementById("Progress Number");
        bar.style.width=`${(map.size/192)*100}%`;
        num.textContent=`${map.size}`; 
        num.classList.remove('animate-slideInUp');
        void num.offsetWidth;
        num.classList.add('animate-slideInUp');
        console.log(map);
    }

    function handleFocus(e){
        const curr=document.getElementById("Current cell");
        const val=document.getElementById("Current value");
        curr.textContent=`${e.target.id}`;
        if(e.target.value==''){
            val.innerHTML='&nbsp;';
        }
        else{
            val.textContent=`${e.target.value}`;
        }
    }

    function handleChange(e){
        const val=document.getElementById("Current value");
        if(e.target.value==''){
            val.innerHTML='&nbsp;';
        }
        else{
            val.textContent=`${e.target.value}`;
        }
    }

    const arr=[];
    var k=1;
    for (let row = 1; row <= 16; row++) {
        let alpha=65;
        for(let col=1;col<=12;col++){
            const id=String.fromCodePoint(alpha)+row;
            var val='';
            if(cache){
                val=localStorage.getItem(id);
            }
            arr.push(
                <input key={k++} type="text" id={id} name={id} placeholder={String.fromCodePoint(alpha)+row} 
                className="h-18 text-center border border-gray-300 rounded-lg"  style={{background:val?'#5cb55c':'rgba(255, 255, 255, 0.2)'}} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange}
                defaultValue={val}
                >
                </input>
            );
            alpha++;
        }
    }
    
    return(
        <>
            <div className="md:w-8/9 grid grid-cols-12 gap-1.5 p-6 border-0 rounded-4xl shadow-2xl/70 bg-gray-400">
                {arr}    
            </div>
        
        </>
    )
})