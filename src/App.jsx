import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  MyNavbar,
  Contact,
  Shop,
  Footer,
  Cart,
  ProductDetails,
} from "./components";
import "./App.css";
import { useGetProductsQuery } from "./reduxServices/ProductsApi";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [homeCategory, setHomeCategory] = useState("all");
  const products = useGetProductsQuery("products").data;
  const [LogedIn, setLogedIn] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setLogedIn(true);
    }
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App ">
      {LogedIn ? (
        <div>
          <Router>
            <MyNavbar setOpenCart={setOpenCart} openCart={openCart} />
            {openCart && <Cart />}

            <Routes>
              <Route
                path="/"
                element={
                  <Shop
                    homeCategory={homeCategory}
                    setHomeCategory={setHomeCategory}
                  />
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      ) : (
        <div className="auth h-100 w-screen d-flex  align-  items-center  ">
          {haveAccount ? (
            <Login
              haveAccount={haveAccount}
              setHaveAccount={setHaveAccount}
              setLogedIn={setLogedIn}
            />
          ) : (
            <Register
              setLogedIn={setLogedIn}
              haveAccount={haveAccount}
              setHaveAccount={setHaveAccount}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
