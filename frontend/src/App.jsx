// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import SignUp from "./pages/SignUp";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC LANDING PAGE ================= */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* ================= AUTH ================= */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* ================= PROTECTED APP ================= */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;