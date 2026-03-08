import * as React from "react";
import axios from "axios";
import { serverUrl } from "../../helpers/Constants";

interface IFormContainerProps {
  updateData: () => void;
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const { updateData } = props;
  const [fullUrl, setFullUrl] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${serverUrl}/shortUrl`, {
        fullUrl: fullUrl,
      });
      setFullUrl("");
      updateData(); // Instantly updates the list below!
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Shorten Your Links <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            In Seconds
          </span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 font-light max-w-xl mx-auto">
          A clean, sophisticated, and free tool to reduce your messy links. Make
          them neat and easy to share.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto shadow-xl rounded-full bg-white border border-gray-100 p-2 flex items-center transition-shadow hover:shadow-2xl"
        >
          <div className="flex-grow flex items-center pl-6 pr-2">
            <span className="text-slate-400 font-medium mr-2 hidden sm:block">
              urlshortener.link/
            </span>
            <input
              type="url"
              placeholder="Paste your long link here..."
              required
              className="w-full py-3 text-slate-800 bg-transparent focus:outline-none placeholder-slate-400"
              value={fullUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullUrl(e.target.value)
              }
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md flex-shrink-0"
          >
            Shorten
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
