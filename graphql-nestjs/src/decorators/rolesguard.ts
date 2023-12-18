import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // SetMetadataのrolesに定義されたロール値を取得する
            const roles = this.reflector.get<String[]>('roles', context.getHandler());
            // ロール値が取得できなければtrue（つまり、ガードされていない)
            if (!roles) {
                resolve(true);
            }
            else {
                // contextからGraphQLのctxを取得する
                // GraphQLのforRootで「context: ({ req }) => ({ req }),」の定義が必要
                const ctx = GqlExecutionContext.create(context);
                const req = ctx.getContext().req;
                console.warn(req)
                // authorizationヘッダーからJWTトークンを取得する
                const authToken = req.headers.authorization;
                console.warn(authToken)
                const jwtToken = authToken.substring(authToken.indexOf(' ') + 1);
                // JWTトークンを公開鍵で検証する
                jwt.verify(jwtToken, Buffer.from("secretKey", 'base64'), (err, payload: any) => {
                    // JWTトークンの検証ができなかったらエラー
                    if (err) {
                        reject(err);
                    }
                    else {
                        // ユーザのロールがGuardで設定されているロールに合致するかを検証する
                        resolve(roles.includes(payload.role));
                    }
                });
            }
        });
    }
}