import { ChangeEvent } from 'react'

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
   const  handleOnChange=(e:ChangeEvent<HTMLSelectElement> )=>{
        e.preventDefault();

        const value = Number(e.target.value);
        optionChange(value);
        
    }
    
    return(
        <div>
         <div><label>Choose a Quarter Back</label></div>
            <select value={firstID} onChange={handleOnChange}>
                {
                    options.map(o=>(
                        <option value={o.id}>{o.text}</option>
                    ))
                }
            </select>
        </div>
    )
     
}

export default Filter