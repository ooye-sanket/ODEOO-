import { useRouter } from 'next/router'
import { Badge, Col, Container, FloatingLabel, Form, Image, Row, Spinner } from 'react-bootstrap'
import useFetch from '../../hooks/useFetch'
import { getVideoId } from '../../utils/helpers'

const Artist = ({ username }: any) => {
   const { data: artist, loading } = useFetch(`/artists/${username}`, {})

   return (
      <Container className='py-4'>
         {loading || !artist ?
            <div className="py-5 text-center">
               <Spinner animation="border" role="status" variant="primary">
                  <span className="visually-hidden">Loading...</span>
               </Spinner>
            </div> :
            <Row>
               <Col xs="12" lg="4" className='text-center'>
                  <Image src={artist?.img?.url} roundedCircle />
               </Col>
               <Col xs="12" lg="8" className='py-2'>
                  <h1>{artist.firstName} {artist.lastName}</h1>
                  <p className='text-muted'>{artist.description}</p>
                  <div className="mb-4">
                     <h4>Genre</h4>
                     {artist.meta?.genre?.map((i: any, key: any) => (
                        <Badge key={key} bg="primary" className="me-1 t-size-normal">
                           {i}
                        </Badge>
                     ))}
                  </div>
                  <div className="mb-4">
                     <h4>Events</h4>
                     {artist.meta?.events?.map((i: any, key: any) => (
                        <Badge key={key} bg="primary" className="me-1 t-size-normal">
                           {i}
                        </Badge>
                     ))}
                  </div>
                  <div className="mb-4">
                     <h4>Videos</h4>
                     {artist.youtubeLinks.map((i: any, key: any) => {
                        const id = getVideoId(i)
                        return (
                           <div key={key} className='d-inline-block m-1 rounded'>
                              <iframe width="356" height="200"
                                 src={`https://www.youtube.com/embed/${id}`}>
                              </iframe>
                           </div>
                        )
                     })}
                  </div>


               </Col>
            </Row>}

      </Container>
   )
}

Artist.getInitialProps = async ({ query }: any) => {
   const { username } = query
   return { username }
}

Artist.layout = 'STANDARD'
export default Artist