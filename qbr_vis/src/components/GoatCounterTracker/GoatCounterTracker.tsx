import {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

const GoatCounterTracker = () =>{
    const location  = useLocation()

    useEffect(() => {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({
        path: location.pathname + location.search,
      });
    }
  }, [location]);

    return null;
}

export default GoatCounterTracker;