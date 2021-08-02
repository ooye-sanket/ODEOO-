import Axios from 'axios'
import { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'

const AdminPage = () => {
   const [artists, setArtists] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      Axios.get('/artists').then((r) => setArtists(r.data.data)).catch(e => console.error(e)).finally(() => setLoading(false))
   }, [])

   return (
      <Table striped bordered hover>
         <thead>
            <tr>
               <th>#</th>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Username</th>
            </tr>
         </thead>
         <tbody>
            {
               loading ? (
                  <tr>
                     <td colSpan={4} className='text-center'>
                        <Spinner
                           animation="border"
                           role="status"
                           variant="primary"
                        >
                           <span className="visually-hidden">Loading...</span>
                        </Spinner>
                     </td>
                  </tr>
               ) : artists.length == 0 ?
                  (
                     <tr>
                        <td colSpan={4} className='text-center'>
                           No Artists Found
                        </td>
                     </tr>
                  )
                  : artists?.map((itr: any) => (
                     <tr>
                        <td>{itr.id}</td>
                        <td>{itr.firstName}</td>
                        <td>{itr.lastName}</td>
                        <td>{itr.username}</td>
                     </tr>
                  ))
            }
         </tbody>
      </Table>
   )
}

AdminPage.layout = 'ADMIN'

export default AdminPage