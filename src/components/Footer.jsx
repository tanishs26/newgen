import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-black py-20 pb-5 border-t border-black rounded-4xl m-2">
      <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col gap-10">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="10px" className="text-6xl" />
              </div>
              <p className="text-wrap flex  justify-center  items-center flex-wrap max-w-[300px]">
                Hey it's a new technology which we area laterating to the source
                of new bay inline of the bototom fo the heart{" "}
              </p>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-px mb-9 text-s font-semibold uppercase text-cyan-500">
              Company
            </h3>
            <ul>
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item, index) => (
                  <li className="mb-4" key={index}>
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-gray-700"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="tracking-px mb-9 text-s font-semibold uppercase text-cyan-500">
              Support
            </h3>
            <ul>
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item, index) => (
                  <li className="mb-4" key={index}>
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-gray-700"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="tracking-px mb-9 text-s font-semibold uppercase text-cyan-500">
              Legals
            </h3>
            <ul>
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item, index) => (
                  <li className="mb-4" key={index}>
                    <Link
                      to="/"
                      className="text-base font-medium text-white hover:text-gray-700"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="text-center w-full pt-5 pb-0 border-t border-white/10">
          <p className="text-xs text-white/70">
            &copy; Copyright 2025. All Rights Reserved by NewGen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
