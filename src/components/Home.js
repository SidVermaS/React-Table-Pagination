import {useEffect,useState} from 'react'
import passengersAPI from '../apis/passengersAPI'
import PassengersTable from '../widgets/PassengersTable'

const Home = () => {
    let [passengers,setPassengers]=useState([])
    let [displayPassengers,setDisplayPassengers]=useState([])
    let [totalPassengers,setTotalPassengers]=useState(0)
    const fetchPassengers=async (page, rowsPerPage, previousPage, clearArray)=>{       
        if(clearArray)  {
            passengers=[]
            setPassengers(passengers)
            displayPassengers=[]
            setDisplayPassengers(displayPassengers)
        }
        
        const startSlice=page*rowsPerPage
        const endSlice=page<=0?rowsPerPage:page*rowsPerPage+rowsPerPage
        if(previousPage)    {
            setPassengers(passengers.slice(0, endSlice))
            setDisplayPassengers(passengers.slice(startSlice, endSlice))
        }   else    {
            const response=await passengersAPI(page,rowsPerPage)
            if(totalPassengers===0) {
                setTotalPassengers(response.totalPassengers)
            }
            passengers=[...passengers, ...response.data]
            setPassengers(passengers)
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
