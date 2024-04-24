//import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Layout from "./pages/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_CLIENT_ID;

import AuthWrapper from "./components/AuthWrapper";
function App() {
  return (
    // <div className="bg-slate-400 min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    // <div className="max-w-md w-full space-y-8">
    <div>
      <div>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthWrapper>
                    <LoginPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/signup"
                element={
                  <AuthWrapper>
                    <SignupPage />
                  </AuthWrapper>
                }
              />
              <Route path="/layout" element={<Layout />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default App;
