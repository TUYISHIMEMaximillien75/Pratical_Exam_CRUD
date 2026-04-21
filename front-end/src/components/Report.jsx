import { Link } from "react-router"
import axios from "axios"
import { useState } from "react"
function Report() {
    const [serviceList, setServicesList] = useState([]);
    const [message, setMessage] = useState("");
    const getServices = () => {
        axios.get('http://localhost:9500/report').then((response) => {
            // console.log(response.data)
            setServicesList(response.data)
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
            <h1>Report</h1>
                <Link to="/" className="absolute top-10 right-30 bg-amber-500 py-3 px-20 font-bold text-2xl rounded-md hover:text-white transition-all">Home</Link>
                <p>{message}</p>
                <table className="w-1/2 absolute top-20 left-1/4 ">
                    <thead className="bg-amber-500">
                        <th>#</th>
                        <th>Client Name</th>
                        <th>Service Code</th>
                        <th>Service Name</th>
                        <th>Service Price</th>
                        <th>Date</th>
                    </thead>
                    <tbody>
                        {serviceList.map((val, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{index + 1 }</td>
                                        <td>{val.servicecode }</td>
                                        <td>{val.name }</td>
                                        <td>{val.servicename}</td>
                                        <td>{val.price}</td>
                                        <td>
                                           {val.date}
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
export default Report