import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import styles from "./App.module.scss";
import ClientsPage from './page/ClientPage/ClientPage';
import CurrencyPage from './page/CurrencyPage/CurrencyPage';
import ClaimForm from './shared/ui/ClaimForm/ClaimFrom';
import MobileMenu from './shared/ui/MobileMenu/MobileMenu';
import Header from './widget/Header/Header';
import Navigation from './widget/Navigation/Navigation';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <Navigation />
        <MobileMenu />
        <main className={styles.main}>
          <AnimatePresence mode="wait">
            <Routes>
              
              <Route path="/claim" element={
                
                  <ClaimForm />
                
              } /> 
              <Route path="/" element={
                
                  <ClientsPage />
                
              } />
              <Route path="/currency" element={
                
                  <CurrencyPage />
                
              } />
             
            </Routes>
          </AnimatePresence>
        </main> 
      </div>
    </Router>
  );
}

export default App;