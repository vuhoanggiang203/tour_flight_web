// components/PaymentForm.jsx
'use client';
import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useState} from 'react';
const CheckoutForm = () => {

  const handlePayment = (e) => {
    e.preventDefault();
    // Xử lý thanh toán ở đây
    alert('Thanh toán thành công!');
    setTimeout(() => {
      // Chuyển hướng về trang chủ sau khi thanh toán thành công
      window.location.href = '/';
    }, 1000); // Thời gian chờ 1 giây trước khi chuyển hướng
  }
  // Stripe Elements integration
  // You need to install @stripe/react-stripe-js and @stripe/stripe-js
  // npm install @stripe/react-stripe-js @stripe/stripe-js


  const stripePromise = loadStripe('pk_test_YourPublicKeyHere'); // Replace with your Stripe public key

  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      if (!stripe || !elements) {
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      // Optionally, you can call your backend to create a PaymentIntent and get clientSecret
      // For demo, assuming clientSecret is available
      const clientSecret = 'your_client_secret_from_backend';

      const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        alert('Thanh toán thành công!');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center text-gray-700 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3.75h15m-1.5-12.75a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H2.25A2.25 2.25 0 010 18V6.75A2.25 2.25 0 012.25 4.5h19.5z"
              />
            </svg>
            <h2 className="text-lg font-semibold">Thanh toán bằng thẻ tín dụng</h2>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Thông tin thẻ
            </label>
            <div className="border border-gray-300 rounded-md px-4 py-2 bg-white">
              <CardElement options={{hidePostalCode: true}} />
            </div>
          </div>
        
          {/* Country */}
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-2">
              Quốc gia
            </label>
            <select
              id="country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white pr-8"
              style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 class=%22feather feather-chevron-down%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="Vietnam">Vietnam</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            {loading ? 'Đang xử lý...' : 'Thanh toán'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default CheckoutForm;