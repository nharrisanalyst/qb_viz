export type optionType ={
    text:string;
    id:number;
}

interface FilterProps {
    options:optionType[];
    optionChange:(id:number)=>void;
    firstID:number;
}

const Filter = ({options, firstID, optionChange}:FilterProps)=>{
   const  handleOnChange=(e)=>{
        e.prevenDefault();
        
    }
    
    return(
        <>
        <label>Choose a Quarter Back</label>
        <select>
            {
                options.map(o=>(
                    <option value={o.id}>{o.text}</option>
                ))
            }
        </select>
        </>
    )
     
}

export default Filter