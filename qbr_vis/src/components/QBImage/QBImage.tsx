//https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4685720.png
import { useMemo } from "react"

interface QBImageProps {
    qbID:number
}

const QBImage =({qbID}:QBImageProps)=>{
    const imageURL = useMemo(()=>{
        return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${qbID}.png`
    },[qbID])

    return(
        <>
        <img height={87.2} width={120} src={imageURL} alt={`player ${qbID} headshot`} />
        </>
    )

}

export default QBImage