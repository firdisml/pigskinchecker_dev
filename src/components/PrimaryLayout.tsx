import { Disclosure, Menu } from "@headlessui/react";
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
    const team = [
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Whitney Francis',
            email: 'whitney.francis@example.com',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Leonard Krasner',
            email: 'leonard.krasner@example.com',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Floyd Miles',
            email: 'floy.dmiles@example.com',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Emily Selman',
            email: 'emily.selman@example.com',
            href: '#',
            imageUrl:
                'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ]


    useEffect(() => {
        if (dash){
            document.body.style.position = 'fixed'
            document.body.style.top = `-${window.scrollY}px`;
        }else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        } 
    },[dash])

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
                                                <h1 className={orbitron.className} ><a className="tracking-wider text-xl">SOLEBITE</a></h1>

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



                <Transition.Root show={dash} as={Fragment}>
                    <Dialog as="div" className="relative z-100" onClose={setDash}>
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                        <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-800"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-800"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="pointer-events-auto w-screen opacity-70 max-w-lg">
                                            <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                            <div className="flex flex-col flex-shrink-0 justify-start px-4 py-4">

                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="project-name"
                                                                            id="project-name"
                                                                            autoComplete="off"
                                                                            autoFocus = {false}
                                                                            placeholder="Search"
                                                                            onChange={(e) => set_search(e.target.value)}
                                                                            value={search}
                                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                <div className="h-0 flex-1 overflow-y-auto">
                                                    <div className="flex flex-1 flex-col justify-between">
                                                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                            <div className="space-y-6">
                                                                
                                                                {search_debounced?.length > 0 ? <ul role="list" className="flex-1">
                                                                    {searchShoe.isFetching ? <img className="mx-auto mt-4 h-8 w-8" src="/spinner.svg" alt="" /> : searchShoe?.data?.map((shoe, index) => (
                                                                        
                                                                        <li key={index}>
                                                                            <div className={index + 1 === searchShoe?.data?.length ? "group relative flex items-center py-6 cursor-pointer" : "group relative flex items-center py-6 cursor-pointer border-b"}>
                                                                                <a onClick={() => redirectlink(shoe.uniqueName)} className="-m-1 cursor-pointer block flex-1 p-1">
                                                                                    <div className="absolute inset-0 cursor-pointer" aria-hidden="true" />
                                                                                    <div className="relative flex min-w-0 flex-1 items-center">
                                                                                        <span className="relative inline-block flex-shrink-0">
                                                                                            <img className="h-16 w-19 rounded-lg" src={shoe?.pictures[0]} alt="" />
                                                                                        </span>
                                                                                        <div className="ml-5 pb-1 truncate">
                                                                                            {/*@ts-ignore*/}
                                                                                            <p className="truncate text-sm font-medium text-gray-900">{shoe?.model?.brand?.name.concat(" ", shoe?.name)}</p>
                                                                                            <p className="truncate text-xs text-gray-500">{shoe.color}</p>
                                                                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-normal text-indigo-800 mt-1">
                          <svg className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx={4} cy={4} r={3} />
                          </svg>
                          {shoe?.status ? "Contains Pigskin" : "No Pigskin"}
                        </span>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul> : null}
                                                                <div>


                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                                    <button
                                                        type="button"
                                                        className="rounded-md w-full border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                        onClick={() => setDash(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                <main>
                    <div className="max-w-7xl mx-auto">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}