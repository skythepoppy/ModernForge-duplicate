import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './customer/components/Layout/Layout';
import HomePage from './customer/components/Navigation/Pages/HomePage/HomePage';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
