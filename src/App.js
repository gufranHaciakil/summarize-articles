import Hero from "./components/Hero/Hero";
import Demo from "./components/Demo/Demo";
import "./index.css";

const App = () => {
  return (
    <main className="text-center">
      <div className="">
        <div className="gradient"></div>
      </div>
      <div className="app">
        <Hero />
        <Demo />
      </div>
    </main>
  );
};

export default App;
