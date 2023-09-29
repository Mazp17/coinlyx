import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Balance from './pages/wallet/Balance';
import Client from './pages/client';
import Layout from './pages/Layout';
import Wallet from './pages/wallet/Wallet';
import Load from './pages/wallet/Load';
import Pay from './pages/wallet/Pay';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='wallet' element={<Wallet/>}>
              <Route path='balance' element={<Balance/>}/>
              <Route path='load' element={<Load/>}/>
              <Route path='pay' element={<Pay/>}/>
            </Route>
            <Route path='/register' element={<Client/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
