import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assest/logo.png';
import SummaryApi from '../common';

const Footer = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(5).fill(null); // Adjusted to fetch only 5 categories

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data.slice(0, 5)); // Limiting to 5 categories
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto p-4'>
        <div className='flex flex-wrap justify-between'>

          {/* Left Side */}
          <div className='flex items-center mb-4'>
            <img src={logo} alt='Logo' className='w-12 h-12 mr-2' />
            <div>
              <p className='font-semibold'>Shalimar Helmet Shop</p>
              <p className='text-gray-400'>Bhaktapur</p>
              <p className='text-gray-400'>97456452</p>
              <p className='text-gray-400'>shalimarhelmet@gmail.com</p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className='font-semibold mb-2 text-gray-400'>Categories</h3>
            <ul className='text-sm'>
              {loading ? (
                categoryLoading.map((_, index) => (
                  <li key={index} className='mb-1'>
                    <div className='h-6 bg-slate-200 animate-pulse rounded'></div>
                  </li>
                ))
              ) : (
                categoryProduct.map((product) => (
                  <li key={product.category} className='mb-1'>
                    <Link to={`/product-category?category=${product.category}`} className='hover:text-gray-300'>{product.category}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div className='flex flex-col'>
            <h3 className='font-semibold mb-2 text-gray-400'>Quick Links</h3>
            <ul className='text-sm'>
              <li><Link to='/about' className='hover:text-gray-300'>About Us</Link></li>
              <li><Link to='/contact' className='hover:text-gray-300'>Contact Us</Link></li>
              <li><Link to='/terms' className='hover:text-gray-300'>Terms of Service</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
