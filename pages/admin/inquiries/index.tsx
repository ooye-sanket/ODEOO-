import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'

const Inquiries = () => {
   const [inquiries, setInquiries] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      Axios.get('/inquiries').then((r) => setInquiries(r.data.data)).catch(e => console.error(e)).finally(() => setLoading(false))
   }, [])

   return (
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>Client Name</th>
               <th>Phone</th>
               <th>Email</th>
               <th>Budget</th>
               <th>City</th>
               <th>Artist</th>
            </tr>
         </thead>
         <tbody>
            {
               loading ? (
                  <tr>
                     <td colSpan={7} className='text-center'>
                        <Spinner
                           animation="border"
                           role="status"
                           variant="primary"
                        >
                           <span className="visually-hidden">Loading...</span>
                        </Spinner>
                     </td>
                  </tr>
               ) : inquiries.length == 0 ?
                  (
                     <tr>
                        <td colSpan={7} className='text-center'>
                           No Inquiries Found
                        </td>
                     </tr>
                  )
                  : inquiries?.map((itr: any) => (
                     <tr key={itr._id}>
                        <td>{itr.id}</td>
                        <td>{itr.name}</td>
                        <td>{itr.phone}</td>
                        <td>{itr.email}</td>
                        <td>{itr.budget}</td>
                        <td>{itr.city}</td>
                        <td>{itr.artist.firstName} {itr.artist.lastName}</td>
                     </tr>
                  ))
            }
         </tbody>
      </Table>
   )
}

Inquiries.layout = 'ADMIN'

export default Inquiries