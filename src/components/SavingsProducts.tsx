import ProductRow from 'components/ProductRow';
import { ListRow } from 'tosslib';
import { SavingsProduct } from 'types';

interface SavingsProductsProps {
  checkedProductId: string;
  setCheckedProduct: (id: string) => void;
  filteredData: SavingsProduct[];
}

export default function SavingsProducts({ checkedProductId, setCheckedProduct, filteredData }: SavingsProductsProps) {
  if (filteredData.length === 0) {
    return (
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="선택하신 조건에 맞는 적금 상품이 없어요."
            bottom="월 납입액이나 저축 기간을 조금 조정해보세요."
          />
        }
      />
    );
  }

  return (
    <>
      {filteredData.map(product => (
        <ProductRow
          key={product.id}
          product={product}
          isChecked={product.id === checkedProductId}
          setCheckedProduct={setCheckedProduct}
        />
      ))}
    </>
  );
}
