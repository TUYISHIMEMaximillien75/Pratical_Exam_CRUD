import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router";
function Updates() {

    const {id} = useParams()

    const [serviceName, setServiceName] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [message, setMessage] = useState("")

    const getServices = async() => {
        await axios.get(`http://localhost:9500/crpms/service/${id}`).then((response) => {
            console.log(response.data[0].servicename)
            setServiceName(response.data[0].servicename);
            setServicePrice(response.data[0].serviceprice)
        })
    }
    const saveUpdate = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:9500/crpms/service/${id}`,{
            serviceName:serviceName,
            servicePrice:servicePrice
        }).then((response)=>{
            setMessage(response.data.message);
        })
    }


  

    useEffect(() => {
        getServices()

    }, [])
    return (
        <>
            <div className="form bg-amber-600/25 h-screen">
                <Link to="/service" className="absolute top-10 right-30 bg-amber-500 py-3 px-20 font-bold text-2xl rounded-md hover:text-white transition-all">Services</Link>

                <form
                    onSubmit={saveUpdate}
                    className="w-1/2 absolute top-20 left-1/4 flex flex-col bg-amber-200 p-5 rounded-2xl shadow-2xl">
                    <label htmlFor="" className="font-bold">Service Name</label>
                    <input type="text" name=""
                        onChange={(e) => setServiceName(e.target.value)} 
                        value={serviceName}

                        id="" className="border m-2 outline-0 p-2" />
                    <label htmlFor="" className="font-bold">Service Price</label>
                    <input type="text" name=""
                        onChange={(e) => setServicePrice(e.target.value)} 
                        value={servicePrice}

                        className="border m-2 outline-0 p-2" />
                    <button className="border m-2 outline-0 p-2 w-50 ml-auto bg-amber-500 text-amber-50 font-bold text-2xl rounded-sm hover:bg-amber-600 transition-all" >Update</button>
                    <p className="text-green-600 font-bold ">{message}</p>
                </form>
            </div>
        </>
    )
}
export default Updates