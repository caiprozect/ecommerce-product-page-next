import Head from 'next/head'
import ProductPage from '../components/ProductPage'

export default function Home() {
  return (
    <div className="bg-[#ffede0] font-Kumbh">
      <Head>
        <title>Ecommerce product page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductPage />
    </div>
  )
}
