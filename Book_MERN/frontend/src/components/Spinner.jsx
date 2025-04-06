import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        navigate('/');  // Redirects to the home page after 1 second
      }, 1000);
    }, 3000);
  }, [navigate]);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {loading ? (
        <BeatLoader color="#36d7b7" />
      ) : (
        <>
          <h2 className='text-2xl font-semibold mb-4'>Order Successful</h2>
          <p>Your Order Successfully Placed</p>
        </>
      )}
    </div>
  );
}

export default Spinner;
