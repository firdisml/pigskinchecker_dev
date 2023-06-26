import { Disclosure } from "@headlessui/react";
import { MenuIcon } from "@heroicons/react/outline";
import { FcLike } from "react-icons/fc";
import { useRouter } from "next/router";
import Link from "next/link";
import { api } from "~/utils/api";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineSquaresPlus, HiUser } from "react-icons/hi2";
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
import SearchList from "./SearchList";


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
    const [dash, setOpen] = useState(false)
    const [search, set_search] = useState<string>("")


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
                                            <FcLike className="h-10 w-10 mt-1 mt-1.5 sm:mt-3" />
                                            <Link href="/" className="text-gray-600 font-bold dark:text-white mt-0.5 lg:text-3xl">
                                                <h1 className={fredoka.className}><a className="font-bold ml-3 text-2xl">Pigskin Checker</a></h1>
                                                <p style={{ fontSize: "13px" }} className="ml-3 font-light -mt-0.5 sm:-mt-2.5 text-gray-700 dark:text-gray-300 ">Pigskin?</p>
                                            </Link>

                                        </div>

                                    </div>

                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">

                                        <button onClick={(e) => dash ? setOpen(false) : setOpen(true)} className="flex text-gray-500 dark:text-white bg-transparent font-medium hover:bg-opacity-75 px-3 py-2 rounded-md text-sm">
                                        <HiSearch className="block h-5 w-5" aria-hidden="true" />
                                            </button>

                                            <button onClick={() => { setTheme(theme === "dark" ? "light" : "dark") }} className="flex text-gray-500 dark:text-white bg-transparent font-medium hover:bg-opacity-75 px-3 py-2 rounded-md text-sm">
                                                {theme === "light" ? (
                                                    <IoIosMoon className="block h-5 w-5" aria-hidden="true" />
                                                ) : (
                                                    <IoIosSunny
                                                        className="block h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                )}
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

                                        <button
                                            onClick={(e) => dash ? setOpen(false) : setOpen(true)}
                                            className="bg-transparent inline-flex items-center justify-center p-2 text-gray-700 dark:text-white">
                                            Search
                                        </button>
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

                                    <Disclosure.Button
                                        onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light') }}
                                        as="a"
                                        className="flex dark:text-white text-gray-700 bg-transparent px-3 py-3 rounded-md text-sm font-semibold"
                                        aria-current="page"
                                    >

                                        {theme === "light" ? (<><IoIosMoon className="block h-5 w-5 mr-2" aria-hidden="true" />Toggle Dark Mode</>) : (<><IoIosSunny className="block h-5 w-5 mr-2" aria-hidden="true" />Toggle Light Mode</>)}
                                    </Disclosure.Button>

                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <Transition.Root show={dash} as={Fragment}>
                    <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                        <div className="absolute inset-0 overflow-hidden">
                            <Dialog.Overlay className="absolute inset-0 bg-black opacity-60" />
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <div className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                            <div className="pt-6 pl-6 pb-6 pr-2">
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        onChange={(e) => set_search(e.target.value)}
                                                        value={search}
                                                        className="h-12 block w-full bg-white dark:bg-gray-900 text-black dark:text-white border placeholder-black dark:placeholder-white border-gray-300 dark:border-gray-700 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        placeholder="Search"
                                                    />

                                                    <div className="ml-3 flex h-12 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-b border-gray-200">
                                                <div className="px-6">
                                                    <nav className="-mb-px flex space-x-6" x-descriptions="Tab component">
                                                        {tabs.map((tab) => (
                                                            <a
                                                                key={tab.name}
                                                                href={tab.href}
                                                                className={classNames(
                                                                    tab.current
                                                                        ? 'border-indigo-500 text-indigo-600'
                                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                                    'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                                                                )}
                                                            >
                                                                {tab.name}
                                                            </a>
                                                        ))}
                                                    </nav>
                                                </div>
                                            </div>
                                            {search.length != 0 ? <SearchList search={search} /> : null}
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main>
                    <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8">
                        {props.children}
                    </div>
                </main>
            </div>
        </>
    );
}