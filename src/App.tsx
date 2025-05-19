"use client";

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import SamsungPage from "./pages/SamsungPage";
import LGPage from "./pages/LGPage";
import Home from "./Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/company/삼성전자"
            element={
              <SamsungPage />
            }
          />
          <Route
            path="/company/엘지전자"
            element={
              <LGPage />
            }
          />
        </Routes>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <BottomNav
            items={[
              {
                icon: "ri-home-5-fill",
                label: "홈",
                isActive:
                  true,
                href: "/",
              },
              {
                icon: "ri-star-line",
                label:
                  "관심기업",
                isActive:
                  false,
                href: "#",
              },
              {
                icon: "ri-notification-3-line",
                label:
                  "알림센터",
                isActive:
                  false,
                href: "#",
              },
              {
                icon: "ri-user-line",
                label:
                  "내정보",
                isActive:
                  false,
                href: "#",
              },
            ]}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
