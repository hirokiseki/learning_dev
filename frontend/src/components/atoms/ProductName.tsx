import { Text } from "@chakra-ui/react";


export type ProductNameProps = {
  name: string;
};

export const ProductName: React.FC<ProductNameProps> = (props) => {
  const {name} = props;
  return (
    <div>
      <Text fontSize='xl'>{name}</Text>
    </div>
  );
};