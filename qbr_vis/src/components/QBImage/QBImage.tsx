//https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4685720.png
import './qbImage.scss'
import { useMemo } from "react"

interface QBImageProps {
    qbID:number;
    name:string;
    team:string
    statName:string;
    stat:string;
}

const QBImage =({qbID, name, team, statName, stat}:QBImageProps)=>{
    const imageURL = useMemo(()=>{
        return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${qbID}.png`
    },[qbID])

    return(
        <div className='qb-image-cont'>
        <img height={101.733} width={140} src={imageURL} alt={`player ${qbID} headshot`} />
        <div className='qb-name-main'>
            <span>{name}</span>
            
             <span  className='qb-image-stats' ><span className='stat-title-image'>Team:</span> {team}</span>
            <span  className='qb-image-stats' ><span className='stat-title-image'>{statName}:</span> {stat}</span>
            
        </div>


        </div>
    )

}

export default QBImage