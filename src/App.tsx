import CardContainer from "./components/CardContainer";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { OptionsSideBar } from "./components/OptionsSideBar";

const App = () => {
  return (
    <div className="overflow-hidden w-full h-full">
      <Background />
      <Header />

      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="col-span-3 lg:col-span-1">
            <OptionsSideBar />
          </div>

          <div className="col-span-3 lg:col-span-2 bg-color-darkblue rounded-md">
            <CardContainer>Test</CardContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
