// PRODUCTS COMPONENT //

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Mousewheel, Keyboard, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { camelToPascalCase } from '../helperFunctions';

const Products = ({itemsForDisplay, setOpen, errorMessage}) => {
  
  const cards = itemsForDisplay.map(item => {
    const altText = {
      bracelet: 'three woven bracelets in varying shades of blue, orange, red, and green',
      keychain: 'a tray holding a row of woven keychains in various brightcolors',
      beerKoozie: 'a colorful beer koozie with handle held by a smiling woman',
      basket: 'two colorful woven baskets with lids',
      dogLeash: 'a blue, purple, and pink sturdy rope dog leash'
    }
    
    return (
        <SwiperSlide key={item.id} >
          <Link to={`/products/${item.id}`}>
            <div className="card">
              {console.log(item.name)}
              <img src={item.image} alt={altText[item.name]} className="card__image" />
              <div className="card__info">
                <h3 className="card__name">{camelToPascalCase(item.name)}</h3>
                <p className="card__price">${item.price}</p>
              </div>
            </div>
          </Link>
      </SwiperSlide>
    )
  });

  return (
    <section id="products" className="products" onClick={() => {setOpen(false)}}>
      <h2 className="products__header">Products</h2>
      {errorMessage && <p className="products__error">{errorMessage}</p>}
      <div className="products__container">
        <Swiper
          cssMode={true} 
          pagination={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          spaceBetween={-40} 
          modules={[Pagination, Mousewheel, Keyboard, Navigation]} 
          className="swiper"
          breakpoints={
            {
              672: {
              slidesPerView: 3
              },
              1050: {
                slidesPerView: 4
              }
            }
          }
          >
          {cards}
        </Swiper>
      </div>
    </section>
  )
};

export default Products;