import type { ColumnDef } from "@tanstack/react-table"
import type { QB } from "../../types/QB"
import  { tableHeaderText } from './tableColumnAccesor'

export const makeTableData = (data:QB[], columnAccesors:string[], qbID:number):{tableData:(QB| Record<string, number|string>)[], columns:ColumnDef<object>[]}=>{
     const tableData = data.filter(qb=> qb.id === qbID).sort((a,b)=> a.week-b.week);

     const columns = columnAccesors.map(c=>{
        if(typeof c === 'string' && c in tableHeaderText){
            return  {
                accessorKey:c,
                header:tableHeaderText[c as keyof typeof tableHeaderText]
            }; 
            }else {
                return {
                    accessorKey:c,
                    header:c
                }
            }
        })
    return {
        tableData,
        columns,
    }
}



export const makeDataTotals = (data:(QB| Record<string, number|string>)[])=>{
    const startValue:Record<string, number|string> = {};
    for(const key in data[0]){
        if(typeof data[0][key as keyof QB] === "number" && key != 'week'){
            startValue[key as keyof typeof startValue] = 0;
        
        }else{
            startValue[key as keyof typeof startValue] =""
        }

    }

    const totalData = data.reduce<Record<string, number|string>>((acc,cur)=>{
        for(const [key,value] of Object.entries(cur)){
            if(typeof value === 'number' && typeof acc[key]==='number' && key != 'week' ){
                acc[key] = (acc[key] ?? 0) + value
                //
                if(!Number.isInteger(acc[key])){
                    acc[key] = Number(acc[key].toFixed(1))
                }
            }
        }
        return acc;
    },startValue)
    
    return totalData;
}

export const makeAverages=(totalQB:Record<string, number|string>, data:(QB| Record<string, number|string>)[]):Record<string, number | string>=>{
    const length = data.length;
    const avgQB:Record<string, number | string>={};

    for (const [key,value] of Object.entries(totalQB)){
        if(typeof value === 'number'){
            const avg_value = value/length;
            avgQB[key as keyof typeof avgQB] = avg_value.toFixed(1);
        }else{
            avgQB[key as keyof typeof avgQB] = "";
        }
    }
    return avgQB;
}


