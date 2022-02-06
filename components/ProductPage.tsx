import Image from 'next/image'
import Header from './Header'

import Previous from '../public/icon-previous.svg'
import Next from '../public/icon-next.svg'
import Minus from '../public/icon-minus.svg'
import Plus from '../public/icon-plus.svg'
import Cart from '../public/icon-cart.svg'
import { useState } from 'react'

import { useReactiveVar } from '@apollo/client'
import { cartItemsVar } from '../graphql/cache'

function ProductPage() {
  const [imgIdx, setImgIdx] = useState(1)
  const [amount, setAmount] = useState(0)
  const cartItems = useReactiveVar(cartItemsVar)

  const addIdx = () => {
    setImgIdx(((imgIdx - 1 + 1) % 4) + 1)
  }
  const subIdx = () => {
    setImgIdx(((imgIdx - 2 + 4) % 4) + 1)
  }

  const addAmount = () => {
    setAmount(amount + 1)
  }
  const subAmount = () => {
    if (amount === 0) {
      return
    } else {
      setAmount(amount - 1)
    }
  }

  const addToCart = () => {
    if (amount === 0) return
    setAmount(0)
    cartItemsVar([...cartItemsVar(), amount])
  }

  const changeImg = (event) => {
    setImgIdx(parseInt(event.target.id))
  }

  return (
    <div className="pb-6 md:pb-24">
      <Header />

      <main className="min-h-screen md:mx-auto md:mt-24 md:grid md:h-[64vh] md:min-h-0 md:max-w-screen-2xl md:grid-cols-12 md:px-20">
        <section className="relative flex h-80 items-center md:col-span-5 md:col-start-1 md:grid md:h-full md:grid-rows-5">
          <div className="relative h-full w-full md:row-span-4">
            <Image
              className="absolute object-cover md:relative md:rounded-2xl"
              src={`/image-product-${imgIdx}.jpg`}
              alt=""
              layout="fill"
            />
            <div className="flex h-full w-screen items-center justify-between px-6 md:hidden">
              <div
                onClick={subIdx}
                className="z-10 flex h-8 w-8 items-center rounded-full bg-[#ffede0]"
              >
                <Previous strokeWidth="4" className="ml-2 scale-75" />
              </div>
              <div
                onClick={addIdx}
                className="z-10 flex h-8 w-8 items-center rounded-full bg-[#ffede0]"
              >
                <Next strokeWidth="4" className="ml-2.5 scale-75" />
              </div>
            </div>
          </div>
          <div className="mt-16 hidden h-full gap-x-8 md:row-span-1 md:grid md:grid-cols-4">
            {Array(4)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className={`relative col-span-1 h-full rounded-2xl ${
                    i + 1 === imgIdx ? 'border-4 border-[#ff7d1a]' : ''
                  }`}
                >
                  <Image
                    id={`${i + 1}`}
                    onClick={changeImg}
                    className={`cursor-pointer rounded-xl object-cover ${
                      i + 1 !== imgIdx ? 'hover:opacity-75' : 'opacity-75'
                    }`}
                    src={`/image-product-${i + 1}-thumbnail.jpg`}
                    layout="fill"
                  />
                </div>
              ))}
          </div>
        </section>

        <section className="mt-6 space-y-3 px-8 md:col-span-5 md:col-start-8 md:mt-0 md:flex md:h-full md:flex-col md:justify-center">
          <h2 className="text-xs font-bold tracking-widest text-[#ff7d1a] md:text-sm">
            SNEAKER COMPANY
          </h2>
          <h1 className="text-2xl font-bold md:text-6xl">
            Fall Limited Edition Sneakers
          </h1>
          <p className="text-sm text-[#68707d] md:pt-8 md:text-lg">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          <div className="flex items-center space-x-8 pt-4 md:pt-6">
            <p className="text-2xl font-bold tracking-wide md:text-4xl">
              $125.00
            </p>
            <p className="flex-grow font-bold tracking-wide text-[#ff7d1a] md:text-xl">
              50%
            </p>
            <p className="font-bold tracking-wide text-[#b6bcc8] line-through md:hidden">
              $250.00
            </p>
          </div>

          <p className="hidden text-xl font-bold tracking-wide text-[#b6bcc8] line-through md:inline">
            $250.00
          </p>

          <div className="md:-mx-2 md:grid md:grid-cols-3 md:space-x-6 md:pt-6">
            <div className="flex items-center justify-between px-4 pb-4 pt-6 md:col-span-1 md:rounded-xl md:bg-[#f7f8fd] md:pt-0 md:pb-0">
              <Minus
                className="cursor-pointer hover:opacity-75 md:scale-125"
                onClick={subAmount}
              />
              <p className="font-bold md:text-xl">{amount}</p>
              <Plus
                className="cursor-pointer hover:opacity-75 md:scale-125"
                onClick={addAmount}
              />
            </div>

            <div
              onClick={addToCart}
              className="-mx-1 flex h-16 cursor-pointer items-center justify-center space-x-4 rounded-xl bg-[#ff7d1a] shadow-md transition-transform ease-out hover:opacity-75 active:scale-95 md:col-span-2"
            >
              <Cart fill="#ffede0" className="scale-90 md:scale-100" />
              <p className="font-bold text-[#ffede0] md:text-xl">Add to cart</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductPage
