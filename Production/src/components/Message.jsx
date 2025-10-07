

export function Message({text,close}){
    return(
        <div className="w-dvw min-w-3xl h-dvh min-h-[600px] z-10 fixed top-0 left-0 flex items-center justify-center bg-gray-600/75">
            <div className={`w-1/3 h-1/4 min-w-[250px] max-w-[450px] flex flex-col justify-center items-center relative bg-white border rounded-4xl shadow-2xl ${text=="Data Added Successfully"?'shadow-[#5cb55c] border-[#5cb55c]':'shadow-[#e64141] border-[#e64141]'}`}>
                <h1 className="lg:text-2xl font-medium mb-2 text-black">{text}</h1>
                { text=="Data Added Successfully"?<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#5cb55c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>: <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="#e64141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ban-icon lucide-ban"><path d="M4.929 4.929 19.07 19.071"/><circle cx="12" cy="12" r="10"/></svg> }

                {/* <img src={`${text=="Data Added Successfully"?'Check.svg':'Cancel.svg'}`} className="w-1/6 h-auto"></img> */}
                <button className="absolute top-2 right-2 bg-gray-500 rounded-xl p-2 px-3 m-1 hover:bg-green-300" onClick={close}>Close</button>
            </div>
        </div>
    )
}