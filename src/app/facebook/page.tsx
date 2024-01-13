'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

function facebook() {
    const router = useRouter()
    const handle = () =>{
        router.push("/")
    }
    return ( 
        <div>
         <div>Facebook OK</div>
         <button onClick={handle}>Back
         </button>
        </div>
     );
}

export default facebook;