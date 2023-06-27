import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const getAllShoe = api.shoe.getAllShoe.useQuery();

  return (
    <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
           {getAllShoe.isLoading || getAllShoe.isFetching ? 
           <div>Loading</div> : 
           <div>
            {getAllShoe?.data?.map((shoe, index)=> (<div className="flex"><Link key={index} href={shoe.uniqueName}>{shoe?.brand?.name?.concat(" ",shoe.name," ",shoe.color)}</Link></div>))}
            </div>}
          </div>
    

    </>
  );
}
