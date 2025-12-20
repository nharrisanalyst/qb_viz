import type { ColumnDef } from "@tanstack/react-table"
import type { QB } from "../../types/QB"
import  { tableHeaderText } from './tableColumnAccesor'

export const makeTableData = (data:QB[], columnAccesors:string[], qbID:number):{tableData:QB[], columns:ColumnDef<object>[]}=>{
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