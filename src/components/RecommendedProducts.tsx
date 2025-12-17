import ProductRow from 'components/ProductRow';
import { Border, ListHeader, Spacing } from 'tosslib';
import { SavingsProduct } from 'types';

interface RecommendedProductsProps {
  filteredData: SavingsProduct[];
  checkedProductId: string;
  setCheckedProduct: (id: string) => void;
}
export default function RecommendedProducts({
  filteredData,
  setCheckedProduct,
  checkedProductId,
}: RecommendedProductsProps) {
  const recommendedProducts = [...filteredData].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);

  return (
    <>
      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProducts.map(product => (
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
}
