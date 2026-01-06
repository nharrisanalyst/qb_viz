import type {QB} from '../../types/QB'

export const  QBIDERROR = 'NOT_FOUND';

export const getPlayerID = (data:QB[], name:string):number| 'NOT_FOUND' =>{
    const playerIDs = new Map();

    data.forEach(qb=>{
        const qbName = qb.name.replaceAll(" ", "_");
        if(!playerIDs.has(qbName)){
            playerIDs.set(qbName.toLowerCase(), qb.id);
        }
    })

    if(!playerIDs.has(name.toLowerCase())){
        return QBIDERROR;
    }

    return playerIDs.get(name.toLowerCase());
}