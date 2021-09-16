import { verify } from 'jsonwebtoken'
import { GetServerSidePropsContext } from 'next'
import { connectDB } from '../../middleware/db'
import { User } from '../../models'

const VerifyEmail = ({ verified, user }: any) => {
   console.log(verified)
   console.log(user)
   return (
      <>
         {verified ? (<h3>Hey {user?.lastName}! Your email has been verified.</h3>) : (<h4>Unable to verify</h4>)}
      </>
   )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
   const { token } = ctx.query;
   let verified = false
   let usr = { }
   // try {
   connectDB().then(async () => {
      await verify(
         // @ts-ignore
         token,
         process.env.JWT_SECRET,
         async (err: any, decoded: any) => {
            if (!err && decoded) {
               try {
                  usr = await User.findByIdAndUpdate(decoded.idToBeVerified, {
                     $set: { 'verification.email': true },
                  });
                  console.log(usr)
               } catch (error) {
                  console.error('Verify Error: ', error);
               }
            }
         }
      )
   })

   // const decoded = await .then((d: any) => console.log(d))
   return {
      props: {
         verified,
         user: usr
      }
   }
   //    if (decoded) {
   //       const usr = await User.findByIdAndUpdate(decoded?.idToBeVerified, {
   //          $set: { 'verification.email': true },
   //       }).select('firstName lastName email')
   //       verified = true
   //       return {
   //          props: {
   //             verified,
   //             user: usr
   //          }
   //       }
   //    }
   // }
   // catch (err) {
   //    return {
   //       props: {
   //          verified,
   //       }
   //    }
   // }
}

export default VerifyEmail

