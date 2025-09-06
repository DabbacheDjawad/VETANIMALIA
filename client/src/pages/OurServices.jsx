import { useTranslation } from "react-i18next";
import animal from "../photo/service/ced.avif";
import animal2 from "../photo/service/chur.jpg";
import radio from "../photo/imgs/radio.jpg";
import alimentation from "../photo/imgs/alimentation.jpg";
import vaccination from "../photo/imgs/vaccination.jpg";
import garde from "../photo/imgs/garde.jpg";
import deta from "../photo/imgs/detartrage.jpg";
import catHotelImage from "../photo/service/catHotelImage.jpg";

const OurServices = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: "consultation",
      category: t("Services.consultation"),
      items: [
        t("Services.consultation_item1"),
        t("Services.consultation_item2"),
        t("Services.consultation_item3"),
        t("Services.consultation_item4"),
        t("Services.consultation_item5"),
        t("Services.consultation_item6"),
      ],
      image: animal,
      alt: t("Services.consultation_alt"),
    },
    {
      id: "surgery",
      category: t("Services.surgery"),
      items: [
        t("Services.surgery_item1"),
        t("Services.surgery_item2"),
        t("Services.surgery_item3"),
        t("Services.surgery_item4"),
        t("Services.surgery_item5"),
      ],
      image: animal2,
      alt: t("Services.surgery_alt"),
    },
    {
      id: "radiography",
      category: t("Services.radiography"),
      items: [
        t("Services.radiography_item1"),
        t("Services.radiography_item2"),
        t("Services.radiography_item3"),
        t("Services.radiography_item4"),
        t("Services.radiography_item5"),
      ],
      image: radio,
      alt: t("Services.radiography_alt"),
    },
    {
      id: "nutrition",
      category: t("Services.nutrition"),
      items: [
        t("Services.nutrition_item1"),
        t("Services.nutrition_item2"),
        t("Services.nutrition_item3"),
      ],
      image: alimentation,
      alt: t("Services.nutrition_alt"),
    },
    {
      id: "sante et bien-etre",
      category: t("Services.vaccination"),
      items: [
        t("Services.health_item1"),
        t("Services.health_item2"),
        t("Services.health_item3"),
      ],
      image: vaccination,
      alt: t("Services.vaccination_alt"),
    },
    {
      id: "hospitalization",
      category: t("Services.hospitalization"),
      items: [
        t("Services.hospitalization_item1"),
        t("Services.hospitalization_item2"),
        t("Services.hospitalization_item3"),
      ],
      image: garde,
      alt: t("Services.hospitalization_alt"),
    },
    {
      id: "catHotel",
      category: t("Services.catHotel"),
      items: [
        t("Services.catHotel_item1"),
        t("Services.catHotel_item2"),
        t("Services.catHotel_item3"),
      ],
      image: catHotelImage,
      alt: t("Services.catHotel_alt"),
    },
  ];

  

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <section
      className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 w-full"
      style={{ fontFamily: "Kiwi Maru, serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {t("Services.title")}
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {t("Services.subtitle")}
          </p>
        </header>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 
              hover:shadow-xl hover:-translate-y-1 flex flex-col h-full w-full"
              itemScope
              itemType="https://schema.org/Service"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  loading="lazy"
                  itemProp="image"
                />
              </div>
              <div className="p-6 flex-grow">
                <h2
                  className="text-2xl font-bold text-gray-800 mb-4"
                  itemProp="name"
                >
                  {service.category}
                </h2>
                <ul className="space-y-3 text-gray-600" itemProp="description">
                  { service.items.map((item, idx) => (
                    <li key={`${service.id}-${idx}`} className="flex items-start">
                      <span className="bg-orange-400 text-white rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <CheckIcon />
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  )) }
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
