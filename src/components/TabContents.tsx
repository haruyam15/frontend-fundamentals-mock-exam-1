import RecommendedProducts from 'components/RecommendedProducts';
import SavingsProducts from 'components/SavingsProducts';
import SavingsResults from 'components/SavingsResults';
import { useCallback, useMemo, useState } from 'react';
import { SavingsProduct, TabValue } from 'types';
import { removeComma } from 'utils';

interface TabContentsProps {
  data: SavingsProduct[];
  goalAmount: string;
  monthlyAmount: string;
  availableTerms: number;
  selectedTab: TabValue;
}

export function TabContents({ data, goalAmount, monthlyAmount, availableTerms, selectedTab }: TabContentsProps) {
  const [checkedProductId, setCheckedProductId] = useState('');

  const setCheckedProduct = useCallback((id: string, toggle = true) => {
    if (toggle) {
      setCheckedProductId(prev => (prev === id ? '' : id));
    } else {
      setCheckedProductId(id);
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return (
        item.minMonthlyAmount <= Number(removeComma(monthlyAmount)) &&
        item.maxMonthlyAmount >= Number(removeComma(monthlyAmount)) &&
        item.availableTerms === availableTerms
      );
    });
  }, [data, monthlyAmount, availableTerms]);

  return selectedTab === 'products' ? (
    <SavingsProducts
      filteredData={filteredData}
      checkedProductId={checkedProductId}
      setCheckedProduct={setCheckedProduct}
    />
  ) : (
    <SavingsResults
      data={data}
      goalAmount={goalAmount}
      monthlyAmount={monthlyAmount}
      availableTerms={availableTerms}
      filteredData={filteredData}
      checkedProductId={checkedProductId}
    >
      <RecommendedProducts
        filteredData={filteredData}
        checkedProductId={checkedProductId}
        setCheckedProduct={setCheckedProduct}
      />
    </SavingsResults>
  );
}
