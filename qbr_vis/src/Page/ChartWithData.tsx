import {useMemo, useState, useEffect, useCallback} from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {useGetQBData} from '../hooks/useGetQBData'
import Chart from '../components/Chart/Chart'
import Filter from '../components/Filter/Filter'
import QBImage from '../components/QBImage/QBImage';
import TitleAndChildren from '../components/Organisms/TitleAndChildren/TitleAndChildren'
import QBTable from '../components/QBTable/QBTable';
import QBMeta from '../components/QBMeta/QBMeta';
import { getQBName } from './utilis/getQBName';
import {getPlayerID} from './utilis/getPlayerID'
import { makeFilterData } from './utilis/makeFilterData';
import { makeTableData, makeDataTotals, makeAverages } from './utilis/makeTableData';
import {tableColumnAccesor} from './utilis/tableColumnAccesor'

import './chartWithData.scss'

import { QBIDERROR } from './utilis/getPlayerID';

const ChartWithData =()=>{
    let { qbname } = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    const [idErr, setIdErr] = useState<"NO_ERROR" |"NOT_FOUND">("NO_ERROR")
    const [selectedQB, setSelectedQB] = useState<number|null>(null);
    const [data,loading,error] = useGetQBData();

    const filterData = useMemo(()=>{
        if(!data) return null;
            return makeFilterData(data);
    },[data])

    useEffect(()=>{
        if(!data) return;
        let id = null;
        if (location.pathname === '/'){
            id = 3918298;
            navigate(`/qbs/Josh_Allen`);
            return;
        }

        if(!qbname) return;

        id = getPlayerID(data, qbname);

        if(id=== QBIDERROR){
            setIdErr(QBIDERROR);
            return;
        }

        setSelectedQB(id);

    }, [qbname, data])

     const QBName= useMemo(()=>{
        if(!data || !selectedQB ) return null;
            return getQBName(data, selectedQB)
    },[data,selectedQB])

    const tableData = useMemo(()=>{
        if(!data || !selectedQB) return null;
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

    const handleOnChange=useCallback((qbID:number):void=>{
        if(!data) return;
        const qbName = getQBName(data, qbID)
        const qbnameURL = qbName?.replace(" ", "_");
        navigate(`/qbs/${qbnameURL}`);

    },[data])


    const selctedQBQB =  useMemo(()=>{
        if(!data || !selectedQB) return null;
        return data.filter(d=> d.id === selectedQB)
    }, [data, selectedQB])
    


    if(idErr === QBIDERROR){
        return(
        <div>
            <h1> 404 ERROR Page Not FOUND</h1>
        </div>
        );
    }

   

    if(loading == 'LOADING_ERROR' && error){
        return (
            <div>
                Error: Error when loading Data
            </div>
        )
    }

    if(loading == 'LOADING' || !data || !selectedQB){
        return (
            <div>
                Loading Data...
            </div>
        )
    }
   
    

    return(
        <>
        {!selctedQBQB?null:(<QBMeta qb={selctedQBQB[0]} />)}
        {!filterData?null:(<Filter options={filterData} optionChange={handleOnChange} firstID={selectedQB} />)}
        <div className='app-main-stuff'>
            {!QBName ||!tableData?.tableData || tableData.tableData.length<0? null:(<QBImage qbID={selectedQB} name={QBName} team={String(tableData.tableData[0].team)} statName={'Avg Rating'} stat={String(tableData.tableData[tableData.tableData.length-1].rat)} />)}
                <TitleAndChildren title={'Weekly QB Passing Rating'}>
                    <Chart data={data} qbID={selectedQB} />
                </TitleAndChildren>
            {!tableData? null:(
                <TitleAndChildren title={'Weekly Stats'}>
                    <QBTable  data={tableData.tableData} columns={tableData.columns}  />
                </TitleAndChildren>
            )}
        </div>
        </>

    )
}

export default ChartWithData;