import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Fuel, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingModal } from './BookingModal';

interface FleetSectionProps {
  lang: any;
}

export const FleetSection = ({ lang }: FleetSectionProps) => {
  const cars = [
    {
      id: 1,
      name: "Gentra",
      seats: "5",
      fuel: "Petrol",
      year: "2023",
      images: ["https://i.postimg.cc/CxrFtMxb/images.jpg","https://i.postimg.cc/NFQFtJqH/3.jpg", "https://i.postimg.cc/ZRpv4vWg/8.webp", "https://i.postimg.cc/PrxfM8th/7.webp", "https://i.postimg.cc/Qt4wNCvc/salon.webp"],
    },
    {
      id: 2,
      name: "Malibu 2",
      seats: "5",
      fuel: "Petrol",
      year: "2024",
      images: ["https://i.postimg.cc/q7x3NybB/Malibu-2.jpg", "https://i.postimg.cc/2SpbT2gr/Malibu-2-back.jpg", "https://i.postimg.cc/Y9yjF3Qd/Malibu-2-side.jpg", "https://i.postimg.cc/sgRx51Zj/Malibu-2-salon-toward.jpg", "https://i.postimg.cc/sfhZWk0c/malibu-2-salon.jpg"],
    },
    {
      id: 3,
      name: "Kia k5",
      seats: "5",
      fuel: "Petrol",
      year: "2024",
      images: ["https://i.postimg.cc/PJjfYRCk/main-3.jpg", "https://i.postimg.cc/pdfd0vzQ/6.jpg", "https://i.postimg.cc/YC1k7302/2.jpg", "https://i.postimg.cc/QdBmK41L/3.jpg", "https://i.postimg.cc/fRk2jTnk/4.jpg"],
    },
    {
      id: 4,
      name: "Mercedes Vito W447",
      seats: "9",
      fuel: "Diesel",
      year: "2025",
      images: ["https://i.postimg.cc/sDPrfhhs/3.jpg", "https://i.postimg.cc/KYhxDhgs/7.webp", "https://i.postimg.cc/nzmWdy45/2.webp", "https://i.postimg.cc/d1tM5sQN/images4.jpg", "https://i.postimg.cc/GhTW7SR7/5.webp"],
    },
    {
      id: 5,
      name: "Hyundai Staria",
      seats: "9",
      fuel: "Petrol",
      year: "2024",
      images: ["https://i.postimg.cc/yxkJ9Cwr/main.jpg", "https://i.postimg.cc/KYjymcLd/photo-1-2026-03-23-22-14-06.jpg", "https://i.postimg.cc/Y2Z0VZcr/photo-3-2026-03-23-22-14-06.jpg", "https://i.postimg.cc/7brx6vDq/photo-2-2026-03-23-22-14-06.jpg", "https://i.postimg.cc/T3X85qb9/1.jpg"],
    },
    {
      id: 6,
      name: "Hyundai Staria",
      seats: "5",
      fuel: "Petrol",
      year: "2023",
      images: ["https://i.postimg.cc/YC4vKcnz/IMG-4587-scaled-1140x843.jpg", "https://i.postimg.cc/kMK4yFVX/2.jpg", "https://i.postimg.cc/yY3D24rF/photo-10-2026-03-23-22-12-15.jpg", "https://i.postimg.cc/DfHZrpy3/photo-9-2026-03-23-22-12-15.jpg", "https://i.postimg.cc/76cxNbD4/photo-4-2026-03-23-22-12-15.jpg"],
    },
    {
      id: 7,
      name: "Toyota Hiace",
      seats: "10+1",
      fuel: "Petrol",
      year: "2026",
      images: ["https://i.postimg.cc/xC9p9tWD/1.webp", "https://i.postimg.cc/ZK4zsxfw/photo-7-2026-03-23-22-13-22.jpg", "https://i.postimg.cc/pVQgjn2J/photo-8-2026-03-23-22-13-22.jpg", "https://i.postimg.cc/YSmPCvnY/photo-2-2026-03-23-22-13-22.jpg", "https://i.postimg.cc/qM36Q05p/photo-2026-03-25-11-58-19.jpg"],
    },
    {
      id: 8,
      name: "Asiastar Eurise",
      seats: "19+1",
      fuel: "Diesel",
      year: "2025",
      images: ["https://i.postimg.cc/PqrGffGQ/6.jpg", "https://i.postimg.cc/DzYN2qdP/4.jpg", "https://i.postimg.cc/TwzHbfsq/3.jpg", "https://i.postimg.cc/prkzHBKP/photo-2026-03-25-11-54-46.jpg", "https://i.postimg.cc/Nfz2kFDh/7.jpg"],
    },
  ];

  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [imageIndex, setImageIndex] = useState<{ [key: number]: number }>({});

  return (
    <section id="cars" className="py-24">
      <div className="container mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Our Cars
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((car, i) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-3xl bg-card border border-border overflow-hidden shadow hover:shadow-lg transition"
            >

              {/* IMAGE + PREMIUM ARROWS */}
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden group">

                {/* LEFT ARROW */}
                <button
                  onClick={() =>
                    setImageIndex((prev) => ({
                      ...prev,
                      [car.id]:
                        ((prev[car.id] || 0) - 1 + car.images.length) %
                        car.images.length,
                    }))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 
                  bg-white/70 backdrop-blur-md 
                  w-10 h-10 rounded-full flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 
                  transition-all hover:scale-110 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>

                {/* IMAGE */}
                <img
                  src={car.images[imageIndex[car.id] || 0]}
                  alt="car"
                  className="w-full h-full object-cover"
                />

                {/* RIGHT ARROW */}
                <button
                  onClick={() =>
                    setImageIndex((prev) => ({
                      ...prev,
                      [car.id]:
                        ((prev[car.id] || 0) + 1) % car.images.length,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 
                  bg-white/70 backdrop-blur-md 
                  w-10 h-10 rounded-full flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 
                  transition-all hover:scale-110 shadow-md"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>

              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {car.name}
                </h3>

                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {car.seats}
                  </span>

                  <span className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </span>

                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {car.year}
                  </span>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-2 rounded-xl font-semibold shadow-lg hover:brightness-110 transition"
                  onClick={() => setSelectedCar(car)}
                >
                  Book Now
                </motion.button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      <BookingModal
        car={selectedCar}
        lang={lang}
        onClose={() => setSelectedCar(null)}
      />
    </section>
  );
};