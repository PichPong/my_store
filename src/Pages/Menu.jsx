import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Cart state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:8000");
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
                products.slice(0, 18).map((product) => (
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
};

export default Menu;


// import React, {useState, useEffect} from 'react';

// const Menu = () => {
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);

//       try {
//         const response = await fetch('https://fakestoreapi.com/products');
//         if (!response.ok) {
//           throw new Error(`Error fetching data: ${response.status}`);
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         setError(error);
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//         {/* food section */}
//         <section className="food_section layout_padding-bottom mt-5">
//             <div className="container">
//               <div className="heading_container heading_center">
//                 <h2>
//                   Our Menu
//                 </h2>
//               </div>
//               {/* <ul className="filters_menu">
//                 <li className="active" data-filter="*">All</li>
//                 <li data-filter=".burger">Burger</li>
//                 <li data-filter=".pizza">Pizza</li>
//                 <li data-filter=".pasta">Pasta</li>
//                 <li data-filter=".fries">Fries</li>
//               </ul> */}
//               <div className="filters-content mt-4">
//                 <div className="row grid">
//                   {products.length > 0 ? (
//                     products.slice(0, 15).map((product) => (
//                       <div className="col-sm-6 col-lg-4 all pizza">
//                         <div className="box">
//                           <div>
//                             <div className="img-box" style={{background:"white"}}>
//                               <img src={product.image} alt />
//                             </div>
//                             <div className="detail-box">
//                               <h5>
//                               {product.title.length>70 ? product.title.substring(0, 20) + " . . ." : product.title}
//                               </h5>
//                               <p>
//                               {product.description.length>70 ? product.description.substring(0, 70) + " . . ." : product.description}
//                               </p>
//                               <div className="options">
//                                 <h6>
//                                   {product.price + "$"}
//                                 </h6>
//                                 <a href>
//                                   <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style={{enableBackground: 'new 0 0 456.029 456.029'}} xmlSpace="preserve">
//                                     <g>
//                                       <g>
//                                         <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
//                             c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
//                                       </g>
//                                     </g>
//                                     <g>
//                                       <g>
//                                         <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
//                             C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
//                             c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
//                             C457.728,97.71,450.56,86.958,439.296,84.91z" />
//                                       </g>
//                                     </g>
//                                     <g>
//                                       <g>
//                                         <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
//                             c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
//                                       </g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                     <g>
//                                     </g>
//                                   </svg>
//                                 </a>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))) : (
//                     <p>No products available</p>
//                   )}
//                 </div>
//               </div>
//               <div className="btn-box">
//                 <a href>
//                   View More
//                 </a>
//               </div>
//             </div>
//           </section>
//           {/* end food section */}
//     </div>
//   )
// };

// export default Menu;


