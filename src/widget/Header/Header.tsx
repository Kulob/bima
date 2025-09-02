import { MapPin, Phone } from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"
import styles from "./header.module.scss"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
         
            <div className={styles.logoText}>
              <img
                src="https://bima.tj/static/media/logo.ad1287fb.svg"
                alt="logo"
              />
            </div>
          </Link>
        </div>


        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Клиентам
          </Link>
          <Link to="/currency" className={styles.navLink}>
            Курсы валют  
          </Link>
        </nav>


        <div className={styles.actions}>
          <Link
            to="/claim"
            className={`${styles.action} ${styles.actionOrange}`}
          >
            Страховой случай
          </Link>

          <Link to="/" className={styles.action}>
            <MapPin size={16} />
            <span>Офисы</span>
          </Link>

          <a href="tel:5511" className={styles.action}>
            <Phone size={16} />
            <span>5511</span>
          </a>

          <div className={styles.flag}>
            <span className={styles.flagRu}>🇷🇺</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
