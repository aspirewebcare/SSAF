import React, { useEffect, useState } from "react";

const Header = ({
  mainCss = "",
  titleClass = "",
  customClass = "",
  name,
  children,
  down=30
}) => {
  const [scrollCss, setScrollCss] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > down) {
        setScrollCss(true);
      } else {
        setScrollCss(false);
      }
    });
  }, []);

  return (
    <header className={`relative h-[50px] lg:h-[130px] z-[9] ${mainCss}`}>
      <div
        className={`fixed  top-20 px-6 md:px-0 ${
          scrollCss ? "bg-white shadow-lg shadow-gray-100 " : ""
        } lg:h-[95px] left-0 w-full z-[2]  px-0 lg:px-16 ${customClass}`}
      >
        <div
          className={`container mx-auto h-full flex flex-col lg:flex-row  lg:items-center justify-center lg:justify-between py-4`}
        >
          <div
            className={`whitespace-nowrap text-2xl lg:text-4xl font-bold ${titleClass}`}
          >
             
            {name}
          </div>
          <div className="flex items-center  gap-10 pr-3 w-full">
            <div className="w-full flex justify-start lg:justify-end">
              {children}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
