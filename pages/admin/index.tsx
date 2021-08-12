import { Spinner, Table, Badge } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch'
import Link from 'next/link'

const AdminPage = () => {
   const { data: artists, loading } = useFetch('/artists', [])

   return (

      <Table responsive striped bordered hover >
         <thead>
            <tr>
               <th>#</th>
               <th>Name</th>
               <th>Username</th>
               <th>Email</th>
               <th>Phone</th>
               <th>Verification</th>
            </tr>
         </thead>
         <tbody>
            {
               loading ? (
                  <tr>
                     <td colSpan={6} className='text-center'>
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
                        <td colSpan={6} className='text-center'>
                           No Artists Found
                        </td>
                     </tr>
                  )
                  : artists.map((itr: any) => (
                     <Link href={`/admin/artists/${itr.username}`} passHref key={itr._id}>
                        <tr >
                           <td>{itr._id}</td>
                           <td>{itr.firstName} {itr.lastName}</td>
                           <td>{itr.username}</td>
                           <td>{itr.email}</td>
                           <td>{itr.phone}</td>
                           <td>
                              <Status label='Email' verified={itr.verification.email} /> &nbsp;
                              <Status label='Phone' verified={itr.verification.phone} /> &nbsp;
                              <Status label='Profile' verified={itr.verification.profile} />
                           </td>
                        </tr>
                     </Link>
                  ))
            }
         </tbody>
      </Table >
   )
}

AdminPage.layout = 'ADMIN'

export default AdminPage


const Status = ({ verified, label }: any) => {

   return (<Badge bg={verified ? 'success' : 'danger'}>{label}</Badge>

   )
}