import type {QB} from '../../types/QB';
import debounce from "lodash.debounce"
import { useMemo,  useRef, useEffect, useState } from 'react';
import { scaleLinear, max, select, axisTop, axisRight, extent, line, curveCardinal } from 'd3';
import { filterQB, LINE_DATA_ERROR } from './utillis/filterQB'

import './chart.scss'

interface ChartPros  {
    data:QB[];
    qbID:number;
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
const QB_CIRCLE_STROKE_COLOR = '#f21818';

const Chart = ({
    data,
    qbID,
    marginTop = 40,
    marginRight = 10,
    marginBottom = 40,
    marginLeft = 30

}:ChartPros)=>{
    const svg = useRef<SVGSVGElement | null>(null)
    const [demensions, setDemensions] = useState<{height:number; width:number}>({height:0,width:0})
    const gx = useRef<SVGGElement | null>(null)
    const gy = useRef<SVGGElement | null>(null)
    
    const lineDataQB = useMemo(()=>{
        return filterQB(data, qbID)
    }, [data, qbID])

    useEffect(()=>{
        if(svg.current){
            const svgRect = svg.current.getBoundingClientRect()
            setDemensions({
                height:svgRect.height,
                width:svgRect.width,
            })
        }
    },[svg])

    useEffect(()=>{
        
        const resizeSVG = ()=>{
            if(!svg.current) return
            const svgRect = svg.current.getBoundingClientRect()
            setDemensions({
                height:svgRect.height,
                width:svgRect.width,
            })
        }

        const resizeSVGDeb = debounce(resizeSVG, 500);
        window.addEventListener('resize', resizeSVGDeb);
        return ()=>{
            window.removeEventListener('reisze',resizeSVGDeb)
        }

    },[svg])
    
    const xScale = useMemo(()=>{
        const domain = extent(data, d => d.week)
        if (!domain[0]|| !domain[1]) return null
        return scaleLinear<number,number>([0,domain[1]], [marginLeft,demensions.width - marginRight])
    },[data, demensions])

    const yScale = useMemo(()=>{
        const maxValue = max(data, d=>d.rat);
        if(!maxValue) return 
        const domain = [0, maxValue]
        if (domain[0] == null || domain[1] == null) return null
        return scaleLinear<number,number>(domain, [demensions.height - marginBottom, marginTop]).nice()
    },[data, demensions])
    
   const path  =  useMemo(()=>{
        if(!xScale || !yScale) return null;
        const lineShape = line<XYDatum>()
                    .x(d =>xScale(d.week))
                    .y(d=>yScale(d.rat))
                    .curve(curveCardinal.tension(0.60))
        if(lineDataQB === LINE_DATA_ERROR) return null;
        return lineShape(lineDataQB);
   },[yScale,xScale, lineDataQB])
   
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
        {lineDataQB.map(qb=>(<circle cx={xScale(qb.week)} cy={yScale(qb.rat)} r='4' fill='none' stroke={QB_CIRCLE_STROKE_COLOR} strokeWidth='2.25'/>))}
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
            select(gx.current).call(axisTop(xScale).ticks(xScale.domain()[1]+1).tickSize(demensions.height - marginTop - marginBottom))
            .call(g=>g.select('.domain').remove())
            .call(g => g.selectAll(".tick:first-of-type line").remove())
            .call(g => g.selectAll(".tick:first-of-type text").remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line")
                        .attr("stroke-opacity", 0.50)
                        .attr("stroke-dasharray", "2,2"))
            .call(g => g.selectAll(".tick text")
                .attr("dy", demensions.height-marginBottom -marginTop + 15))
    }, [gx, xScale, demensions]);
    
    useEffect(() => { 
        if (!gy.current || !yScale) return
            select(gy.current).call(axisRight(yScale).tickSize(demensions.width - marginLeft - marginRight))
            .call(g=>g.select('.domain').remove())
            .call(g => g.selectAll(".tick:not(:first-of-type) line").remove())
                        // .attr("stroke-opacity", 0.25)
                        // .attr("stroke-dasharray", "2,5"))
            .call(g => g.selectAll(".tick text")
                    .attr("x", 4)
                    .attr("dy", -4))

    }, [gy, yScale, demensions]);

    return (
        <div className='weekly-chart-cont'>
            <svg ref={svg} className='weekly-chart' width={'100%'} height={'100%'}>   
                <g ref={gy} className='y-axis' transform={`translate(${marginLeft},0)`}/>
                <g ref={gx} className='x-axis' transform={`translate(0,${demensions.height - marginBottom})`}/>
                <text opacity={0.75} fontSize={12} x={demensions.width-marginLeft - marginRight+10} y={demensions.height-5} textAnchor={'middle'}>NFL Week</text>
                <text opacity={0.75} fontSize={12} transform={'translate(20,' + 130 + ')rotate(-90)'} >QB Passing Rating</text>
                    <Circles />
                    <Line />
                    <QBCircles />
                    

            </svg>
        </div>
    )
}

export default Chart

