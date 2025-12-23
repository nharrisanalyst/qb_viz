//https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4685720.png
import './qbImage.scss'
import { useMemo } from "react"

interface QBImageProps {
    qbID:number;
    name:string;
}

const QBImage =({qbID, name}:QBImageProps)=>{
    const imageURL = useMemo(()=>{
        return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${qbID}.png`
    },[qbID])

    return(
        <div className='qb-image-cont'>
        <img height={87.2} width={120} src={imageURL} alt={`player ${qbID} headshot`} />
        <div className='qb-name-main'>
            {name}
        </div>


        </div>
    )

}

export default QBImage