// "use client"
// import { User } from '@prisma/client'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import AvatarIcon from './Avatar'

// interface ConversationCardProps{
//   conversationId:string
// }

// const ConversationCard:React.FC<ConversationCardProps> = ({
//   conversationId
// }) => {

//   const [user,setUser] = useState<[User]>()

  
  
//   useEffect(()=>{
//     const x =async ()=>{
//       try {
//         const res =(await axios.get(`/api/oppositeUser/${conversationId}`)).data
//         setUser(res)

//       } catch (error) {
//         console.log(error);
//       }

//     }
//     x()
//   },[conversationId,setUser])

//   console.log(user)

//   return (
//     <div
//       onClick={() => {}}
//       className=" hover:bg-[#ea2462] transition cursor-pointer hover:text-[#fefffe] shadow-sm"
//     >
//       <div className="px-4 py-3 flex gap-x-8  items-center">
//         <div>
//           <AvatarIcon imgUrl={user?.[0].imageUrl!! || ""} />
//         </div>
//         <div>{user?.[0].name}</div>
//       </div>
//     </div>
//   );
// }

// export default ConversationCard
