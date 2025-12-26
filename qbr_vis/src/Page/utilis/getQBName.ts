import type {QB} from '../../types/QB'

export const getQBName = (data:QB[], id:number):string|null =>{
    let qbName = null;
    let qbFound = false;
    let i = 0;
    while(!qbFound && i < data.length){
        if(data[i].id ===  id){
        qbName = data[i].name;
        qbFound = true;
            }
            i++;
        }

    return qbName;
}