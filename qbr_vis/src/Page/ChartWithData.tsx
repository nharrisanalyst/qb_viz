import {useMemo, useState} from 'react';
import {useGetQBData} from '../hooks/useGetQBData'
import Chart from '../components/Chart/Chart'
import Filter from '../components/Filter/Filter'
import { makeFilterData } from './utilis/makeFilterData'

const ChartWithData =()=>{
    const [selectedQB, setSelectedQB] = useState<number>(3912547);
    const [data,loading,error] = useGetQBData();
    
    const filterData = useMemo(()=>{
        if(!data) return null;
        return makeFilterData(data);
    },[data])

    if(loading == 'LOADING_ERROR' && error){
        return (
            <div>
                Error: Error when loading Data
            </div>
        )
    }

    if(loading == 'LOADING' || !data){
        return (
            <div>
                Loading Data...
            </div>
        )
    }

    return(
        <>
        <Chart data={data} qbID={selectedQB} />
        {!filterData?null:(<Filter options={filterData} optionChange={setSelectedQB} firstID={selectedQB} />)}
        </>

    )
}

export default ChartWithData;