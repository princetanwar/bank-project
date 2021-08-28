import "./App.css";
import Accounts from "./components/Accounts";
import RepaymentGraph from "./components/RepaymentGraph";

function App() {
  return (
    <div className="flex">
      <Accounts />
      <RepaymentGraph />
    </div>
  );
}

export default App;
