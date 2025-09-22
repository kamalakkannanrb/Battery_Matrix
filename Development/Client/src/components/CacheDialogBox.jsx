
export function CacheDialogBox({cache,close}){
    return(
        <div className="w-dvw min-w-3xl h-dvh min-h-[600px] z-10 fixed top-0 left-0 flex justify-center items-center bg-gray-600/75">
            <div className="w-1/3 h-1/4 min-w-[250px] max-w-[450px] flex justify-center flex-col items-center bg-white rounded-4xl shadow-2xl shadow-[#5cb55c] border-1 border-[#5cb55c]">
                <h1 className="lg:text-2xl font-medium mb-2 text-black">Want to refill cache?</h1>
                <div>
                    <button className="bg-gray-500 rounded-xl p-2 px-3 m-1 hover:bg-green-300" onClick={()=>{
                        cache(true);
                        close();
                        }}>Yes</button>
                    <button className="bg-gray-500 rounded-xl p-2 px-3 m-1 hover:bg-green-300" onClick={()=>{
                        localStorage.clear();
                        cache(false);
                        close();
                    }}>No</button>
                </div>
            </div>
        </div>
    )
}