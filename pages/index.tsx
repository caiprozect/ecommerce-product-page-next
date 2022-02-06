import Head from 'next/head'
import ProductPage from '../components/ProductPage'

export default function Home() {
  return (
    <div className="bg-[#ffede0] font-Kumbh text-[#1d2025] md:bg-white">
      <Head>
        <title>Ecommerce product page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductPage />
    </div>
  )
}
