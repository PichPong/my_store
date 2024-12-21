import React, {useState, useEffect, useContext} from 'react'
import { CartContexts } from './CartContexts';
import { NavLink } from 'react-router-dom';


const Cart = () => {

    const [product, setProducts] = useState([]);

    const {cart, removeFromCart, updateCartQuantity, clearCart} = useContext(CartContexts)

    

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  // const handleAddToCart = ()=> {
  //   handleAddToItem()
  // }

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [product.description, product.price]);

  return (
    <div>
        <ul className="list-group mb-3">
                    {cart.length === 0 ? (
                        <p>Cart is empty</p>
                    ): ( cart.map((item)=>(
                        <div className="row border border-secondary-100 mb-2">
                            <li className="col-8 list-group-item d-flex justify-content-between lh-sm ">
                                <div className="col-6 col-md-2">
                                    <img src={item.image} style={{width:"50px"}} className="d-flex position-relative"/> 
                                </div>
                                <div className="col-md-4 my-0 ">
                                    <h6 className="">{item.title.substring(0,18) + " . . . "}</h6>
                                    <small className="text-body-secondary">{item.category}</small>
                                </div>

                                <div className="col-2">
                                    <span className="col-md-2 text-body-secondary">${item.price}</span>  
                                    <div className="quantity-wrapper d-flex align-items-center justify-content-center border border-secondary" style={{justifyContent:"center", alignContent:"center", marginTop:"15px"}}
                                        onClick={() => updateCartQuantity(item.id)} value={updateCartQuantity} >
                                        {item.quantity}
                                    </div> 
                                </div>
                                
                                <div className="col-12 d-flex">
                                    <button className="col-md-1 w-100 h-75 btn btn-danger btn-lg m-2" type="button" onClick={() => removeFromCart(item.id)} value={removeFromCart} > - </button>
                                    <button className="col-md-1 w-100 h-75 btn btn-primary btn-lg m-2" type="button" onClick={() => updateCartQuantity(item.id)} value={updateCartQuantity}> + </button>
                                    <button className="col-md-1 w-100 h-75 btn btn-danger btn-lg m-2" type='button' onClick={() => clearCart()} value={clearCart}>Clear</button>
                                </div>
                            </li>
                        </div>
                        ))
                    )}
                </ul>
                <NavLink className="col-md-8 w-100 h-75 btn btn-info btn-lg m-2" type='button' to={"/checkout"} onClick={()=> CheckOut()}>Check Out</NavLink>
    </div>
  )
}

export default Cart