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
        <div>
            {getUniqueShoe.isFetching || getUniqueShoe.isLoading ? <div>Loading</div> :

                <div className="flex flex-col">
                    <div className="flex gap-x-5">
                        <h1>True : {getTrueRatingCount.isLoading || getTrueRatingCount.isFetching ? <div>Loading..</div> : getTrueRatingCount?.data}</h1>
                        <h1>false : {getFalseRatingCount.isLoading || getFalseRatingCount.isFetching ? <div>Loading..</div> : getFalseRatingCount?.data}</h1>
                    </div>
                    <img style={{ height: "500px", width: "700px" }} src="https://images.stockx.com/images/adidas-Samba-OG-Clay-Strata.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=1&trim=color&updated_at=1685042121&q=57" alt="" />
                    <h1>{getUniqueShoe?.data?.brand?.name}</h1>
                    <h1>{getUniqueShoe?.data?.name}</h1>
                    <h1>{getUniqueShoe?.data?.color}</h1>
                    <h1>{getUniqueShoe?.data?.sku}</h1>
                </div>}

            {sessionData ? getUniqueRating.isFetching || getUniqueRating.isLoading ? <div>Loading...
            </div> : getUniqueRating?.data ? <div className="flex flex-col gap-x-5">
                <h1>You Voted {getUniqueRating?.data?.status.toString().toUpperCase()}</h1>
                <button disabled className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400">
                    Yes
                </button>
                <button disabled >No</button>
            </div> : <div className="flex gap-x-5">
                <button disabled={disable} onClick={(e: React.FormEvent) => { handle_submit(e, true) }} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Yes
                </button>
                <button disabled={disable} onClick={(e: React.FormEvent) => { handle_submit(e, false) }}>No</button>
            </div>
                : <div>Please Login To Vote</div>}


                

        </div>
    );
}

export default index