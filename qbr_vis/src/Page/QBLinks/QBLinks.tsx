import { Link } from "react-router-dom";
import {useGetQBData} from '../../hooks/useGetQBData'
import { makeFilterData } from '../utilis/makeFilterData'

import './links.scss';

const QBLinks =()=>{
const [data,loading,error] = useGetQBData();


    if(loading == 'LOADING_ERROR' && error){
        return (
            <div>
                Error: Error when loading Data
            </div>
        )
    }

    if(loading == 'LOADING' || !data ){
        return (
            <div>
                Loading Data...
            </div>
        )
    }

    

    return (
    <div>
        <h1>List of QuarterBacks</h1>
        <div className='links-main-cont'>
        {
            makeFilterData(data).map(option=>{
            const nameURL = option.text.replace(' ', '_')
                return(
                    <>
                        <Link id={String(option.id)}  to={`/qbs/${nameURL}`} >{option.text} </Link>
                    </>
            
                    )
                })
        }
        </div>
    </div>
    )
}


export default QBLinks;