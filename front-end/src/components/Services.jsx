import { Link } from "react-router"
import axios from "axios"
import { useState } from "react"
function Services() {
    const [serviceList, setServicesList] = useState([]);
    const [message, setMessage] = useState("");
    const getServices = () => {
        axios.get('http://localhost:9500/crpms/service').then((response) => {
            setServicesList(response.data.result)
        })
    }
    getServices()
    const deleteService = (id)=>{
        axios.delete(`http://localhost:9500/crpms/service/${id}`).then((response)=>{
            setMessage(response.data.message)
        })
    }
    return (
        <>
            <div className=" w-full bg-amber-600/25 h-screen">
                <Link to="/add_service" className="absolute top-10 right-30 bg-amber-500 py-3 px-20 font-bold text-2xl rounded-md hover:text-white transition-all">Add</Link>
                <p>{message}</p>
                <table className="w-1/2 absolute top-20 left-1/4 ">
                    <thead className="bg-amber-500">
                        <th>Service Code</th>
                        <th>Service Name</th>
                        <th>Service Price</th>
                        <th>Operation</th>
                    </thead>
                    <tbody>
                        {serviceList.map((val) => {
                            return (
                                <>
                                    <tr>
                                        <td>{val.servicecode }</td>
                                        <td>{val.servicename}</td>
                                        <td>{val.serviceprice}</td>
                                        <td>
                                            <Link to={`/update/${val.id}`} className="bg-amber-500 p-2 m-2 rounded-sm text-amber-50">Update</Link>
                                            <button onClick={()=> deleteService(val.id)}  className="bg-red-500 p-2 m-2 rounded-sm text-amber-50">Delete</button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}


                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Services