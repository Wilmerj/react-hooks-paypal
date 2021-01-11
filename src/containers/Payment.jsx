import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { PayPalButton } from 'react-paypal-button'

import AppContext from "../context/AppContext";
import '../styles/components/Payment.css';

const Payments = () => {
  const { state, addNewOrder } = useContext(AppContext)
  const { cart, buyer } = state;
  const history = useHistory();
  
  const paypalOptions = {
    clientId: 'AR3GlDj-A3rbpYmIY4JXvQdsxlNfFBUJzM6j6s2f9sH_FgiaEzBrPLv89vJVrRdwNIebA5E2x3EGL0Pm',
    intent: 'capture',
    currency: 'USD'
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect'
  }

  const handlePaymentSuccess = (data) => {
    if(data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        products: cart,
        payment: data
      }

      addNewOrder(newOrder);
      history.push('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currenValue) => accumulator + currenValue.price;
    const sum = cart.reduce(reducer, 0);
    return sum;
  }
  
  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Resumen del pedido:</h3>
        {
          cart.map((item) => (
            <div className="Payment-item" key={item.title}>
              <div className="Payment-element">
                <h4>{item.title}</h4>
                <span>
                  $
                  {item.price}
                </span>
              </div>
            </div>
          ))
        }
        <div className="Payment-button">
          <PayPalButton 
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.info('start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.info(error)}
            onPaymentCancel={(data) => console.info(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Payments;