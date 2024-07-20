import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Context from '../context';
import addToCart from '../helpers/addToCart';
import displayNPRCurrency from '../helpers/displayCurrency';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null);

    const scrollElement = useRef();

    const { fetchUserAddToCart } = useContext(Context);

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        fetchUserAddToCart();
    };

    const fetchData = async () => {
        setLoading(true);
        const categoryProduct = await fetchCategoryWiseProduct(category);
        setLoading(false);
        setData(categoryProduct?.data);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300;
    };

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300;
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div className='relative'>
                <button
                    className='bg-white shadow-md rounded-full p-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block'
                    onClick={scrollLeft}
                    aria-label='Scroll Left'
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-white shadow-md rounded-full p-2 absolute right-0 top-1/2 transform -translate-y-1/2 text-lg hidden md:block'
                    onClick={scrollRight}
                    aria-label='Scroll Right'
                >
                    <FaAngleRight />
                </button>
                <div
                    className='flex gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all'
                    ref={scrollElement}
                >
                    {loading ? (
                        loadingList.map((_, index) => (
                            <div
                                key={index}
                                className='flex-shrink-0 w-64 md:w-80 h-36 bg-white rounded-sm shadow flex animate-pulse'
                            >
                                <div className='bg-slate-200 h-full p-4 w-24 md:w-36'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 bg-slate-200 p-1 rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium bg-slate-200 p-1 w-full rounded-full'></p>
                                        <p className='text-slate-500 line-through bg-slate-200 p-1 w-full rounded-full'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product) => (
                            <Link
                                to={`product/${product?._id}`}
                                key={product?._id}
                                className='flex-shrink-0 w-64 md:w-80 h-36 bg-white rounded-sm shadow flex'
                            >
                                <div className='bg-slate-200 h-full p-4 w-24 md:w-36'>
                                    <img
                                        src={product.productImage[0]}
                                        className='object-scale-down h-full hover:scale-110 transition-all'
                                        alt={product?.productName}
                                    />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                        {product?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>{product?.brandName}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium'>
                                            {displayNPRCurrency(product?.sellingPrice)}
                                        </p>
                                        {/* <p className='text-slate-500 line-through'>
                                            {displayNPRCurrency(product?.price)}
                                        </p> */}
                                    </div>
                                    <button
                                        className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                                        onClick={(e) => handleAddToCart(e, product?._id)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
