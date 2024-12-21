import React, { useState, useEffect, useContext } from 'react';
import { use } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CartContexts } from './CartContexts';
function ProductDetails() {
  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {addToCart} = useContext(CartContexts)

  const {id} = useParams({});
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);

        const recommendedResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`)

        const recommendedData = await recommendedResponse.json();
        setRecommended(recommendedData.filter(item => item.id !== parseInt(id)));
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
    
      <section className="swiper product-swiper open-up collection bg-light position-relative py-5 " data-aos="zoom-out">
        <div className="container" >
          <div className="row">
              <div className="collection-item d-flex flex-wrap my-5">
                <div className="col-12 col-md-4 md-4 column-container">
                  <div className="image-holder">
                    <img src={product.image} alt="collection" className="product-image img-fluid" />
                  </div>
                </div>
                
                <div className="col-md-6 column-container bg-white">
                  <div className="collection-content p-5 m-0 m-md-5">
                    <h3 className="element-title text-uppercase">{product.title}</h3>
                    <p>{product.description}</p>
                    <button onClick={()=> addToCart(product)} type="button" value={addToCart} className="btn btn-dark text-uppercase mt-3">Add To Card</button>
                  </div>
                </div>
              </div>  
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;