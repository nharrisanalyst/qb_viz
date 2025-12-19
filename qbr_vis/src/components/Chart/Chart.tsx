import type {QB} from '../../types/QB';
import { useMemo,  useRef, useEffect } from 'react';
import { scaleLinear, max, select, axisTop, axisRight, extent, line, curveCardinal } from 'd3';
import { filterQB, LINE_DATA_ERROR } from './utillis/filterQB'

interface ChartPros  {
    data:QB[];
    qbID:number;
    width?:number;
    height?:number;
    marginTop?:number;
    marginRight?:number;
    marginBottom?:number;
    marginLeft?:number;
}
type XYDatum ={
    week:number;
    rat:number;
}

const QB_LINE_STROKE_COLOR = '#f21818';
const Chart = ({
    data,
    qbID,
    width = 1000,
    height = 600,
    marginTop = 40,
    marginRight = 40,
    marginBottom = 40,
    marginLeft = 40

}:ChartPros)=>{
    const gx = useRef<SVGGElement | null>(null)
    const gy = useRef<SVGGElement | null>(null)

    const lineDataQB = useMemo(()=>{
        return filterQB(data, qbID)
    }, [data, qbID])
    
    const xScale = useMemo(()=>{
        const domain = extent(data, d => d.week)
             console.log('we are here', domain)
        if (!domain[0]|| !domain[1]) return null
        return scaleLinear<number,number>([0,domain[1]], [marginLeft, width - marginRight])
    },[data])

    const yScale = useMemo(()=>{
        const maxValue = max(data, d=>d.rat);
        if(!maxValue) return 
        const domain = [0, maxValue]
        if (domain[0] == null || domain[1] == null) return null
        return scaleLinear<number,number>(domain, [height - marginBottom, marginTop]).nice()
    },[data])
    
   const path  =  useMemo(()=>{
        if(!xScale || !yScale) return null;
        const lineShape = line<XYDatum>()
                    .x(d =>xScale(d.week))
                    .y(d=>yScale(d.rat))
                    .curve(curveCardinal.tension(0.55))
        if(lineDataQB === LINE_DATA_ERROR) return null;
        return lineShape(lineDataQB);
   },[yScale,xScale, lineDataQB])
    
    console.log('the path to the line', path)
    const Circles = ()=>{
        if(!xScale || !yScale) return null;
        return(
            <g>
        {data.map(qb=>(<circle cx={xScale(qb.week)} cy={yScale(qb.rat)} r='3' fill='grey'/>))}
        </g>
        )
    }

    const QBCircles = ()=>{
        if(!path || lineDataQB === LINE_DATA_ERROR||!xScale || !yScale ) return null;
        return(
            <g>
        {lineDataQB.map(qb=>(<circle cx={xScale(qb.week)} cy={yScale(qb.rat)} r='4' fill='none' stroke={QB_LINE_STROKE_COLOR} strokeWidth='2'/>))}
        </g>
        )
    }

    const Line = ()=>{
        if(!path) return null;
        return (
            <g>
            <path d={path} fill='none' stroke={QB_LINE_STROKE_COLOR} strokeWidth='2.5' />
            </g>
        )
    }
    
    useEffect(() => { 
        if (!gx.current || !xScale) return
            select(gx.current).call(axisTop(xScale).ticks(xScale.domain()[1]+1).tickSize(height - marginTop - marginBottom))
            .call(g=>g.select('.domain').remove())
            .call(g => g.selectAll(".tick:first-of-type line").remove())
            .call(g => g.selectAll(".tick:first-of-type text").remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line")
                        .attr("stroke-opacity", 0.50)
                        .attr("stroke-dasharray", "2,2"))
            .call(g => g.selectAll(".tick text")
                .attr("dy", height-marginBottom -marginTop + 15))
    }, [gx, xScale]);
    
    useEffect(() => { 
        if (!gy.current || !yScale) return
            select(gy.current).call(axisRight(yScale).tickSize(width - marginLeft - marginRight))
            .call(g=>g.select('.domain').remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line").remove())
                        // .attr("stroke-opacity", 0.25)
                        // .attr("stroke-dasharray", "2,5"))
            .call(g => g.selectAll(".tick text")
                    .attr("x", 4)
                    .attr("dy", -4))

    }, [gy, yScale]);

    return (
        <svg width={width} height={height}>   
            <g ref={gy} className='y-axis' transform={`translate(${marginLeft},0)`}/>
            <g ref={gx} className='x-axis' transform={`translate(0,${height - marginBottom})`}/>
            <text opacity={0.75} fontSize={12} x={width-marginLeft - marginRight+10} y={height-5} textAnchor={'middle'}>NFL Week</text>
            <text opacity={0.75} fontSize={12} transform={'translate(20,' + 130 + ')rotate(-90)'} >QB Passing Rating</text>
                <Circles />
                <QBCircles />
                <Line />
            


        </svg>
    )
}

export default Chart

