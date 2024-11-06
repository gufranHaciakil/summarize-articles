import React from "react";
import logo from "../../actess/logo.png";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col mt-4 px-6">
      <nav className="flex justify-between items-center w-[90%]">
        <div className="flex gap-1 items-center">
          <img src={logo} alt="" className="w-14 object-contain" />
          <span className="text-[26px] font-bold">Sumz</span>
        </div>
        <button
          type="button"
          onClick={() => window.open("https://github.com/GufranHaciakil")}
          className="bg-[#333] border-[2px] border-[#333] text-white px-4 rounded-2xl hover:bg-[#f8f8f8] hover:text-[#333]"
        >
          GitHub
        </button>
      </nav>
      <h1 className="mt-8 font-black text-[40px] max-w-[30rem] leading-[46px] verti">
        Summarize Articles with <br />{" "}
        <span className="gradient">OpenAl GPT-4</span>
      </h1>
      <h2 className="text-[14px] text-center max-w-[30rem] mt-3 text-gray-500 font-">
        simplyfy your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries.
      </h2>
    </header>
  );
};

export default Hero;
