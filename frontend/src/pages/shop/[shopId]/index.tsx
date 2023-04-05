import { ProductList } from "@/components/organisms/ProductList";
import { ProductCardProps } from "@/components/molecules/ProductCard"
import gql from "graphql-tag";
import type { GetServerSideProps, NextPage } from "next";
import { urqlClient } from "../../../libs/gql-requests";

type ShopProps = {
  name: string;
  products: ProductCardProps[], 
};

const ShopDetail: NextPage<ShopProps> = (props) => {
  const {name, products} = props;
  return (
    <>
      <div>
        {name}
        <ProductList products={products}/>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ShopProps> = async (ctx) => {
  const shopId: string = ctx.query['shopId'] as string;
  try {
    const client = await urqlClient();

    const postsQuery = gql`
      query {
        shop( id: ${shopId}) {
          id,
          name,
        }
      }
    `;
    const result = await client.query(postsQuery, { id: shopId }).toPromise();

    return {
      props: {
        name: result.data.Shop.name,
        products: [], // クエリー結果を入れる
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