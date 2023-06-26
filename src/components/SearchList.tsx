
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { api } from "~/utils/api";

const SearchList = (props: { search:string }) => {

    const [search_debounced] = useDebounce<string>(props.search, 500);

    const searchShoe = api.shoe.searchShoe.useQuery({
        name: search_debounced.toLowerCase().replace(" ", "-"),
    });

    return (
        <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
            {searchShoe.isLoading || searchShoe.isFetching ? <div>Loading..</div> : searchShoe?.data?.map((shoe, index) => (
                <li key={index}>
                    <div className="group relative flex items-center py-6 px-5">
                        <Link href={shoe.uniqueName} className="-m-1 block flex-1 p-1">
                            <div className="absolute inset-0 group-hover:bg-gray-50" aria-hidden="true" />
                            <div className="relative flex min-w-0 flex-1 items-center">
                                <span className="relative inline-block flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={"https://images.stockx.com/images/adidas-Samba-OG-Clay-Strata.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=1&trim=color&updated_at=1685042121&q=57"} alt="" />
                                    <span
                                        className='absolute top-0  bg-green-400 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="ml-4 truncate">
                                    <p className="truncate text-sm font-medium text-gray-900">{shoe.name}</p>
                                    <p className="truncate text-sm text-gray-500">{shoe.color}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    )

}

export default SearchList