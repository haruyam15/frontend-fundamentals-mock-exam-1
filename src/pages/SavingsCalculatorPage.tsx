import { TabContents } from 'components/TabContents';
import { useGetProductList } from 'hooks/useGetProductList';
import { useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { TabValue } from 'types';
import { formatCurrency } from 'utils';

export function SavingsCalculatorPage() {
  const { data, isLoading, isError, error } = useGetProductList();
  const [selectedTab, setSelectedTab] = useState<TabValue>('products');
  const [goalAmount, setGoalAmount] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const [availableTerms, setAvailableTerms] = useState(12);

  return (
    <>
      <NavigationBar title="적금 계산기" />
      <Spacing size={16} />

      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={goalAmount}
        onChange={e => setGoalAmount(formatCurrency(e.target.value))}
      />
      <Spacing size={16} />

      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={monthlyAmount}
        onChange={e => setMonthlyAmount(formatCurrency(e.target.value))}
      />
      <Spacing size={16} />

      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={availableTerms}
        onChange={term => setAvailableTerms(term)}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={val => setSelectedTab(val as TabValue)}>
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {isError ? (
        <>{error}</>
      ) : isLoading ? (
        <>로딩중</>
      ) : (
        <TabContents
          data={data}
          goalAmount={goalAmount}
          monthlyAmount={monthlyAmount}
          availableTerms={availableTerms}
          selectedTab={selectedTab}
        ></TabContents>
      )}
    </>
  );
}
