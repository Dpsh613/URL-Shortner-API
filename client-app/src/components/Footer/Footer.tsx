import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <footer className="border-t border-gray-200 bg-slate-50 py-8 text-center text-sm text-gray-500 font-light">
      Copyright &#169; {new Date().getFullYear()} URL Shortener | Deepika Sharma
    </footer>
  );
};

export default Footer;
