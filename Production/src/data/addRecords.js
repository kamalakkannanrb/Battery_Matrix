
export async function addRecords(data){
    var config={
        app_name:"gallus-pro",
        form_name:"Battery_Matrix",
        payload:data
    };
    try{
        const response=await ZOHO.CREATOR.DATA.addRecords(config).then((res)=>JSON.stringify(res)).then((res)=>JSON.parse(res));
        console.log(response);
        if(response?.code==3000){
            return {"code":response?.code,"message":"Data Added Successfully"};
        }
        return {"code":response?.code,"message":"Failed to submit data !!"};
    }
    catch(e){
        console.log("Error",e);
        return {"code":400,"message":"Failed to submit data !!"};
    }
}