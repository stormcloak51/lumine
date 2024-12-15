
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PostModel
 * 
 */
export type PostModel = $Result.DefaultSelection<Prisma.$PostModelPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model PostLike
 * 
 */
export type PostLike = $Result.DefaultSelection<Prisma.$PostLikePayload>
/**
 * Model CommentLike
 * 
 */
export type CommentLike = $Result.DefaultSelection<Prisma.$CommentLikePayload>
/**
 * Model Asset
 * 
 */
export type Asset = $Result.DefaultSelection<Prisma.$AssetPayload>
/**
 * Model PostDraft
 * 
 */
export type PostDraft = $Result.DefaultSelection<Prisma.$PostDraftPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TokenType: {
  VERIFICATION: 'VERIFICATION',
  PASSWORD_RESET: 'PASSWORD_RESET',
  TWO_FACTOR: 'TWO_FACTOR'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]

}

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PostModels
 * const postModels = await prisma.postModel.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PostModels
   * const postModels = await prisma.postModel.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.postModel`: Exposes CRUD operations for the **PostModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostModels
    * const postModels = await prisma.postModel.findMany()
    * ```
    */
  get postModel(): Prisma.PostModelDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs>;

  /**
   * `prisma.postLike`: Exposes CRUD operations for the **PostLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostLikes
    * const postLikes = await prisma.postLike.findMany()
    * ```
    */
  get postLike(): Prisma.PostLikeDelegate<ExtArgs>;

  /**
   * `prisma.commentLike`: Exposes CRUD operations for the **CommentLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommentLikes
    * const commentLikes = await prisma.commentLike.findMany()
    * ```
    */
  get commentLike(): Prisma.CommentLikeDelegate<ExtArgs>;

  /**
   * `prisma.asset`: Exposes CRUD operations for the **Asset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assets
    * const assets = await prisma.asset.findMany()
    * ```
    */
  get asset(): Prisma.AssetDelegate<ExtArgs>;

  /**
   * `prisma.postDraft`: Exposes CRUD operations for the **PostDraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostDrafts
    * const postDrafts = await prisma.postDraft.findMany()
    * ```
    */
  get postDraft(): Prisma.PostDraftDelegate<ExtArgs>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.20.0
   * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PostModel: 'PostModel',
    User: 'User',
    Comment: 'Comment',
    PostLike: 'PostLike',
    CommentLike: 'CommentLike',
    Asset: 'Asset',
    PostDraft: 'PostDraft',
    Token: 'Token'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "postModel" | "user" | "comment" | "postLike" | "commentLike" | "asset" | "postDraft" | "token"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PostModel: {
        payload: Prisma.$PostModelPayload<ExtArgs>
        fields: Prisma.PostModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          findFirst: {
            args: Prisma.PostModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          findMany: {
            args: Prisma.PostModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>[]
          }
          create: {
            args: Prisma.PostModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          createMany: {
            args: Prisma.PostModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>[]
          }
          delete: {
            args: Prisma.PostModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          update: {
            args: Prisma.PostModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          deleteMany: {
            args: Prisma.PostModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostModelPayload>
          }
          aggregate: {
            args: Prisma.PostModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostModel>
          }
          groupBy: {
            args: Prisma.PostModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostModelCountArgs<ExtArgs>
            result: $Utils.Optional<PostModelCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      PostLike: {
        payload: Prisma.$PostLikePayload<ExtArgs>
        fields: Prisma.PostLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          findFirst: {
            args: Prisma.PostLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          findMany: {
            args: Prisma.PostLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>[]
          }
          create: {
            args: Prisma.PostLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          createMany: {
            args: Prisma.PostLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>[]
          }
          delete: {
            args: Prisma.PostLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          update: {
            args: Prisma.PostLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          deleteMany: {
            args: Prisma.PostLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostLikePayload>
          }
          aggregate: {
            args: Prisma.PostLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostLike>
          }
          groupBy: {
            args: Prisma.PostLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostLikeCountArgs<ExtArgs>
            result: $Utils.Optional<PostLikeCountAggregateOutputType> | number
          }
        }
      }
      CommentLike: {
        payload: Prisma.$CommentLikePayload<ExtArgs>
        fields: Prisma.CommentLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findFirst: {
            args: Prisma.CommentLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          findMany: {
            args: Prisma.CommentLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          create: {
            args: Prisma.CommentLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          createMany: {
            args: Prisma.CommentLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>[]
          }
          delete: {
            args: Prisma.CommentLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          update: {
            args: Prisma.CommentLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          deleteMany: {
            args: Prisma.CommentLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentLikePayload>
          }
          aggregate: {
            args: Prisma.CommentLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommentLike>
          }
          groupBy: {
            args: Prisma.CommentLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentLikeCountArgs<ExtArgs>
            result: $Utils.Optional<CommentLikeCountAggregateOutputType> | number
          }
        }
      }
      Asset: {
        payload: Prisma.$AssetPayload<ExtArgs>
        fields: Prisma.AssetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findFirst: {
            args: Prisma.AssetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          findMany: {
            args: Prisma.AssetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          create: {
            args: Prisma.AssetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          createMany: {
            args: Prisma.AssetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>[]
          }
          delete: {
            args: Prisma.AssetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          update: {
            args: Prisma.AssetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          deleteMany: {
            args: Prisma.AssetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AssetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssetPayload>
          }
          aggregate: {
            args: Prisma.AssetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsset>
          }
          groupBy: {
            args: Prisma.AssetGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssetGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssetCountArgs<ExtArgs>
            result: $Utils.Optional<AssetCountAggregateOutputType> | number
          }
        }
      }
      PostDraft: {
        payload: Prisma.$PostDraftPayload<ExtArgs>
        fields: Prisma.PostDraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostDraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostDraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          findFirst: {
            args: Prisma.PostDraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostDraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          findMany: {
            args: Prisma.PostDraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>[]
          }
          create: {
            args: Prisma.PostDraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          createMany: {
            args: Prisma.PostDraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostDraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>[]
          }
          delete: {
            args: Prisma.PostDraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          update: {
            args: Prisma.PostDraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          deleteMany: {
            args: Prisma.PostDraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostDraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostDraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostDraftPayload>
          }
          aggregate: {
            args: Prisma.PostDraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostDraft>
          }
          groupBy: {
            args: Prisma.PostDraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostDraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostDraftCountArgs<ExtArgs>
            result: $Utils.Optional<PostDraftCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PostModelCountOutputType
   */

  export type PostModelCountOutputType = {
    Like: number
    Comment: number
  }

  export type PostModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Like?: boolean | PostModelCountOutputTypeCountLikeArgs
    Comment?: boolean | PostModelCountOutputTypeCountCommentArgs
  }

  // Custom InputTypes
  /**
   * PostModelCountOutputType without action
   */
  export type PostModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModelCountOutputType
     */
    select?: PostModelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostModelCountOutputType without action
   */
  export type PostModelCountOutputTypeCountLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostLikeWhereInput
  }

  /**
   * PostModelCountOutputType without action
   */
  export type PostModelCountOutputTypeCountCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    posts: number
    likedPosts: number
    comments: number
    likedComments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    likedPosts?: boolean | UserCountOutputTypeCountLikedPostsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    likedComments?: boolean | UserCountOutputTypeCountLikedCommentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostModelWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
  }


  /**
   * Count Type CommentCountOutputType
   */

  export type CommentCountOutputType = {
    Like: number
    subComments: number
  }

  export type CommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Like?: boolean | CommentCountOutputTypeCountLikeArgs
    subComments?: boolean | CommentCountOutputTypeCountSubCommentsArgs
  }

  // Custom InputTypes
  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCountOutputType
     */
    select?: CommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountSubCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type PostDraftCountOutputType
   */

  export type PostDraftCountOutputType = {
    media: number
  }

  export type PostDraftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | PostDraftCountOutputTypeCountMediaArgs
  }

  // Custom InputTypes
  /**
   * PostDraftCountOutputType without action
   */
  export type PostDraftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraftCountOutputType
     */
    select?: PostDraftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostDraftCountOutputType without action
   */
  export type PostDraftCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model PostModel
   */

  export type AggregatePostModel = {
    _count: PostModelCountAggregateOutputType | null
    _avg: PostModelAvgAggregateOutputType | null
    _sum: PostModelSumAggregateOutputType | null
    _min: PostModelMinAggregateOutputType | null
    _max: PostModelMaxAggregateOutputType | null
  }

  export type PostModelAvgAggregateOutputType = {
    id: number | null
  }

  export type PostModelSumAggregateOutputType = {
    id: number | null
  }

  export type PostModelMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    updated_at: Date | null
    content: string | null
    userId: string | null
  }

  export type PostModelMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    updated_at: Date | null
    content: string | null
    userId: string | null
  }

  export type PostModelCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    content: number
    userId: number
    _all: number
  }


  export type PostModelAvgAggregateInputType = {
    id?: true
  }

  export type PostModelSumAggregateInputType = {
    id?: true
  }

  export type PostModelMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    content?: true
    userId?: true
  }

  export type PostModelMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    content?: true
    userId?: true
  }

  export type PostModelCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    content?: true
    userId?: true
    _all?: true
  }

  export type PostModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostModel to aggregate.
     */
    where?: PostModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostModels to fetch.
     */
    orderBy?: PostModelOrderByWithRelationInput | PostModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostModels
    **/
    _count?: true | PostModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostModelMaxAggregateInputType
  }

  export type GetPostModelAggregateType<T extends PostModelAggregateArgs> = {
        [P in keyof T & keyof AggregatePostModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostModel[P]>
      : GetScalarType<T[P], AggregatePostModel[P]>
  }




  export type PostModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostModelWhereInput
    orderBy?: PostModelOrderByWithAggregationInput | PostModelOrderByWithAggregationInput[]
    by: PostModelScalarFieldEnum[] | PostModelScalarFieldEnum
    having?: PostModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostModelCountAggregateInputType | true
    _avg?: PostModelAvgAggregateInputType
    _sum?: PostModelSumAggregateInputType
    _min?: PostModelMinAggregateInputType
    _max?: PostModelMaxAggregateInputType
  }

  export type PostModelGroupByOutputType = {
    id: number
    created_at: Date
    updated_at: Date
    content: string
    userId: string
    _count: PostModelCountAggregateOutputType | null
    _avg: PostModelAvgAggregateOutputType | null
    _sum: PostModelSumAggregateOutputType | null
    _min: PostModelMinAggregateOutputType | null
    _max: PostModelMaxAggregateOutputType | null
  }

  type GetPostModelGroupByPayload<T extends PostModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostModelGroupByOutputType[P]>
            : GetScalarType<T[P], PostModelGroupByOutputType[P]>
        }
      >
    >


  export type PostModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    content?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
    Like?: boolean | PostModel$LikeArgs<ExtArgs>
    Comment?: boolean | PostModel$CommentArgs<ExtArgs>
    _count?: boolean | PostModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postModel"]>

  export type PostModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    content?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postModel"]>

  export type PostModelSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    content?: boolean
    userId?: boolean
  }

  export type PostModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
    Like?: boolean | PostModel$LikeArgs<ExtArgs>
    Comment?: boolean | PostModel$CommentArgs<ExtArgs>
    _count?: boolean | PostModelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostModel"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
      Like: Prisma.$PostLikePayload<ExtArgs>[]
      Comment: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      updated_at: Date
      content: string
      userId: string
    }, ExtArgs["result"]["postModel"]>
    composites: {}
  }

  type PostModelGetPayload<S extends boolean | null | undefined | PostModelDefaultArgs> = $Result.GetResult<Prisma.$PostModelPayload, S>

  type PostModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PostModelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PostModelCountAggregateInputType | true
    }

  export interface PostModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostModel'], meta: { name: 'PostModel' } }
    /**
     * Find zero or one PostModel that matches the filter.
     * @param {PostModelFindUniqueArgs} args - Arguments to find a PostModel
     * @example
     * // Get one PostModel
     * const postModel = await prisma.postModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostModelFindUniqueArgs>(args: SelectSubset<T, PostModelFindUniqueArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PostModel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PostModelFindUniqueOrThrowArgs} args - Arguments to find a PostModel
     * @example
     * // Get one PostModel
     * const postModel = await prisma.postModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostModelFindUniqueOrThrowArgs>(args: SelectSubset<T, PostModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PostModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelFindFirstArgs} args - Arguments to find a PostModel
     * @example
     * // Get one PostModel
     * const postModel = await prisma.postModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostModelFindFirstArgs>(args?: SelectSubset<T, PostModelFindFirstArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PostModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelFindFirstOrThrowArgs} args - Arguments to find a PostModel
     * @example
     * // Get one PostModel
     * const postModel = await prisma.postModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostModelFindFirstOrThrowArgs>(args?: SelectSubset<T, PostModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PostModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostModels
     * const postModels = await prisma.postModel.findMany()
     * 
     * // Get first 10 PostModels
     * const postModels = await prisma.postModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postModelWithIdOnly = await prisma.postModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostModelFindManyArgs>(args?: SelectSubset<T, PostModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PostModel.
     * @param {PostModelCreateArgs} args - Arguments to create a PostModel.
     * @example
     * // Create one PostModel
     * const PostModel = await prisma.postModel.create({
     *   data: {
     *     // ... data to create a PostModel
     *   }
     * })
     * 
     */
    create<T extends PostModelCreateArgs>(args: SelectSubset<T, PostModelCreateArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PostModels.
     * @param {PostModelCreateManyArgs} args - Arguments to create many PostModels.
     * @example
     * // Create many PostModels
     * const postModel = await prisma.postModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostModelCreateManyArgs>(args?: SelectSubset<T, PostModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostModels and returns the data saved in the database.
     * @param {PostModelCreateManyAndReturnArgs} args - Arguments to create many PostModels.
     * @example
     * // Create many PostModels
     * const postModel = await prisma.postModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostModels and only return the `id`
     * const postModelWithIdOnly = await prisma.postModel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostModelCreateManyAndReturnArgs>(args?: SelectSubset<T, PostModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PostModel.
     * @param {PostModelDeleteArgs} args - Arguments to delete one PostModel.
     * @example
     * // Delete one PostModel
     * const PostModel = await prisma.postModel.delete({
     *   where: {
     *     // ... filter to delete one PostModel
     *   }
     * })
     * 
     */
    delete<T extends PostModelDeleteArgs>(args: SelectSubset<T, PostModelDeleteArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PostModel.
     * @param {PostModelUpdateArgs} args - Arguments to update one PostModel.
     * @example
     * // Update one PostModel
     * const postModel = await prisma.postModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostModelUpdateArgs>(args: SelectSubset<T, PostModelUpdateArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PostModels.
     * @param {PostModelDeleteManyArgs} args - Arguments to filter PostModels to delete.
     * @example
     * // Delete a few PostModels
     * const { count } = await prisma.postModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostModelDeleteManyArgs>(args?: SelectSubset<T, PostModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostModels
     * const postModel = await prisma.postModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostModelUpdateManyArgs>(args: SelectSubset<T, PostModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostModel.
     * @param {PostModelUpsertArgs} args - Arguments to update or create a PostModel.
     * @example
     * // Update or create a PostModel
     * const postModel = await prisma.postModel.upsert({
     *   create: {
     *     // ... data to create a PostModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostModel we want to update
     *   }
     * })
     */
    upsert<T extends PostModelUpsertArgs>(args: SelectSubset<T, PostModelUpsertArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PostModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelCountArgs} args - Arguments to filter PostModels to count.
     * @example
     * // Count the number of PostModels
     * const count = await prisma.postModel.count({
     *   where: {
     *     // ... the filter for the PostModels we want to count
     *   }
     * })
    **/
    count<T extends PostModelCountArgs>(
      args?: Subset<T, PostModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostModelAggregateArgs>(args: Subset<T, PostModelAggregateArgs>): Prisma.PrismaPromise<GetPostModelAggregateType<T>>

    /**
     * Group by PostModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostModelGroupByArgs['orderBy'] }
        : { orderBy?: PostModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostModel model
   */
  readonly fields: PostModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    Like<T extends PostModel$LikeArgs<ExtArgs> = {}>(args?: Subset<T, PostModel$LikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findMany"> | Null>
    Comment<T extends PostModel$CommentArgs<ExtArgs> = {}>(args?: Subset<T, PostModel$CommentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostModel model
   */ 
  interface PostModelFieldRefs {
    readonly id: FieldRef<"PostModel", 'Int'>
    readonly created_at: FieldRef<"PostModel", 'DateTime'>
    readonly updated_at: FieldRef<"PostModel", 'DateTime'>
    readonly content: FieldRef<"PostModel", 'String'>
    readonly userId: FieldRef<"PostModel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostModel findUnique
   */
  export type PostModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter, which PostModel to fetch.
     */
    where: PostModelWhereUniqueInput
  }

  /**
   * PostModel findUniqueOrThrow
   */
  export type PostModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter, which PostModel to fetch.
     */
    where: PostModelWhereUniqueInput
  }

  /**
   * PostModel findFirst
   */
  export type PostModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter, which PostModel to fetch.
     */
    where?: PostModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostModels to fetch.
     */
    orderBy?: PostModelOrderByWithRelationInput | PostModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostModels.
     */
    cursor?: PostModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostModels.
     */
    distinct?: PostModelScalarFieldEnum | PostModelScalarFieldEnum[]
  }

  /**
   * PostModel findFirstOrThrow
   */
  export type PostModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter, which PostModel to fetch.
     */
    where?: PostModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostModels to fetch.
     */
    orderBy?: PostModelOrderByWithRelationInput | PostModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostModels.
     */
    cursor?: PostModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostModels.
     */
    distinct?: PostModelScalarFieldEnum | PostModelScalarFieldEnum[]
  }

  /**
   * PostModel findMany
   */
  export type PostModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter, which PostModels to fetch.
     */
    where?: PostModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostModels to fetch.
     */
    orderBy?: PostModelOrderByWithRelationInput | PostModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostModels.
     */
    cursor?: PostModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostModels.
     */
    skip?: number
    distinct?: PostModelScalarFieldEnum | PostModelScalarFieldEnum[]
  }

  /**
   * PostModel create
   */
  export type PostModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * The data needed to create a PostModel.
     */
    data: XOR<PostModelCreateInput, PostModelUncheckedCreateInput>
  }

  /**
   * PostModel createMany
   */
  export type PostModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostModels.
     */
    data: PostModelCreateManyInput | PostModelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostModel createManyAndReturn
   */
  export type PostModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PostModels.
     */
    data: PostModelCreateManyInput | PostModelCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostModel update
   */
  export type PostModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * The data needed to update a PostModel.
     */
    data: XOR<PostModelUpdateInput, PostModelUncheckedUpdateInput>
    /**
     * Choose, which PostModel to update.
     */
    where: PostModelWhereUniqueInput
  }

  /**
   * PostModel updateMany
   */
  export type PostModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostModels.
     */
    data: XOR<PostModelUpdateManyMutationInput, PostModelUncheckedUpdateManyInput>
    /**
     * Filter which PostModels to update
     */
    where?: PostModelWhereInput
  }

  /**
   * PostModel upsert
   */
  export type PostModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * The filter to search for the PostModel to update in case it exists.
     */
    where: PostModelWhereUniqueInput
    /**
     * In case the PostModel found by the `where` argument doesn't exist, create a new PostModel with this data.
     */
    create: XOR<PostModelCreateInput, PostModelUncheckedCreateInput>
    /**
     * In case the PostModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostModelUpdateInput, PostModelUncheckedUpdateInput>
  }

  /**
   * PostModel delete
   */
  export type PostModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    /**
     * Filter which PostModel to delete.
     */
    where: PostModelWhereUniqueInput
  }

  /**
   * PostModel deleteMany
   */
  export type PostModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostModels to delete
     */
    where?: PostModelWhereInput
  }

  /**
   * PostModel.Like
   */
  export type PostModel$LikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    where?: PostLikeWhereInput
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    cursor?: PostLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostLikeScalarFieldEnum | PostLikeScalarFieldEnum[]
  }

  /**
   * PostModel.Comment
   */
  export type PostModel$CommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * PostModel without action
   */
  export type PostModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    surname: string | null
    bio: string | null
    userAvatar: string | null
    userCover: string | null
    role: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    name: string | null
    surname: string | null
    bio: string | null
    userAvatar: string | null
    userCover: string | null
    role: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    name: number
    surname: number
    bio: number
    userAvatar: number
    userCover: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    bio?: true
    userAvatar?: true
    userCover?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    bio?: true
    userAvatar?: true
    userCover?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    name?: true
    surname?: true
    bio?: true
    userAvatar?: true
    userCover?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover: string
    role: string
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    bio?: boolean
    userAvatar?: boolean
    userCover?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    posts?: boolean | User$postsArgs<ExtArgs>
    likedPosts?: boolean | User$likedPostsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    likedComments?: boolean | User$likedCommentsArgs<ExtArgs>
    postDraft?: boolean | User$postDraftArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    bio?: boolean
    userAvatar?: boolean
    userCover?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    surname?: boolean
    bio?: boolean
    userAvatar?: boolean
    userCover?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | User$postsArgs<ExtArgs>
    likedPosts?: boolean | User$likedPostsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    likedComments?: boolean | User$likedCommentsArgs<ExtArgs>
    postDraft?: boolean | User$postDraftArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      posts: Prisma.$PostModelPayload<ExtArgs>[]
      likedPosts: Prisma.$PostLikePayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      likedComments: Prisma.$CommentLikePayload<ExtArgs>[]
      postDraft: Prisma.$PostDraftPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      name: string
      surname: string
      bio: string
      userAvatar: string
      userCover: string
      role: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findMany"> | Null>
    likedPosts<T extends User$likedPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findMany"> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    likedComments<T extends User$likedCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany"> | Null>
    postDraft<T extends User$postDraftArgs<ExtArgs> = {}>(args?: Subset<T, User$postDraftArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly surname: FieldRef<"User", 'String'>
    readonly bio: FieldRef<"User", 'String'>
    readonly userAvatar: FieldRef<"User", 'String'>
    readonly userCover: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostModel
     */
    select?: PostModelSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostModelInclude<ExtArgs> | null
    where?: PostModelWhereInput
    orderBy?: PostModelOrderByWithRelationInput | PostModelOrderByWithRelationInput[]
    cursor?: PostModelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostModelScalarFieldEnum | PostModelScalarFieldEnum[]
  }

  /**
   * User.likedPosts
   */
  export type User$likedPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    where?: PostLikeWhereInput
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    cursor?: PostLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostLikeScalarFieldEnum | PostLikeScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.likedComments
   */
  export type User$likedCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    cursor?: CommentLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * User.postDraft
   */
  export type User$postDraftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    where?: PostDraftWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    postId: number | null
    parentId: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    postId: number | null
    parentId: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    content: string | null
    created_at: Date | null
    updated_at: Date | null
    postId: number | null
    userId: string | null
    parentId: number | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    content: string | null
    created_at: Date | null
    updated_at: Date | null
    postId: number | null
    userId: string | null
    parentId: number | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    created_at: number
    updated_at: number
    postId: number
    userId: number
    parentId: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    postId?: true
    parentId?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    postId?: true
    parentId?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    created_at?: true
    updated_at?: true
    postId?: true
    userId?: true
    parentId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    created_at?: true
    updated_at?: true
    postId?: true
    userId?: true
    parentId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    created_at?: true
    updated_at?: true
    postId?: true
    userId?: true
    parentId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    content: string
    created_at: Date
    updated_at: Date
    postId: number
    userId: string
    parentId: number | null
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    postId?: boolean
    userId?: boolean
    parentId?: boolean
    post?: boolean | PostModelDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Like?: boolean | Comment$LikeArgs<ExtArgs>
    parentComment?: boolean | Comment$parentCommentArgs<ExtArgs>
    subComments?: boolean | Comment$subCommentsArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    postId?: boolean
    userId?: boolean
    parentId?: boolean
    post?: boolean | PostModelDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parentComment?: boolean | Comment$parentCommentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    created_at?: boolean
    updated_at?: boolean
    postId?: boolean
    userId?: boolean
    parentId?: boolean
  }

  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostModelDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    Like?: boolean | Comment$LikeArgs<ExtArgs>
    parentComment?: boolean | Comment$parentCommentArgs<ExtArgs>
    subComments?: boolean | Comment$subCommentsArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostModelDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parentComment?: boolean | Comment$parentCommentArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      post: Prisma.$PostModelPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      Like: Prisma.$CommentLikePayload<ExtArgs>[]
      parentComment: Prisma.$CommentPayload<ExtArgs> | null
      subComments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      created_at: Date
      updated_at: Date
      postId: number
      userId: string
      parentId: number | null
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostModelDefaultArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    Like<T extends Comment$LikeArgs<ExtArgs> = {}>(args?: Subset<T, Comment$LikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany"> | Null>
    parentComment<T extends Comment$parentCommentArgs<ExtArgs> = {}>(args?: Subset<T, Comment$parentCommentArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    subComments<T extends Comment$subCommentsArgs<ExtArgs> = {}>(args?: Subset<T, Comment$subCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */ 
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly created_at: FieldRef<"Comment", 'DateTime'>
    readonly updated_at: FieldRef<"Comment", 'DateTime'>
    readonly postId: FieldRef<"Comment", 'Int'>
    readonly userId: FieldRef<"Comment", 'String'>
    readonly parentId: FieldRef<"Comment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
  }

  /**
   * Comment.Like
   */
  export type Comment$LikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    cursor?: CommentLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * Comment.parentComment
   */
  export type Comment$parentCommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
  }

  /**
   * Comment.subComments
   */
  export type Comment$subCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model PostLike
   */

  export type AggregatePostLike = {
    _count: PostLikeCountAggregateOutputType | null
    _avg: PostLikeAvgAggregateOutputType | null
    _sum: PostLikeSumAggregateOutputType | null
    _min: PostLikeMinAggregateOutputType | null
    _max: PostLikeMaxAggregateOutputType | null
  }

  export type PostLikeAvgAggregateOutputType = {
    postId: number | null
  }

  export type PostLikeSumAggregateOutputType = {
    postId: number | null
  }

  export type PostLikeMinAggregateOutputType = {
    userId: string | null
    postId: number | null
  }

  export type PostLikeMaxAggregateOutputType = {
    userId: string | null
    postId: number | null
  }

  export type PostLikeCountAggregateOutputType = {
    userId: number
    postId: number
    _all: number
  }


  export type PostLikeAvgAggregateInputType = {
    postId?: true
  }

  export type PostLikeSumAggregateInputType = {
    postId?: true
  }

  export type PostLikeMinAggregateInputType = {
    userId?: true
    postId?: true
  }

  export type PostLikeMaxAggregateInputType = {
    userId?: true
    postId?: true
  }

  export type PostLikeCountAggregateInputType = {
    userId?: true
    postId?: true
    _all?: true
  }

  export type PostLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostLike to aggregate.
     */
    where?: PostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLikes to fetch.
     */
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostLikes
    **/
    _count?: true | PostLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostLikeMaxAggregateInputType
  }

  export type GetPostLikeAggregateType<T extends PostLikeAggregateArgs> = {
        [P in keyof T & keyof AggregatePostLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostLike[P]>
      : GetScalarType<T[P], AggregatePostLike[P]>
  }




  export type PostLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostLikeWhereInput
    orderBy?: PostLikeOrderByWithAggregationInput | PostLikeOrderByWithAggregationInput[]
    by: PostLikeScalarFieldEnum[] | PostLikeScalarFieldEnum
    having?: PostLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostLikeCountAggregateInputType | true
    _avg?: PostLikeAvgAggregateInputType
    _sum?: PostLikeSumAggregateInputType
    _min?: PostLikeMinAggregateInputType
    _max?: PostLikeMaxAggregateInputType
  }

  export type PostLikeGroupByOutputType = {
    userId: string
    postId: number
    _count: PostLikeCountAggregateOutputType | null
    _avg: PostLikeAvgAggregateOutputType | null
    _sum: PostLikeSumAggregateOutputType | null
    _min: PostLikeMinAggregateOutputType | null
    _max: PostLikeMaxAggregateOutputType | null
  }

  type GetPostLikeGroupByPayload<T extends PostLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostLikeGroupByOutputType[P]>
            : GetScalarType<T[P], PostLikeGroupByOutputType[P]>
        }
      >
    >


  export type PostLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    postId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postLike"]>

  export type PostLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    postId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postLike"]>

  export type PostLikeSelectScalar = {
    userId?: boolean
    postId?: boolean
  }

  export type PostLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostModelDefaultArgs<ExtArgs>
  }
  export type PostLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostModelDefaultArgs<ExtArgs>
  }

  export type $PostLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      post: Prisma.$PostModelPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      postId: number
    }, ExtArgs["result"]["postLike"]>
    composites: {}
  }

  type PostLikeGetPayload<S extends boolean | null | undefined | PostLikeDefaultArgs> = $Result.GetResult<Prisma.$PostLikePayload, S>

  type PostLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PostLikeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PostLikeCountAggregateInputType | true
    }

  export interface PostLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostLike'], meta: { name: 'PostLike' } }
    /**
     * Find zero or one PostLike that matches the filter.
     * @param {PostLikeFindUniqueArgs} args - Arguments to find a PostLike
     * @example
     * // Get one PostLike
     * const postLike = await prisma.postLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostLikeFindUniqueArgs>(args: SelectSubset<T, PostLikeFindUniqueArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PostLike that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PostLikeFindUniqueOrThrowArgs} args - Arguments to find a PostLike
     * @example
     * // Get one PostLike
     * const postLike = await prisma.postLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, PostLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PostLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeFindFirstArgs} args - Arguments to find a PostLike
     * @example
     * // Get one PostLike
     * const postLike = await prisma.postLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostLikeFindFirstArgs>(args?: SelectSubset<T, PostLikeFindFirstArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PostLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeFindFirstOrThrowArgs} args - Arguments to find a PostLike
     * @example
     * // Get one PostLike
     * const postLike = await prisma.postLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, PostLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PostLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostLikes
     * const postLikes = await prisma.postLike.findMany()
     * 
     * // Get first 10 PostLikes
     * const postLikes = await prisma.postLike.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const postLikeWithUserIdOnly = await prisma.postLike.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends PostLikeFindManyArgs>(args?: SelectSubset<T, PostLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PostLike.
     * @param {PostLikeCreateArgs} args - Arguments to create a PostLike.
     * @example
     * // Create one PostLike
     * const PostLike = await prisma.postLike.create({
     *   data: {
     *     // ... data to create a PostLike
     *   }
     * })
     * 
     */
    create<T extends PostLikeCreateArgs>(args: SelectSubset<T, PostLikeCreateArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PostLikes.
     * @param {PostLikeCreateManyArgs} args - Arguments to create many PostLikes.
     * @example
     * // Create many PostLikes
     * const postLike = await prisma.postLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostLikeCreateManyArgs>(args?: SelectSubset<T, PostLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostLikes and returns the data saved in the database.
     * @param {PostLikeCreateManyAndReturnArgs} args - Arguments to create many PostLikes.
     * @example
     * // Create many PostLikes
     * const postLike = await prisma.postLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostLikes and only return the `userId`
     * const postLikeWithUserIdOnly = await prisma.postLike.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, PostLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PostLike.
     * @param {PostLikeDeleteArgs} args - Arguments to delete one PostLike.
     * @example
     * // Delete one PostLike
     * const PostLike = await prisma.postLike.delete({
     *   where: {
     *     // ... filter to delete one PostLike
     *   }
     * })
     * 
     */
    delete<T extends PostLikeDeleteArgs>(args: SelectSubset<T, PostLikeDeleteArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PostLike.
     * @param {PostLikeUpdateArgs} args - Arguments to update one PostLike.
     * @example
     * // Update one PostLike
     * const postLike = await prisma.postLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostLikeUpdateArgs>(args: SelectSubset<T, PostLikeUpdateArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PostLikes.
     * @param {PostLikeDeleteManyArgs} args - Arguments to filter PostLikes to delete.
     * @example
     * // Delete a few PostLikes
     * const { count } = await prisma.postLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostLikeDeleteManyArgs>(args?: SelectSubset<T, PostLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostLikes
     * const postLike = await prisma.postLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostLikeUpdateManyArgs>(args: SelectSubset<T, PostLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostLike.
     * @param {PostLikeUpsertArgs} args - Arguments to update or create a PostLike.
     * @example
     * // Update or create a PostLike
     * const postLike = await prisma.postLike.upsert({
     *   create: {
     *     // ... data to create a PostLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostLike we want to update
     *   }
     * })
     */
    upsert<T extends PostLikeUpsertArgs>(args: SelectSubset<T, PostLikeUpsertArgs<ExtArgs>>): Prisma__PostLikeClient<$Result.GetResult<Prisma.$PostLikePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PostLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeCountArgs} args - Arguments to filter PostLikes to count.
     * @example
     * // Count the number of PostLikes
     * const count = await prisma.postLike.count({
     *   where: {
     *     // ... the filter for the PostLikes we want to count
     *   }
     * })
    **/
    count<T extends PostLikeCountArgs>(
      args?: Subset<T, PostLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostLikeAggregateArgs>(args: Subset<T, PostLikeAggregateArgs>): Prisma.PrismaPromise<GetPostLikeAggregateType<T>>

    /**
     * Group by PostLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostLikeGroupByArgs['orderBy'] }
        : { orderBy?: PostLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostLike model
   */
  readonly fields: PostLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    post<T extends PostModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostModelDefaultArgs<ExtArgs>>): Prisma__PostModelClient<$Result.GetResult<Prisma.$PostModelPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostLike model
   */ 
  interface PostLikeFieldRefs {
    readonly userId: FieldRef<"PostLike", 'String'>
    readonly postId: FieldRef<"PostLike", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PostLike findUnique
   */
  export type PostLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter, which PostLike to fetch.
     */
    where: PostLikeWhereUniqueInput
  }

  /**
   * PostLike findUniqueOrThrow
   */
  export type PostLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter, which PostLike to fetch.
     */
    where: PostLikeWhereUniqueInput
  }

  /**
   * PostLike findFirst
   */
  export type PostLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter, which PostLike to fetch.
     */
    where?: PostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLikes to fetch.
     */
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostLikes.
     */
    cursor?: PostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostLikes.
     */
    distinct?: PostLikeScalarFieldEnum | PostLikeScalarFieldEnum[]
  }

  /**
   * PostLike findFirstOrThrow
   */
  export type PostLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter, which PostLike to fetch.
     */
    where?: PostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLikes to fetch.
     */
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostLikes.
     */
    cursor?: PostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostLikes.
     */
    distinct?: PostLikeScalarFieldEnum | PostLikeScalarFieldEnum[]
  }

  /**
   * PostLike findMany
   */
  export type PostLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter, which PostLikes to fetch.
     */
    where?: PostLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostLikes to fetch.
     */
    orderBy?: PostLikeOrderByWithRelationInput | PostLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostLikes.
     */
    cursor?: PostLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostLikes.
     */
    skip?: number
    distinct?: PostLikeScalarFieldEnum | PostLikeScalarFieldEnum[]
  }

  /**
   * PostLike create
   */
  export type PostLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a PostLike.
     */
    data: XOR<PostLikeCreateInput, PostLikeUncheckedCreateInput>
  }

  /**
   * PostLike createMany
   */
  export type PostLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostLikes.
     */
    data: PostLikeCreateManyInput | PostLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostLike createManyAndReturn
   */
  export type PostLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PostLikes.
     */
    data: PostLikeCreateManyInput | PostLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostLike update
   */
  export type PostLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a PostLike.
     */
    data: XOR<PostLikeUpdateInput, PostLikeUncheckedUpdateInput>
    /**
     * Choose, which PostLike to update.
     */
    where: PostLikeWhereUniqueInput
  }

  /**
   * PostLike updateMany
   */
  export type PostLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostLikes.
     */
    data: XOR<PostLikeUpdateManyMutationInput, PostLikeUncheckedUpdateManyInput>
    /**
     * Filter which PostLikes to update
     */
    where?: PostLikeWhereInput
  }

  /**
   * PostLike upsert
   */
  export type PostLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the PostLike to update in case it exists.
     */
    where: PostLikeWhereUniqueInput
    /**
     * In case the PostLike found by the `where` argument doesn't exist, create a new PostLike with this data.
     */
    create: XOR<PostLikeCreateInput, PostLikeUncheckedCreateInput>
    /**
     * In case the PostLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostLikeUpdateInput, PostLikeUncheckedUpdateInput>
  }

  /**
   * PostLike delete
   */
  export type PostLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
    /**
     * Filter which PostLike to delete.
     */
    where: PostLikeWhereUniqueInput
  }

  /**
   * PostLike deleteMany
   */
  export type PostLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostLikes to delete
     */
    where?: PostLikeWhereInput
  }

  /**
   * PostLike without action
   */
  export type PostLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostLike
     */
    select?: PostLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostLikeInclude<ExtArgs> | null
  }


  /**
   * Model CommentLike
   */

  export type AggregateCommentLike = {
    _count: CommentLikeCountAggregateOutputType | null
    _avg: CommentLikeAvgAggregateOutputType | null
    _sum: CommentLikeSumAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  export type CommentLikeAvgAggregateOutputType = {
    commentId: number | null
  }

  export type CommentLikeSumAggregateOutputType = {
    commentId: number | null
  }

  export type CommentLikeMinAggregateOutputType = {
    userId: string | null
    commentId: number | null
    created_at: Date | null
  }

  export type CommentLikeMaxAggregateOutputType = {
    userId: string | null
    commentId: number | null
    created_at: Date | null
  }

  export type CommentLikeCountAggregateOutputType = {
    userId: number
    commentId: number
    created_at: number
    _all: number
  }


  export type CommentLikeAvgAggregateInputType = {
    commentId?: true
  }

  export type CommentLikeSumAggregateInputType = {
    commentId?: true
  }

  export type CommentLikeMinAggregateInputType = {
    userId?: true
    commentId?: true
    created_at?: true
  }

  export type CommentLikeMaxAggregateInputType = {
    userId?: true
    commentId?: true
    created_at?: true
  }

  export type CommentLikeCountAggregateInputType = {
    userId?: true
    commentId?: true
    created_at?: true
    _all?: true
  }

  export type CommentLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLike to aggregate.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommentLikes
    **/
    _count?: true | CommentLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentLikeMaxAggregateInputType
  }

  export type GetCommentLikeAggregateType<T extends CommentLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateCommentLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommentLike[P]>
      : GetScalarType<T[P], AggregateCommentLike[P]>
  }




  export type CommentLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentLikeWhereInput
    orderBy?: CommentLikeOrderByWithAggregationInput | CommentLikeOrderByWithAggregationInput[]
    by: CommentLikeScalarFieldEnum[] | CommentLikeScalarFieldEnum
    having?: CommentLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentLikeCountAggregateInputType | true
    _avg?: CommentLikeAvgAggregateInputType
    _sum?: CommentLikeSumAggregateInputType
    _min?: CommentLikeMinAggregateInputType
    _max?: CommentLikeMaxAggregateInputType
  }

  export type CommentLikeGroupByOutputType = {
    userId: string
    commentId: number
    created_at: Date
    _count: CommentLikeCountAggregateOutputType | null
    _avg: CommentLikeAvgAggregateOutputType | null
    _sum: CommentLikeSumAggregateOutputType | null
    _min: CommentLikeMinAggregateOutputType | null
    _max: CommentLikeMaxAggregateOutputType | null
  }

  type GetCommentLikeGroupByPayload<T extends CommentLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
            : GetScalarType<T[P], CommentLikeGroupByOutputType[P]>
        }
      >
    >


  export type CommentLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    commentId?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    comment?: boolean | CommentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    commentId?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    comment?: boolean | CommentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["commentLike"]>

  export type CommentLikeSelectScalar = {
    userId?: boolean
    commentId?: boolean
    created_at?: boolean
  }

  export type CommentLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    comment?: boolean | CommentDefaultArgs<ExtArgs>
  }
  export type CommentLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    comment?: boolean | CommentDefaultArgs<ExtArgs>
  }

  export type $CommentLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommentLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      comment: Prisma.$CommentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      commentId: number
      created_at: Date
    }, ExtArgs["result"]["commentLike"]>
    composites: {}
  }

  type CommentLikeGetPayload<S extends boolean | null | undefined | CommentLikeDefaultArgs> = $Result.GetResult<Prisma.$CommentLikePayload, S>

  type CommentLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommentLikeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommentLikeCountAggregateInputType | true
    }

  export interface CommentLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommentLike'], meta: { name: 'CommentLike' } }
    /**
     * Find zero or one CommentLike that matches the filter.
     * @param {CommentLikeFindUniqueArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentLikeFindUniqueArgs>(args: SelectSubset<T, CommentLikeFindUniqueArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CommentLike that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommentLikeFindUniqueOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CommentLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentLikeFindFirstArgs>(args?: SelectSubset<T, CommentLikeFindFirstArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CommentLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindFirstOrThrowArgs} args - Arguments to find a CommentLike
     * @example
     * // Get one CommentLike
     * const commentLike = await prisma.commentLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CommentLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommentLikes
     * const commentLikes = await prisma.commentLike.findMany()
     * 
     * // Get first 10 CommentLikes
     * const commentLikes = await prisma.commentLike.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const commentLikeWithUserIdOnly = await prisma.commentLike.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends CommentLikeFindManyArgs>(args?: SelectSubset<T, CommentLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CommentLike.
     * @param {CommentLikeCreateArgs} args - Arguments to create a CommentLike.
     * @example
     * // Create one CommentLike
     * const CommentLike = await prisma.commentLike.create({
     *   data: {
     *     // ... data to create a CommentLike
     *   }
     * })
     * 
     */
    create<T extends CommentLikeCreateArgs>(args: SelectSubset<T, CommentLikeCreateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CommentLikes.
     * @param {CommentLikeCreateManyArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentLikeCreateManyArgs>(args?: SelectSubset<T, CommentLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommentLikes and returns the data saved in the database.
     * @param {CommentLikeCreateManyAndReturnArgs} args - Arguments to create many CommentLikes.
     * @example
     * // Create many CommentLikes
     * const commentLike = await prisma.commentLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommentLikes and only return the `userId`
     * const commentLikeWithUserIdOnly = await prisma.commentLike.createManyAndReturn({ 
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CommentLike.
     * @param {CommentLikeDeleteArgs} args - Arguments to delete one CommentLike.
     * @example
     * // Delete one CommentLike
     * const CommentLike = await prisma.commentLike.delete({
     *   where: {
     *     // ... filter to delete one CommentLike
     *   }
     * })
     * 
     */
    delete<T extends CommentLikeDeleteArgs>(args: SelectSubset<T, CommentLikeDeleteArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CommentLike.
     * @param {CommentLikeUpdateArgs} args - Arguments to update one CommentLike.
     * @example
     * // Update one CommentLike
     * const commentLike = await prisma.commentLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentLikeUpdateArgs>(args: SelectSubset<T, CommentLikeUpdateArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CommentLikes.
     * @param {CommentLikeDeleteManyArgs} args - Arguments to filter CommentLikes to delete.
     * @example
     * // Delete a few CommentLikes
     * const { count } = await prisma.commentLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentLikeDeleteManyArgs>(args?: SelectSubset<T, CommentLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommentLikes
     * const commentLike = await prisma.commentLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentLikeUpdateManyArgs>(args: SelectSubset<T, CommentLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommentLike.
     * @param {CommentLikeUpsertArgs} args - Arguments to update or create a CommentLike.
     * @example
     * // Update or create a CommentLike
     * const commentLike = await prisma.commentLike.upsert({
     *   create: {
     *     // ... data to create a CommentLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommentLike we want to update
     *   }
     * })
     */
    upsert<T extends CommentLikeUpsertArgs>(args: SelectSubset<T, CommentLikeUpsertArgs<ExtArgs>>): Prisma__CommentLikeClient<$Result.GetResult<Prisma.$CommentLikePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CommentLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeCountArgs} args - Arguments to filter CommentLikes to count.
     * @example
     * // Count the number of CommentLikes
     * const count = await prisma.commentLike.count({
     *   where: {
     *     // ... the filter for the CommentLikes we want to count
     *   }
     * })
    **/
    count<T extends CommentLikeCountArgs>(
      args?: Subset<T, CommentLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentLikeAggregateArgs>(args: Subset<T, CommentLikeAggregateArgs>): Prisma.PrismaPromise<GetCommentLikeAggregateType<T>>

    /**
     * Group by CommentLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentLikeGroupByArgs['orderBy'] }
        : { orderBy?: CommentLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommentLike model
   */
  readonly fields: CommentLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommentLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    comment<T extends CommentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CommentDefaultArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommentLike model
   */ 
  interface CommentLikeFieldRefs {
    readonly userId: FieldRef<"CommentLike", 'String'>
    readonly commentId: FieldRef<"CommentLike", 'Int'>
    readonly created_at: FieldRef<"CommentLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommentLike findUnique
   */
  export type CommentLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findUniqueOrThrow
   */
  export type CommentLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike findFirst
   */
  export type CommentLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findFirstOrThrow
   */
  export type CommentLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLike to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommentLikes.
     */
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike findMany
   */
  export type CommentLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter, which CommentLikes to fetch.
     */
    where?: CommentLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommentLikes to fetch.
     */
    orderBy?: CommentLikeOrderByWithRelationInput | CommentLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommentLikes.
     */
    cursor?: CommentLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommentLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommentLikes.
     */
    skip?: number
    distinct?: CommentLikeScalarFieldEnum | CommentLikeScalarFieldEnum[]
  }

  /**
   * CommentLike create
   */
  export type CommentLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a CommentLike.
     */
    data: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
  }

  /**
   * CommentLike createMany
   */
  export type CommentLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommentLike createManyAndReturn
   */
  export type CommentLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CommentLikes.
     */
    data: CommentLikeCreateManyInput | CommentLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommentLike update
   */
  export type CommentLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a CommentLike.
     */
    data: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
    /**
     * Choose, which CommentLike to update.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike updateMany
   */
  export type CommentLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommentLikes.
     */
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyInput>
    /**
     * Filter which CommentLikes to update
     */
    where?: CommentLikeWhereInput
  }

  /**
   * CommentLike upsert
   */
  export type CommentLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the CommentLike to update in case it exists.
     */
    where: CommentLikeWhereUniqueInput
    /**
     * In case the CommentLike found by the `where` argument doesn't exist, create a new CommentLike with this data.
     */
    create: XOR<CommentLikeCreateInput, CommentLikeUncheckedCreateInput>
    /**
     * In case the CommentLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentLikeUpdateInput, CommentLikeUncheckedUpdateInput>
  }

  /**
   * CommentLike delete
   */
  export type CommentLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
    /**
     * Filter which CommentLike to delete.
     */
    where: CommentLikeWhereUniqueInput
  }

  /**
   * CommentLike deleteMany
   */
  export type CommentLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommentLikes to delete
     */
    where?: CommentLikeWhereInput
  }

  /**
   * CommentLike without action
   */
  export type CommentLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentLike
     */
    select?: CommentLikeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentLikeInclude<ExtArgs> | null
  }


  /**
   * Model Asset
   */

  export type AggregateAsset = {
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  export type AssetAvgAggregateOutputType = {
    id: number | null
  }

  export type AssetSumAggregateOutputType = {
    id: number | null
  }

  export type AssetMinAggregateOutputType = {
    id: number | null
    key: string | null
    url: string | null
  }

  export type AssetMaxAggregateOutputType = {
    id: number | null
    key: string | null
    url: string | null
  }

  export type AssetCountAggregateOutputType = {
    id: number
    key: number
    url: number
    _all: number
  }


  export type AssetAvgAggregateInputType = {
    id?: true
  }

  export type AssetSumAggregateInputType = {
    id?: true
  }

  export type AssetMinAggregateInputType = {
    id?: true
    key?: true
    url?: true
  }

  export type AssetMaxAggregateInputType = {
    id?: true
    key?: true
    url?: true
  }

  export type AssetCountAggregateInputType = {
    id?: true
    key?: true
    url?: true
    _all?: true
  }

  export type AssetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asset to aggregate.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assets
    **/
    _count?: true | AssetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssetMaxAggregateInputType
  }

  export type GetAssetAggregateType<T extends AssetAggregateArgs> = {
        [P in keyof T & keyof AggregateAsset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsset[P]>
      : GetScalarType<T[P], AggregateAsset[P]>
  }




  export type AssetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithAggregationInput | AssetOrderByWithAggregationInput[]
    by: AssetScalarFieldEnum[] | AssetScalarFieldEnum
    having?: AssetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssetCountAggregateInputType | true
    _avg?: AssetAvgAggregateInputType
    _sum?: AssetSumAggregateInputType
    _min?: AssetMinAggregateInputType
    _max?: AssetMaxAggregateInputType
  }

  export type AssetGroupByOutputType = {
    id: number
    key: string
    url: string
    _count: AssetCountAggregateOutputType | null
    _avg: AssetAvgAggregateOutputType | null
    _sum: AssetSumAggregateOutputType | null
    _min: AssetMinAggregateOutputType | null
    _max: AssetMaxAggregateOutputType | null
  }

  type GetAssetGroupByPayload<T extends AssetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssetGroupByOutputType[P]>
            : GetScalarType<T[P], AssetGroupByOutputType[P]>
        }
      >
    >


  export type AssetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    url?: boolean
    post?: boolean | Asset$postArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    url?: boolean
    post?: boolean | Asset$postArgs<ExtArgs>
  }, ExtArgs["result"]["asset"]>

  export type AssetSelectScalar = {
    id?: boolean
    key?: boolean
    url?: boolean
  }

  export type AssetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | Asset$postArgs<ExtArgs>
  }
  export type AssetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | Asset$postArgs<ExtArgs>
  }

  export type $AssetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asset"
    objects: {
      post: Prisma.$PostDraftPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      url: string
    }, ExtArgs["result"]["asset"]>
    composites: {}
  }

  type AssetGetPayload<S extends boolean | null | undefined | AssetDefaultArgs> = $Result.GetResult<Prisma.$AssetPayload, S>

  type AssetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AssetFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AssetCountAggregateInputType | true
    }

  export interface AssetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asset'], meta: { name: 'Asset' } }
    /**
     * Find zero or one Asset that matches the filter.
     * @param {AssetFindUniqueArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssetFindUniqueArgs>(args: SelectSubset<T, AssetFindUniqueArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Asset that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AssetFindUniqueOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssetFindUniqueOrThrowArgs>(args: SelectSubset<T, AssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Asset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssetFindFirstArgs>(args?: SelectSubset<T, AssetFindFirstArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Asset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindFirstOrThrowArgs} args - Arguments to find a Asset
     * @example
     * // Get one Asset
     * const asset = await prisma.asset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssetFindFirstOrThrowArgs>(args?: SelectSubset<T, AssetFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Assets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assets
     * const assets = await prisma.asset.findMany()
     * 
     * // Get first 10 Assets
     * const assets = await prisma.asset.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assetWithIdOnly = await prisma.asset.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssetFindManyArgs>(args?: SelectSubset<T, AssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Asset.
     * @param {AssetCreateArgs} args - Arguments to create a Asset.
     * @example
     * // Create one Asset
     * const Asset = await prisma.asset.create({
     *   data: {
     *     // ... data to create a Asset
     *   }
     * })
     * 
     */
    create<T extends AssetCreateArgs>(args: SelectSubset<T, AssetCreateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Assets.
     * @param {AssetCreateManyArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssetCreateManyArgs>(args?: SelectSubset<T, AssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assets and returns the data saved in the database.
     * @param {AssetCreateManyAndReturnArgs} args - Arguments to create many Assets.
     * @example
     * // Create many Assets
     * const asset = await prisma.asset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assets and only return the `id`
     * const assetWithIdOnly = await prisma.asset.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssetCreateManyAndReturnArgs>(args?: SelectSubset<T, AssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Asset.
     * @param {AssetDeleteArgs} args - Arguments to delete one Asset.
     * @example
     * // Delete one Asset
     * const Asset = await prisma.asset.delete({
     *   where: {
     *     // ... filter to delete one Asset
     *   }
     * })
     * 
     */
    delete<T extends AssetDeleteArgs>(args: SelectSubset<T, AssetDeleteArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Asset.
     * @param {AssetUpdateArgs} args - Arguments to update one Asset.
     * @example
     * // Update one Asset
     * const asset = await prisma.asset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssetUpdateArgs>(args: SelectSubset<T, AssetUpdateArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Assets.
     * @param {AssetDeleteManyArgs} args - Arguments to filter Assets to delete.
     * @example
     * // Delete a few Assets
     * const { count } = await prisma.asset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssetDeleteManyArgs>(args?: SelectSubset<T, AssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assets
     * const asset = await prisma.asset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssetUpdateManyArgs>(args: SelectSubset<T, AssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Asset.
     * @param {AssetUpsertArgs} args - Arguments to update or create a Asset.
     * @example
     * // Update or create a Asset
     * const asset = await prisma.asset.upsert({
     *   create: {
     *     // ... data to create a Asset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asset we want to update
     *   }
     * })
     */
    upsert<T extends AssetUpsertArgs>(args: SelectSubset<T, AssetUpsertArgs<ExtArgs>>): Prisma__AssetClient<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Assets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetCountArgs} args - Arguments to filter Assets to count.
     * @example
     * // Count the number of Assets
     * const count = await prisma.asset.count({
     *   where: {
     *     // ... the filter for the Assets we want to count
     *   }
     * })
    **/
    count<T extends AssetCountArgs>(
      args?: Subset<T, AssetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssetAggregateArgs>(args: Subset<T, AssetAggregateArgs>): Prisma.PrismaPromise<GetAssetAggregateType<T>>

    /**
     * Group by Asset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssetGroupByArgs['orderBy'] }
        : { orderBy?: AssetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asset model
   */
  readonly fields: AssetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends Asset$postArgs<ExtArgs> = {}>(args?: Subset<T, Asset$postArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Asset model
   */ 
  interface AssetFieldRefs {
    readonly id: FieldRef<"Asset", 'Int'>
    readonly key: FieldRef<"Asset", 'String'>
    readonly url: FieldRef<"Asset", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Asset findUnique
   */
  export type AssetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findUniqueOrThrow
   */
  export type AssetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset findFirst
   */
  export type AssetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findFirstOrThrow
   */
  export type AssetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Asset to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assets.
     */
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset findMany
   */
  export type AssetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter, which Assets to fetch.
     */
    where?: AssetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assets to fetch.
     */
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assets.
     */
    cursor?: AssetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assets.
     */
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * Asset create
   */
  export type AssetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to create a Asset.
     */
    data: XOR<AssetCreateInput, AssetUncheckedCreateInput>
  }

  /**
   * Asset createMany
   */
  export type AssetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asset createManyAndReturn
   */
  export type AssetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Assets.
     */
    data: AssetCreateManyInput | AssetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asset update
   */
  export type AssetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The data needed to update a Asset.
     */
    data: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
    /**
     * Choose, which Asset to update.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset updateMany
   */
  export type AssetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assets.
     */
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyInput>
    /**
     * Filter which Assets to update
     */
    where?: AssetWhereInput
  }

  /**
   * Asset upsert
   */
  export type AssetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * The filter to search for the Asset to update in case it exists.
     */
    where: AssetWhereUniqueInput
    /**
     * In case the Asset found by the `where` argument doesn't exist, create a new Asset with this data.
     */
    create: XOR<AssetCreateInput, AssetUncheckedCreateInput>
    /**
     * In case the Asset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssetUpdateInput, AssetUncheckedUpdateInput>
  }

  /**
   * Asset delete
   */
  export type AssetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    /**
     * Filter which Asset to delete.
     */
    where: AssetWhereUniqueInput
  }

  /**
   * Asset deleteMany
   */
  export type AssetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assets to delete
     */
    where?: AssetWhereInput
  }

  /**
   * Asset.post
   */
  export type Asset$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    where?: PostDraftWhereInput
  }

  /**
   * Asset without action
   */
  export type AssetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
  }


  /**
   * Model PostDraft
   */

  export type AggregatePostDraft = {
    _count: PostDraftCountAggregateOutputType | null
    _avg: PostDraftAvgAggregateOutputType | null
    _sum: PostDraftSumAggregateOutputType | null
    _min: PostDraftMinAggregateOutputType | null
    _max: PostDraftMaxAggregateOutputType | null
  }

  export type PostDraftAvgAggregateOutputType = {
    id: number | null
  }

  export type PostDraftSumAggregateOutputType = {
    id: number | null
  }

  export type PostDraftMinAggregateOutputType = {
    id: number | null
    userId: string | null
    content: string | null
  }

  export type PostDraftMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    content: string | null
  }

  export type PostDraftCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    _all: number
  }


  export type PostDraftAvgAggregateInputType = {
    id?: true
  }

  export type PostDraftSumAggregateInputType = {
    id?: true
  }

  export type PostDraftMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
  }

  export type PostDraftMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
  }

  export type PostDraftCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    _all?: true
  }

  export type PostDraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostDraft to aggregate.
     */
    where?: PostDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDrafts to fetch.
     */
    orderBy?: PostDraftOrderByWithRelationInput | PostDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostDrafts
    **/
    _count?: true | PostDraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostDraftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostDraftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostDraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostDraftMaxAggregateInputType
  }

  export type GetPostDraftAggregateType<T extends PostDraftAggregateArgs> = {
        [P in keyof T & keyof AggregatePostDraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostDraft[P]>
      : GetScalarType<T[P], AggregatePostDraft[P]>
  }




  export type PostDraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostDraftWhereInput
    orderBy?: PostDraftOrderByWithAggregationInput | PostDraftOrderByWithAggregationInput[]
    by: PostDraftScalarFieldEnum[] | PostDraftScalarFieldEnum
    having?: PostDraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostDraftCountAggregateInputType | true
    _avg?: PostDraftAvgAggregateInputType
    _sum?: PostDraftSumAggregateInputType
    _min?: PostDraftMinAggregateInputType
    _max?: PostDraftMaxAggregateInputType
  }

  export type PostDraftGroupByOutputType = {
    id: number
    userId: string
    content: string
    _count: PostDraftCountAggregateOutputType | null
    _avg: PostDraftAvgAggregateOutputType | null
    _sum: PostDraftSumAggregateOutputType | null
    _min: PostDraftMinAggregateOutputType | null
    _max: PostDraftMaxAggregateOutputType | null
  }

  type GetPostDraftGroupByPayload<T extends PostDraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostDraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostDraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostDraftGroupByOutputType[P]>
            : GetScalarType<T[P], PostDraftGroupByOutputType[P]>
        }
      >
    >


  export type PostDraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    media?: boolean | PostDraft$mediaArgs<ExtArgs>
    _count?: boolean | PostDraftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postDraft"]>

  export type PostDraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postDraft"]>

  export type PostDraftSelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
  }

  export type PostDraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    media?: boolean | PostDraft$mediaArgs<ExtArgs>
    _count?: boolean | PostDraftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostDraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostDraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostDraft"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      media: Prisma.$AssetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      content: string
    }, ExtArgs["result"]["postDraft"]>
    composites: {}
  }

  type PostDraftGetPayload<S extends boolean | null | undefined | PostDraftDefaultArgs> = $Result.GetResult<Prisma.$PostDraftPayload, S>

  type PostDraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PostDraftFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PostDraftCountAggregateInputType | true
    }

  export interface PostDraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostDraft'], meta: { name: 'PostDraft' } }
    /**
     * Find zero or one PostDraft that matches the filter.
     * @param {PostDraftFindUniqueArgs} args - Arguments to find a PostDraft
     * @example
     * // Get one PostDraft
     * const postDraft = await prisma.postDraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostDraftFindUniqueArgs>(args: SelectSubset<T, PostDraftFindUniqueArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PostDraft that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PostDraftFindUniqueOrThrowArgs} args - Arguments to find a PostDraft
     * @example
     * // Get one PostDraft
     * const postDraft = await prisma.postDraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostDraftFindUniqueOrThrowArgs>(args: SelectSubset<T, PostDraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PostDraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftFindFirstArgs} args - Arguments to find a PostDraft
     * @example
     * // Get one PostDraft
     * const postDraft = await prisma.postDraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostDraftFindFirstArgs>(args?: SelectSubset<T, PostDraftFindFirstArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PostDraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftFindFirstOrThrowArgs} args - Arguments to find a PostDraft
     * @example
     * // Get one PostDraft
     * const postDraft = await prisma.postDraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostDraftFindFirstOrThrowArgs>(args?: SelectSubset<T, PostDraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PostDrafts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostDrafts
     * const postDrafts = await prisma.postDraft.findMany()
     * 
     * // Get first 10 PostDrafts
     * const postDrafts = await prisma.postDraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postDraftWithIdOnly = await prisma.postDraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostDraftFindManyArgs>(args?: SelectSubset<T, PostDraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PostDraft.
     * @param {PostDraftCreateArgs} args - Arguments to create a PostDraft.
     * @example
     * // Create one PostDraft
     * const PostDraft = await prisma.postDraft.create({
     *   data: {
     *     // ... data to create a PostDraft
     *   }
     * })
     * 
     */
    create<T extends PostDraftCreateArgs>(args: SelectSubset<T, PostDraftCreateArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PostDrafts.
     * @param {PostDraftCreateManyArgs} args - Arguments to create many PostDrafts.
     * @example
     * // Create many PostDrafts
     * const postDraft = await prisma.postDraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostDraftCreateManyArgs>(args?: SelectSubset<T, PostDraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostDrafts and returns the data saved in the database.
     * @param {PostDraftCreateManyAndReturnArgs} args - Arguments to create many PostDrafts.
     * @example
     * // Create many PostDrafts
     * const postDraft = await prisma.postDraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostDrafts and only return the `id`
     * const postDraftWithIdOnly = await prisma.postDraft.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostDraftCreateManyAndReturnArgs>(args?: SelectSubset<T, PostDraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PostDraft.
     * @param {PostDraftDeleteArgs} args - Arguments to delete one PostDraft.
     * @example
     * // Delete one PostDraft
     * const PostDraft = await prisma.postDraft.delete({
     *   where: {
     *     // ... filter to delete one PostDraft
     *   }
     * })
     * 
     */
    delete<T extends PostDraftDeleteArgs>(args: SelectSubset<T, PostDraftDeleteArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PostDraft.
     * @param {PostDraftUpdateArgs} args - Arguments to update one PostDraft.
     * @example
     * // Update one PostDraft
     * const postDraft = await prisma.postDraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostDraftUpdateArgs>(args: SelectSubset<T, PostDraftUpdateArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PostDrafts.
     * @param {PostDraftDeleteManyArgs} args - Arguments to filter PostDrafts to delete.
     * @example
     * // Delete a few PostDrafts
     * const { count } = await prisma.postDraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDraftDeleteManyArgs>(args?: SelectSubset<T, PostDraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostDrafts
     * const postDraft = await prisma.postDraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostDraftUpdateManyArgs>(args: SelectSubset<T, PostDraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PostDraft.
     * @param {PostDraftUpsertArgs} args - Arguments to update or create a PostDraft.
     * @example
     * // Update or create a PostDraft
     * const postDraft = await prisma.postDraft.upsert({
     *   create: {
     *     // ... data to create a PostDraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostDraft we want to update
     *   }
     * })
     */
    upsert<T extends PostDraftUpsertArgs>(args: SelectSubset<T, PostDraftUpsertArgs<ExtArgs>>): Prisma__PostDraftClient<$Result.GetResult<Prisma.$PostDraftPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PostDrafts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftCountArgs} args - Arguments to filter PostDrafts to count.
     * @example
     * // Count the number of PostDrafts
     * const count = await prisma.postDraft.count({
     *   where: {
     *     // ... the filter for the PostDrafts we want to count
     *   }
     * })
    **/
    count<T extends PostDraftCountArgs>(
      args?: Subset<T, PostDraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostDraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostDraftAggregateArgs>(args: Subset<T, PostDraftAggregateArgs>): Prisma.PrismaPromise<GetPostDraftAggregateType<T>>

    /**
     * Group by PostDraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostDraftGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostDraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostDraftGroupByArgs['orderBy'] }
        : { orderBy?: PostDraftGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostDraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostDraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostDraft model
   */
  readonly fields: PostDraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostDraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostDraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    media<T extends PostDraft$mediaArgs<ExtArgs> = {}>(args?: Subset<T, PostDraft$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssetPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostDraft model
   */ 
  interface PostDraftFieldRefs {
    readonly id: FieldRef<"PostDraft", 'Int'>
    readonly userId: FieldRef<"PostDraft", 'String'>
    readonly content: FieldRef<"PostDraft", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostDraft findUnique
   */
  export type PostDraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter, which PostDraft to fetch.
     */
    where: PostDraftWhereUniqueInput
  }

  /**
   * PostDraft findUniqueOrThrow
   */
  export type PostDraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter, which PostDraft to fetch.
     */
    where: PostDraftWhereUniqueInput
  }

  /**
   * PostDraft findFirst
   */
  export type PostDraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter, which PostDraft to fetch.
     */
    where?: PostDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDrafts to fetch.
     */
    orderBy?: PostDraftOrderByWithRelationInput | PostDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostDrafts.
     */
    cursor?: PostDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostDrafts.
     */
    distinct?: PostDraftScalarFieldEnum | PostDraftScalarFieldEnum[]
  }

  /**
   * PostDraft findFirstOrThrow
   */
  export type PostDraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter, which PostDraft to fetch.
     */
    where?: PostDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDrafts to fetch.
     */
    orderBy?: PostDraftOrderByWithRelationInput | PostDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostDrafts.
     */
    cursor?: PostDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDrafts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostDrafts.
     */
    distinct?: PostDraftScalarFieldEnum | PostDraftScalarFieldEnum[]
  }

  /**
   * PostDraft findMany
   */
  export type PostDraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter, which PostDrafts to fetch.
     */
    where?: PostDraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostDrafts to fetch.
     */
    orderBy?: PostDraftOrderByWithRelationInput | PostDraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostDrafts.
     */
    cursor?: PostDraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostDrafts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostDrafts.
     */
    skip?: number
    distinct?: PostDraftScalarFieldEnum | PostDraftScalarFieldEnum[]
  }

  /**
   * PostDraft create
   */
  export type PostDraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * The data needed to create a PostDraft.
     */
    data: XOR<PostDraftCreateInput, PostDraftUncheckedCreateInput>
  }

  /**
   * PostDraft createMany
   */
  export type PostDraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostDrafts.
     */
    data: PostDraftCreateManyInput | PostDraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostDraft createManyAndReturn
   */
  export type PostDraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PostDrafts.
     */
    data: PostDraftCreateManyInput | PostDraftCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostDraft update
   */
  export type PostDraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * The data needed to update a PostDraft.
     */
    data: XOR<PostDraftUpdateInput, PostDraftUncheckedUpdateInput>
    /**
     * Choose, which PostDraft to update.
     */
    where: PostDraftWhereUniqueInput
  }

  /**
   * PostDraft updateMany
   */
  export type PostDraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostDrafts.
     */
    data: XOR<PostDraftUpdateManyMutationInput, PostDraftUncheckedUpdateManyInput>
    /**
     * Filter which PostDrafts to update
     */
    where?: PostDraftWhereInput
  }

  /**
   * PostDraft upsert
   */
  export type PostDraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * The filter to search for the PostDraft to update in case it exists.
     */
    where: PostDraftWhereUniqueInput
    /**
     * In case the PostDraft found by the `where` argument doesn't exist, create a new PostDraft with this data.
     */
    create: XOR<PostDraftCreateInput, PostDraftUncheckedCreateInput>
    /**
     * In case the PostDraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostDraftUpdateInput, PostDraftUncheckedUpdateInput>
  }

  /**
   * PostDraft delete
   */
  export type PostDraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
    /**
     * Filter which PostDraft to delete.
     */
    where: PostDraftWhereUniqueInput
  }

  /**
   * PostDraft deleteMany
   */
  export type PostDraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostDrafts to delete
     */
    where?: PostDraftWhereInput
  }

  /**
   * PostDraft.media
   */
  export type PostDraft$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asset
     */
    select?: AssetSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssetInclude<ExtArgs> | null
    where?: AssetWhereInput
    orderBy?: AssetOrderByWithRelationInput | AssetOrderByWithRelationInput[]
    cursor?: AssetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssetScalarFieldEnum | AssetScalarFieldEnum[]
  }

  /**
   * PostDraft without action
   */
  export type PostDraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostDraft
     */
    select?: PostDraftSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostDraftInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiresIn: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    email: string | null
    token: string | null
    type: $Enums.TokenType | null
    expiresIn: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    email: number
    token: number
    type: number
    expiresIn: number
    _all: number
  }


  export type TokenMinAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    email?: true
    token?: true
    type?: true
    expiresIn?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    email?: boolean
    token?: boolean
    type?: boolean
    expiresIn?: boolean
  }


  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      token: string
      type: $Enums.TokenType
      expiresIn: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */ 
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly email: FieldRef<"Token", 'String'>
    readonly token: FieldRef<"Token", 'String'>
    readonly type: FieldRef<"Token", 'TokenType'>
    readonly expiresIn: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostModelScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    content: 'content',
    userId: 'userId'
  };

  export type PostModelScalarFieldEnum = (typeof PostModelScalarFieldEnum)[keyof typeof PostModelScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    name: 'name',
    surname: 'surname',
    bio: 'bio',
    userAvatar: 'userAvatar',
    userCover: 'userCover',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    created_at: 'created_at',
    updated_at: 'updated_at',
    postId: 'postId',
    userId: 'userId',
    parentId: 'parentId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const PostLikeScalarFieldEnum: {
    userId: 'userId',
    postId: 'postId'
  };

  export type PostLikeScalarFieldEnum = (typeof PostLikeScalarFieldEnum)[keyof typeof PostLikeScalarFieldEnum]


  export const CommentLikeScalarFieldEnum: {
    userId: 'userId',
    commentId: 'commentId',
    created_at: 'created_at'
  };

  export type CommentLikeScalarFieldEnum = (typeof CommentLikeScalarFieldEnum)[keyof typeof CommentLikeScalarFieldEnum]


  export const AssetScalarFieldEnum: {
    id: 'id',
    key: 'key',
    url: 'url'
  };

  export type AssetScalarFieldEnum = (typeof AssetScalarFieldEnum)[keyof typeof AssetScalarFieldEnum]


  export const PostDraftScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content'
  };

  export type PostDraftScalarFieldEnum = (typeof PostDraftScalarFieldEnum)[keyof typeof PostDraftScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    email: 'email',
    token: 'token',
    type: 'type',
    expiresIn: 'expiresIn'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostModelWhereInput = {
    AND?: PostModelWhereInput | PostModelWhereInput[]
    OR?: PostModelWhereInput[]
    NOT?: PostModelWhereInput | PostModelWhereInput[]
    id?: IntFilter<"PostModel"> | number
    created_at?: DateTimeFilter<"PostModel"> | Date | string
    updated_at?: DateTimeFilter<"PostModel"> | Date | string
    content?: StringFilter<"PostModel"> | string
    userId?: StringFilter<"PostModel"> | string
    User?: XOR<UserRelationFilter, UserWhereInput>
    Like?: PostLikeListRelationFilter
    Comment?: CommentListRelationFilter
  }

  export type PostModelOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
    Like?: PostLikeOrderByRelationAggregateInput
    Comment?: CommentOrderByRelationAggregateInput
  }

  export type PostModelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostModelWhereInput | PostModelWhereInput[]
    OR?: PostModelWhereInput[]
    NOT?: PostModelWhereInput | PostModelWhereInput[]
    created_at?: DateTimeFilter<"PostModel"> | Date | string
    updated_at?: DateTimeFilter<"PostModel"> | Date | string
    content?: StringFilter<"PostModel"> | string
    userId?: StringFilter<"PostModel"> | string
    User?: XOR<UserRelationFilter, UserWhereInput>
    Like?: PostLikeListRelationFilter
    Comment?: CommentListRelationFilter
  }, "id">

  export type PostModelOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    _count?: PostModelCountOrderByAggregateInput
    _avg?: PostModelAvgOrderByAggregateInput
    _max?: PostModelMaxOrderByAggregateInput
    _min?: PostModelMinOrderByAggregateInput
    _sum?: PostModelSumOrderByAggregateInput
  }

  export type PostModelScalarWhereWithAggregatesInput = {
    AND?: PostModelScalarWhereWithAggregatesInput | PostModelScalarWhereWithAggregatesInput[]
    OR?: PostModelScalarWhereWithAggregatesInput[]
    NOT?: PostModelScalarWhereWithAggregatesInput | PostModelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PostModel"> | number
    created_at?: DateTimeWithAggregatesFilter<"PostModel"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PostModel"> | Date | string
    content?: StringWithAggregatesFilter<"PostModel"> | string
    userId?: StringWithAggregatesFilter<"PostModel"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    surname?: StringFilter<"User"> | string
    bio?: StringFilter<"User"> | string
    userAvatar?: StringFilter<"User"> | string
    userCover?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    posts?: PostModelListRelationFilter
    likedPosts?: PostLikeListRelationFilter
    comments?: CommentListRelationFilter
    likedComments?: CommentLikeListRelationFilter
    postDraft?: XOR<PostDraftNullableRelationFilter, PostDraftWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    bio?: SortOrder
    userAvatar?: SortOrder
    userCover?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    posts?: PostModelOrderByRelationAggregateInput
    likedPosts?: PostLikeOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    likedComments?: CommentLikeOrderByRelationAggregateInput
    postDraft?: PostDraftOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    surname?: StringFilter<"User"> | string
    bio?: StringFilter<"User"> | string
    userAvatar?: StringFilter<"User"> | string
    userCover?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    posts?: PostModelListRelationFilter
    likedPosts?: PostLikeListRelationFilter
    comments?: CommentListRelationFilter
    likedComments?: CommentLikeListRelationFilter
    postDraft?: XOR<PostDraftNullableRelationFilter, PostDraftWhereInput> | null
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    bio?: SortOrder
    userAvatar?: SortOrder
    userCover?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    surname?: StringWithAggregatesFilter<"User"> | string
    bio?: StringWithAggregatesFilter<"User"> | string
    userAvatar?: StringWithAggregatesFilter<"User"> | string
    userCover?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
    postId?: IntFilter<"Comment"> | number
    userId?: StringFilter<"Comment"> | string
    parentId?: IntNullableFilter<"Comment"> | number | null
    post?: XOR<PostModelRelationFilter, PostModelWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    Like?: CommentLikeListRelationFilter
    parentComment?: XOR<CommentNullableRelationFilter, CommentWhereInput> | null
    subComments?: CommentListRelationFilter
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    post?: PostModelOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    Like?: CommentLikeOrderByRelationAggregateInput
    parentComment?: CommentOrderByWithRelationInput
    subComments?: CommentOrderByRelationAggregateInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
    postId?: IntFilter<"Comment"> | number
    userId?: StringFilter<"Comment"> | string
    parentId?: IntNullableFilter<"Comment"> | number | null
    post?: XOR<PostModelRelationFilter, PostModelWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    Like?: CommentLikeListRelationFilter
    parentComment?: XOR<CommentNullableRelationFilter, CommentWhereInput> | null
    subComments?: CommentListRelationFilter
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    content?: StringWithAggregatesFilter<"Comment"> | string
    created_at?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    postId?: IntWithAggregatesFilter<"Comment"> | number
    userId?: StringWithAggregatesFilter<"Comment"> | string
    parentId?: IntNullableWithAggregatesFilter<"Comment"> | number | null
  }

  export type PostLikeWhereInput = {
    AND?: PostLikeWhereInput | PostLikeWhereInput[]
    OR?: PostLikeWhereInput[]
    NOT?: PostLikeWhereInput | PostLikeWhereInput[]
    userId?: StringFilter<"PostLike"> | string
    postId?: IntFilter<"PostLike"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    post?: XOR<PostModelRelationFilter, PostModelWhereInput>
  }

  export type PostLikeOrderByWithRelationInput = {
    userId?: SortOrder
    postId?: SortOrder
    user?: UserOrderByWithRelationInput
    post?: PostModelOrderByWithRelationInput
  }

  export type PostLikeWhereUniqueInput = Prisma.AtLeast<{
    userId_postId?: PostLikeUserIdPostIdCompoundUniqueInput
    AND?: PostLikeWhereInput | PostLikeWhereInput[]
    OR?: PostLikeWhereInput[]
    NOT?: PostLikeWhereInput | PostLikeWhereInput[]
    userId?: StringFilter<"PostLike"> | string
    postId?: IntFilter<"PostLike"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    post?: XOR<PostModelRelationFilter, PostModelWhereInput>
  }, "userId_postId">

  export type PostLikeOrderByWithAggregationInput = {
    userId?: SortOrder
    postId?: SortOrder
    _count?: PostLikeCountOrderByAggregateInput
    _avg?: PostLikeAvgOrderByAggregateInput
    _max?: PostLikeMaxOrderByAggregateInput
    _min?: PostLikeMinOrderByAggregateInput
    _sum?: PostLikeSumOrderByAggregateInput
  }

  export type PostLikeScalarWhereWithAggregatesInput = {
    AND?: PostLikeScalarWhereWithAggregatesInput | PostLikeScalarWhereWithAggregatesInput[]
    OR?: PostLikeScalarWhereWithAggregatesInput[]
    NOT?: PostLikeScalarWhereWithAggregatesInput | PostLikeScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"PostLike"> | string
    postId?: IntWithAggregatesFilter<"PostLike"> | number
  }

  export type CommentLikeWhereInput = {
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    userId?: StringFilter<"CommentLike"> | string
    commentId?: IntFilter<"CommentLike"> | number
    created_at?: DateTimeFilter<"CommentLike"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    comment?: XOR<CommentRelationFilter, CommentWhereInput>
  }

  export type CommentLikeOrderByWithRelationInput = {
    userId?: SortOrder
    commentId?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    comment?: CommentOrderByWithRelationInput
  }

  export type CommentLikeWhereUniqueInput = Prisma.AtLeast<{
    userId_commentId?: CommentLikeUserIdCommentIdCompoundUniqueInput
    AND?: CommentLikeWhereInput | CommentLikeWhereInput[]
    OR?: CommentLikeWhereInput[]
    NOT?: CommentLikeWhereInput | CommentLikeWhereInput[]
    userId?: StringFilter<"CommentLike"> | string
    commentId?: IntFilter<"CommentLike"> | number
    created_at?: DateTimeFilter<"CommentLike"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    comment?: XOR<CommentRelationFilter, CommentWhereInput>
  }, "userId_commentId">

  export type CommentLikeOrderByWithAggregationInput = {
    userId?: SortOrder
    commentId?: SortOrder
    created_at?: SortOrder
    _count?: CommentLikeCountOrderByAggregateInput
    _avg?: CommentLikeAvgOrderByAggregateInput
    _max?: CommentLikeMaxOrderByAggregateInput
    _min?: CommentLikeMinOrderByAggregateInput
    _sum?: CommentLikeSumOrderByAggregateInput
  }

  export type CommentLikeScalarWhereWithAggregatesInput = {
    AND?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    OR?: CommentLikeScalarWhereWithAggregatesInput[]
    NOT?: CommentLikeScalarWhereWithAggregatesInput | CommentLikeScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"CommentLike"> | string
    commentId?: IntWithAggregatesFilter<"CommentLike"> | number
    created_at?: DateTimeWithAggregatesFilter<"CommentLike"> | Date | string
  }

  export type AssetWhereInput = {
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: IntFilter<"Asset"> | number
    key?: StringFilter<"Asset"> | string
    url?: StringFilter<"Asset"> | string
    post?: XOR<PostDraftNullableRelationFilter, PostDraftWhereInput> | null
  }

  export type AssetOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    post?: PostDraftOrderByWithRelationInput
  }

  export type AssetWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AssetWhereInput | AssetWhereInput[]
    OR?: AssetWhereInput[]
    NOT?: AssetWhereInput | AssetWhereInput[]
    id?: IntFilter<"Asset"> | number
    url?: StringFilter<"Asset"> | string
    post?: XOR<PostDraftNullableRelationFilter, PostDraftWhereInput> | null
  }, "key">

  export type AssetOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
    _count?: AssetCountOrderByAggregateInput
    _avg?: AssetAvgOrderByAggregateInput
    _max?: AssetMaxOrderByAggregateInput
    _min?: AssetMinOrderByAggregateInput
    _sum?: AssetSumOrderByAggregateInput
  }

  export type AssetScalarWhereWithAggregatesInput = {
    AND?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    OR?: AssetScalarWhereWithAggregatesInput[]
    NOT?: AssetScalarWhereWithAggregatesInput | AssetScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Asset"> | number
    key?: StringWithAggregatesFilter<"Asset"> | string
    url?: StringWithAggregatesFilter<"Asset"> | string
  }

  export type PostDraftWhereInput = {
    AND?: PostDraftWhereInput | PostDraftWhereInput[]
    OR?: PostDraftWhereInput[]
    NOT?: PostDraftWhereInput | PostDraftWhereInput[]
    id?: IntFilter<"PostDraft"> | number
    userId?: StringFilter<"PostDraft"> | string
    content?: StringFilter<"PostDraft"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    media?: AssetListRelationFilter
  }

  export type PostDraftOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    user?: UserOrderByWithRelationInput
    media?: AssetOrderByRelationAggregateInput
  }

  export type PostDraftWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: PostDraftWhereInput | PostDraftWhereInput[]
    OR?: PostDraftWhereInput[]
    NOT?: PostDraftWhereInput | PostDraftWhereInput[]
    content?: StringFilter<"PostDraft"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    media?: AssetListRelationFilter
  }, "id" | "userId">

  export type PostDraftOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    _count?: PostDraftCountOrderByAggregateInput
    _avg?: PostDraftAvgOrderByAggregateInput
    _max?: PostDraftMaxOrderByAggregateInput
    _min?: PostDraftMinOrderByAggregateInput
    _sum?: PostDraftSumOrderByAggregateInput
  }

  export type PostDraftScalarWhereWithAggregatesInput = {
    AND?: PostDraftScalarWhereWithAggregatesInput | PostDraftScalarWhereWithAggregatesInput[]
    OR?: PostDraftScalarWhereWithAggregatesInput[]
    NOT?: PostDraftScalarWhereWithAggregatesInput | PostDraftScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PostDraft"> | number
    userId?: StringWithAggregatesFilter<"PostDraft"> | string
    content?: StringWithAggregatesFilter<"PostDraft"> | string
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    email?: StringFilter<"Token"> | string
    token?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeFilter<"Token"> | Date | string
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    email?: StringFilter<"Token"> | string
    type?: EnumTokenTypeFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeFilter<"Token"> | Date | string
  }, "id" | "token">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    email?: StringWithAggregatesFilter<"Token"> | string
    token?: StringWithAggregatesFilter<"Token"> | string
    type?: EnumTokenTypeWithAggregatesFilter<"Token"> | $Enums.TokenType
    expiresIn?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type PostModelCreateInput = {
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    User: UserCreateNestedOneWithoutPostsInput
    Like?: PostLikeCreateNestedManyWithoutPostInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostModelUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    userId: string
    Like?: PostLikeUncheckedCreateNestedManyWithoutPostInput
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostModelUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutPostsNestedInput
    Like?: PostLikeUpdateManyWithoutPostNestedInput
    Comment?: CommentUpdateManyWithoutPostNestedInput
  }

  export type PostModelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Like?: PostLikeUncheckedUpdateManyWithoutPostNestedInput
    Comment?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostModelCreateManyInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    userId: string
  }

  export type PostModelUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PostModelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeCreateNestedManyWithoutUserInput
    postDraft?: PostDraftCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    postDraft?: PostDraftUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: PostModelCreateNestedOneWithoutCommentInput
    user: UserCreateNestedOneWithoutCommentsInput
    Like?: CommentLikeCreateNestedManyWithoutCommentInput
    parentComment?: CommentCreateNestedOneWithoutSubCommentsInput
    subComments?: CommentCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
    parentId?: number | null
    Like?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
    subComments?: CommentUncheckedCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostModelUpdateOneRequiredWithoutCommentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    Like?: CommentLikeUpdateManyWithoutCommentNestedInput
    parentComment?: CommentUpdateOneWithoutSubCommentsNestedInput
    subComments?: CommentUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    Like?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
    subComments?: CommentUncheckedUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentCreateManyInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
    parentId?: number | null
  }

  export type CommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PostLikeCreateInput = {
    user: UserCreateNestedOneWithoutLikedPostsInput
    post: PostModelCreateNestedOneWithoutLikeInput
  }

  export type PostLikeUncheckedCreateInput = {
    userId: string
    postId: number
  }

  export type PostLikeUpdateInput = {
    user?: UserUpdateOneRequiredWithoutLikedPostsNestedInput
    post?: PostModelUpdateOneRequiredWithoutLikeNestedInput
  }

  export type PostLikeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type PostLikeCreateManyInput = {
    userId: string
    postId: number
  }

  export type PostLikeUpdateManyMutationInput = {

  }

  export type PostLikeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentLikeCreateInput = {
    created_at?: Date | string
    user: UserCreateNestedOneWithoutLikedCommentsInput
    comment: CommentCreateNestedOneWithoutLikeInput
  }

  export type CommentLikeUncheckedCreateInput = {
    userId: string
    commentId: number
    created_at?: Date | string
  }

  export type CommentLikeUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikedCommentsNestedInput
    comment?: CommentUpdateOneRequiredWithoutLikeNestedInput
  }

  export type CommentLikeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeCreateManyInput = {
    userId: string
    commentId: number
    created_at?: Date | string
  }

  export type CommentLikeUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    commentId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssetCreateInput = {
    key: string
    url: string
    post?: PostDraftCreateNestedOneWithoutMediaInput
  }

  export type AssetUncheckedCreateInput = {
    id: number
    key: string
    url: string
  }

  export type AssetUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    post?: PostDraftUpdateOneWithoutMediaNestedInput
  }

  export type AssetUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AssetCreateManyInput = {
    id: number
    key: string
    url: string
  }

  export type AssetUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AssetUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type PostDraftCreateInput = {
    content: string
    user: UserCreateNestedOneWithoutPostDraftInput
    media?: AssetCreateNestedManyWithoutPostInput
  }

  export type PostDraftUncheckedCreateInput = {
    id?: number
    userId: string
    content: string
    media?: AssetUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostDraftUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPostDraftNestedInput
    media?: AssetUpdateManyWithoutPostNestedInput
  }

  export type PostDraftUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    media?: AssetUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostDraftCreateManyInput = {
    id?: number
    userId: string
    content: string
  }

  export type PostDraftUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PostDraftUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type TokenCreateInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateManyInput = {
    id?: string
    email: string
    token: string
    type: $Enums.TokenType
    expiresIn: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    expiresIn?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostLikeListRelationFilter = {
    every?: PostLikeWhereInput
    some?: PostLikeWhereInput
    none?: PostLikeWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type PostLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostModelCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    content?: SortOrder
    userId?: SortOrder
  }

  export type PostModelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostModelMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    content?: SortOrder
    userId?: SortOrder
  }

  export type PostModelMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    content?: SortOrder
    userId?: SortOrder
  }

  export type PostModelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type PostModelListRelationFilter = {
    every?: PostModelWhereInput
    some?: PostModelWhereInput
    none?: PostModelWhereInput
  }

  export type CommentLikeListRelationFilter = {
    every?: CommentLikeWhereInput
    some?: CommentLikeWhereInput
    none?: CommentLikeWhereInput
  }

  export type PostDraftNullableRelationFilter = {
    is?: PostDraftWhereInput | null
    isNot?: PostDraftWhereInput | null
  }

  export type PostModelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    bio?: SortOrder
    userAvatar?: SortOrder
    userCover?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    bio?: SortOrder
    userAvatar?: SortOrder
    userCover?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    bio?: SortOrder
    userAvatar?: SortOrder
    userCover?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PostModelRelationFilter = {
    is?: PostModelWhereInput
    isNot?: PostModelWhereInput
  }

  export type CommentNullableRelationFilter = {
    is?: CommentWhereInput | null
    isNot?: CommentWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    parentId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    parentId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PostLikeUserIdPostIdCompoundUniqueInput = {
    userId: string
    postId: number
  }

  export type PostLikeCountOrderByAggregateInput = {
    userId?: SortOrder
    postId?: SortOrder
  }

  export type PostLikeAvgOrderByAggregateInput = {
    postId?: SortOrder
  }

  export type PostLikeMaxOrderByAggregateInput = {
    userId?: SortOrder
    postId?: SortOrder
  }

  export type PostLikeMinOrderByAggregateInput = {
    userId?: SortOrder
    postId?: SortOrder
  }

  export type PostLikeSumOrderByAggregateInput = {
    postId?: SortOrder
  }

  export type CommentRelationFilter = {
    is?: CommentWhereInput
    isNot?: CommentWhereInput
  }

  export type CommentLikeUserIdCommentIdCompoundUniqueInput = {
    userId: string
    commentId: number
  }

  export type CommentLikeCountOrderByAggregateInput = {
    userId?: SortOrder
    commentId?: SortOrder
    created_at?: SortOrder
  }

  export type CommentLikeAvgOrderByAggregateInput = {
    commentId?: SortOrder
  }

  export type CommentLikeMaxOrderByAggregateInput = {
    userId?: SortOrder
    commentId?: SortOrder
    created_at?: SortOrder
  }

  export type CommentLikeMinOrderByAggregateInput = {
    userId?: SortOrder
    commentId?: SortOrder
    created_at?: SortOrder
  }

  export type CommentLikeSumOrderByAggregateInput = {
    commentId?: SortOrder
  }

  export type AssetCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
  }

  export type AssetAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AssetMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
  }

  export type AssetMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    url?: SortOrder
  }

  export type AssetSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AssetListRelationFilter = {
    every?: AssetWhereInput
    some?: AssetWhereInput
    none?: AssetWhereInput
  }

  export type AssetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostDraftCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
  }

  export type PostDraftAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostDraftMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
  }

  export type PostDraftMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
  }

  export type PostDraftSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expiresIn?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostLikeCreateNestedManyWithoutPostInput = {
    create?: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput> | PostLikeCreateWithoutPostInput[] | PostLikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutPostInput | PostLikeCreateOrConnectWithoutPostInput[]
    createMany?: PostLikeCreateManyPostInputEnvelope
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type PostLikeUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput> | PostLikeCreateWithoutPostInput[] | PostLikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutPostInput | PostLikeCreateOrConnectWithoutPostInput[]
    createMany?: PostLikeCreateManyPostInputEnvelope
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostLikeUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput> | PostLikeCreateWithoutPostInput[] | PostLikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutPostInput | PostLikeCreateOrConnectWithoutPostInput[]
    upsert?: PostLikeUpsertWithWhereUniqueWithoutPostInput | PostLikeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostLikeCreateManyPostInputEnvelope
    set?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    disconnect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    delete?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    update?: PostLikeUpdateWithWhereUniqueWithoutPostInput | PostLikeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostLikeUpdateManyWithWhereWithoutPostInput | PostLikeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PostLikeUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput> | PostLikeCreateWithoutPostInput[] | PostLikeUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutPostInput | PostLikeCreateOrConnectWithoutPostInput[]
    upsert?: PostLikeUpsertWithWhereUniqueWithoutPostInput | PostLikeUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostLikeCreateManyPostInputEnvelope
    set?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    disconnect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    delete?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    update?: PostLikeUpdateWithWhereUniqueWithoutPostInput | PostLikeUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostLikeUpdateManyWithWhereWithoutPostInput | PostLikeUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type PostModelCreateNestedManyWithoutUserInput = {
    create?: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput> | PostModelCreateWithoutUserInput[] | PostModelUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostModelCreateOrConnectWithoutUserInput | PostModelCreateOrConnectWithoutUserInput[]
    createMany?: PostModelCreateManyUserInputEnvelope
    connect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
  }

  export type PostLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput> | PostLikeCreateWithoutUserInput[] | PostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutUserInput | PostLikeCreateOrConnectWithoutUserInput[]
    createMany?: PostLikeCreateManyUserInputEnvelope
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CommentLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type PostDraftCreateNestedOneWithoutUserInput = {
    create?: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutUserInput
    connect?: PostDraftWhereUniqueInput
  }

  export type PostModelUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput> | PostModelCreateWithoutUserInput[] | PostModelUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostModelCreateOrConnectWithoutUserInput | PostModelCreateOrConnectWithoutUserInput[]
    createMany?: PostModelCreateManyUserInputEnvelope
    connect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
  }

  export type PostLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput> | PostLikeCreateWithoutUserInput[] | PostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutUserInput | PostLikeCreateOrConnectWithoutUserInput[]
    createMany?: PostLikeCreateManyUserInputEnvelope
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CommentLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type PostDraftUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutUserInput
    connect?: PostDraftWhereUniqueInput
  }

  export type PostModelUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput> | PostModelCreateWithoutUserInput[] | PostModelUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostModelCreateOrConnectWithoutUserInput | PostModelCreateOrConnectWithoutUserInput[]
    upsert?: PostModelUpsertWithWhereUniqueWithoutUserInput | PostModelUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostModelCreateManyUserInputEnvelope
    set?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    disconnect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    delete?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    connect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    update?: PostModelUpdateWithWhereUniqueWithoutUserInput | PostModelUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostModelUpdateManyWithWhereWithoutUserInput | PostModelUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostModelScalarWhereInput | PostModelScalarWhereInput[]
  }

  export type PostLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput> | PostLikeCreateWithoutUserInput[] | PostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutUserInput | PostLikeCreateOrConnectWithoutUserInput[]
    upsert?: PostLikeUpsertWithWhereUniqueWithoutUserInput | PostLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostLikeCreateManyUserInputEnvelope
    set?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    disconnect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    delete?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    update?: PostLikeUpdateWithWhereUniqueWithoutUserInput | PostLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostLikeUpdateManyWithWhereWithoutUserInput | PostLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CommentLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type PostDraftUpdateOneWithoutUserNestedInput = {
    create?: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutUserInput
    upsert?: PostDraftUpsertWithoutUserInput
    disconnect?: PostDraftWhereInput | boolean
    delete?: PostDraftWhereInput | boolean
    connect?: PostDraftWhereUniqueInput
    update?: XOR<XOR<PostDraftUpdateToOneWithWhereWithoutUserInput, PostDraftUpdateWithoutUserInput>, PostDraftUncheckedUpdateWithoutUserInput>
  }

  export type PostModelUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput> | PostModelCreateWithoutUserInput[] | PostModelUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostModelCreateOrConnectWithoutUserInput | PostModelCreateOrConnectWithoutUserInput[]
    upsert?: PostModelUpsertWithWhereUniqueWithoutUserInput | PostModelUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostModelCreateManyUserInputEnvelope
    set?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    disconnect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    delete?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    connect?: PostModelWhereUniqueInput | PostModelWhereUniqueInput[]
    update?: PostModelUpdateWithWhereUniqueWithoutUserInput | PostModelUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostModelUpdateManyWithWhereWithoutUserInput | PostModelUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostModelScalarWhereInput | PostModelScalarWhereInput[]
  }

  export type PostLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput> | PostLikeCreateWithoutUserInput[] | PostLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostLikeCreateOrConnectWithoutUserInput | PostLikeCreateOrConnectWithoutUserInput[]
    upsert?: PostLikeUpsertWithWhereUniqueWithoutUserInput | PostLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostLikeCreateManyUserInputEnvelope
    set?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    disconnect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    delete?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    connect?: PostLikeWhereUniqueInput | PostLikeWhereUniqueInput[]
    update?: PostLikeUpdateWithWhereUniqueWithoutUserInput | PostLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostLikeUpdateManyWithWhereWithoutUserInput | PostLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput> | CommentLikeCreateWithoutUserInput[] | CommentLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutUserInput | CommentLikeCreateOrConnectWithoutUserInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutUserInput | CommentLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentLikeCreateManyUserInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutUserInput | CommentLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutUserInput | CommentLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type PostDraftUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutUserInput
    upsert?: PostDraftUpsertWithoutUserInput
    disconnect?: PostDraftWhereInput | boolean
    delete?: PostDraftWhereInput | boolean
    connect?: PostDraftWhereUniqueInput
    update?: XOR<XOR<PostDraftUpdateToOneWithWhereWithoutUserInput, PostDraftUpdateWithoutUserInput>, PostDraftUncheckedUpdateWithoutUserInput>
  }

  export type PostModelCreateNestedOneWithoutCommentInput = {
    create?: XOR<PostModelCreateWithoutCommentInput, PostModelUncheckedCreateWithoutCommentInput>
    connectOrCreate?: PostModelCreateOrConnectWithoutCommentInput
    connect?: PostModelWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentLikeCreateNestedManyWithoutCommentInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type CommentCreateNestedOneWithoutSubCommentsInput = {
    create?: XOR<CommentCreateWithoutSubCommentsInput, CommentUncheckedCreateWithoutSubCommentsInput>
    connectOrCreate?: CommentCreateOrConnectWithoutSubCommentsInput
    connect?: CommentWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutParentCommentInput = {
    create?: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput> | CommentCreateWithoutParentCommentInput[] | CommentUncheckedCreateWithoutParentCommentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentCommentInput | CommentCreateOrConnectWithoutParentCommentInput[]
    createMany?: CommentCreateManyParentCommentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CommentLikeUncheckedCreateNestedManyWithoutCommentInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutParentCommentInput = {
    create?: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput> | CommentCreateWithoutParentCommentInput[] | CommentUncheckedCreateWithoutParentCommentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentCommentInput | CommentCreateOrConnectWithoutParentCommentInput[]
    createMany?: CommentCreateManyParentCommentInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type PostModelUpdateOneRequiredWithoutCommentNestedInput = {
    create?: XOR<PostModelCreateWithoutCommentInput, PostModelUncheckedCreateWithoutCommentInput>
    connectOrCreate?: PostModelCreateOrConnectWithoutCommentInput
    upsert?: PostModelUpsertWithoutCommentInput
    connect?: PostModelWhereUniqueInput
    update?: XOR<XOR<PostModelUpdateToOneWithWhereWithoutCommentInput, PostModelUpdateWithoutCommentInput>, PostModelUncheckedUpdateWithoutCommentInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type CommentLikeUpdateManyWithoutCommentNestedInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutCommentInput | CommentLikeUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutCommentInput | CommentLikeUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutCommentInput | CommentLikeUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type CommentUpdateOneWithoutSubCommentsNestedInput = {
    create?: XOR<CommentCreateWithoutSubCommentsInput, CommentUncheckedCreateWithoutSubCommentsInput>
    connectOrCreate?: CommentCreateOrConnectWithoutSubCommentsInput
    upsert?: CommentUpsertWithoutSubCommentsInput
    disconnect?: CommentWhereInput | boolean
    delete?: CommentWhereInput | boolean
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutSubCommentsInput, CommentUpdateWithoutSubCommentsInput>, CommentUncheckedUpdateWithoutSubCommentsInput>
  }

  export type CommentUpdateManyWithoutParentCommentNestedInput = {
    create?: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput> | CommentCreateWithoutParentCommentInput[] | CommentUncheckedCreateWithoutParentCommentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentCommentInput | CommentCreateOrConnectWithoutParentCommentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentCommentInput | CommentUpsertWithWhereUniqueWithoutParentCommentInput[]
    createMany?: CommentCreateManyParentCommentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentCommentInput | CommentUpdateWithWhereUniqueWithoutParentCommentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentCommentInput | CommentUpdateManyWithWhereWithoutParentCommentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CommentLikeUncheckedUpdateManyWithoutCommentNestedInput = {
    create?: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput> | CommentLikeCreateWithoutCommentInput[] | CommentLikeUncheckedCreateWithoutCommentInput[]
    connectOrCreate?: CommentLikeCreateOrConnectWithoutCommentInput | CommentLikeCreateOrConnectWithoutCommentInput[]
    upsert?: CommentLikeUpsertWithWhereUniqueWithoutCommentInput | CommentLikeUpsertWithWhereUniqueWithoutCommentInput[]
    createMany?: CommentLikeCreateManyCommentInputEnvelope
    set?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    disconnect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    delete?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    connect?: CommentLikeWhereUniqueInput | CommentLikeWhereUniqueInput[]
    update?: CommentLikeUpdateWithWhereUniqueWithoutCommentInput | CommentLikeUpdateWithWhereUniqueWithoutCommentInput[]
    updateMany?: CommentLikeUpdateManyWithWhereWithoutCommentInput | CommentLikeUpdateManyWithWhereWithoutCommentInput[]
    deleteMany?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutParentCommentNestedInput = {
    create?: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput> | CommentCreateWithoutParentCommentInput[] | CommentUncheckedCreateWithoutParentCommentInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutParentCommentInput | CommentCreateOrConnectWithoutParentCommentInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutParentCommentInput | CommentUpsertWithWhereUniqueWithoutParentCommentInput[]
    createMany?: CommentCreateManyParentCommentInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutParentCommentInput | CommentUpdateWithWhereUniqueWithoutParentCommentInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutParentCommentInput | CommentUpdateManyWithWhereWithoutParentCommentInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLikedPostsInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostModelCreateNestedOneWithoutLikeInput = {
    create?: XOR<PostModelCreateWithoutLikeInput, PostModelUncheckedCreateWithoutLikeInput>
    connectOrCreate?: PostModelCreateOrConnectWithoutLikeInput
    connect?: PostModelWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedPostsNestedInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput
    upsert?: UserUpsertWithoutLikedPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedPostsInput, UserUpdateWithoutLikedPostsInput>, UserUncheckedUpdateWithoutLikedPostsInput>
  }

  export type PostModelUpdateOneRequiredWithoutLikeNestedInput = {
    create?: XOR<PostModelCreateWithoutLikeInput, PostModelUncheckedCreateWithoutLikeInput>
    connectOrCreate?: PostModelCreateOrConnectWithoutLikeInput
    upsert?: PostModelUpsertWithoutLikeInput
    connect?: PostModelWhereUniqueInput
    update?: XOR<XOR<PostModelUpdateToOneWithWhereWithoutLikeInput, PostModelUpdateWithoutLikeInput>, PostModelUncheckedUpdateWithoutLikeInput>
  }

  export type UserCreateNestedOneWithoutLikedCommentsInput = {
    create?: XOR<UserCreateWithoutLikedCommentsInput, UserUncheckedCreateWithoutLikedCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentCreateNestedOneWithoutLikeInput = {
    create?: XOR<CommentCreateWithoutLikeInput, CommentUncheckedCreateWithoutLikeInput>
    connectOrCreate?: CommentCreateOrConnectWithoutLikeInput
    connect?: CommentWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLikedCommentsNestedInput = {
    create?: XOR<UserCreateWithoutLikedCommentsInput, UserUncheckedCreateWithoutLikedCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLikedCommentsInput
    upsert?: UserUpsertWithoutLikedCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLikedCommentsInput, UserUpdateWithoutLikedCommentsInput>, UserUncheckedUpdateWithoutLikedCommentsInput>
  }

  export type CommentUpdateOneRequiredWithoutLikeNestedInput = {
    create?: XOR<CommentCreateWithoutLikeInput, CommentUncheckedCreateWithoutLikeInput>
    connectOrCreate?: CommentCreateOrConnectWithoutLikeInput
    upsert?: CommentUpsertWithoutLikeInput
    connect?: CommentWhereUniqueInput
    update?: XOR<XOR<CommentUpdateToOneWithWhereWithoutLikeInput, CommentUpdateWithoutLikeInput>, CommentUncheckedUpdateWithoutLikeInput>
  }

  export type PostDraftCreateNestedOneWithoutMediaInput = {
    create?: XOR<PostDraftCreateWithoutMediaInput, PostDraftUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutMediaInput
    connect?: PostDraftWhereUniqueInput
  }

  export type PostDraftUpdateOneWithoutMediaNestedInput = {
    create?: XOR<PostDraftCreateWithoutMediaInput, PostDraftUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PostDraftCreateOrConnectWithoutMediaInput
    upsert?: PostDraftUpsertWithoutMediaInput
    disconnect?: PostDraftWhereInput | boolean
    delete?: PostDraftWhereInput | boolean
    connect?: PostDraftWhereUniqueInput
    update?: XOR<XOR<PostDraftUpdateToOneWithWhereWithoutMediaInput, PostDraftUpdateWithoutMediaInput>, PostDraftUncheckedUpdateWithoutMediaInput>
  }

  export type UserCreateNestedOneWithoutPostDraftInput = {
    create?: XOR<UserCreateWithoutPostDraftInput, UserUncheckedCreateWithoutPostDraftInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostDraftInput
    connect?: UserWhereUniqueInput
  }

  export type AssetCreateNestedManyWithoutPostInput = {
    create?: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput> | AssetCreateWithoutPostInput[] | AssetUncheckedCreateWithoutPostInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutPostInput | AssetCreateOrConnectWithoutPostInput[]
    createMany?: AssetCreateManyPostInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type AssetUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput> | AssetCreateWithoutPostInput[] | AssetUncheckedCreateWithoutPostInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutPostInput | AssetCreateOrConnectWithoutPostInput[]
    createMany?: AssetCreateManyPostInputEnvelope
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutPostDraftNestedInput = {
    create?: XOR<UserCreateWithoutPostDraftInput, UserUncheckedCreateWithoutPostDraftInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostDraftInput
    upsert?: UserUpsertWithoutPostDraftInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostDraftInput, UserUpdateWithoutPostDraftInput>, UserUncheckedUpdateWithoutPostDraftInput>
  }

  export type AssetUpdateManyWithoutPostNestedInput = {
    create?: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput> | AssetCreateWithoutPostInput[] | AssetUncheckedCreateWithoutPostInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutPostInput | AssetCreateOrConnectWithoutPostInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutPostInput | AssetUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: AssetCreateManyPostInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutPostInput | AssetUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutPostInput | AssetUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type AssetUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput> | AssetCreateWithoutPostInput[] | AssetUncheckedCreateWithoutPostInput[]
    connectOrCreate?: AssetCreateOrConnectWithoutPostInput | AssetCreateOrConnectWithoutPostInput[]
    upsert?: AssetUpsertWithWhereUniqueWithoutPostInput | AssetUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: AssetCreateManyPostInputEnvelope
    set?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    disconnect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    delete?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    connect?: AssetWhereUniqueInput | AssetWhereUniqueInput[]
    update?: AssetUpdateWithWhereUniqueWithoutPostInput | AssetUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: AssetUpdateManyWithWhereWithoutPostInput | AssetUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: AssetScalarWhereInput | AssetScalarWhereInput[]
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    likedPosts?: PostLikeCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeCreateNestedManyWithoutUserInput
    postDraft?: PostDraftCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    likedPosts?: PostLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    postDraft?: PostDraftUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostLikeCreateWithoutPostInput = {
    user: UserCreateNestedOneWithoutLikedPostsInput
  }

  export type PostLikeUncheckedCreateWithoutPostInput = {
    userId: string
  }

  export type PostLikeCreateOrConnectWithoutPostInput = {
    where: PostLikeWhereUniqueInput
    create: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput>
  }

  export type PostLikeCreateManyPostInputEnvelope = {
    data: PostLikeCreateManyPostInput | PostLikeCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutPostInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
    Like?: CommentLikeCreateNestedManyWithoutCommentInput
    parentComment?: CommentCreateNestedOneWithoutSubCommentsInput
    subComments?: CommentCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    userId: string
    parentId?: number | null
    Like?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
    subComments?: CommentUncheckedCreateNestedManyWithoutParentCommentInput
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    likedPosts?: PostLikeUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    likedPosts?: PostLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostLikeUpsertWithWhereUniqueWithoutPostInput = {
    where: PostLikeWhereUniqueInput
    update: XOR<PostLikeUpdateWithoutPostInput, PostLikeUncheckedUpdateWithoutPostInput>
    create: XOR<PostLikeCreateWithoutPostInput, PostLikeUncheckedCreateWithoutPostInput>
  }

  export type PostLikeUpdateWithWhereUniqueWithoutPostInput = {
    where: PostLikeWhereUniqueInput
    data: XOR<PostLikeUpdateWithoutPostInput, PostLikeUncheckedUpdateWithoutPostInput>
  }

  export type PostLikeUpdateManyWithWhereWithoutPostInput = {
    where: PostLikeScalarWhereInput
    data: XOR<PostLikeUpdateManyMutationInput, PostLikeUncheckedUpdateManyWithoutPostInput>
  }

  export type PostLikeScalarWhereInput = {
    AND?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
    OR?: PostLikeScalarWhereInput[]
    NOT?: PostLikeScalarWhereInput | PostLikeScalarWhereInput[]
    userId?: StringFilter<"PostLike"> | string
    postId?: IntFilter<"PostLike"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    created_at?: DateTimeFilter<"Comment"> | Date | string
    updated_at?: DateTimeFilter<"Comment"> | Date | string
    postId?: IntFilter<"Comment"> | number
    userId?: StringFilter<"Comment"> | string
    parentId?: IntNullableFilter<"Comment"> | number | null
  }

  export type PostModelCreateWithoutUserInput = {
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    Like?: PostLikeCreateNestedManyWithoutPostInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostModelUncheckedCreateWithoutUserInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    Like?: PostLikeUncheckedCreateNestedManyWithoutPostInput
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostModelCreateOrConnectWithoutUserInput = {
    where: PostModelWhereUniqueInput
    create: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput>
  }

  export type PostModelCreateManyUserInputEnvelope = {
    data: PostModelCreateManyUserInput | PostModelCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostLikeCreateWithoutUserInput = {
    post: PostModelCreateNestedOneWithoutLikeInput
  }

  export type PostLikeUncheckedCreateWithoutUserInput = {
    postId: number
  }

  export type PostLikeCreateOrConnectWithoutUserInput = {
    where: PostLikeWhereUniqueInput
    create: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput>
  }

  export type PostLikeCreateManyUserInputEnvelope = {
    data: PostLikeCreateManyUserInput | PostLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: PostModelCreateNestedOneWithoutCommentInput
    Like?: CommentLikeCreateNestedManyWithoutCommentInput
    parentComment?: CommentCreateNestedOneWithoutSubCommentsInput
    subComments?: CommentCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    parentId?: number | null
    Like?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
    subComments?: CommentUncheckedCreateNestedManyWithoutParentCommentInput
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CommentLikeCreateWithoutUserInput = {
    created_at?: Date | string
    comment: CommentCreateNestedOneWithoutLikeInput
  }

  export type CommentLikeUncheckedCreateWithoutUserInput = {
    commentId: number
    created_at?: Date | string
  }

  export type CommentLikeCreateOrConnectWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeCreateManyUserInputEnvelope = {
    data: CommentLikeCreateManyUserInput | CommentLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostDraftCreateWithoutUserInput = {
    content: string
    media?: AssetCreateNestedManyWithoutPostInput
  }

  export type PostDraftUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    media?: AssetUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostDraftCreateOrConnectWithoutUserInput = {
    where: PostDraftWhereUniqueInput
    create: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
  }

  export type PostModelUpsertWithWhereUniqueWithoutUserInput = {
    where: PostModelWhereUniqueInput
    update: XOR<PostModelUpdateWithoutUserInput, PostModelUncheckedUpdateWithoutUserInput>
    create: XOR<PostModelCreateWithoutUserInput, PostModelUncheckedCreateWithoutUserInput>
  }

  export type PostModelUpdateWithWhereUniqueWithoutUserInput = {
    where: PostModelWhereUniqueInput
    data: XOR<PostModelUpdateWithoutUserInput, PostModelUncheckedUpdateWithoutUserInput>
  }

  export type PostModelUpdateManyWithWhereWithoutUserInput = {
    where: PostModelScalarWhereInput
    data: XOR<PostModelUpdateManyMutationInput, PostModelUncheckedUpdateManyWithoutUserInput>
  }

  export type PostModelScalarWhereInput = {
    AND?: PostModelScalarWhereInput | PostModelScalarWhereInput[]
    OR?: PostModelScalarWhereInput[]
    NOT?: PostModelScalarWhereInput | PostModelScalarWhereInput[]
    id?: IntFilter<"PostModel"> | number
    created_at?: DateTimeFilter<"PostModel"> | Date | string
    updated_at?: DateTimeFilter<"PostModel"> | Date | string
    content?: StringFilter<"PostModel"> | string
    userId?: StringFilter<"PostModel"> | string
  }

  export type PostLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: PostLikeWhereUniqueInput
    update: XOR<PostLikeUpdateWithoutUserInput, PostLikeUncheckedUpdateWithoutUserInput>
    create: XOR<PostLikeCreateWithoutUserInput, PostLikeUncheckedCreateWithoutUserInput>
  }

  export type PostLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: PostLikeWhereUniqueInput
    data: XOR<PostLikeUpdateWithoutUserInput, PostLikeUncheckedUpdateWithoutUserInput>
  }

  export type PostLikeUpdateManyWithWhereWithoutUserInput = {
    where: PostLikeScalarWhereInput
    data: XOR<PostLikeUpdateManyMutationInput, PostLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    update: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
    create: XOR<CommentLikeCreateWithoutUserInput, CommentLikeUncheckedCreateWithoutUserInput>
  }

  export type CommentLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentLikeWhereUniqueInput
    data: XOR<CommentLikeUpdateWithoutUserInput, CommentLikeUncheckedUpdateWithoutUserInput>
  }

  export type CommentLikeUpdateManyWithWhereWithoutUserInput = {
    where: CommentLikeScalarWhereInput
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentLikeScalarWhereInput = {
    AND?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    OR?: CommentLikeScalarWhereInput[]
    NOT?: CommentLikeScalarWhereInput | CommentLikeScalarWhereInput[]
    userId?: StringFilter<"CommentLike"> | string
    commentId?: IntFilter<"CommentLike"> | number
    created_at?: DateTimeFilter<"CommentLike"> | Date | string
  }

  export type PostDraftUpsertWithoutUserInput = {
    update: XOR<PostDraftUpdateWithoutUserInput, PostDraftUncheckedUpdateWithoutUserInput>
    create: XOR<PostDraftCreateWithoutUserInput, PostDraftUncheckedCreateWithoutUserInput>
    where?: PostDraftWhereInput
  }

  export type PostDraftUpdateToOneWithWhereWithoutUserInput = {
    where?: PostDraftWhereInput
    data: XOR<PostDraftUpdateWithoutUserInput, PostDraftUncheckedUpdateWithoutUserInput>
  }

  export type PostDraftUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    media?: AssetUpdateManyWithoutPostNestedInput
  }

  export type PostDraftUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    media?: AssetUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostModelCreateWithoutCommentInput = {
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    User: UserCreateNestedOneWithoutPostsInput
    Like?: PostLikeCreateNestedManyWithoutPostInput
  }

  export type PostModelUncheckedCreateWithoutCommentInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    userId: string
    Like?: PostLikeUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostModelCreateOrConnectWithoutCommentInput = {
    where: PostModelWhereUniqueInput
    create: XOR<PostModelCreateWithoutCommentInput, PostModelUncheckedCreateWithoutCommentInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeCreateNestedManyWithoutUserInput
    postDraft?: PostDraftCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeUncheckedCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    postDraft?: PostDraftUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type CommentLikeCreateWithoutCommentInput = {
    created_at?: Date | string
    user: UserCreateNestedOneWithoutLikedCommentsInput
  }

  export type CommentLikeUncheckedCreateWithoutCommentInput = {
    userId: string
    created_at?: Date | string
  }

  export type CommentLikeCreateOrConnectWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    create: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput>
  }

  export type CommentLikeCreateManyCommentInputEnvelope = {
    data: CommentLikeCreateManyCommentInput | CommentLikeCreateManyCommentInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutSubCommentsInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: PostModelCreateNestedOneWithoutCommentInput
    user: UserCreateNestedOneWithoutCommentsInput
    Like?: CommentLikeCreateNestedManyWithoutCommentInput
    parentComment?: CommentCreateNestedOneWithoutSubCommentsInput
  }

  export type CommentUncheckedCreateWithoutSubCommentsInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
    parentId?: number | null
    Like?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
  }

  export type CommentCreateOrConnectWithoutSubCommentsInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutSubCommentsInput, CommentUncheckedCreateWithoutSubCommentsInput>
  }

  export type CommentCreateWithoutParentCommentInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: PostModelCreateNestedOneWithoutCommentInput
    user: UserCreateNestedOneWithoutCommentsInput
    Like?: CommentLikeCreateNestedManyWithoutCommentInput
    subComments?: CommentCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUncheckedCreateWithoutParentCommentInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
    Like?: CommentLikeUncheckedCreateNestedManyWithoutCommentInput
    subComments?: CommentUncheckedCreateNestedManyWithoutParentCommentInput
  }

  export type CommentCreateOrConnectWithoutParentCommentInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput>
  }

  export type CommentCreateManyParentCommentInputEnvelope = {
    data: CommentCreateManyParentCommentInput | CommentCreateManyParentCommentInput[]
    skipDuplicates?: boolean
  }

  export type PostModelUpsertWithoutCommentInput = {
    update: XOR<PostModelUpdateWithoutCommentInput, PostModelUncheckedUpdateWithoutCommentInput>
    create: XOR<PostModelCreateWithoutCommentInput, PostModelUncheckedCreateWithoutCommentInput>
    where?: PostModelWhereInput
  }

  export type PostModelUpdateToOneWithWhereWithoutCommentInput = {
    where?: PostModelWhereInput
    data: XOR<PostModelUpdateWithoutCommentInput, PostModelUncheckedUpdateWithoutCommentInput>
  }

  export type PostModelUpdateWithoutCommentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutPostsNestedInput
    Like?: PostLikeUpdateManyWithoutPostNestedInput
  }

  export type PostModelUncheckedUpdateWithoutCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Like?: PostLikeUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUncheckedUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CommentLikeUpsertWithWhereUniqueWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    update: XOR<CommentLikeUpdateWithoutCommentInput, CommentLikeUncheckedUpdateWithoutCommentInput>
    create: XOR<CommentLikeCreateWithoutCommentInput, CommentLikeUncheckedCreateWithoutCommentInput>
  }

  export type CommentLikeUpdateWithWhereUniqueWithoutCommentInput = {
    where: CommentLikeWhereUniqueInput
    data: XOR<CommentLikeUpdateWithoutCommentInput, CommentLikeUncheckedUpdateWithoutCommentInput>
  }

  export type CommentLikeUpdateManyWithWhereWithoutCommentInput = {
    where: CommentLikeScalarWhereInput
    data: XOR<CommentLikeUpdateManyMutationInput, CommentLikeUncheckedUpdateManyWithoutCommentInput>
  }

  export type CommentUpsertWithoutSubCommentsInput = {
    update: XOR<CommentUpdateWithoutSubCommentsInput, CommentUncheckedUpdateWithoutSubCommentsInput>
    create: XOR<CommentCreateWithoutSubCommentsInput, CommentUncheckedCreateWithoutSubCommentsInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutSubCommentsInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutSubCommentsInput, CommentUncheckedUpdateWithoutSubCommentsInput>
  }

  export type CommentUpdateWithoutSubCommentsInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostModelUpdateOneRequiredWithoutCommentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    Like?: CommentLikeUpdateManyWithoutCommentNestedInput
    parentComment?: CommentUpdateOneWithoutSubCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutSubCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    Like?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
  }

  export type CommentUpsertWithWhereUniqueWithoutParentCommentInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutParentCommentInput, CommentUncheckedUpdateWithoutParentCommentInput>
    create: XOR<CommentCreateWithoutParentCommentInput, CommentUncheckedCreateWithoutParentCommentInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutParentCommentInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutParentCommentInput, CommentUncheckedUpdateWithoutParentCommentInput>
  }

  export type CommentUpdateManyWithWhereWithoutParentCommentInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutParentCommentInput>
  }

  export type UserCreateWithoutLikedPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeCreateNestedManyWithoutUserInput
    postDraft?: PostDraftCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedPostsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
    postDraft?: PostDraftUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
  }

  export type PostModelCreateWithoutLikeInput = {
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    User: UserCreateNestedOneWithoutPostsInput
    Comment?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostModelUncheckedCreateWithoutLikeInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
    userId: string
    Comment?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostModelCreateOrConnectWithoutLikeInput = {
    where: PostModelWhereUniqueInput
    create: XOR<PostModelCreateWithoutLikeInput, PostModelUncheckedCreateWithoutLikeInput>
  }

  export type UserUpsertWithoutLikedPostsInput = {
    update: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
  }

  export type UserUpdateWithoutLikedPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostModelUpsertWithoutLikeInput = {
    update: XOR<PostModelUpdateWithoutLikeInput, PostModelUncheckedUpdateWithoutLikeInput>
    create: XOR<PostModelCreateWithoutLikeInput, PostModelUncheckedCreateWithoutLikeInput>
    where?: PostModelWhereInput
  }

  export type PostModelUpdateToOneWithWhereWithoutLikeInput = {
    where?: PostModelWhereInput
    data: XOR<PostModelUpdateWithoutLikeInput, PostModelUncheckedUpdateWithoutLikeInput>
  }

  export type PostModelUpdateWithoutLikeInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateOneRequiredWithoutPostsNestedInput
    Comment?: CommentUpdateManyWithoutPostNestedInput
  }

  export type PostModelUncheckedUpdateWithoutLikeInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Comment?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserCreateWithoutLikedCommentsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    postDraft?: PostDraftCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedCommentsInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    postDraft?: PostDraftUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedCommentsInput, UserUncheckedCreateWithoutLikedCommentsInput>
  }

  export type CommentCreateWithoutLikeInput = {
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: PostModelCreateNestedOneWithoutCommentInput
    user: UserCreateNestedOneWithoutCommentsInput
    parentComment?: CommentCreateNestedOneWithoutSubCommentsInput
    subComments?: CommentCreateNestedManyWithoutParentCommentInput
  }

  export type CommentUncheckedCreateWithoutLikeInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
    parentId?: number | null
    subComments?: CommentUncheckedCreateNestedManyWithoutParentCommentInput
  }

  export type CommentCreateOrConnectWithoutLikeInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutLikeInput, CommentUncheckedCreateWithoutLikeInput>
  }

  export type UserUpsertWithoutLikedCommentsInput = {
    update: XOR<UserUpdateWithoutLikedCommentsInput, UserUncheckedUpdateWithoutLikedCommentsInput>
    create: XOR<UserCreateWithoutLikedCommentsInput, UserUncheckedCreateWithoutLikedCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLikedCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLikedCommentsInput, UserUncheckedUpdateWithoutLikedCommentsInput>
  }

  export type UserUpdateWithoutLikedCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    postDraft?: PostDraftUncheckedUpdateOneWithoutUserNestedInput
  }

  export type CommentUpsertWithoutLikeInput = {
    update: XOR<CommentUpdateWithoutLikeInput, CommentUncheckedUpdateWithoutLikeInput>
    create: XOR<CommentCreateWithoutLikeInput, CommentUncheckedCreateWithoutLikeInput>
    where?: CommentWhereInput
  }

  export type CommentUpdateToOneWithWhereWithoutLikeInput = {
    where?: CommentWhereInput
    data: XOR<CommentUpdateWithoutLikeInput, CommentUncheckedUpdateWithoutLikeInput>
  }

  export type CommentUpdateWithoutLikeInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostModelUpdateOneRequiredWithoutCommentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    parentComment?: CommentUpdateOneWithoutSubCommentsNestedInput
    subComments?: CommentUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutLikeInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    subComments?: CommentUncheckedUpdateManyWithoutParentCommentNestedInput
  }

  export type PostDraftCreateWithoutMediaInput = {
    content: string
    user: UserCreateNestedOneWithoutPostDraftInput
  }

  export type PostDraftUncheckedCreateWithoutMediaInput = {
    id?: number
    userId: string
    content: string
  }

  export type PostDraftCreateOrConnectWithoutMediaInput = {
    where: PostDraftWhereUniqueInput
    create: XOR<PostDraftCreateWithoutMediaInput, PostDraftUncheckedCreateWithoutMediaInput>
  }

  export type PostDraftUpsertWithoutMediaInput = {
    update: XOR<PostDraftUpdateWithoutMediaInput, PostDraftUncheckedUpdateWithoutMediaInput>
    create: XOR<PostDraftCreateWithoutMediaInput, PostDraftUncheckedCreateWithoutMediaInput>
    where?: PostDraftWhereInput
  }

  export type PostDraftUpdateToOneWithWhereWithoutMediaInput = {
    where?: PostDraftWhereInput
    data: XOR<PostDraftUpdateWithoutMediaInput, PostDraftUncheckedUpdateWithoutMediaInput>
  }

  export type PostDraftUpdateWithoutMediaInput = {
    content?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPostDraftNestedInput
  }

  export type PostDraftUncheckedUpdateWithoutMediaInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPostDraftInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeCreateNestedManyWithoutUserInput
    comments?: CommentCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostDraftInput = {
    id?: string
    username: string
    email: string
    password: string
    name: string
    surname: string
    bio: string
    userAvatar: string
    userCover?: string
    role?: string
    created_at?: Date | string
    updated_at?: Date | string
    posts?: PostModelUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostLikeUncheckedCreateNestedManyWithoutUserInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    likedComments?: CommentLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostDraftInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostDraftInput, UserUncheckedCreateWithoutPostDraftInput>
  }

  export type AssetCreateWithoutPostInput = {
    key: string
    url: string
  }

  export type AssetUncheckedCreateWithoutPostInput = {
    key: string
    url: string
  }

  export type AssetCreateOrConnectWithoutPostInput = {
    where: AssetWhereUniqueInput
    create: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput>
  }

  export type AssetCreateManyPostInputEnvelope = {
    data: AssetCreateManyPostInput | AssetCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostDraftInput = {
    update: XOR<UserUpdateWithoutPostDraftInput, UserUncheckedUpdateWithoutPostDraftInput>
    create: XOR<UserCreateWithoutPostDraftInput, UserUncheckedCreateWithoutPostDraftInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostDraftInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostDraftInput, UserUncheckedUpdateWithoutPostDraftInput>
  }

  export type UserUpdateWithoutPostDraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUpdateManyWithoutUserNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostDraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    surname?: StringFieldUpdateOperationsInput | string
    bio?: StringFieldUpdateOperationsInput | string
    userAvatar?: StringFieldUpdateOperationsInput | string
    userCover?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostModelUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostLikeUncheckedUpdateManyWithoutUserNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    likedComments?: CommentLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AssetUpsertWithWhereUniqueWithoutPostInput = {
    where: AssetWhereUniqueInput
    update: XOR<AssetUpdateWithoutPostInput, AssetUncheckedUpdateWithoutPostInput>
    create: XOR<AssetCreateWithoutPostInput, AssetUncheckedCreateWithoutPostInput>
  }

  export type AssetUpdateWithWhereUniqueWithoutPostInput = {
    where: AssetWhereUniqueInput
    data: XOR<AssetUpdateWithoutPostInput, AssetUncheckedUpdateWithoutPostInput>
  }

  export type AssetUpdateManyWithWhereWithoutPostInput = {
    where: AssetScalarWhereInput
    data: XOR<AssetUpdateManyMutationInput, AssetUncheckedUpdateManyWithoutPostInput>
  }

  export type AssetScalarWhereInput = {
    AND?: AssetScalarWhereInput | AssetScalarWhereInput[]
    OR?: AssetScalarWhereInput[]
    NOT?: AssetScalarWhereInput | AssetScalarWhereInput[]
    id?: IntFilter<"Asset"> | number
    key?: StringFilter<"Asset"> | string
    url?: StringFilter<"Asset"> | string
  }

  export type PostLikeCreateManyPostInput = {
    userId: string
  }

  export type CommentCreateManyPostInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    userId: string
    parentId?: number | null
  }

  export type PostLikeUpdateWithoutPostInput = {
    user?: UserUpdateOneRequiredWithoutLikedPostsNestedInput
  }

  export type PostLikeUncheckedUpdateWithoutPostInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PostLikeUncheckedUpdateManyWithoutPostInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUpdateWithoutPostInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    Like?: CommentLikeUpdateManyWithoutCommentNestedInput
    parentComment?: CommentUpdateOneWithoutSubCommentsNestedInput
    subComments?: CommentUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    Like?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
    subComments?: CommentUncheckedUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PostModelCreateManyUserInput = {
    id?: number
    created_at?: Date | string
    updated_at?: Date | string
    content: string
  }

  export type PostLikeCreateManyUserInput = {
    postId: number
  }

  export type CommentCreateManyUserInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    parentId?: number | null
  }

  export type CommentLikeCreateManyUserInput = {
    commentId: number
    created_at?: Date | string
  }

  export type PostModelUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    Like?: PostLikeUpdateManyWithoutPostNestedInput
    Comment?: CommentUpdateManyWithoutPostNestedInput
  }

  export type PostModelUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
    Like?: PostLikeUncheckedUpdateManyWithoutPostNestedInput
    Comment?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostModelUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PostLikeUpdateWithoutUserInput = {
    post?: PostModelUpdateOneRequiredWithoutLikeNestedInput
  }

  export type PostLikeUncheckedUpdateWithoutUserInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type PostLikeUncheckedUpdateManyWithoutUserInput = {
    postId?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostModelUpdateOneRequiredWithoutCommentNestedInput
    Like?: CommentLikeUpdateManyWithoutCommentNestedInput
    parentComment?: CommentUpdateOneWithoutSubCommentsNestedInput
    subComments?: CommentUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    Like?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
    subComments?: CommentUncheckedUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CommentLikeUpdateWithoutUserInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: CommentUpdateOneRequiredWithoutLikeNestedInput
  }

  export type CommentLikeUncheckedUpdateWithoutUserInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateManyWithoutUserInput = {
    commentId?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeCreateManyCommentInput = {
    userId: string
    created_at?: Date | string
  }

  export type CommentCreateManyParentCommentInput = {
    id?: number
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    postId: number
    userId: string
  }

  export type CommentLikeUpdateWithoutCommentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLikedCommentsNestedInput
  }

  export type CommentLikeUncheckedUpdateWithoutCommentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentLikeUncheckedUpdateManyWithoutCommentInput = {
    userId?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutParentCommentInput = {
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostModelUpdateOneRequiredWithoutCommentNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
    Like?: CommentLikeUpdateManyWithoutCommentNestedInput
    subComments?: CommentUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateWithoutParentCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    Like?: CommentLikeUncheckedUpdateManyWithoutCommentNestedInput
    subComments?: CommentUncheckedUpdateManyWithoutParentCommentNestedInput
  }

  export type CommentUncheckedUpdateManyWithoutParentCommentInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AssetCreateManyPostInput = {
    key: string
    url: string
  }

  export type AssetUpdateWithoutPostInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AssetUncheckedUpdateWithoutPostInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type AssetUncheckedUpdateManyWithoutPostInput = {
    key?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use PostModelCountOutputTypeDefaultArgs instead
     */
    export type PostModelCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostModelCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommentCountOutputTypeDefaultArgs instead
     */
    export type CommentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PostDraftCountOutputTypeDefaultArgs instead
     */
    export type PostDraftCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostDraftCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PostModelDefaultArgs instead
     */
    export type PostModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostModelDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommentDefaultArgs instead
     */
    export type CommentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PostLikeDefaultArgs instead
     */
    export type PostLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostLikeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommentLikeDefaultArgs instead
     */
    export type CommentLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommentLikeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AssetDefaultArgs instead
     */
    export type AssetArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AssetDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PostDraftDefaultArgs instead
     */
    export type PostDraftArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PostDraftDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TokenDefaultArgs instead
     */
    export type TokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TokenDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}