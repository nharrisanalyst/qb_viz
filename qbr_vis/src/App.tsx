import ChartWithData from './Page/ChartWithData'
import QBLinks from './Page/QBLinks/QBLinks';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Routes, Route } from "react-router"; 
import './App.scss'

function App() {
  return (
    <>
    <Header />
     <div className='main-app-cont'>
      <Routes>
        <Route path="/" element={<ChartWithData />} />
        <Route path="qbs" >
          <Route index element={<QBLinks />} />
          <Route path=":qbname" element={<ChartWithData />} />
        </Route>
      </Routes>
       
      </div>
    <Footer />
    </>
  )
}

export default App
