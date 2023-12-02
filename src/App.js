import Home from "./routes/home/home";
import Navigation from "./routes/home/navigation/navigation";
import { Routes, Route } from "react-router-dom";

const Shop = () => {
  return <p>Shop</p>
}

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>

  );
}

export default App;
