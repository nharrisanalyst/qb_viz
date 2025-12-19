import type {QB} from '../../../types/QB'

export type LINE_DATA_ERROR_TYPE = 'Error No QBS Match Selected One'
export const LINE_DATA_ERROR:LINE_DATA_ERROR_TYPE = 'Error No QBS Match Selected One'

export const filterQB=(data:QB[], qbID:number):QB[]|LINE_DATA_ERROR_TYPE=>{

    const singleQB = data.filter(qb=>qb.id===qbID)
    if(singleQB.length >0) return singleQB;
    return LINE_DATA_ERROR;
}