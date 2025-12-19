import type {QB} from '../../types/QB'
import type {optionType} from '../../components/Filter/Filter'


export const makeFilterData=(data:QB[]):optionType[]=>{
     const qbMap = new Map<number,string>();  // Maps ids to names
     data.forEach(qb=>{
        if(!qbMap.has(qb.id)){
            qbMap.set(qb.id, qb.name)
        }
     })

     return [...qbMap].map(([id,name])=>({text:name, id:id})).sort((a,b)=>{
        const aLastName = a.text.split(" ")[1];
        const bLastName = b.text.split(" ")[1];
        return aLastName.localeCompare(bLastName);
    
    })
}
