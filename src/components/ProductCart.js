import '../style/App.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';


function ProductCart({id, title, image, price, quantity}){

    const [{basket},dispatch] = useStateValue();
    const removeItem = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id
        })
    }

    const increaseQuantity = () => {
        dispatch ({
            type: 'INCREASE_QUANTITY',
            id: id,
            item:{
                id:id,
                title:title,
                image:image,
                price:price,
                quantity:quantity+1
            }
        })
    }

    const decreaseQuantity = () => {
        dispatch({
            type:'DECREASE_QUANTITY',
            id: id,
            item:{
                id: id,
                title: title,
                image : image,
                price : price,
                quantity : quantity-1
            }
        })
            
    }


    return (
            <div className="productcart">
                <img className="productcart__image" src={image} alt="" />

                <div className="productcart__info">
                    <div className="productcart__topContainer">
                        <p className="productcart__title"><strong>{title}</strong></p>
                        <br/>
                        <span>Ár: <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true}/> Ft</span>
                    </div>
                    
                    <div className="productcart__bottomContainer">
                        <div className="productcart__quantity">
                            <p className="productcart__quantityMinus" onClick={decreaseQuantity}><RemoveRoundedIcon/></p>
                            <p className="productcart__quantityValue" id="qtty">{quantity}</p>
                            <p className="productcart__quantityPlus" onClick={increaseQuantity}><AddRoundedIcon/></p>
                        </div>

                        <button className="button__remove" onClick={removeItem}>Termék eltávolítása</button>
                    </div>
                </div>
            </div>
            )


}

export default ProductCart;