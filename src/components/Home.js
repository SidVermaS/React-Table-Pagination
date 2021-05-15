import {useEffect,useState} from 'react'
import passengersAPI from '../apis/passengersAPI'
import PassengersTable from './PassengersTable'

const Home = () => {
    let [passengers,setPassengers]=useState([])
    let [displayPassengers,setDisplayPassengers]=useState([])
    let [totalPassengers,setTotalPassengers]=useState(0)
    const fetchPassengers=async (page, rowsPerPage, previousPage, clearArray)=>{
        const response=await passengersAPI(page,rowsPerPage)
        if(totalPassengers===0) {
            setTotalPassengers(response.totalPassengers)
        }
        if(clearArray)  {
            passengers=[]
            displayPassengers=[]
            setDisplayPassengers([])
        }
        if(previousPage)    {

        }   else    {
            passengers=[...passengers, ...response.data]
            setPassengers(passengers)

            const startSlice=page*rowsPerPage
            const endSlice=page<=0?rowsPerPage:page*rowsPerPage+rowsPerPage
            setDisplayPassengers(passengers.slice(startSlice, endSlice))
        }
    }

 

    return (
        <div>
            <PassengersTable fetchPassengers={fetchPassengers} passengers={displayPassengers} totalPassengers={totalPassengers} />
        </div>
    )
}

export default Home
