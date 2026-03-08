import * as React from "react";

interface IAppProps {}

const Header: React.FunctionComponent<IAppProps> = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Briefly.
        </div>
      </div>
    </header>
  );
};

export default Header;
