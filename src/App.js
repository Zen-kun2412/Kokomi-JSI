import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {BrowserRouter ,Routes ,Route } from "react-router-dom"
import HeaderApp from './pages/HeaderApp';
import Home from './pages/Home';
function App() {

  const user = "cai gi do";


  const config = {
    apiKey: 'AIzaSyCfScatj2pGTjfs9KBI3ngMtblO5VEcIk8',
    authDomain: 'fir-project-719e3.firebaseapp.com',
  };

  firebase.initializeApp(config);

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderApp/>

        <Routes>
        <Route path="/" exact element ={<Home/>} ></Route>
        <Route path="/login" exact element ={<Login/>} ></Route>
        <Route path="/register" exact element ={<Register/>} ></Route>
        <Route path="/film/:slug" exact element ={<ProductDetail/>} ></Route>
        </Routes>

    </div>
    </BrowserRouter>
  )
}

export default App;
