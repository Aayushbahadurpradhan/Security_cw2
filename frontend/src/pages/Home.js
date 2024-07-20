import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import BannerProduct from '../components/BannerProduct';
import CategoryList from '../components/CategoryList';
import HorizontalCardProduct from '../components/HorizontalCardProduct';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const categories = [
          { category: "Full Helmet", heading: "Top's Full Face Helmets" },
          { category: "Half Helmet", heading: "Top's Half Face Helmets" },
          { category: "Dirt Helmet", heading: "Top's Dirt Helmets" },
          { category: "Gloves", heading: "Top's Gloves" },
          { category: "Motor Oil", heading: "Top's Motor Oil" },
          { category: "Tyres", heading: "Top's Tyres" },
          { category: "Raincoat", heading: "Raincoat" },
          { category: "Goggles", heading: "Goggles" }
        ];

        const fetchRandomProduct = async (category) => {
          const response = await fetch(`${SummaryApi.categoryProduct.url}?category=${category}&limit=1`);
          if (!response.ok) {
            throw new Error(`Failed to fetch random product for category ${category}`);
          }
          const data = await response.json();
          return data.data[0]; // Assuming data is an array, take the first item
        };

        const featuredProductsData = await Promise.all(
          categories.map(async (cat) => {
            const product = await fetchRandomProduct(cat.category);
            return {
              ...cat,
              product
            };
          })
        );

        setFeaturedProducts(featuredProductsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setLoading(false); // Handle loading state in case of error
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <BannerProduct />
      <CategoryList />

      {/* Render HorizontalCardProduct for each featured product */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        featuredProducts.map(({ category, heading, product }) => (
          <HorizontalCardProduct
            key={category}
            category={category}
            heading={heading}
            data={[product]} // Pass the fetched product as an array
          />
        ))
      )}
    </div>
  );
};

export default Home;
