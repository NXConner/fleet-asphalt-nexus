import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCostData } from '../../actions/costActions';
import { useSelector } from 'react-redux';
import { CostData } from '../../types/costTypes';
import { mockVACostData } from '../../data/mockVACostData';

const CostManagementCenter: React.FC = () => {
  const dispatch = useDispatch();
  const costData = useSelector((state: any) => state.costs.costData);

  useEffect(() => {
    dispatch(getCostData());
  }, [dispatch]);

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default CostManagementCenter; 