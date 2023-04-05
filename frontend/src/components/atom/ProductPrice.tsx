import { Text } from "@chakra-ui/react";

export type ProductNameProps = {
  price: number;
};

export const ProductPrice: React.FC<ProductNameProps> = (props) => {
  const {price} = props;
  return (
    <div>
      <Text fontSize='xl'>{price}</Text>
    </div>
  );
};
