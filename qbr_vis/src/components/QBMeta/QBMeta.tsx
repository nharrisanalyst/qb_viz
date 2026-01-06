import type {QB} from '../../types/QB';

type QBMetaProps = {
    qb:QB;
}

const QBMeta = ({qb}:QBMetaProps)=>{
    const keywords = `stats, visualizations, NFL, 2025 NFL Season, ${qb.name}, qb rating`
    const title = `${qb.name} season visualization and stats | Monday Morning Quarter Back | mm-qb.com`;
    const url = `https://www.mm-qb.com/qbs/${qb.name.replaceAll(" ","_")}`
    const description = `Checkout season long data visualizations and in depth statistics of ${qb.name}`
    const imageURL = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${qb.id}.png`

  return(  
    <>
    <meta name='keywords'  content={keywords} />
    <meta name="Description" content={description} />
    <meta name="og:title"  content={title} />
    <meta property="og:site_name" content="mm-qb.com" />
    <meta property="og:url" content={url} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={imageURL} />
    <meta property="twitter:image" content={imageURL} />
    <meta name="twitter:card" content="summary"/>
    <meta name="twitter:site" content="@mmorning_qb" />
    <meta name="twitter:creator" content="@mmorning_qb" />
    <meta property="twitter:image" content={url} />

    </> 
    )
}

export default QBMeta;