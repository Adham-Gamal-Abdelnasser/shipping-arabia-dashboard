import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Components/Dashboard/Layout/Layout.jsx';
import Shipping from './Components/Dashboard/Shipping/Shipping.jsx';
import ShippingAgent from './Components/Dashboard/ShippingAgent/ShippingAgent.jsx';
import LogIn from './Components/Form/LogIn/LogIn.jsx';
import Rsgister from './Components/Form/Register/Register.jsx';
import { ToastContainer } from 'react-toastify';
import Admin from './Components/Dashboard/Admin/Admin.jsx';
import User from './Components/Dashboard/User/User.jsx';
import Message from './pages/Message.jsx';


function App() {

  return (
    <>
      <ToastContainer theme='colored'></ToastContainer>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route index={true} element={<Rsgister></Rsgister>}></Route>
            <Route path='register' element={<Rsgister></Rsgister>}></Route>
            <Route path='/' element={<Layout></Layout>}>
              <Route path='shipping' element={<Shipping></Shipping>}></Route>
              <Route path='shipping-agent' element={<ShippingAgent></ShippingAgent>}></Route>
              <Route path='admins' element={<Admin></Admin>}></Route>
              <Route path='users' element={<User></User>}></Route>
              <Route path='message' element={<Message></Message>}></Route>
            </Route>
            <Route path='login' element={<LogIn></LogIn>}></Route>
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
