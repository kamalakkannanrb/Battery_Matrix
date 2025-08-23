
export function addRecords(data){
    var config={
        form_name:"",
        payload:data
    };
    ZOHO.CREATOR.DATA.addRecords(config).then((res)=>console.log(res));
}