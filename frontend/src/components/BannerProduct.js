
import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/1.png';
import image2 from '../assest/banner/2.png';
import image3 from '../assest/banner/3.png';
import image4 from '../assest/banner/4.png';
import image5 from '../assest/banner/5.png';


import { FaAngleRight } from 'react-icons/fa';
import { FaAngleLeft } from 'react-icons/fa';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image3, image4, image5];


    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-61 md:h-76 w-full bg-slate-200 relative">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop and tablet version */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {desktopImages.map((imageUrl, index) => (
                        <div
                            key={index}
                            className="w-full h-full min-w-full min-h-full transition-all"
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageUrl} className="w-full h-full object-cover" alt={`Banner ${index}`} style={{ objectFit: 'fill' }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;
