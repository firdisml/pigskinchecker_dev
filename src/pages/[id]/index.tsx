import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";

const index = () => {
    const router = useRouter()
    const { data: sessionData } = useSession();
    const utils = api.useContext();
    const [disable, set_disable] = useState(false)
    const getUniqueShoe = api.shoe.getUniqueShoe.useQuery({ name: String(router.query.id) });
    const getTrueRatingCount = api.shoe.getRatingCount.useQuery({ shoeUniqueName: String(router.query.id), status: true })
    const getFalseRatingCount = api.shoe.getRatingCount.useQuery({ shoeUniqueName: String(router.query.id), status: false })
    const getUniqueRating = api.shoe.getUniqueRating.useQuery({ userId: String(sessionData?.user?.id), shoeUniqueName: String(router.query.id) })

    const addRating = api.shoe.addRating.useMutation({
        onSuccess: async () => {
            await utils.shoe.getRatingCount.invalidate()
            await utils.shoe.getUniqueRating.invalidate()
            set_disable(false)
        }
    });


    function handle_submit(e: React.FormEvent, status: boolean) {
        e.preventDefault()
        set_disable(true)
        addRating.mutate({
            userId: String(sessionData?.user?.id),
            shoeUniqueName: String(router.query.id),
            status: status
        })
    }
    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 mt-5">
            <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-8">

                <div className="grid grid-cols-1 gap-4 lg:col-span-3">
                    <section aria-labelledby="section-1-title">
                        <div className="bg-white overflow-hidden">
                            <div className="p-6">
                                <img style={{ height: "400px", width: "600px" }} className="pl-10" src="https://images.stockx.com/images/adidas-Samba-OG-Clay-Strata.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=1&trim=color&updated_at=1685042121&q=57" alt="" />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                    <section aria-labelledby="section-2-title">
                        <h2 className="sr-only" id="section-2-title">
                            Section title
                        </h2>
                        <div className="bg-white overflow-hidden border">
                            <div className="flex flex-col p-6">

                                <h1 className="text-center font-semibold text-xl">{getUniqueShoe?.data?.brand?.name} {getUniqueShoe?.data?.name}</h1>
                                <h1 className="text-center">{getUniqueShoe?.data?.color}</h1>

                                
                                {sessionData ? getUniqueRating.isFetching || getUniqueRating.isLoading ? <div>Loading...
                                </div> : getUniqueRating?.data ? <div className="flex flex-col gap-x-5 mt-5">
                                    <button disabled className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                                        Yes
                                    </button>
                                    <button disabled >No</button>
                                </div> : <div className="flex gap-x-5">
                                    <button disabled={disable} onClick={(e: React.FormEvent) => { handle_submit(e, true) }} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-5">
                                        Yes
                                    </button>
                                    <button disabled={disable} onClick={(e: React.FormEvent) => { handle_submit(e, false) }}>No</button>
                                </div>
                                    : <div>Please Login To Vote</div>}

                                    <div className="w-full border-t border-gray-300 mt-5"></div>
                                    <h1 className="text-center mt-5">You Voted {getUniqueRating?.data?.status.toString().toUpperCase()}</h1>
                                    
                            </div>
                            

                        </div>
                        
                    </section>
                </div>
            </div>
        </div>
    );
}

export default index