import {useMemo, useState} from 'react';
import {useGetQBData} from '../hooks/useGetQBData'
import Chart from '../components/Chart/Chart'
import Filter from '../components/Filter/Filter'
import QBImage from '../components/QBImage/QBImage';
import TableAndTitle from '../components/TableAndTitle/TableAndTitle'
import QBTable from '../components/QBTable/QBTable';
import { getQBName } from './utilis/getQBName';
import { makeFilterData } from './utilis/makeFilterData';
import { makeTableData, makeDataTotals, makeAverages } from './utilis/makeTableData';
import {tableColumnAccesor} from './utilis/tableColumnAccesor'

import './chartWithData.scss'



const ChartWithData =()=>{
    const [selectedQB, setSelectedQB] = useState<number>(3912547);
    const [data,loading,error] = useGetQBData();

    const filterData = useMemo(()=>{
        if(!data) return null;
            return makeFilterData(data);
    },[data])

     const QBName= useMemo(()=>{
        if(!data) return null;
            return getQBName(data, selectedQB)
    },[data,selectedQB])

    const tableData = useMemo(()=>{
        if(!data) return null;
            const tableData = makeTableData(data,tableColumnAccesor, selectedQB);
            const totalData = makeDataTotals(tableData.tableData);
            const  avgData =  makeAverages(totalData, tableData.tableData);
            totalData.week = "Total"
            avgData.week = 'Average'
            tableData.tableData = [
                ...tableData.tableData,
                totalData,
                avgData,
            ];
            return tableData;
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
        
        {!filterData?null:(<Filter options={filterData} optionChange={setSelectedQB} firstID={selectedQB} />)}
        <div className='app-main-stuff'>
            {!QBName?null:(<QBImage qbID={selectedQB} name={QBName}/>)}
            <Chart data={data} qbID={selectedQB} />
            {!tableData || !QBName? null:<TableAndTitle name={QBName} titleText='Stats for ' data={tableData.tableData} columns={tableData.columns}  />}
        </div>
        </>

    )
}

export default ChartWithData;