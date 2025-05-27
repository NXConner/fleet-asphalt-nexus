
import AddEstimateForm from "@/components/AddEstimateForm";

const EstimatesHeader = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Estimates</h1>
        <p className="text-gray-600 mt-2">Manage project quotes and proposals</p>
      </div>
      <AddEstimateForm />
    </div>
  );
};

export default EstimatesHeader;
