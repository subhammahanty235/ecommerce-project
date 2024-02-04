import './App.css'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import Signup from './components/signup/Signup'
import { Routes, Route } from "react-router-dom";
import Homepage from './components/homepage/Homepage'
import { useEffect } from 'react';
function App() {

  const GET_ALL_ITEMS = gql`
  query GetAllItems {
    getAllItems {
      id,
      itemName,
      itemDescription,
      price,
      totalStocks  ,
      totalsales
    }
  }  
  `

  const {loading, error ,data} = useQuery(GET_ALL_ITEMS);
  if(loading) return <p>Loading....</p>
  if(error) return <p>{error.message}</p>

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signup')
    } 
  }, [])

  
  return (
    <>
      <div>
        {/* <Signup/> */}
        <Routes>
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/' element={<Homepage/>}/>
        </Routes>
       
      </div>
    </>
  )
}

export default App
