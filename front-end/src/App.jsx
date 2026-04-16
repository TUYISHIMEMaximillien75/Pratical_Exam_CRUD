import Services from "./components/Services"
import Service_Form from "./components/Service_Form"
import { Routes, Route } from "react-router"
import Updates from "./components/Updates"
import NotFound from "./components/NotFound"
function App() {

  return (
    <>
    <Routes>
      <Route path="/add_service" element={<Service_Form></Service_Form>}></Route>
      <Route path="/service" element={<Services></Services>}></Route>
      <Route path="/" element={<Services></Services>}></Route>
      <Route path="/update/:id" element={<Updates></Updates>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
    {/* <Updates></Updates> */}
    
    {/*  */}
    </>
  )
}

export default App
