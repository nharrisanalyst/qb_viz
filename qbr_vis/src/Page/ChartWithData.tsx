import {useMemo, useState} from 'react';
import {useGetQBData} from '../hooks/useGetQBData'
import Chart from '../components/Chart/Chart'
import Filter from '../components/Filter/Filter'
import QBImage from '../components/QBImage/QBImage';
import QBTable from '../components/QBTable/QBTable';
import { makeFilterData } from './utilis/makeFilterData';
import { makeTableData } from './utilis/makeTableData';
import {tableColumnAccesor} from './utilis/tableColumnAccesor'



const ChartWithData =()=>{
    const [selectedQB, setSelectedQB] = useState<number>(3912547);
    const [data,loading,error] = useGetQBData();

    const filterData = useMemo(()=>{
        if(!data) return null;
            return makeFilterData(data);
    },[data])

    const tableData = useMemo(()=>{
        if(!data) return null;
            return makeTableData(data,tableColumnAccesor, selectedQB);
    },[data,selectedQB])



   

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
        <QBImage qbID={selectedQB} />
        {!tableData?null:<QBTable data={tableData.tableData} columns={tableData.columns}  />}
        </>

    )
}

export default ChartWithData;