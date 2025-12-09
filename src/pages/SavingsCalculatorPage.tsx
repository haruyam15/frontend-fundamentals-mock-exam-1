import { SavingsProducts } from 'components/SavingsProducts';
import { SavingsResults } from 'components/SavingsResults';
import { useState } from 'react';
import { Border, NavigationBar, SelectBottomSheet, Spacing, Tab, TextField } from 'tosslib';
import { TabValue } from 'types';

export function SavingsCalculatorPage() {
  const [selectedTab, setSelectedTab] = useState<TabValue>('products');
  //상태 isProductsSelected, isResultsSelected를 만들어서
  //selectedTab === 'products' 이 코드를 간단하게 줄이는게 좋을까요? 그대로 두는게 좋을까요?
  //만약 상태를 추가하면 반복되는 selectedTab === 'products' 코드도 줄이고 좀더 간결하게 isProductsSelected 이렇게 사용가능함
  //대신 상태가 늘어나고 탭이 추가될때마다 상태도 늘어나게됨 (상태가 늘어나는건 메모리를 사용하는건가? 개수 늘어나는거 말고 단점이 뭘까요?)

  //상태 추가안하면 지금은 두번 밖에 안쓰이는 selectedTab === 'products' 요 코드를 그대로 두는거고
  //음 .. 장점은 탭이 늘어나며 상태는 추가 안해도 됨

  //근데 어쨋든 두 경우 모두 탭이 수정될때마다 코드를 수정해야함. TabValue타입도 추가해줘야하고 Tab.Item, 탭 내용 컴포넌트도 추가 해줘야함

  return (
    <>
      <NavigationBar title="적금 계산기" />

      <Spacing size={16} />

      <TextField label="목표 금액" placeholder="목표 금액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <TextField label="월 납입액" placeholder="희망 월 납입액을 입력하세요" suffix="원" />
      <Spacing size={16} />
      <SelectBottomSheet label="저축 기간" title="저축 기간을 선택해주세요" value={12} onChange={() => {}}>
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={val => setSelectedTab(val as TabValue)}>
        {/* 여기서 as 대신 다른방법 뭐 있죠 ㅠ 널리 쓰이는 정석적인 방법이 있나요? */}
        <Tab.Item value="products" selected={selectedTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={selectedTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {selectedTab === 'products' && <SavingsProducts />}
      {selectedTab === 'results' && <SavingsResults />}
    </>
  );
}
