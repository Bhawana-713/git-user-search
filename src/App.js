import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/pages/User/User";
import Home from "./components/pages/Home/Home";
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:login" element={<User />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
