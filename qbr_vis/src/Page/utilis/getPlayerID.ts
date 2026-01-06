import type {QB} from '../../types/QB'
import { slugifyURL } from './slugifyURL';

export const  QBIDERROR = 'NOT_FOUND';

//urlQBFormats josh_allen. or josh-allen

export const getPlayerID = (data:QB[], name:string):number| 'NOT_FOUND' =>{
    const playerIDs = new Map();
    // have to keep old urls and new url (google optimized schema)
    data.forEach(qb=>{
        const qbName = qb.name.replaceAll(" ", "_"); //check old version strip _ and " "
        if(!playerIDs.has(qbName) ){
            playerIDs.set(qbName.toLowerCase(), qb.id);
        }
        const sluggedName = slugifyURL(qb.name);   //check for new name slugging qb name to id 
        if(!playerIDs.has(sluggedName)){
            playerIDs.set(sluggedName, qb.id);
        }
    })

    if(!playerIDs.has(name.toLowerCase()) && !playerIDs.has(name) ){ // if url is not old version or new version return error 
        return QBIDERROR;
    }
    if(playerIDs.has(name.toLowerCase())){  //check first for old version 
        return playerIDs.get(name.toLowerCase());
    }

    return playerIDs.get(name); //else return new version
    
}



