import { ProductList } from "@/components/organisms/ProductList";
import { ProductCardProps } from "@/components/molecules/ProductCard"
import gql from "graphql-tag";
import type { GetServerSideProps, NextPage } from "next";
import { urqlClient } from "../../../libs/gql-requests";

type ShopProps = {
  name: string;
  id: number;
  products: ProductCardProps[], 
};

const ShopDetail: NextPage<ShopProps> = (props) => {
  const {name,id,products} = props;
  return (
    <>
      <div>
        {id}
        {name}
        <ProductList products={products}/>
      </div>
    </>
  );
};

console.warn("---------------")

export const getServerSideProps: GetServerSideProps<ShopProps> = async (ctx) => {
  const shopId: string = ctx.query['shopId'] as string;
  try {
    const client = await urqlClient();

    const postsQuery = gql`
      query {
        uniqueShop( id: ${shopId}) {
          shopId,
          shopName,
          shopItems {
            itemName
            price
          }
        }
      }`;
    const result = await client.query(postsQuery, { id: shopId }).toPromise();

    return {
      props: {
        name: result.data.uniqueShop.shopName,
        id: result.data.uniqueShop.shopId,
        products: result.data.uniqueShop.shopItems?.map((each: { itemName: any; price: any; }): ProductCardProps => { return { name: each.itemName, price: each.price } }) ??  [],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default ShopDetail;