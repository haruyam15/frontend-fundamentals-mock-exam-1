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

  // UX 개선완료 : 계산 결과 화면에서 토글이 된다면 계산값 잃어버림 -> 계산 결과 탭에선 토글방지
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
      setCheckedProduct={setCheckedProduct}
    />
  );
}
