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

  //UX 개선 예정: 사용자 필수 입력값이 없다면 목표금액,월 납입액을 입력해주세요 문구 노출.
  //UX 개선 예정: 계산결과 화면에서 월 납입액이나 납입기간 변경 후 체크된 상품이 없어지면 '상품 선택해주세요'가 나오는데 이 경우 적금 상품 탭으로 이동시켜주면 좋을 것 같음
  //UX 개선 예정: 목표금액, 월 납입액 50,000 -> 30,000 변경시 10,000의 자리를 지워도 유지 되게 수정 (현재 그냥 0으로 됨)
  //UX 개선 예정 : 목표금액, 월 납입액 변경시 이전 화면유지(타이핑중 결과유실 방지)

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
