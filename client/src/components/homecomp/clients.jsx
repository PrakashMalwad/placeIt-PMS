
import { Swiper, SwiperSlide } from 'swiper/react';


const Clients = () => {
  const clientImages = [
    "client-1.svg",
    "client-2.png",
    "client-3.png",
    "client-4.png",
    "client-5.png",
    "client-6.png",
    "client-7.png",
    "client-8.png",
  ];

  return (
    <div className="flex w-full">
      <section id="clients" className="clients py-10">
        <div className="container mx-auto">
          <Swiper
            spaceBetween={10}
            slidesPerView={'auto'}
            freeMode={true}
            className="client-swiper"
          >
            {clientImages.map((client, index) => (
              <SwiperSlide key={index} className="flex-shrink-0">
                <img
                  src={`assets/img/clients/${client}`}
                  alt={`Client ${index + 1}`}
                  className="img-fluid"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Clients;
