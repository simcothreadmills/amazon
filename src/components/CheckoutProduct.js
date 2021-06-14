import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import Currency from 'react-number-format';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice';

function CheckoutProduct({
    id,
    title,
    price,
    rating,
    description,
    category,
    image,
    hasPrime,
}) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime,
        };
        // Push item to Redux
        dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        // Remove item from Redux
        dispatch(removeFromBasket({id}))
    }
    return (
        <div className='grid grid-cols-5'>
            <Image 
                src={image}
                width={200}
                height={200}
                objectFit="contain"
            />

            {/* Middle section */}
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className='h-5 text-yellow-500' />
                        ))
                    }
                </div>

                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                
                <Currency thousandSeparator={true} prefix={'₹'} 
                            value={price} displayType={'text'} 
                />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading='lazy' className='w-12' src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            <div className='flex flex-col space-y-3 my-auto justify-self-end'>
                <button onClick={addItemToBasket} className='button'>
                    Add to Basket
                </button>
                <button onClick={removeItemFromBasket} className='button'>
                    Remove from Basket
                </button>
            </div>

        </div>
    );
}

export default CheckoutProduct;
