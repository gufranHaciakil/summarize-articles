import React, { useEffect, useState } from "react";

import { useLazyGetSummaryQuery } from "../../services/article";
import Lottie from "lottie-react";
import loadinganimation from "../../actess/loading.json";

const Demo = () => {
  const [articals, setArticals] = useState({
    url: "",
    summary: "",
  });

  const [allArticals, setAllArticals] = useState([]);

  const [copied, setCopied] = useState("");

  const [
    getSummary,
    { error, isLoading, isFetching },
  ] = useLazyGetSummaryQuery();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await getSummary({ articleUrl: articals.url });
    console.log(data);
    console.log(isLoading);
    if (data?.summary) {
      const newArtical = { ...articals, summary: data.summary };
      const updatedAllArticals = [newArtical, ...allArticals];
      setArticals(newArtical);
      setAllArticals(updatedAllArticals);

      localStorage.setItem("articals", JSON.stringify(updatedAllArticals));
    } else {
      console.log(error);
    }
  };

  const handleCopied = (text) => {
    setCopied(text);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const articalsFromLocalStorage = JSON.parse(
      localStorage.getItem("articals")
    );

    if (articalsFromLocalStorage) {
      setAllArticals(articalsFromLocalStorage);
    }
  }, []);

  return (
    <section className="mt-16 w-full">
      {/*Searsh */}
      <div className="flex flex-col w-full gap-2 max-w-xl justify-self-center">
        <form
          className="relative flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <svg
            className="h-4 w-4 text-gray-400 absolute left-6 my-2 ml-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <input
            type="url"
            className="bg-gray-100 w-[90%] peer py-1 px-9 rounded-md shadow-xl focus:outline-none focus:ring-1 focus:ring-[#333333a3] focus:ring-opacity-50"
            placeholder="Enter a URL"
            required
            value={articals.url}
            onChange={(event) => {
              setArticals({ ...articals, url: event.target.value });
            }}
          />
          <button
            type="submit"
            className="bg-[#c2c2c2a8] p-1 rounded-md absolute right-6 border-[2px] peer-focus:border-[#7a7a7a15] active:scale-90"
          >
            <svg
              className="h-4 w-4 text-white "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 10 4 15 9 20" />
              <path d="M20 4v7a4 4 0 0 1-4 4H4" />
            </svg>
          </button>
        </form>

        {/*History */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto px-6 py-4">
          {allArticals.map((artical, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-2 cursor-pointer bg-gray-00 rounded-sm shadow-md"
            >
              <div className="flex items-center gap-2 ">
                <div
                  onClick={() => {
                    handleCopied(artical.url);
                  }}
                >
                  {copied === artical.url ? (
                    <svg
                      className="h-4 w-4 text-green-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {"{"}" "{"}"}
                      <polyline points="9 11 12 14 22 4" />
                      {"{"}" "{"}"}
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 text-gray-400"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />

                      <rect x={8} y={8} width={12} height={12} rx={2} />

                      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                    </svg>
                  )}
                </div>
                <div
                  onClick={() => setArticals(artical)}
                  className="text-xs font-semibold text-start text-blue-500 hover:text-blue-400"
                >
                  {artical.url}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-4 flex-col w-full mt-6 mb-28 gap-2 max-w-xl justify-self-center">
        {isFetching ? (
          <div className="lottie-file self-center ">
            <Lottie
              style={{ width: "60px" }}
              animationData={loadinganimation}
              loop={true}
            />
          </div>
        ) : error ? (
          <div className="bg-red-500 text-start rounded-md py-2 px-4 flex flex-col gap-2">
            <div className="text-rose-100 font-semibold text-sm flex items-center gap-2 justify-between">
              Well, that wasn't supposed to happen
              <div>
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                  <line x1={9} y1={9} x2={15} y2={15} />
                  <line x1={15} y1={9} x2={9} y2={15} />
                </svg>
              </div>
            </div>
            <div className="text-xs font-semibold max-w-lg text-white">
              {error.data.error}
            </div>
            <span className="text-white text-xs font-semibold underline">
              Please try again
            </span>
          </div>
        ) : (
          articals.summary && (
            <div className="text-start border-r border-l px-4">
              <h1 className="text- text-xl underline mb-2 justify-self-start">
                Article{" "}
                <span className="text-orange-600 font-bold">Summary</span> :
              </h1>
              <div className="text-gray-600"> {articals.summary} </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
