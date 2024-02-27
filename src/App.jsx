import { Route, Routes } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import UserContextProvider from './store/UserContext'
import Account from './pages/Account'
import PlacesPage from './pages/PlacesPage'
import axios from 'axios'
import PlacePage from './pages/PlacePage'

axios.defaults.withCredentials = true;
function App() {
  

  return (
    <UserContextProvider>
      <Routes>
      <Route path="/" element={<Layout />}>
       <Route index element={<IndexPage />}/> 
       <Route path="/login" element={<LoginPage />}/>
       <Route path="/register" element={<RegisterPage />}/>
       <Route path="/account" element={<Account />}/>
       <Route path="/account/:subpage?" element={<Account />}/>
       <Route path="/account/:subpage/:action" element={<Account />}/>
       
      </Route>
      
    </Routes>
    </UserContextProvider>
    
  )
}

export default App
