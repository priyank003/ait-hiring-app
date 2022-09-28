import './Css/App.css'
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Login from "./Login"
import {BrowserRouter , Route , Routes , Link} from "react-router-dom"
import Page from './Page';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/login' element={< Login />}></Route>  
        <Route exact path='/posts' element={< Page />}></Route>   
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
