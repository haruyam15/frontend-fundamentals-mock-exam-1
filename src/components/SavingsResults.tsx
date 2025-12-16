import ProductRow from 'components/ProductRow';
import { memo } from 'react';
import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProduct } from 'types';
import { formatCurrency, removeComma } from 'utils';

interface SavingsResultsProps {
  data: SavingsProduct[];
  goalAmount: string;
  monthlyAmount: string;
  availableTerms: number;
  checkedProductId: string;
  filteredData: SavingsProduct[];
  setCheckedProduct: (id: string) => void;
}

const SavingsResults = memo(function SavingsResults({
  goalAmount,
  monthlyAmount,
  availableTerms,
  checkedProductId,
  filteredData,
  setCheckedProduct,
}: SavingsResultsProps) {
  const checkedProduct = filteredData.find(item => item.id === checkedProductId);

  if (!checkedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const annualRate = checkedProduct.annualRate / 100;
  const maxMonthlyAmount = checkedProduct.maxMonthlyAmount;
  const minMonthlyAmount = checkedProduct.minMonthlyAmount;
  const expectedAmount = Number(removeComma(monthlyAmount)) * availableTerms * (1 + annualRate * 0.5);
  const goalDifference = Number(removeComma(goalAmount)) - expectedAmount;
  const rawMonthlyAmount = Number(removeComma(goalAmount)) / (availableTerms * (1 + annualRate * 0.5));
  const roundedMonthlyAmount = Math.round(rawMonthlyAmount / 1000) * 1000;
  const recommendedProduct = [...filteredData].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  const recommendedMonthlyAmount = Math.min(maxMonthlyAmount, Math.max(minMonthlyAmount, roundedMonthlyAmount));
  // 의문점1 : 추천 월 납입 금액이 상품의 최대 월 납입금액보다 크게 나오면 안될 것 같음
  // 의문점2 : 추천 월 납입 금액이 상품의 최소 월 납입금액보다 작게 나오면 안될 것 같음

  return (
    <>
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(expectedAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      {/* UX 개선 예정 : 더 명확하고 이해하기 쉽게 자세히 설명 */}
      {/* 목표 금액까지 남은 금액
          8,000원
      */}
      {/* 목표 금액 초과 달성 🎉
          120,000원 더 모일 것으로 예상돼요
      */}
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(goalDifference)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatCurrency(recommendedMonthlyAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProduct.map(product => (
        <ProductRow
          key={product.id}
          product={product}
          isChecked={product.id === checkedProductId}
          setCheckedProduct={setCheckedProduct}
          toggle={false}
        />
      ))}

      <Spacing size={40} />
    </>
  );
});

export default SavingsResults;
