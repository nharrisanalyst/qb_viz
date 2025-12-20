import {csv} from 'd3'
import type { DSVRowString} from 'd3'
import {  useEffect, useState } from "react"
import type {QB} from '../types/QB'

const CSV_FILE_PATH = '/data/qb_data.csv';

export const useGetQBData =():[QB[] | null,'LOADING'|'DATA_LOADED'| 'LOADING_ERROR', boolean ] =>{
    const [loading, setLoading] = useState<'LOADING'|'DATA_LOADED'| 'LOADING_ERROR'>('LOADING');
    const [error, setError] = useState<boolean>(false);
    const [data, setQBData] = useState<QB[]|null>(null)


    const parseQBData = (rawRow:DSVRowString):QB =>{
        return{
        name:rawRow.name,
        id:Number(rawRow.id),
        team:rawRow.team,
        result:rawRow.result,
        comp:Number(rawRow.comp),
        att:Number(rawRow.att),
        yds:Number(rawRow.yds),
        td:Number(rawRow.td),
        inter:Number(rawRow.inter),
        sack:Number(rawRow.sack),
        fum:Number(rawRow.fum),
        rat:Number(rawRow.rat),
        week:Number(rawRow.week),
        }
    }
    useEffect(()=>{
        const getQB = async () =>{
            try{
                const data = await csv<QB>(CSV_FILE_PATH, parseQBData);
                setQBData(data);
            }catch(error){
                setError(true);
                setLoading('LOADING_ERROR')
            }finally{
                setLoading('DATA_LOADED');
            }
        }
        getQB();
    },[]) 
    return [data, loading,error]
}