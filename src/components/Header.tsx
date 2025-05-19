import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";

const COMPANIES = [
  {
    name: "삼성전자",
    code: "005930",
  },
  {
    name: "LG전자",
    code: "066570",
  },
];

function useIsMobile() {
  const [
    isMobile,
    setIsMobile,
  ] = useState(
    () =>
      window.innerWidth < 640
  );
  useEffect(() => {
    const handler = () =>
      setIsMobile(
        window.innerWidth <
          640
      );
    window.addEventListener(
      "resize",
      handler
    );
    return () =>
      window.removeEventListener(
        "resize",
        handler
      );
  }, []);
  return isMobile;
}

const Header: React.FC =
  () => {
    const isMobile =
      useIsMobile();
    const [
      isMobileSearchOpen,
      setIsMobileSearchOpen,
    ] = useState(false);
    const [
      search,
      setSearch,
    ] = useState("");
    const [
      results,
      setResults,
    ] = useState<
      typeof COMPANIES
    >([]);
    const [
      showDropdown,
      setShowDropdown,
    ] = useState(false);
    const debounceRef =
      useRef<number | null>(
        null
      );
    const inputRef =
      useRef<HTMLInputElement>(
        null
      );
    const navigate =
      useNavigate();

    // Debounce search for desktop
    useEffect(() => {
      if (isMobile) return;
      if (debounceRef.current)
        clearTimeout(
          debounceRef.current
        );
      if (!search) {
        setResults([]);
        setShowDropdown(
          false
        );
        return;
      }
      debounceRef.current =
        window.setTimeout(
          () => {
            const filtered =
              COMPANIES.filter(
                (c) =>
                  c.name.includes(
                    search
                  ) ||
                  c.code.includes(
                    search
                  )
              );
            setResults(
              filtered
            );
            setShowDropdown(
              filtered.length >
                0
            );
          },
          300
        );
      return () => {
        if (
          debounceRef.current
        )
          clearTimeout(
            debounceRef.current
          );
      };
    }, [search, isMobile]);

    // Close dropdown on outside click
    useEffect(() => {
      function handleClick(
        e: MouseEvent
      ) {
        if (
          inputRef.current &&
          !inputRef.current.contains(
            e.target as Node
          )
        ) {
          setShowDropdown(
            false
          );
        }
      }
      if (showDropdown) {
        document.addEventListener(
          "mousedown",
          handleClick
        );
        return () =>
          document.removeEventListener(
            "mousedown",
            handleClick
          );
      }
    }, [showDropdown]);

    // Mobile: filter results instantly
    const mobileResults =
      search
        ? COMPANIES.filter(
            (c) =>
              c.name.includes(
                search
              ) ||
              c.code.includes(
                search
              )
          )
        : [];

    const handleCompanyClick =
      (
        company: (typeof COMPANIES)[0]
      ) => {
        setIsMobileSearchOpen(
          false
        );
        setShowDropdown(
          false
        );
        setSearch("");
        if (
          company.name ===
          "삼성전자"
        ) {
          navigate(
            "/company/삼성전자"
          );
        } else if (
          company.name ===
          "LG전자"
        ) {
          navigate(
            "/company/엘지전자"
          );
        }
      };

    return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <h1 className="text-2xl font-['Pacifico'] text-primary">
                ZaeMuGym
              </h1>
            </Link>
          </div>
          {/* Desktop Search */}
          {!isMobile && (
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-search-line"></i>
                </div>
              </div>
              <input
                ref={inputRef}
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="기업명 또는 종목코드 검색"
                value={search}
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
                onFocus={() =>
                  setShowDropdown(
                    results.length >
                      0
                  )
                }
              />
              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {results.map(
                    (
                      company
                    ) => (
                      <button
                        type="button"
                        key={
                          company.code
                        }
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                        onClick={() => {
                          console.log(
                            "Button clicked"
                          );
                          console.log(
                            "Company:",
                            company
                          );
                          handleCompanyClick(
                            company
                          );
                        }}
                      >
                        <span>
                          {
                            company.name
                          }
                        </span>
                        <span className="text-xs text-gray-400">
                          {
                            company.code
                          }
                        </span>
                      </button>
                    )
                  )}
                  {results.length ===
                    0 && (
                    <div className="px-4 py-2 text-gray-400">
                      검색
                      결과
                      없음
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {/* Mobile Search Icon */}
          {isMobile && (
            <div className="flex items-center">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100"
                onClick={() =>
                  setIsMobileSearchOpen(
                    true
                  )
                }
                aria-label="검색"
              >
                <i className="ri-search-line text-gray-600 text-xl"></i>
              </button>
            </div>
          )}
          {/* Notification & User Icon */}
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 relative">
              <i className="ri-notification-3-line text-gray-600"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100">
              <i className="ri-user-line text-gray-600"></i>
            </button>
          </div>
        </div>
        {/* Mobile Fullscreen Search Modal */}
        {isMobile &&
          isMobileSearchOpen && (
            <div className="fixed inset-0 bg-white z-[999] flex flex-col">
              <div className="flex items-center px-4 py-3 border-b border-gray-100">
                <button
                  className="mr-2 text-2xl text-gray-400"
                  onClick={() =>
                    setIsMobileSearchOpen(
                      false
                    )
                  }
                  aria-label="닫기"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <input
                  autoFocus
                  type="text"
                  className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-full text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="기업명 또는 종목코드 검색"
                  value={
                    search
                  }
                  onChange={(
                    e
                  ) =>
                    setSearch(
                      e.target
                        .value
                    )
                  }
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {mobileResults.length >
                0 ? (
                  <ul>
                    {mobileResults.map(
                      (
                        company
                      ) => (
                        <li
                          key={
                            company.code
                          }
                        >
                          <button
                            className="w-full text-left px-6 py-4 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-center"
                            onClick={() =>
                              handleCompanyClick(
                                company
                              )
                            }
                          >
                            <span className="font-medium">
                              {
                                company.name
                              }
                            </span>
                            <span className="text-xs text-gray-400">
                              {
                                company.code
                              }
                            </span>
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <div className="px-6 py-8 text-center text-gray-400 text-lg">
                    검색 결과
                    없음
                  </div>
                )}
              </div>
            </div>
          )}
      </header>
    );
  };

export default Header;
