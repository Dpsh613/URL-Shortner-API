import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return (
    <div className="bg-slate-900 text-base text-white py-5">
      Copyright &#169; URL Shortner | Deepika Sharma
    </div>
  );
};

export default Footer;
