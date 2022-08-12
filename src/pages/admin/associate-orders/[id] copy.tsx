import { useRouter } from 'next/router'

const Order = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Order Id: {id}</p>
}

export default Order
