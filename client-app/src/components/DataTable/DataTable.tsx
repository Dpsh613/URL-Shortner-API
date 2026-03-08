import * as React from "react";
import type { UrlData } from "../../interface/UrlData";
import { serverUrl } from "../../helpers/Constants";
import axios from "axios";

interface IDataTableProps {
  data: UrlData[];
  updateData: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
  const { data, updateData } = props;

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`);
      alert("URL Copied!");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUrl = async (id: string) => {
    try {
      await axios.delete(`${serverUrl}/shortUrl/${id}`);
      updateData(); // Fixed: Replaced window.location.reload() for a seamless SPA experience
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableData = () => {
    return data.map((item) => {
      return (
        <tr
          key={item._id}
          className="border-b border-gray-50 hover:bg-slate-50 transition-colors duration-200 text-slate-700"
        >
          <td className="px-6 py-4 truncate max-w-xs sm:max-w-sm">
            <a
              href={item.fullUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-blue-600 transition-colors"
            >
              {item.fullUrl}
            </a>
          </td>
          <td className="px-6 py-4 font-medium">
            <a
              href={`${serverUrl}/shortUrl/${item.shortUrl}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {item.shortUrl}
            </a>
          </td>
          <td className="px-6 py-4 text-slate-500 font-semibold">
            {item.clicks}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                onClick={() => copyToClipboard(item.shortUrl)}
                title="Copy URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
              <button
                className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                onClick={() => deleteUrl(item._id)}
                title="Delete URL"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 pb-20">
      {data.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-5/12">
                    Original URL
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold w-4/12">
                    Short URL
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold w-2/12">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/12">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 text-slate-500 font-light">
          No URLs shortened yet.
        </div>
      )}
    </div>
  );
};

export default DataTable;
