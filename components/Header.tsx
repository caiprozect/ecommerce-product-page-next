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
    <div className="relative pb-20">
      <section className="fixed z-20 flex h-20 w-screen items-center space-x-6 bg-[#ffede0] px-6 pt-4">
        <div>
          <img
            onClick={toggleMenu}
            className="h-4 object-contain"
            src="/icon-menu.svg"
            alt=""
          />
        </div>
        <div className="flex-grow">
          <img src="/logo.svg" alt="" />
        </div>
        <div className="flex items-center space-x-6">
          <Cart onClick={toggleCart} fill={showCart ? '#000000' : '#69707D'} />
          <img className="h-7 object-contain" src="/image-avatar.png" alt="" />
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
        <section className="fixed z-20 mt-20 w-screen">
          <div className="mx-2 mt-2 flex h-64 flex-col rounded-xl bg-[#ffede0] shadow-md">
            <h1 className="p-6 font-bold">Cart</h1>
            <hr />
            <div className="flex h-full flex-grow items-center">
              {cartItems.length === 0 ? (
                <p className="mx-auto font-bold text-[#68707d]">
                  Your cart is empty.
                </p>
              ) : (
                <div className="w-full">
                  {cartItems.map((amount, idx) => (
                    <div
                      key={idx}
                      className="flex w-full items-center space-x-2 px-6"
                    >
                      <img
                        className="h-16"
                        src="/image-product-1-thumbnail.jpg"
                        alt=""
                      />
                      <div className="flex-grow">
                        <p className="w-40 truncate">
                          Fall Limited Edition Snearkers
                        </p>
                        <div className="flex space-x-3">
                          <p>$125.00 x {amount}</p>
                          <p>${amount * 125}.00</p>
                        </div>
                      </div>
                      <Delete />
                    </div>
                  ))}
                  <div className="m-6 flex h-16 items-center justify-center bg-[#ff7d1a] text-[#ffede0]">
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
