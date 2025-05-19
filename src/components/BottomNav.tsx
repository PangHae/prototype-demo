import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

interface NavItem {
  icon: string;
  label: string;
  isActive: boolean;
  href: string;
}

interface BottomNavProps {
  items: NavItem[];
}

const BottomNav: React.FC<
  BottomNavProps
> = ({ items }) => {
  const location =
    useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="container mx-auto flex justify-around items-center">
        {items.map(
          (item, index) => {
            const active =
              location.pathname ===
              item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={`flex flex-col items-center ${
                  active
                    ? "text-primary"
                    : "text-gray-500"
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i
                    className={
                      item.icon
                    }
                  ></i>
                </div>
                <span className="text-xs mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
};

export default BottomNav;
