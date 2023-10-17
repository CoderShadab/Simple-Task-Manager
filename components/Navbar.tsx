import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { GoSignOut } from 'react-icons/go';

const Navbar = () => {

  const router = useRouter();
    return ( 
      <div className="">
        <nav className="header">
            <div className="header_logo">
                <h5 className="cursor-pointer text-xl" title="Task Manager" onClick={() => router.push('/')}>Task Manager</h5>
            </div>
            <div onClick={() => signOut()} className="px-3 border-2 p-1 hover:rounded-lg hover:scale-95 rounded-md hover:bg-white hover:text-red-500 transition flex flex-row gap-3 text-center text-white cursor-pointer text-sm hover:underline">     
              <GoSignOut size={25}/>
              <span className="text-xl">
              Sign Out
              </span>
            </div>
        </nav>
      </div>
     );
}
 
export default Navbar;