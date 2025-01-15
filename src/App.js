import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componentes/pages/Home';
import CustomerRegistration from './componentes/pages/CustomerRegistration';
import MyCustomers from './componentes/pages/MyCustomers';
import BestSellingProducts from './componentes/pages/BestSellingProducts';
import Billing from './componentes/pages/Billing';
import Trash from './componentes/pages/Trash';
import Account from './componentes/pages/Account';
import CustomerHistory from './componentes/pages/CustomerHistory';

import Container from "./componentes/layout/Container";
import Sidebar from './componentes/layout/Sidebar';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <Container customClass="min-height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/CustomerRegistration" element={<CustomerRegistration />} />
            <Route exact path="/MyCustomers" element={<MyCustomers />} />
            <Route exact path="/BestSellingProducts" element={<BestSellingProducts />} />
            <Route exact path="/Billing" element={<Billing />} />
            <Route exact path="/Trash" element={<Trash />} />
            <Route exact path="/Account" element={<Account />} />
            <Route exact path="/CustomerHistory" element={<CustomerHistory />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;