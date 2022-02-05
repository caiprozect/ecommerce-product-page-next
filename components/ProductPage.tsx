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

  return (
    <div className="pb-6">
      <Header />

      <main className="min-h-screen">
        <section className="relative flex h-80 items-center">
          <Image
            className="absolute"
            src={`/image-product-${imgIdx}.jpg`}
            alt=""
            layout="fill"
            objectFit="cover"
          />
          <div className="flex w-screen items-center justify-between px-6">
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
        </section>

        <section className="mt-6 space-y-3 px-8">
          <h2 className="text-xs font-bold tracking-widest text-[#ff7d1a]">
            SNEAKER COMPANY
          </h2>
          <h1 className="text-2xl font-bold">Fall Limited Edition Sneakers</h1>
          <p className="text-sm text-[#68707d]">
            These low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>

          <div className="flex items-center space-x-8 pt-4">
            <p className="text-2xl font-bold tracking-wide">$125.00</p>
            <p className="flex-grow font-bold tracking-wide text-[#ff7d1a]">
              50%
            </p>
            <p className="font-bold tracking-wide text-[#b6bcc8] line-through">
              $250.00
            </p>
          </div>

          <div className="flex items-center justify-between px-4 pb-4 pt-6">
            <Minus onClick={subAmount} />
            <p className="font-bold">{amount}</p>
            <Plus onClick={addAmount} />
          </div>

          <div
            onClick={addToCart}
            className="-mx-1 flex h-16 items-center justify-center space-x-4 rounded-xl bg-[#ff7d1a] shadow-md transition-transform ease-out active:scale-95"
          >
            <Cart fill="#ffede0" className="scale-90" />
            <p className="font-bold text-[#ffede0]">Add to cart</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductPage
