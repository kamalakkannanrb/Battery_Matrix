
export async function verifyModuleId(id){
    var config={
        app_name:"gallus-pro",
        report_name:"G_Master_Report",
        criteria:`Scan_Module="${id.trim()}"`,
    };
    try{
        const response=await ZOHO.CREATOR.DATA.getRecords(config).then((res)=>JSON.stringify(res)).then((res)=>JSON.parse(res));
        if(response?.code==3000 && response?.data?.length==1 && response?.data[0]?.Status=='G1-Passed'){
            console.log(response,true);
            return true;
        }
        else{
            console.log(response,false);
            return false
        }
    }
    catch(e){
        console.log("Error:",e,false);
        return false;
    }
}