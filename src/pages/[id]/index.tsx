import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { HiOutlineSquaresPlus, HiUser, HiChevronRight, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { Fragment } from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { signIn, signOut, useSession } from "next-auth/react";
import { capitalCase } from "change-case";


const memoryOptions = [
  { name: 'Pigskin', inStock: true },
  { name: 'Non Pigskin', inStock: true },
]

const reviews = [
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
      <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>

    `,
    author: "Risako Maka",
    date: "16 July 2023",
    datetime: "2021-01-06",
  },
  {
    id: 2,
    title: "Best bang for the buck!",
    rating: 5,
    content: `
      <p>The pigskin shoe is a stylish and comfortable choice. Made from high-quality pigskin leather, it offers a soft and luxurious feel. The durability is impressive, and the shoe maintains its pristine appearance over time !</p>
      
    `,
    author: "Holy Honda",
    date: "12 June 2022",
    datetime: "2021-01-06",
  },
  // More reviews...
];
const product = {
  name: "Zip Tote Basket",
  price: "$140",
  rating: 4,
  images: [
    {
      id: 1,
      name: "Angled view",
      src: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ed70b56fe9b24738b626af060183eb8d_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_01_standard.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 2,
      name: "Angled view",
      src: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/32408964108c4428a05daf060188882f_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_41_detail.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 3,
      name: "Angled view",
      src: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/10b265376f2d47a6945eaf060188919e_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_42_detail.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    {
      id: 4,
      name: "Angled view",
      src: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/873ebee1e05c4852b677af46007b7ff2_9366/Samba_OG_Sporty_and_Rich_Shoes_White_HQ6075_HM1.jpg",
      alt: "Angled front view with bag zipped and handles upright.",
    },
    // More images...
  ],
  colors: [
    {
      name: "Washed Black",
      bgColor: "bg-gray-700",
      selectedColor: "ring-gray-700",
    },
    { name: "White", bgColor: "bg-white", selectedColor: "ring-gray-400" },
    {
      name: "Washed Gray",
      bgColor: "bg-gray-500",
      selectedColor: "ring-gray-500",
    },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: "Features",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    {
      name: "Description",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    {
      name: "Sizing",
      items: [
        "Multiple strap configurations",
        "Spacious interior with top zip",
        "Leather handle and tabs",
        "Interior dividers",
        "Stainless strap loops",
        "Double stitched construction",
        "Water-resistant",
      ],
    },
    // More sections...
  ],
};

const tabs = [{ name: "Reviews", href: "#", icon: HiUser, current: true }];


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}


export default function Example() {
  const router = useRouter()
  const utils = api.useContext();
  const { data: sessionData } = useSession();
  const [mem, setMem] = useState(memoryOptions[2])
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const getUniqueShoe = api.shoe.getUniqueShoe.useQuery({ name: String(router.query.id) });
  const getAllRating = api.shoe.getAllRating.useQuery({ name: String(router.query.id) });
  const getUniqueRating = api.shoe.getUniqueRating.useQuery({ name: String(router.query.id), userId: String(sessionData?.user?.id) });
  const getAllRatingCount = api.shoe.getAllRatingCount.useQuery({ name: String(router.query.id) });
  const getAgreeRatingCount = api.shoe.getRatingCount.useQuery({ name: String(router.query.id), status: true });

  const addRating = api.shoe.addRating.useMutation({
    onSuccess: () => {
      utils.shoe.getAllRating.invalidate()
      utils.shoe.getUniqueRating.invalidate()
      utils.shoe.getAllRatingCount.invalidate()
      utils.shoe.getRatingCount.invalidate()
      setOpen(false)
    }
  });
  const [title, set_title] = useState<String>()
  const [body, set_body] = useState<String>()
  const [review_status, set_review_status] = useState<Boolean>(true) 
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  console.log(review_status)
  async function handle_add_rating(e:any) {
    e.preventDefault()
    addRating.mutate({
      userId: String(sessionData?.user?.id),
      shoeUniqueName: String(router.query.id),
      title: String(title),
      body: String(body),
      status: Boolean(review_status)
    });

  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <nav className="mb-4 flex" aria-label="Breadcrumb">
          <ol role="list" className="ml-2 sm:ml-0 flex items-center gap-x-1">
            <li>
              <div>
                <a className="text-sm font-medium text-gray-500 hover:text-gray-700">
                  Home
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Adidas
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <a
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Samba
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-8">
                {getUniqueShoe.isLoading || getUniqueShoe.isFetching ? (
                  <>

                    <><div className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-300">
                      <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                      <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-300">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                      </div>
                      <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-300">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                      </div>
                      <div className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-gray-300">
                        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                      </div></>
                  </>) : (<>{getUniqueShoe?.data?.pictures?.map((image, index) => (
                    <Tab
                      key={index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image}
                              alt=""
                              className="aspect-h-3 aspect-w-4 object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}</>)}

              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-3 aspect-w-4 w-full mb-2">
              {getUniqueShoe.isLoading || getUniqueShoe.isFetching ? (<><div className="flex items-center justify-center h-full w-full rounded-lg bg-gray-300 rounded dark:bg-gray-700">
                <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
              </div></>) : (<>{getUniqueShoe?.data?.pictures?.map((image, index) => (
                <Tab.Panel key={index} className="px-2 sm:px-0">
                  <img
                    src={image}
                    className="h-full w-full rounded-lg object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}</>)}

            </Tab.Panels>
          </Tab.Group>

          {/* Product Name */}
          <div className="mt-5 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {

              getUniqueShoe.isLoading || getUniqueShoe.isFetching ?

                (
                  <>
                    <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
                    <div className="mt-2 h-5 w-25 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
                  </>
                )

                :

                <>
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {getUniqueShoe?.data?.model?.brand?.name + " " + getUniqueShoe?.data?.name}
                  </h1>

                  <p className="mt-2 text-sm text-gray-500">
                    {getUniqueShoe?.data?.color}
                  </p>
                </>

            }




            {/* Reviews */}

            {

getUniqueShoe.isLoading || getUniqueShoe.isFetching ?
(<><div className="mt-2 h-5 w-25 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div></>) : (<><div className=" flex mt-3 gap-x-3">
<span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
  <svg className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
    <circle cx={4} cy={4} r={3} />
  </svg>
  Contains Pigskin
</span>

{getAllRatingCount.isFetching && getAgreeRatingCount.isFetching ? (<><div className="mt-2 h-5 w-25 animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div></>):(<span className="inline-flex items-center gap-x-1 rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
  <svg className="-ml-1 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
    <circle cx={4} cy={4} r={3} />
  </svg>
  {/*@ts-ignore*/}
  <span className="tracking-normal">{getAgreeRatingCount?.data ? ((getAgreeRatingCount?.data / getAllRatingCount?.data) * 100) + "% Agreed" : "0% Agreed"}</span>
</span>)}




</div></>)}
            


            {/* Description */}
            {

              getUniqueShoe.isLoading || getUniqueShoe.isFetching ?

                (
                  <div className="mt-8 sm:mt-8">
                    <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
                    <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
                  </div>
                )

                :

                (
                  <div className="mt-8 sm:mt-8">
                    <div
                      className="space-y-6 text-justify text-base text-gray-700"
                      dangerouslySetInnerHTML={{ __html: String(getUniqueShoe?.data?.description) }}
                    />
                  </div>
                )

            }


            {

getUniqueRating.isLoading || getUniqueRating.isFetching ?

                (
                  <div className="sm:flex-col1 mt-8 flex w-full">
                    <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
                  </div>
                )

                : <>{getUniqueRating?.data ? (<><div className="sm:flex-col1 mt-8 flex w-full">
                <button
                  onClick={() => setOpen(open ? false : true)}
                  type="submit"
                  disabled
                  className="flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-2 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Already Reviewed
                </button>
              </div></>) : <>{sessionData ? (<><div className="sm:flex-col1 mt-8 flex w-full">
                    <button
                      onClick={() => setOpen(open ? false : true)}
                      type="submit"
                      className="flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Add Review
                    </button>
                  </div></>) :(<><div className="sm:flex-col1 mt-8 flex w-full">
                    <button
                      onClick={() => setOpen(open ? false : true)}
                      type="submit"
                      disabled
                      className="flex w-full flex-1 items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-2 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Please Login To Add Review
                    </button>
                  </div></>) }</>}</>
            }


            <Dialog open={open} as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                  &#8203;
                </span>
                <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          Add Review
                        </Dialog.Title>
                        <div className="mt-2">
                          <div className="mt-1">
      <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={1}
                  onChange={(e) => {set_review_status(Boolean(parseInt(e.currentTarget.value)))}}
                >
                  <option value={1}>Agree</option>
                  <option value={0}>Disagree</option>
                </select>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Review Title"
          onChange={(e) => set_title(e.currentTarget.value)}
          aria-describedby="email-optional"
        />
      </div>
                          </div>
                          <div className="mt-1">
                            <textarea
                              placeholder="Review Body"
                              name="comment"
                              id="comment"
                              onChange={(e) => set_body(e.currentTarget.value)}
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              defaultValue={''}
                            />
                          </div>
                          <div>

      
    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handle_add_rating}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>


            {getUniqueShoe.isLoading || getUniqueShoe.isFetching ?

              (<section aria-labelledby="details-heading" className="mt-9">
                <div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-3"></div>
                      <div className="w-32 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-3"></div>
                      <div className="w-32 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-3"></div>
                      <div className="w-32 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                  </div>
                </div>
              </section>)


              : (<section aria-labelledby="details-heading" className="mt-12">
                <div className="divide-y divide-gray-200 border-t border-b">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              Features
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                < HiChevronUp
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                < HiChevronDown
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {getUniqueShoe?.data?.features?.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              Sources
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                < HiChevronUp
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                < HiChevronDown
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6 text-justify"
                        >
                          <ul role="list">
                            {getUniqueShoe?.data?.sources?.map((item, index) => (
                              <li key={index}><Link href={item}>Source {index + 1}</Link></li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              Sizing Guide
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                < HiChevronUp
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                < HiChevronDown
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6 text-justify"
                        >
                          <ul role="list">
                            {getUniqueShoe?.data?.sizing?.map((item, index) => (
                              <li key={index}><p>{item}</p></li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>)}

          </div>
        </div>

        {getAllRating.isLoading || getAllRating.isFetching ? (

          <><div role="status" className="w-full p-4 mt-12 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mb-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div></>

        ) : (<><div className="mb-4 px-4 sm:px-0 mt-8">
          <div className="space-y-10 divide-y divide-gray-200 border-gray-200 pb-10">

            <div>

              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={tabs.find((tab) => tab?.current)?.name}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
                {getAllRating?.data?.map((review, index) => (
                  <div key={index} className="pt-8 lg:grid border-b pb-8 lg:grid-cols-12 lg:gap-x-8">
                    <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                      <div className="flex items-center xl:col-span-1">
                        <div className="flex items-center">
                          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                            <svg className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            {review?.status ? "Agree" : "Disagree"}
                          </span>
                        </div>

                      </div>

                      <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                        <h3 className="text-sm font-semibold text-gray-900">{review?.title}</h3>

                        <div
                          className="mt-3 space-y-6 text-sm text-gray-500 text-justify"
                          dangerouslySetInnerHTML={{ __html: review?.body }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                      <p className="font-semibold text-gray-900">{capitalCase(String(review?.User?.name))}</p>
                      <p
                        className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                      >
                        {review?.createdAt.toDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden sm:block">
                <div className="border-b  mt-5 border-gray-200">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        <tab.icon
                          className={classNames(
                            tab.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
                            '-ml-0.5 mr-2 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                        <span>{tab.name}</span>
                      </a>
                    ))}
                  </nav>
                </div>
                {getAllRating?.data?.map((review, index) => (
                  <div key={index} className="pt-10 lg:grid border-b pb-10 lg:grid-cols-12 lg:gap-x-8">
                    <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                      <div className="flex items-center xl:col-span-1">
                        <div className="flex items-center">

                          <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-medium text-indigo-800">
                            <svg className="-ml-1 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx={4} cy={4} r={3} />
                            </svg>
                            {review?.status ? "Agree" : "Disagree"}
                          </span>
                        </div>

                      </div>

                      <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                        <h3 className="text-sm font-semibold text-gray-900">{review?.title}</h3>

                        <div
                          className="mt-3 space-y-6 text-sm text-gray-500 text-justify"
                          dangerouslySetInnerHTML={{ __html: review?.body }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                      <p className="font-semibold text-gray-900">{capitalCase(String(review?.User?.name))}</p>
                      <p
                        className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                      >
                        {review?.createdAt.toDateString()}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div></>)}

      </div>
    </div>
  );
}
