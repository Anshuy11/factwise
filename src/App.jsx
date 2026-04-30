import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import EmployeeGrid from "./components/EmployeeGrid";
import { employees } from "./data/employees";

function App() {
  return (

    <div className="p-6 w-full min-h-screen bg-white">
      
      <Header />
      <StatsCards data={employees} />
      <EmployeeGrid data={employees} />
    </div>
  );
}

export default App;