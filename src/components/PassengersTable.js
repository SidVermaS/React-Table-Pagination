import {useEffect,useState} from 'react'
import {TableContainer,Table,TableBody,TableRow,TableCell,TableHead, TablePagination} from '@material-ui/core'
import '../styles/PassengersTable.css'

const PassengersTable = ({fetchPassengers,passengers,totalPassengers}) => {
    const [page,setPage]=useState(0)
    const [rowsPerPage,setRowsPerPage]=useState(10)
    const columns=['Name','Airline','Country','Website','Established']
    
    const [displayPassengers,setDisplayPassengers]=useState(passengers)
    let [displayTotalPassengers,setDisplayTotalPassengers]=useState(0)

    useEffect(()=>{
        fetchPassengers(page, rowsPerPage)
    },[])
    useEffect(()=>{
        setDisplayPassengers(passengers)
    },[passengers])
    useEffect(()=>{
        displayTotalPassengers=totalPassengers
        setDisplayTotalPassengers(totalPassengers)
    },[totalPassengers])

    const onChangePage=(event, newPage)=> {
        fetchPassengers(newPage, rowsPerPage,page>newPage)
        setPage(newPage)
    }
    const onChangeRowsPerPage=(event)=> {
        setRowsPerPage(parseInt(event.target.value))
        setPage(0)
        fetchPassengers(0, parseInt(event.target.value), false, true)
    }
    return (
        <div className='PassengersTable__background'>
        <TableContainer className='PassengersTable__table'>
            <Table stickyHeader>                
                <TableHead>
                    <TableRow>
                        {columns.map((item,index)=><TableCell key={index}>{item}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayPassengers.map((item,index)=>(<TableRow key={index}>
                       <TableCell>
                            {item['name']}
                        </TableCell> 
                       <TableCell>
                            {item.airline?.['name'] || item.airline?.[0]?.['name']}
                        </TableCell> 
                       <TableCell>
                            {item.airline?.['country'] || item.airline?.[0]?.['country']}
                        </TableCell> 
                       <TableCell>
                            {item.airline?.['website'] || item.airline?.[0]?.['website']}
                        </TableCell> 
                        <TableCell>
                            {item.airline?.['established'] || item.airline?.[0]?.['established']}
                        </TableCell> 
                    </TableRow>))}                
                </TableBody>
                
            </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        count={displayTotalPassengers}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        />
    </div>
    )
}

export default PassengersTable
