
import {initialProfile} from '@/lib/initialUser'



export default async function Home() {

  const User = await initialProfile()

  return (
    <div className='flex'>
        jkl
    </div>
  );
}
