
import { useEffect,memo} from "react";

export const Cells=memo(function Cells({cache,submit,map}){
    
    useEffect(()=>{
        
        if(cache){
            const bar=document.getElementById("Progress Bar");
            const num=document.getElementById("Progress Number");
            bar.style.width=`${(localStorage.length/192)*100}%`;
            num.textContent=`${localStorage.length}`;
            Object.keys(localStorage).forEach(function(key){
                map.current.set(localStorage.getItem(key),key);
            }); 
        }

        //To rest progress bar and progress number

        else{
            const bar=document.getElementById("Progress Bar");
            const num=document.getElementById("Progress Number");
            bar.style.width=`${(localStorage.length/192)*100}%`;
            num.textContent=`${localStorage.length}`;
        }

        if(map.current.size==192){
            submit(true);
        }
        else{
            submit(false);
        }

    },[cache])
    
    function handleBlur(e){
        
        if(e.target.value.trim().length>0){
            map.current.delete(localStorage.getItem(e.target.id));
            if(!map.current.has(e.target.value.trim())){
                map.current.set(e.target.value.trim(),e.target.id);
                localStorage.setItem(e.target.id,e.target.value.trim());
                e.target.style="background: #5cb55c";
            }
            else if(map.current.get(e.target.value.trim())!=e.target.id){
                e.target.value='';
                localStorage.removeItem(e.target.id);
                e.target.style="background:rgba(255, 255, 255, 0.3)";
            }
            else{
                map.current.set(e.target.value.trim(),e.target.id);
                localStorage.setItem(e.target.id,e.target.value.trim());
                e.target.style="background: #5cb55c";
            }
        }   
        else{
            e.target.value='';
            map.current.delete(localStorage.getItem(e.target.id));
            localStorage.removeItem(e.target.id);
            e.target.style="background:rgba(255, 255, 255, 0.3)";

        }

        if(map.current.size==192){
            submit(true);
        }
        else{
            submit(false);
        }
        const bar=document.getElementById("Progress Bar");
        const num=document.getElementById("Progress Number");
        const curr=document.getElementById("Current cell");
        const val=document.getElementById("Current value");
        bar.style.width=`${(map.current.size/192)*100}%`;
        num.textContent=`${map.current.size}`; 
        curr.innerHTML='&nbsp;';
        val.innerHTML='&nbsp;';
        num.classList.remove('animate-slideInUp');
        void num.offsetWidth;
        num.classList.add('animate-slideInUp');
        console.log(map.current);
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
                
                <input required key={`${cache}${k++}`} type="text" id={id} name={id} placeholder={String.fromCodePoint(alpha)+row} defaultValue={val}
                className="aspect-[5/4] text-center border border-gray-300 rounded-lg"
                style={{backgroundColor:val?'#5cb55c':'rgba(255, 255, 255, 0.3)'}}
                onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange}
                />
            
            );
            alpha++;
        }
    }
    
    return(
       
        <div className="w-9/10 grid grid-cols-12 gap-1.5 p-6 bg-black bg-[url('/Secondary-logo-black.png')] bg-fixed bg-center bg-contain bg-no-repeat bg-blend-luminosity border-2 border-Verdigiris rounded-xl">
            {arr}    
        </div>
    
    )
})