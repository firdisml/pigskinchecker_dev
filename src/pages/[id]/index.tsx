/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useState } from 'react'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { ShieldCheckIcon } from '@heroicons/react/outline'

const product = {
  name: 'Everyday Ruck Snack',
  href: '#',
  price: '$220',
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc: 'https://images.stockx.com/images/adidas-Samba-OG-Clay-Strata.jpg?fit=fill&bg=FFFFFF&w=480&h=320&fm=webp&auto=compress&dpr=1&trim=color&updated_at=1685042121&q=57',
  imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    { id: 1, name: 'Home', href: '#' },
    { id: 2, name: 'Adidas', href: '#' },
    { id: 3, name: 'Samba', href: '#' },
  ],
  sizes: [
    { name: 'True', description: 'Perfect for a reasonable amount of snacks.' },
    { name: 'False', description: 'Enough room for a serious amount of snacks.' },
  ],
}
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  return (
<div className="bg-white flex justify-center items-center">
  <div className="max-w-2xl mx-auto py-auto px-4 sm:py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg mt-16 lg:self-end">

          <div className="mt-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-center text-gray-900 sm:text-3xl">Adidas Samba OG</h1>
          <p className="text-lg text-center text-gray-500 mt-1">
                                    Clay Strata
        </p>
          </div>
        </div>

        {/* Product image */}
        <div className="mt-5 lg:mt-5 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-5 aspect-h-3 overflow-hidden">
            <img src={product.imageSrc} alt={product.imageAlt} className="w-full h-full object-center object-cover" />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-8 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section>
              <div className="sm:flex sm:justify-between">
                {/* Size selector */}
                <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        as="div"
                        key={size.name}
                        value={size}
                        className={({ active }) =>
                          classNames(
                            active ? 'ring-2 ring-indigo-500' : '',
                            'relative block border border-gray-300 p-4 cursor-pointer focus:outline-none'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="p" className="text-base font-semibold text-gray-900">
                              {size.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                              {size.description}
                            </RadioGroup.Description>
                            <div
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'absolute -inset-px pointer-events-none'
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Submit Vote
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
          </section>
        </div>
      </div>
    </div>
  )
}
