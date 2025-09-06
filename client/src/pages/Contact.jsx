import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import {
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa';
import ilyes from '../photo/imgs/ilyes.jpg';

const ContactPage = () => {
  const { t } = useTranslation();
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_SECOND_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      alert(t('contact.success_message'));
      formRef.current.reset();
    } catch (error) {
      alert(t('contact.error_message'));
      console.error('Email sending error:', error);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="h-6 w-6 text-[var(--mainOrange)]" />,
      title: t('contact.address'),
      content: t('contact.address_value')
    },
    {
      icon: <FaPhone className="h-6 w-6 text-[var(--mainOrange)]" />,
      title: t('contact.phone'),
      content: '0770807185'
    },
    {
      icon: <FaClock className="h-6 w-6 text-[var(--mainOrange)]" />,
      title: t('contact.hours'),
      content: t('contact.hours_value')
    },
    {
      icon: <FaEnvelope className="h-6 w-6 text-[var(--mainOrange)]" />,
      title: t('contact.email'),
      content: 'cabinetvetanimalia@gmail.com'
    }
  ];

  const socialLinks = [
    {
      icon: <FaFacebook className="text-gray-600 hover:text-orange-400 h-6 w-6" />,
      href: "https://www.facebook.com/profile.php?id=100091730273953&mibextid=ZbWKwL",
      label: "Facebook"
    },
    {
      icon: <FaInstagram className="text-gray-600 hover:text-orange-400 h-6 w-6" />,
      href: "https://www.instagram.com/cabinet_vetanimalia25?igsh=MWM0c3J3Zzh1bWg2dA==",
      label: "Instagram"
    },
    {
      icon: <FaWhatsapp className="text-gray-600 hover:text-orange-400 h-6 w-6" />,
      href: "https://wa.me/+213770807185",
      label: "WhatsApp"
    },
    {
      icon: <FaTiktok  className="text-gray-600 hover:text-orange-400 h-6 w-6" /> ,
      href: "https://www.tiktok.com/@vetanimalia_25?_t=ZM-8yi5u8XHpUW&_r=1",
      label: "Titok"
    }
  ];

  return (
    <main className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">{t('contact.title')}</h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            {t('contact.subtitle')}
          </p>
        </header>

        {/* Contact Information Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <article className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t('contact.clinic_info')}</h2>
            
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start">
                {info.icon}
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{info.title}</h3>
                  <p className="text-gray-600">{info.content}</p>
                </div>
              </div>
            ))}

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">{t('contact.follow')}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </article>

          {/* Location Section */}
          <article className="bg-white rounded-xl shadow-lg p-6 h-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.location')}</h2>
            <div className="relative pb-3/4 h-96 rounded-lg overflow-hidden mb-6">
              <iframe
                title={t('contact.location')}
                src="https://www.google.com/maps/embed/v1/place?q=VETANIMALIA(cabinet+vétérinaire),+6HP5+7XP,+El+Khroub&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                aria-hidden="false"
              />
            </div>
            <div className="flex items-center">
              <img 
                src={ilyes} 
                alt={t('contact.doctor_alt')} 
                className="w-16 h-16 rounded-full object-cover" 
                loading="lazy"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Dr. Ilyes Kitouni</h3>
                <p className="text-gray-600">{t('contact.doctor_title')}</p>
              </div>
            </div>
          </article>
        </section>

        {/* Emergency Banner */}
        <section className="mainOrange rounded-xl shadow-lg p-6 text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">{t('contact.emergency')}</h2>
          <p className="text-white text-lg">
            {t('contact.emergency_text')} <span className="font-bold">0770807185</span>
          </p>
        </section>

        {/* Contact Form Section */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form_title')}</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">
                  {t('contact.full_name')}
                </label>
                <input
                  type="text"
                  id="from_name"
                  name="from_name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="reply_to" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="reply_to"
                  name="reply_to"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                  aria-required="true"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-orange-400 focus:border-orange-400"
                aria-required="true"
              />
            </div>
            <input type="hidden" name="time" value={new Date().toLocaleString()} />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white mainOrange hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                aria-label={t('contact.send')}
              >
                {t('contact.send')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;