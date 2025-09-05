import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './customer/components/Layout/Layout';
import HomePage from './customer/components/Navigation/Pages/HomePage/HomePage';
import FAQPage from './customer/components/Navigation/Pages/FAQPage/FAQPage';
import SupportPage from "./customer/components/Navigation/Pages/SupportPage/SupportPage";
import ShippingReturnsPage from './customer/components/Navigation/Pages/ShippingReturns/ShippingReturnsPage';
import WholesalePage from './customer/components/Navigation/Pages/WholesalePage/WholesalePage'



function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/shippingreturns" element ={<ShippingReturnsPage />} />
          <Route path="/wholesale" element ={<WholesalePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
