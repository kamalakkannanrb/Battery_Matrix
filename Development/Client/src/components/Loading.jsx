

export function Loading(){
    return(
        <div className="w-screen h-screen fixed top-0 left-0 z-10 flex flex-col gap-4 justify-center items-center bg-gray-300/80">
            <span className="w-[55px] h-[55px] border-5 border-b-Verdigiris rounded-full shadow-2xl shadow-Verdigiris animate-spin"></span>
            <h1 className="text-5xl text-Verdigiris">Please wait...</h1>
        </div>
    )
}