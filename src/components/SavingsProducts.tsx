import { useGetProductList } from 'hooks/useGetProductList';
import { useState } from 'react';
import { Assets, colors, ListHeader, ListRow } from 'tosslib';
import { formatCurrency } from 'utils';

export function SavingsProducts() {
  const [checkedProduct, setCheckedProduct] = useState('');
  const { data, isLoading, isError, error } = useGetProductList();

  if (isLoading) {
    return <>로딩중</>;
  }
  if (isError) {
    return <>{error}</>;
  }
  if (data.length === 0) {
    return (
      //필터링에 일치하지 않는 입력값을 받으면 아래 문구 보여주기 + 전체 상품 리스트도 보여주고싶음
      <>
        <ListRow
          contents={
            <ListRow.Texts
              type="2RowTypeA"
              top="선택하신 조건에 맞는 적금 상품이 없어요."
              bottom="월 납입액이나 저축 기간을 조금 조정해보세요."
            />
          }
        />
        <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">전체 상품 목록</ListHeader.TitleParagraph>} />
      </>
    );
  }

  return (
    <>
      {data.map(product => {
        const { id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms } = product;

        return (
          <ListRow
            key={id}
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${formatCurrency(minMonthlyAmount)}원 ~ ${formatCurrency(maxMonthlyAmount)}원 | ${availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={id === checkedProduct && <Assets.Icon name="icon-check-circle-green" />}
            onClick={() => setCheckedProduct(id)}
          />
        );
      })}
    </>
  );
}
