import ChartWithData from './Page/ChartWithData'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.scss'

function App() {
  return (
    <>
    <Header />
     <div className='main-app-cont'>
      <ChartWithData />
      </div>
    <Footer />
    </>
  )
}

export default App
