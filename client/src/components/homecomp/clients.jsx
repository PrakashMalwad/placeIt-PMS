import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';

const Clients = () => {
  const clientImages = [
    "google.png",
    "microsoft.png",
    "amazon.png",
    "apple.png",
    "facebook.png",
    "netflix.png",
    "spotify.png",
    "twitter.png",
  ];

  return (
    <div className="flex w-full justify-center">
      <section id="clients" className="clients py-12">
        <div className="container mx-auto items-center px-4 md:px-8">
          <h3 className="text-center text-2xl md:text-3xl font-bold text-blue-800 mb-8 md:mb-12">
            Our Trusted Clients
          </h3>
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            freeMode={true}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="client-swiper flex justify-center"
          >
            {clientImages.map((client, index) => (
              <SwiperSlide key={index} className="flex-shrink-0 flex justify-center items-center">
                <img
                  src={`assets/img/clients/${client}`}
                  alt={`Client ${index + 1}`}
                  className="img-fluid grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 hover:shadow-xl rounded-lg border-2 border-transparent hover:border-blue-400"
                  style={{ width: '120px', height: 'auto' }}
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
