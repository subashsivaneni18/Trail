
import {initialProfile} from '@/lib/initialUser'
import Header from './_components/Header';



export default async function Home() {

  const User = await initialProfile()

  return (
    <div>
        <Header/>
    </div>
  );
}
