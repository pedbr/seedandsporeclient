import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(
  'pk_test_51LttTdCkXFiy2LWeKmzZY48CKBd3AmoFMaB8QvVi2ErysC4LbQ48idsaAFfldri889fYIoPgPS5K8z51iql2jfIE00MIKJbl8q'
)

const Checkout = () => {
  return <div>Checkout</div>
}

export default Checkout
