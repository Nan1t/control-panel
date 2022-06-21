export function inverse(obj){
    let retobj = {};
    for(let key in obj){
        retobj[obj[key]] = key;
    }
    return retobj;
}