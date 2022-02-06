import { useReactiveVar } from '@apollo/client'
import { useState } from 'react'
import { cartItemsVar } from '../graphql/cache'
import Cart from '../public/icon-cart.svg'
import Close from '../public/icon-close.svg'
import Delete from '../public/icon-delete.svg'

function Header() {
  const [showMenu, setShowMenu] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const cartItems = useReactiveVar(cartItemsVar)

  const deleteItem = (event) => {
    let newItems = [...cartItemsVar()]
    newItems.splice(parseInt(event.target.id), 1)
    cartItemsVar(newItems)
  }

  const toggleMenu = () => {
    if (!showCart) {
      setShowMenu(!showMenu)
    } else {
      setShowCart(!showCart)
      setShowMenu(!showMenu)
    }
  }

  const toggleCart = () => {
    setShowCart(!showCart)
  }

  return (
    <div className="relative flex justify-center pb-20 md:pb-32">
      <section className="fixed z-20 mx-auto flex h-20 w-screen items-center space-x-6 bg-[#ffede0] px-6 pt-4 md:h-32 md:max-w-screen-2xl md:border-b-4 md:border-b-[#f7f8fd] md:bg-white md:pt-0">
        <div className="md:hidden">
          <img
            onClick={toggleMenu}
            className="h-4 object-contain"
            src="/icon-menu.svg"
            alt=""
          />
        </div>
        <div className="flex-grow md:flex-grow-0">
          <img className="md:h-6" src="/logo.svg" alt="" />
        </div>

        <div className="hidden flex-grow items-center space-x-8 pl-8 text-lg text-[#68707d] md:flex">
          <p className="cursor-pointer hover:mt-1 hover:border-b-4 hover:border-b-[#ff7d1a] hover:py-12 hover:font-bold hover:text-[#1d2025]">
            Collections
          </p>
          <p className="cursor-pointer hover:mt-1 hover:border-b-4 hover:border-b-[#ff7d1a] hover:py-12 hover:font-bold hover:text-[#1d2025]">
            Men
          </p>
          <p className="cursor-pointer hover:mt-1 hover:border-b-4 hover:border-b-[#ff7d1a] hover:py-12 hover:font-bold hover:text-[#1d2025]">
            Women
          </p>
          <p className="cursor-pointer hover:mt-1 hover:border-b-4 hover:border-b-[#ff7d1a] hover:py-12 hover:font-bold hover:text-[#1d2025]">
            About
          </p>
          <p className="cursor-pointer hover:mt-1 hover:border-b-4 hover:border-b-[#ff7d1a] hover:py-12 hover:font-bold hover:text-[#1d2025]">
            Contact
          </p>
        </div>

        <div className="relative flex items-center space-x-6 md:space-x-16">
          <Cart
            className="cursor-pointer hover:fill-black md:scale-125"
            onClick={toggleCart}
            fill={showCart ? '#000000' : '#69707D'}
          />
          {cartItems.length === 0 ? null : (
            <span
              className="absolute -left-4 -top-1 flex h-4 w-5 items-center 
            justify-center rounded-full bg-[#ff7d1a] text-xs font-bold text-[#ffede0] 
            md:-left-14 md:top-2 md:h-5 md:w-7 md:text-sm"
            >
              {cartItems.reduce((acc, cur, i) => acc + cur, 0)}
            </span>
          )}
          <img
            className="box-content h-7 cursor-pointer rounded-full object-contain hover:border-[#ff7d1a] md:h-14 md:border-4 md:border-white"
            src="/image-avatar.png"
            alt=""
          />
        </div>
      </section>

      {showMenu ? (
        <section className="fixed z-20 flex min-h-screen w-screen bg-black bg-opacity-75">
          <div className="fixed min-h-screen w-2/3 bg-[#ffede0] bg-opacity-100 pt-10 pl-6 shadow-lg">
            <Close onClick={toggleMenu} />
            <div className="mt-12 space-y-6 text-lg font-bold text-[#1d2025]">
              <p>Collections</p>
              <p>Men</p>
              <p>Women</p>
              <p>About</p>
              <p>Contact</p>
            </div>
          </div>
        </section>
      ) : null}

      {showCart ? (
        <section className="fixed z-20 mt-20 w-screen md:left-[70vw] md:mt-24 md:w-[25vw] md:text-lg">
          <div className="mx-2 mt-2 flex h-64 flex-col rounded-xl bg-[#ffede0] shadow-md md:h-96 md:bg-white md:shadow-2xl">
            <h1 className="p-6 font-bold">Cart</h1>
            <hr />
            <div className="flex h-full flex-grow items-center">
              {cartItems.length === 0 ? (
                <p className="mx-auto font-bold text-[#68707d]">
                  Your cart is empty.
                </p>
              ) : (
                <div className="relative mt-6 grid h-full w-full grid-rows-2 space-y-2 px-6 md:mt-12">
                  <div className="h-3/5 space-y-2 overflow-scroll md:row-span-full md:overflow-x-hidden">
                    {cartItems.map((amount, idx) => (
                      <div
                        key={idx}
                        className="flex w-full items-center space-x-2 md:pr-4"
                      >
                        <img
                          className="h-14 rounded-lg md:h-20"
                          src="/image-product-1-thumbnail.jpg"
                          alt=""
                        />
                        <div className="h-14 flex-grow space-y-1 text-[#68707d] md:h-20 md:space-y-4 md:text-xl">
                          <p className="w-40 truncate md:w-72">
                            Fall Limited Edition Snearkers
                          </p>
                          <div className="flex space-x-3">
                            <p>$125.00 x {amount}</p>
                            <p className="font-bold text-[#1d2025]">
                              ${amount * 125}.00
                            </p>
                          </div>
                        </div>
                        <Delete
                          className="cursor-pointer md:scale-125"
                          id={idx}
                          onClick={deleteItem}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="fixed top-64 -ml-1 flex h-16 w-80 cursor-pointer items-center justify-center rounded-lg bg-[#ff7d1a] font-bold text-[#ffede0] hover:opacity-75 md:top-96 md:w-[22vw]">
                    <p>Checkout</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default Header
