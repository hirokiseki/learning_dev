import { ProductName } from '../atom/ProductName';
import { ProductPrice } from '../atom/ProductPrice';

export type ProductCardProps = {
  name: string;
  price: number;
};

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  return (
    <div>
      <ProductName name={props.name}/>
      <ProductPrice {...props}/>
    </div>
  );
};
