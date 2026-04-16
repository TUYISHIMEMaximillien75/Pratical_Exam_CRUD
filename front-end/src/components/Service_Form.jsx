import { useState } from "react"
import axios from "axios"
import { Link } from "react-router"
function Service_Form() {
    const [serviceName, setServiceName] = useState("")
    const [servicePrice, setServicePrice] = useState("")
    const [message, setMessage] = useState("")
    const SaveData =(e)=>{
        e.preventDefault()
        axios.post("http://localhost:9500/crpms/service",{
            serviceName:serviceName,
            servicePrice:servicePrice
        }).then((response)=>{
            setMessage(response.data.message)
        })


    }

    return (
        <>
            <div className="form bg-amber-600/25 h-screen">
                <Link to="/service" className="absolute top-10 right-30 bg-amber-500 py-3 px-20 font-bold text-2xl rounded-md hover:text-white transition-all">Services</Link>

                <form onSubmit={SaveData} className="w-1/2 absolute top-20 left-1/4 flex flex-col bg-amber-200 p-5 rounded-2xl shadow-2xl">
                    <label htmlFor="" className="font-bold">Service Name</label>
                    <input type="text" name="" onChange={(e)=> setServiceName(e.target.value)} id="" className="border m-2 outline-0 p-2" />
                    <label htmlFor="" className="font-bold">Service Price</label>
                    <input type="text" name="" onChange={(e)=> setServicePrice(e.target.value)} className="border m-2 outline-0 p-2"  />
                    <button className="border m-2 outline-0 p-2 w-50 ml-auto bg-amber-500 text-amber-50 font-bold text-2xl rounded-sm hover:bg-amber-600 transition-all" >Save</button>
                    <p className="text-green-600 font-bold ">{message}</p>
                </form>
            </div>
        </>
    )
}

export default Service_Form