import Cart from '../public/icon-cart.svg'

function Header() {
  return (
    <section className="flex h-16 items-center space-x-6 px-6 shadow-md">
      <div>
        <img className="h-4 object-contain" src="/icon-menu.svg" alt="" />
      </div>
      <div className="flex-grow">
        <img src="/logo.svg" alt="" />
      </div>
      <div className="flex items-center space-x-6">
        <Cart fill="#69707D" />
        {/* <img className="h-5 object-contain" src="/icon-cart.svg" alt="" /> */}
        <img className="h-7 object-contain" src="/image-avatar.png" alt="" />
      </div>
    </section>
  )
}

export default Header
