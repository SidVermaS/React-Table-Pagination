const passengerAPI=async (page, size)=>{
    return new Promise((resolve,error)=>   {
        fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`, {method: 'GET',headers: {
            'Content-type':'application/json',
            'Accept': 'application/json'
        }}).then((response)=>response.json()).then((data)=>resolve(data)).catch((error)=>resolve(error))
    })
}

export default passengerAPI