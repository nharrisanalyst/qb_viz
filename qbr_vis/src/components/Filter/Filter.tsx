import type { ChangeEvent } from 'react'
import './filter.scss'

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
        <div className='main-filter-cont'>
        <div className='main-filter'>
         <div><label className='filter-label'>Choose a Quarter Back</label></div>
            <select value={firstID} onChange={handleOnChange}>
                {
                    options.map(o=>(
                        <option value={o.id}>{o.text}</option>
                    ))
                }
            </select>
            </div>
        </div>
    )
     
}

export default Filter