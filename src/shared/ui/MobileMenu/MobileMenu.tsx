import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.scss';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="mobile-menu">
      <button 
        className="mobile-menu__toggle"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="mobile-menu__overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <motion.div
              className="mobile-menu__content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="mobile-menu__header">
                <h3>Меню</h3>
                <button onClick={closeMenu} className="mobile-menu__close">
                  <X size={24} />
                </button>
              </div>

              <nav className="mobile-menu__nav">
                <div className="mobile-menu__section">
                  <h4>Основное</h4>
                  <Link to="/" onClick={closeMenu}>Клиентам</Link>
                  <Link to="/currency" onClick={closeMenu}>Курсы валют</Link>
                </div>

                <div className="mobile-menu__section">
                  <h4>Продукты</h4>
                  <Link to="/" onClick={closeMenu}>Автострахование</Link>
                  <Link to="/" onClick={closeMenu}>Коробочные продукты</Link>
                  <Link to="/" onClick={closeMenu}>Банковские продукты</Link>
                  <Link to="/" onClick={closeMenu}>Для путешественников</Link>
                  <Link to="/" onClick={closeMenu}>Партнёрские проекты</Link>
                </div>

                <div className="mobile-menu__section">
                  <h4>Действия</h4>
                  <Link to="/claim" onClick={closeMenu} className="mobile-menu__highlight">
                    Страховой случай
                  </Link>
                  <Link to="/" onClick={closeMenu}>Офисы</Link>
                  <Link to="tel:5511" onClick={closeMenu}>Позвонить: 5511</Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;