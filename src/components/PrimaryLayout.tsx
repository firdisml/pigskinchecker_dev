import { Disclosure } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineSquaresPlus, HiUser, HiChevronRight } from "react-icons/hi2";
import { HiSearch } from "react-icons/hi";
import { Fredoka } from '@next/font/google'
import { signIn, signOut, useSession } from "next-auth/react";
import { capitalCase } from "change-case";

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ['400']
})
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useDebounce } from "use-debounce";
import { Orbitron } from '@next/font/google'
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['900']
})

const tabs = [
    { name: 'All', href: '#', current: true },
    { name: 'Online', href: '#', current: false },
    { name: 'Offline', href: '#', current: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function PrimaryLayout(props: {
    children: React.ReactNode
}) {

    const { data: sessionData } = useSession();
    const { theme, setTheme } = useTheme()
    const router = useRouter()
    const [mounted, setMounted] = useState(false);
    const [dash, setDash] = useState(false)
    const [search, set_search] = useState<string>("")

    function redirectlink(name: any) {
        setDash(false)
        router.push(name)
    }
    const [search_debounced] = useDebounce<string>(search, 500);

    const searchShoe = api.shoe.searchShoe.useQuery({
        name: search_debounced.toLowerCase().replace(" ", "-"),
    });

    useEffect(() => { setMounted(true) }, []);

    if (!mounted) return <></>;
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="items-center">
                                        <div className="flex flex-shrink-0">
                                            <Link href="/" className="text-gray-600 font-bold dark:text-white mb-1.5 lg:text-3xl">
                                                <h1  className={orbitron.className} ><a className="tracking-wider text-xl">SOLEBITE</a></h1>
            
                                            </Link>

                                        </div>

                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            <button onClick={(e) => dash ? setDash(false) : setDash(true)} className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold">
                                                <HiSearch className="h-5 w-5 mr-2" aria-hidden="true" /> Search
                                            </button>

                                            {sessionData ?
                                                <button
                                                    onClick={() => void signOut()}
                                                    className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold"
                                                >
                                                    <HiUser className="h-5 w-5 mr-2" /> {capitalCase(String(sessionData?.user?.name))}
                                                </button>


                                                :

                                                <button
                                                    onClick={() => void signIn()}
                                                    className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold"
                                                >
                                                    <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Login
                                                </button>}


                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <button onClick={(e) => dash ? setDash(false) : setDash(true)} className="flex text-gray-600 dark:text-white bg-transparent hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-semibold">
                                            <HiSearch className="h-6 w-6 mr-5" aria-hidden="true" />
                                        </button>

                                        <Disclosure.Button
                                            className="bg-transparent inline-flex items-center justify-center p-2 text-gray-700 dark:text-white">
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>


                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3">
                                    {router.route.includes("/submit") ? (<Disclosure.Button
                                        onClick={() => { router.push('/') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent hover:bg-opacity-75 px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >
                                        <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Browse Promotion
                                    </Disclosure.Button>) : (<Disclosure.Button
                                        onClick={() => { void router.push('/submit') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent  px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >
                                        <HiOutlineSquaresPlus className="h-5 w-5 mr-2" /> Submit Promotion
                                    </Disclosure.Button>)}


                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                    <Dialog open={dash} as={Fragment} onClose={setDash}>
                        <div className="absolute inset-0 overflow-hidden">
                            <Dialog.Overlay className="absolute inset-0 bg-black opacity-60" />
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                    <div className="pointer-events-auto w-screen max-w-xl">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="pt-6 pl-6 pb-6 pr-2">
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        autoComplete="off"
                                                        onChange={(e) => set_search(e.target.value)}
                                                        value={search}
                                                        className="h-12 block w-full bg-white dark:bg-gray-900 text-black dark:text-white border placeholder-black dark:placeholder-white border-gray-300 dark:border-gray-700 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Search"
                                                    />

                                                    <div className="ml-3 flex h-12 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                                            onClick={() => setDash(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*@ts-ignore*/}
                                            {searchShoe?.data?.length > 0 && search.length > 0 ? (<><div className="group relative flex items-center py-5 border-t border-b px-5">
                                                <a className="-m-1 block flex-1">
                                                    <div className="flex">
                                                        <div className="relative flex min-w-0 flex-1 items-center">
                                                            <div className="ml-2 truncate">
                                                                <p className="truncate text-sm font-medium text-gray-900">Search Result</p>
                                                                <p className="truncate text-sm text-gray-500">{searchShoe?.data?.length} {searchShoe?.data?.length === 1 ? "Result" : "Results"}</p>
                                                            </div>
                                                        </div>
                                                        <HiChevronRight className="h-6 w-6 my-auto" aria-hidden="true" />
                                                    </div>
                                                </a>
                                            </div>
                                            {/*@ts-ignore*/}
                                            <div className="pl-6 font-semibold mt-5 text-gray-600">Top Results ({searchShoe?.data?.length < 10 ? searchShoe?.data?.length : 10})</div></>) : searchShoe?.data?.length === 0 && search.length > 0 ? <div className="group relative flex items-center py-5 border-t border-b px-5">
                                                <a className="-m-1 block flex-1">
                                                    <div className="flex">
                                                        <div className="relative flex min-w-0 flex-1 items-center">
                                                            <div className="ml-2 truncate">
                                                                <p className="truncate text-sm font-medium text-gray-900">Search Result</p>
                                                                <p className="truncate text-sm text-gray-500">0 Result</p>
                                                            </div>
                                                        </div>
                                                        <HiChevronRight className="h-6 w-6 my-auto" aria-hidden="true" />
                                                    </div>
                                                </a>
                                            </div> : null}


                                            {search_debounced?.length > 0 ? <ul role="list" className="flex-1 ml-1 divide-y divide-gray-200 overflow-y-auto">
                                                {searchShoe.isLoading || searchShoe.isFetching ? <img className="mx-auto mt-4 h-8 w-8" src="/spinner.svg" alt="" /> : searchShoe?.data?.map((shoe, index) => (
                                                    <li key={index}>
                                                        <div className="group relative flex items-center py-6 cursor-pointer px-5 border-b">
                                                            <a onClick={() => redirectlink(shoe.uniqueName)} className="-m-1 cursor-pointer block flex-1 p-1">
                                                                <div className="absolute inset-0 cursor-pointer" aria-hidden="true" />
                                                                <div className="relative flex min-w-0 flex-1 items-center">
                                                                    <span className="relative inline-block flex-shrink-0">
                                                                        <img className="h-10 w-12 " src={"https://images.stockx.com/images/adidas-Samba-OG-Clay-Strata.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=1&trim=color&updated_at=1685042121&q=57"} alt="" />
                                                                    </span>
                                                                    <div className="ml-5 truncate">
                                                                        <p className="truncate text-sm font-medium text-gray-900">{shoe?.name}</p>
                                                                        <p className="truncate text-sm text-gray-500">{shoe.color}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul> : null}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </Dialog>
                <main>
                    <div className="max-w-7xl mx-auto">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}