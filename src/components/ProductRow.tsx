import { memo } from 'react';
import { Assets, colors, ListRow } from 'tosslib';
import { SavingsProduct } from 'types';
import { formatCurrency } from 'utils';

type ProductRowProps = {
  product: SavingsProduct;
  isChecked: boolean;
  setCheckedProduct: (id: string, toggle: boolean) => void;
  toggle?: boolean;
};

const ProductRow = memo(function ProductRow({ product, isChecked, setCheckedProduct, toggle = true }: ProductRowProps) {
  const { id, name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms } = product;

  return (
    <ListRow
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
      right={isChecked && <Assets.Icon name="icon-check-circle-green" />}
      onClick={() => setCheckedProduct(id, toggle)}
    />
  );
});

export default ProductRow;
