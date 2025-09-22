

export function Message({text,close}){
    return(
        <div className="w-dvw min-w-3xl h-dvh min-h-[600px] z-10 fixed top-0 left-0 flex items-center justify-center bg-gray-600/75">
            <div className={`w-1/3 h-1/4 min-w-[250px] max-w-[450px] flex flex-col justify-center items-center relative bg-white border rounded-4xl shadow-2xl ${text=="Data Added Successfully"?'shadow-[#5cb55c] border-[#5cb55c]':'shadow-[#e64141] border-[#e64141]'}`}>
                <h1 className="lg:text-2xl font-medium mb-2 text-black">{text}</h1>
                <img src={`${text=="Data Added Successfully"?'Check.svg':'Cancel.svg'}`} className="w-1/6 h-auto"></img>
                <button className="absolute top-2 right-2 bg-gray-500 rounded-xl p-2 px-3 m-1 hover:bg-green-300" onClick={close}>Close</button>
            </div>
        </div>
    )
}