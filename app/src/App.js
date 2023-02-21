import React, { useState, useEffect } from "react";
import Loader from "./components/loader";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routes";

function App() {
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 1000); // set the preloader to false after 3 seconds
  }, []);

  return (
    <div className="App">
      {preloader ? (
        <Loader />
      ) : (
        <div className="App">
          <RouterProvider router={router} />
          <Toaster />
        </div>
      )}
    </div>
  );
}

export default App;
