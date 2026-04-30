const StatsCards = ({ data }) => {
  const total = data.length;

  const avgSalary =
    data.reduce((acc, emp) => acc + emp.salary, 0) / total;

  const active = data.filter((emp) => emp.isActive).length;
  const inactive = data.filter((emp) => !emp.isActive).length;

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-blue-100 rounded-lg shadow">
        <p className="text-gray-700 text-center">Total Employees</p>
        <h2 className="md:text-xl text-md font-bold text-center">{total}</h2>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <p className="text-gray-700 text-center">Avg Salary</p>
        <h2 className="md:text-xl text-md font-bold text-center">₹{Math.round(avgSalary)}</h2>
      </div>

      <div className="p-4 bg-green-100 rounded-lg shadow">
        <p className="text-gray-700 text-center">Active Employees</p>
        <h2 className="md:text-xl text-md font-bold text-center">{active}</h2>
      </div>
      <div className="p-4 bg-red-100 rounded-lg shadow">
        <p className="text-gray-700 text-center">Inactive Employees</p>
        <h2 className="md:text-xl text-md font-bold text-center">{inactive}</h2>
      </div>
    </div>
  );
};

export default StatsCards;