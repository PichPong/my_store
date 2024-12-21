import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Food = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Cart state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle adding items to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div>
      {/* Food section */}
      <section className="food_section layout_padding-bottom mt-5">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our New Arrived</h2>
          </div>
          <div className="filters-content mt-4">
            <div className="row grid">
              {isLoading && <p>Loading...</p>}
              {error && <p>{error.message}</p>}
              {products.length > 0 ? (
                products.slice(0, 9).map((product) => (
                  <div
                    className="col-sm-6 col-lg-4 all pizza"
                    key={product.id}
                  >
                    <div className="box">
                      <div>
                        <div
                          className="img-box"
                          style={{ background: "white" }}
                        >
                          <img src={product.image} alt={product.title} />
                        </div>
                        <div className="detail-box">
                          <h5>
                            {product.title.length > 20
                              ? product.title.substring(0, 20) + " . . ."
                              : product.title}
                          </h5>
                          <p>
                            {product.description.length > 70
                              ? product.description.substring(0, 70) + " . . ."
                              : product.description}
                          </p>
                          {/* <div className="options"> */}
                            <h6>{product.price + "$"}</h6>
                            <Link
                              to={`/product/${product.id}`}
                              // onClick={() => handleAddToCart(product)}
                              className="btn btn-warning"
                            >
                              Add to Cart
                            </Link>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
          <div className="btn-box">
            <a href>View More</a>
          </div>
        </div>
      </section>
      {/* End food section */}
    </div>
  );
}

export default Food