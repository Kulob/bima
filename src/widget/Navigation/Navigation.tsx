import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Автострахование" },
    { to: "", label: "Коробочные продукты" },
    { to: "", label: "Банковские продукты" },
    { to: "", label: "Для путешественников" },
    { to: "", label: "Партнёрские проекты" },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.navigation__container}>
        <div className={styles.navigation__links}>
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`${styles.navigation__link} ${
                location.pathname === link.to ? styles["navigation__link--active"] : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link to="/" className={styles.navigation__login}>
          Войти
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
