import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { PrismaService } from './prisma.service'
import { UserResolver } from './resolvers/resolvers.user'
import { ItemResolver } from './resolvers/resolvers.item'
import { ShopResolver } from './resolvers/resolvers.shop'
import { OrderResolver } from './resolvers/resolvers.order'
import { LoginResolver } from './resolvers/resolvers.login'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Item } from './models/item';
import { User } from './models/user';
import { Order } from './models/order';
import { Shop } from './models/shop';
import { Token } from './models/login';
import { RolesGuard } from './decorators/rolesguard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ req }),
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    Item,
    User,
    Order,
    Shop,
    Token
  ],
  controllers: [],
  providers: [PrismaService, UserResolver, ItemResolver, ShopResolver, OrderResolver, LoginResolver, { provide: APP_GUARD, useClass: RolesGuard }]
})
export class AppModule {}
