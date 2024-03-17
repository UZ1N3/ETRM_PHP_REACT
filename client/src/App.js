
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import HomePage from './pages/home';
import EditContract from './pages/editContract';
import PaperTrade from './pages/paperTrade';

function App() {
  return <div>

  <BrowserRouter>
      <Routes>
      <Route path= "/home"  element ={<HomePage />} />
      <Route path= "/editContract"  element ={<EditContract />} />
      <Route path = "/paperTrade"  element = {<PaperTrade />}  />
      {/* <Route path= "/register"  element ={<Register />} />
      <Route path= "/home"  element ={<Home />} />
      <Route path= "/analytics"  element ={<Analytics />} />
      <Route path= "/dashboard"  element ={<Dashboard />} /> */}
      </Routes>
      
  </BrowserRouter>
</div>
}

export default App;
