
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Tokens
 * 
 */
export type Tokens = {
  access_token: string
  refresh_token: string
  expiry_date: Date
}

/**
 * Model Event
 * 
 */
export type Event = {
  id: string
  createdAt: Date
  updatedAt: Date
  address: string
  date: Date
  endTime: string
  startTime: string
  bookingDate: Date | null
  cost: number
  status: EventStatus
  maxParticipants: number
}

/**
 * Model ParticipantsOnEvents
 * 
 */
export type ParticipantsOnEvents = {
  eventId: string
  date: Date
  id: string
  userEventStatus: UserEventStatus
}

/**
 * Model Payment
 * 
 */
export type Payment = {
  id: string
  createdAt: Date
  updatedAt: Date
  eventId: string
  userId: string
  amount: number
  paymentDate: Date
  gmailMailId: string
}

/**
 * Model Account
 * 
 */
export type Account = {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
}

/**
 * Model Session
 * 
 */
export type Session = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  name: string
  email: string
  emailVerified: Date | null
  image: string | null
  role: string
  createdAt: Date
  password: string
  notificationsEnabled: boolean
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = {
  identifier: string
  token: string
  expires: Date
}

/**
 * Model d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
 * 
 */
export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = {
  id: string
  createdAt: Date
  updatedAt: Date
  eventId: string
  userId: string
  amount: number
  paymentDate: Date
}

/**
 * Model edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
 * 
 */
export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = {
  id: string
  createdAt: Date
  updatedAt: Date
  eventId: string
  userId: string
  amount: number
  paymentDate: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const EventStatus: {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  BOOKED: 'BOOKED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const UserEventStatus: {
  AVAILABLE: 'AVAILABLE',
  JOINED: 'JOINED',
  CANCELED: 'CANCELED'
};

export type UserEventStatus = (typeof UserEventStatus)[keyof typeof UserEventStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Tokens
 * const tokens = await prisma.tokens.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Tokens
   * const tokens = await prisma.tokens.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.tokens`: Exposes CRUD operations for the **Tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.tokens.findMany()
    * ```
    */
  get tokens(): Prisma.TokensDelegate<GlobalReject>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<GlobalReject>;

  /**
   * `prisma.participantsOnEvents`: Exposes CRUD operations for the **ParticipantsOnEvents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParticipantsOnEvents
    * const participantsOnEvents = await prisma.participantsOnEvents.findMany()
    * ```
    */
  get participantsOnEvents(): Prisma.ParticipantsOnEventsDelegate<GlobalReject>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<GlobalReject>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<GlobalReject>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<GlobalReject>;

  /**
   * `prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl`: Exposes CRUD operations for the **d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
    * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findMany()
    * ```
    */
  get d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl(): Prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDelegate<GlobalReject>;

  /**
   * `prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl`: Exposes CRUD operations for the **edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
    * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findMany()
    * ```
    */
  get edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl(): Prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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
   * Prisma Client JS version: 4.8.0
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Tokens: 'Tokens',
    Event: 'Event',
    ParticipantsOnEvents: 'ParticipantsOnEvents',
    Payment: 'Payment',
    Account: 'Account',
    Session: 'Session',
    User: 'User',
    VerificationToken: 'VerificationToken',
    d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl: 'd6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl',
    edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl: 'edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
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
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
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
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EventCountOutputType
   */


  export type EventCountOutputType = {
    payments: number
    participants: number
  }

  export type EventCountOutputTypeSelect = {
    payments?: boolean
    participants?: boolean
  }

  export type EventCountOutputTypeGetPayload<S extends boolean | null | undefined | EventCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? EventCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (EventCountOutputTypeArgs)
    ? EventCountOutputType 
    : S extends { select: any } & (EventCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof EventCountOutputType ? EventCountOutputType[P] : never
  } 
      : EventCountOutputType




  // Custom InputTypes

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     * 
    **/
    select?: EventCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    sessions: number
    payments: number
    events: number
  }

  export type UserCountOutputTypeSelect = {
    accounts?: boolean
    sessions?: boolean
    payments?: boolean
    events?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Tokens
   */


  export type AggregateTokens = {
    _count: TokensCountAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  export type TokensMinAggregateOutputType = {
    access_token: string | null
    refresh_token: string | null
    expiry_date: Date | null
  }

  export type TokensMaxAggregateOutputType = {
    access_token: string | null
    refresh_token: string | null
    expiry_date: Date | null
  }

  export type TokensCountAggregateOutputType = {
    access_token: number
    refresh_token: number
    expiry_date: number
    _all: number
  }


  export type TokensMinAggregateInputType = {
    access_token?: true
    refresh_token?: true
    expiry_date?: true
  }

  export type TokensMaxAggregateInputType = {
    access_token?: true
    refresh_token?: true
    expiry_date?: true
  }

  export type TokensCountAggregateInputType = {
    access_token?: true
    refresh_token?: true
    expiry_date?: true
    _all?: true
  }

  export type TokensAggregateArgs = {
    /**
     * Filter which Tokens to aggregate.
     * 
    **/
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokensOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokensMaxAggregateInputType
  }

  export type GetTokensAggregateType<T extends TokensAggregateArgs> = {
        [P in keyof T & keyof AggregateTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokens[P]>
      : GetScalarType<T[P], AggregateTokens[P]>
  }




  export type TokensGroupByArgs = {
    where?: TokensWhereInput
    orderBy?: Enumerable<TokensOrderByWithAggregationInput>
    by: Array<TokensScalarFieldEnum>
    having?: TokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokensCountAggregateInputType | true
    _min?: TokensMinAggregateInputType
    _max?: TokensMaxAggregateInputType
  }


  export type TokensGroupByOutputType = {
    access_token: string
    refresh_token: string
    expiry_date: Date
    _count: TokensCountAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  type GetTokensGroupByPayload<T extends TokensGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokensGroupByOutputType[P]>
            : GetScalarType<T[P], TokensGroupByOutputType[P]>
        }
      >
    >


  export type TokensSelect = {
    access_token?: boolean
    refresh_token?: boolean
    expiry_date?: boolean
  }


  export type TokensGetPayload<S extends boolean | null | undefined | TokensArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Tokens :
    S extends undefined ? never :
    S extends { include: any } & (TokensArgs | TokensFindManyArgs)
    ? Tokens 
    : S extends { select: any } & (TokensArgs | TokensFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof Tokens ? Tokens[P] : never
  } 
      : Tokens


  type TokensCountArgs = Merge<
    Omit<TokensFindManyArgs, 'select' | 'include'> & {
      select?: TokensCountAggregateInputType | true
    }
  >

  export interface TokensDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Tokens that matches the filter.
     * @param {TokensFindUniqueArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TokensFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TokensFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tokens'> extends True ? Prisma__TokensClient<TokensGetPayload<T>> : Prisma__TokensClient<TokensGetPayload<T> | null, null>

    /**
     * Find one Tokens that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TokensFindUniqueOrThrowArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TokensFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TokensFindUniqueOrThrowArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Find the first Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindFirstArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TokensFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TokensFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tokens'> extends True ? Prisma__TokensClient<TokensGetPayload<T>> : Prisma__TokensClient<TokensGetPayload<T> | null, null>

    /**
     * Find the first Tokens that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindFirstOrThrowArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TokensFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TokensFindFirstOrThrowArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.tokens.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.tokens.findMany({ take: 10 })
     * 
     * // Only select the `access_token`
     * const tokensWithAccess_tokenOnly = await prisma.tokens.findMany({ select: { access_token: true } })
     * 
    **/
    findMany<T extends TokensFindManyArgs>(
      args?: SelectSubset<T, TokensFindManyArgs>
    ): PrismaPromise<Array<TokensGetPayload<T>>>

    /**
     * Create a Tokens.
     * @param {TokensCreateArgs} args - Arguments to create a Tokens.
     * @example
     * // Create one Tokens
     * const Tokens = await prisma.tokens.create({
     *   data: {
     *     // ... data to create a Tokens
     *   }
     * })
     * 
    **/
    create<T extends TokensCreateArgs>(
      args: SelectSubset<T, TokensCreateArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Create many Tokens.
     *     @param {TokensCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const tokens = await prisma.tokens.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TokensCreateManyArgs>(
      args?: SelectSubset<T, TokensCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tokens.
     * @param {TokensDeleteArgs} args - Arguments to delete one Tokens.
     * @example
     * // Delete one Tokens
     * const Tokens = await prisma.tokens.delete({
     *   where: {
     *     // ... filter to delete one Tokens
     *   }
     * })
     * 
    **/
    delete<T extends TokensDeleteArgs>(
      args: SelectSubset<T, TokensDeleteArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Update one Tokens.
     * @param {TokensUpdateArgs} args - Arguments to update one Tokens.
     * @example
     * // Update one Tokens
     * const tokens = await prisma.tokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TokensUpdateArgs>(
      args: SelectSubset<T, TokensUpdateArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Delete zero or more Tokens.
     * @param {TokensDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.tokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TokensDeleteManyArgs>(
      args?: SelectSubset<T, TokensDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const tokens = await prisma.tokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TokensUpdateManyArgs>(
      args: SelectSubset<T, TokensUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tokens.
     * @param {TokensUpsertArgs} args - Arguments to update or create a Tokens.
     * @example
     * // Update or create a Tokens
     * const tokens = await prisma.tokens.upsert({
     *   create: {
     *     // ... data to create a Tokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tokens we want to update
     *   }
     * })
    **/
    upsert<T extends TokensUpsertArgs>(
      args: SelectSubset<T, TokensUpsertArgs>
    ): Prisma__TokensClient<TokensGetPayload<T>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.tokens.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokensCountArgs>(
      args?: Subset<T, TokensCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TokensAggregateArgs>(args: Subset<T, TokensAggregateArgs>): PrismaPromise<GetTokensAggregateType<T>>

    /**
     * Group by Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensGroupByArgs} args - Group by arguments.
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
      T extends TokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokensGroupByArgs['orderBy'] }
        : { orderBy?: TokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, TokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokensGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokensClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Tokens base type for findUnique actions
   */
  export type TokensFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where: TokensWhereUniqueInput
  }

  /**
   * Tokens findUnique
   */
  export interface TokensFindUniqueArgs extends TokensFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tokens findUniqueOrThrow
   */
  export type TokensFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens base type for findFirst actions
   */
  export type TokensFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokensOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokensScalarFieldEnum>
  }

  /**
   * Tokens findFirst
   */
  export interface TokensFindFirstArgs extends TokensFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Tokens findFirstOrThrow
   */
  export type TokensFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokensOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     * 
    **/
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     * 
    **/
    distinct?: Enumerable<TokensScalarFieldEnum>
  }


  /**
   * Tokens findMany
   */
  export type TokensFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter, which Tokens to fetch.
     * 
    **/
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<TokensOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     * 
    **/
    cursor?: TokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TokensScalarFieldEnum>
  }


  /**
   * Tokens create
   */
  export type TokensCreateArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * The data needed to create a Tokens.
     * 
    **/
    data: XOR<TokensCreateInput, TokensUncheckedCreateInput>
  }


  /**
   * Tokens createMany
   */
  export type TokensCreateManyArgs = {
    /**
     * The data used to create many Tokens.
     * 
    **/
    data: Enumerable<TokensCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tokens update
   */
  export type TokensUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * The data needed to update a Tokens.
     * 
    **/
    data: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
    /**
     * Choose, which Tokens to update.
     * 
    **/
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens updateMany
   */
  export type TokensUpdateManyArgs = {
    /**
     * The data used to update Tokens.
     * 
    **/
    data: XOR<TokensUpdateManyMutationInput, TokensUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     * 
    **/
    where?: TokensWhereInput
  }


  /**
   * Tokens upsert
   */
  export type TokensUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * The filter to search for the Tokens to update in case it exists.
     * 
    **/
    where: TokensWhereUniqueInput
    /**
     * In case the Tokens found by the `where` argument doesn't exist, create a new Tokens with this data.
     * 
    **/
    create: XOR<TokensCreateInput, TokensUncheckedCreateInput>
    /**
     * In case the Tokens was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
  }


  /**
   * Tokens delete
   */
  export type TokensDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
    /**
     * Filter which Tokens to delete.
     * 
    **/
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens deleteMany
   */
  export type TokensDeleteManyArgs = {
    /**
     * Filter which Tokens to delete
     * 
    **/
    where?: TokensWhereInput
  }


  /**
   * Tokens without action
   */
  export type TokensArgs = {
    /**
     * Select specific fields to fetch from the Tokens
     * 
    **/
    select?: TokensSelect | null
  }



  /**
   * Model Event
   */


  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    cost: number | null
    maxParticipants: number | null
  }

  export type EventSumAggregateOutputType = {
    cost: number | null
    maxParticipants: number | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    date: Date | null
    endTime: string | null
    startTime: string | null
    bookingDate: Date | null
    cost: number | null
    status: EventStatus | null
    maxParticipants: number | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    address: string | null
    date: Date | null
    endTime: string | null
    startTime: string | null
    bookingDate: Date | null
    cost: number | null
    status: EventStatus | null
    maxParticipants: number | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    address: number
    date: number
    endTime: number
    startTime: number
    bookingDate: number
    cost: number
    status: number
    maxParticipants: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    cost?: true
    maxParticipants?: true
  }

  export type EventSumAggregateInputType = {
    cost?: true
    maxParticipants?: true
  }

  export type EventMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    date?: true
    endTime?: true
    startTime?: true
    bookingDate?: true
    cost?: true
    status?: true
    maxParticipants?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    date?: true
    endTime?: true
    startTime?: true
    bookingDate?: true
    cost?: true
    status?: true
    maxParticipants?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    address?: true
    date?: true
    endTime?: true
    startTime?: true
    bookingDate?: true
    cost?: true
    status?: true
    maxParticipants?: true
    _all?: true
  }

  export type EventAggregateArgs = {
    /**
     * Filter which Event to aggregate.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs = {
    where?: EventWhereInput
    orderBy?: Enumerable<EventOrderByWithAggregationInput>
    by: Array<EventScalarFieldEnum>
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }


  export type EventGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    address: string
    date: Date
    endTime: string
    startTime: string
    bookingDate: Date | null
    cost: number
    status: EventStatus
    maxParticipants: number
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    address?: boolean
    date?: boolean
    endTime?: boolean
    startTime?: boolean
    bookingDate?: boolean
    cost?: boolean
    status?: boolean
    maxParticipants?: boolean
    payments?: boolean | EventPaymentsArgs
    participants?: boolean | EventParticipantsArgs
    _count?: boolean | EventCountOutputTypeArgs
  }


  export type EventInclude = {
    payments?: boolean | EventPaymentsArgs
    participants?: boolean | EventParticipantsArgs
    _count?: boolean | EventCountOutputTypeArgs
  } 

  export type EventGetPayload<S extends boolean | null | undefined | EventArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Event :
    S extends undefined ? never :
    S extends { include: any } & (EventArgs | EventFindManyArgs)
    ? Event  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'payments' ? Array < PaymentGetPayload<S['include'][P]>>  :
        P extends 'participants' ? Array < ParticipantsOnEventsGetPayload<S['include'][P]>>  :
        P extends '_count' ? EventCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (EventArgs | EventFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'payments' ? Array < PaymentGetPayload<S['select'][P]>>  :
        P extends 'participants' ? Array < ParticipantsOnEventsGetPayload<S['select'][P]>>  :
        P extends '_count' ? EventCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Event ? Event[P] : never
  } 
      : Event


  type EventCountArgs = Merge<
    Omit<EventFindManyArgs, 'select' | 'include'> & {
      select?: EventCountAggregateInputType | true
    }
  >

  export interface EventDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Event'> extends True ? Prisma__EventClient<EventGetPayload<T>> : Prisma__EventClient<EventGetPayload<T> | null, null>

    /**
     * Find one Event that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, EventFindUniqueOrThrowArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Event'> extends True ? Prisma__EventClient<EventGetPayload<T>> : Prisma__EventClient<EventGetPayload<T> | null, null>

    /**
     * Find the first Event that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(
      args?: SelectSubset<T, EventFindFirstOrThrowArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventFindManyArgs>(
      args?: SelectSubset<T, EventFindManyArgs>
    ): PrismaPromise<Array<EventGetPayload<T>>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
    **/
    create<T extends EventCreateArgs>(
      args: SelectSubset<T, EventCreateArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Create many Events.
     *     @param {EventCreateManyArgs} args - Arguments to create many Events.
     *     @example
     *     // Create many Events
     *     const event = await prisma.event.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventCreateManyArgs>(
      args?: SelectSubset<T, EventCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
    **/
    delete<T extends EventDeleteArgs>(
      args: SelectSubset<T, EventDeleteArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventUpdateArgs>(
      args: SelectSubset<T, EventUpdateArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventDeleteManyArgs>(
      args?: SelectSubset<T, EventDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventUpdateManyArgs>(
      args: SelectSubset<T, EventUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
    **/
    upsert<T extends EventUpsertArgs>(
      args: SelectSubset<T, EventUpsertArgs>
    ): Prisma__EventClient<EventGetPayload<T>>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    payments<T extends EventPaymentsArgs= {}>(args?: Subset<T, EventPaymentsArgs>): PrismaPromise<Array<PaymentGetPayload<T>>| Null>;

    participants<T extends EventParticipantsArgs= {}>(args?: Subset<T, EventParticipantsArgs>): PrismaPromise<Array<ParticipantsOnEventsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Event base type for findUnique actions
   */
  export type EventFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where: EventWhereUniqueInput
  }

  /**
   * Event findUnique
   */
  export interface EventFindUniqueArgs extends EventFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event base type for findFirst actions
   */
  export type EventFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     * 
    **/
    distinct?: Enumerable<EventScalarFieldEnum>
  }

  /**
   * Event findFirst
   */
  export interface EventFindFirstArgs extends EventFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     * 
    **/
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event findMany
   */
  export type EventFindManyArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter, which Events to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event create
   */
  export type EventCreateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The data needed to create a Event.
     * 
    **/
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }


  /**
   * Event createMany
   */
  export type EventCreateManyArgs = {
    /**
     * The data used to create many Events.
     * 
    **/
    data: Enumerable<EventCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Event update
   */
  export type EventUpdateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The data needed to update a Event.
     * 
    **/
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs = {
    /**
     * The data used to update Events.
     * 
    **/
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     * 
    **/
    where?: EventWhereInput
  }


  /**
   * Event upsert
   */
  export type EventUpsertArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * The filter to search for the Event to update in case it exists.
     * 
    **/
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     * 
    **/
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }


  /**
   * Event delete
   */
  export type EventDeleteArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
    /**
     * Filter which Event to delete.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs = {
    /**
     * Filter which Events to delete
     * 
    **/
    where?: EventWhereInput
  }


  /**
   * Event.payments
   */
  export type EventPaymentsArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Event.participants
   */
  export type EventParticipantsArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    where?: ParticipantsOnEventsWhereInput
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    cursor?: ParticipantsOnEventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ParticipantsOnEventsScalarFieldEnum>
  }


  /**
   * Event without action
   */
  export type EventArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EventInclude | null
  }



  /**
   * Model ParticipantsOnEvents
   */


  export type AggregateParticipantsOnEvents = {
    _count: ParticipantsOnEventsCountAggregateOutputType | null
    _min: ParticipantsOnEventsMinAggregateOutputType | null
    _max: ParticipantsOnEventsMaxAggregateOutputType | null
  }

  export type ParticipantsOnEventsMinAggregateOutputType = {
    eventId: string | null
    date: Date | null
    id: string | null
    userEventStatus: UserEventStatus | null
  }

  export type ParticipantsOnEventsMaxAggregateOutputType = {
    eventId: string | null
    date: Date | null
    id: string | null
    userEventStatus: UserEventStatus | null
  }

  export type ParticipantsOnEventsCountAggregateOutputType = {
    eventId: number
    date: number
    id: number
    userEventStatus: number
    _all: number
  }


  export type ParticipantsOnEventsMinAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    userEventStatus?: true
  }

  export type ParticipantsOnEventsMaxAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    userEventStatus?: true
  }

  export type ParticipantsOnEventsCountAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    userEventStatus?: true
    _all?: true
  }

  export type ParticipantsOnEventsAggregateArgs = {
    /**
     * Filter which ParticipantsOnEvents to aggregate.
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParticipantsOnEvents
    **/
    _count?: true | ParticipantsOnEventsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantsOnEventsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantsOnEventsMaxAggregateInputType
  }

  export type GetParticipantsOnEventsAggregateType<T extends ParticipantsOnEventsAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipantsOnEvents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipantsOnEvents[P]>
      : GetScalarType<T[P], AggregateParticipantsOnEvents[P]>
  }




  export type ParticipantsOnEventsGroupByArgs = {
    where?: ParticipantsOnEventsWhereInput
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithAggregationInput>
    by: Array<ParticipantsOnEventsScalarFieldEnum>
    having?: ParticipantsOnEventsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantsOnEventsCountAggregateInputType | true
    _min?: ParticipantsOnEventsMinAggregateInputType
    _max?: ParticipantsOnEventsMaxAggregateInputType
  }


  export type ParticipantsOnEventsGroupByOutputType = {
    eventId: string
    date: Date
    id: string
    userEventStatus: UserEventStatus
    _count: ParticipantsOnEventsCountAggregateOutputType | null
    _min: ParticipantsOnEventsMinAggregateOutputType | null
    _max: ParticipantsOnEventsMaxAggregateOutputType | null
  }

  type GetParticipantsOnEventsGroupByPayload<T extends ParticipantsOnEventsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ParticipantsOnEventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantsOnEventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantsOnEventsGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantsOnEventsGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantsOnEventsSelect = {
    eventId?: boolean
    date?: boolean
    id?: boolean
    userEventStatus?: boolean
    user?: boolean | UserArgs
    event?: boolean | EventArgs
  }


  export type ParticipantsOnEventsInclude = {
    user?: boolean | UserArgs
    event?: boolean | EventArgs
  } 

  export type ParticipantsOnEventsGetPayload<S extends boolean | null | undefined | ParticipantsOnEventsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ParticipantsOnEvents :
    S extends undefined ? never :
    S extends { include: any } & (ParticipantsOnEventsArgs | ParticipantsOnEventsFindManyArgs)
    ? ParticipantsOnEvents  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'event' ? EventGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ParticipantsOnEventsArgs | ParticipantsOnEventsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'event' ? EventGetPayload<S['select'][P]> :  P extends keyof ParticipantsOnEvents ? ParticipantsOnEvents[P] : never
  } 
      : ParticipantsOnEvents


  type ParticipantsOnEventsCountArgs = Merge<
    Omit<ParticipantsOnEventsFindManyArgs, 'select' | 'include'> & {
      select?: ParticipantsOnEventsCountAggregateInputType | true
    }
  >

  export interface ParticipantsOnEventsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ParticipantsOnEvents that matches the filter.
     * @param {ParticipantsOnEventsFindUniqueArgs} args - Arguments to find a ParticipantsOnEvents
     * @example
     * // Get one ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ParticipantsOnEventsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ParticipantsOnEventsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ParticipantsOnEvents'> extends True ? Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>> : Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T> | null, null>

    /**
     * Find one ParticipantsOnEvents that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ParticipantsOnEventsFindUniqueOrThrowArgs} args - Arguments to find a ParticipantsOnEvents
     * @example
     * // Get one ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ParticipantsOnEventsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ParticipantsOnEventsFindUniqueOrThrowArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Find the first ParticipantsOnEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsFindFirstArgs} args - Arguments to find a ParticipantsOnEvents
     * @example
     * // Get one ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ParticipantsOnEventsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ParticipantsOnEventsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ParticipantsOnEvents'> extends True ? Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>> : Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T> | null, null>

    /**
     * Find the first ParticipantsOnEvents that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsFindFirstOrThrowArgs} args - Arguments to find a ParticipantsOnEvents
     * @example
     * // Get one ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ParticipantsOnEventsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ParticipantsOnEventsFindFirstOrThrowArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Find zero or more ParticipantsOnEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findMany()
     * 
     * // Get first 10 ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const participantsOnEventsWithEventIdOnly = await prisma.participantsOnEvents.findMany({ select: { eventId: true } })
     * 
    **/
    findMany<T extends ParticipantsOnEventsFindManyArgs>(
      args?: SelectSubset<T, ParticipantsOnEventsFindManyArgs>
    ): PrismaPromise<Array<ParticipantsOnEventsGetPayload<T>>>

    /**
     * Create a ParticipantsOnEvents.
     * @param {ParticipantsOnEventsCreateArgs} args - Arguments to create a ParticipantsOnEvents.
     * @example
     * // Create one ParticipantsOnEvents
     * const ParticipantsOnEvents = await prisma.participantsOnEvents.create({
     *   data: {
     *     // ... data to create a ParticipantsOnEvents
     *   }
     * })
     * 
    **/
    create<T extends ParticipantsOnEventsCreateArgs>(
      args: SelectSubset<T, ParticipantsOnEventsCreateArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Create many ParticipantsOnEvents.
     *     @param {ParticipantsOnEventsCreateManyArgs} args - Arguments to create many ParticipantsOnEvents.
     *     @example
     *     // Create many ParticipantsOnEvents
     *     const participantsOnEvents = await prisma.participantsOnEvents.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ParticipantsOnEventsCreateManyArgs>(
      args?: SelectSubset<T, ParticipantsOnEventsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ParticipantsOnEvents.
     * @param {ParticipantsOnEventsDeleteArgs} args - Arguments to delete one ParticipantsOnEvents.
     * @example
     * // Delete one ParticipantsOnEvents
     * const ParticipantsOnEvents = await prisma.participantsOnEvents.delete({
     *   where: {
     *     // ... filter to delete one ParticipantsOnEvents
     *   }
     * })
     * 
    **/
    delete<T extends ParticipantsOnEventsDeleteArgs>(
      args: SelectSubset<T, ParticipantsOnEventsDeleteArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Update one ParticipantsOnEvents.
     * @param {ParticipantsOnEventsUpdateArgs} args - Arguments to update one ParticipantsOnEvents.
     * @example
     * // Update one ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ParticipantsOnEventsUpdateArgs>(
      args: SelectSubset<T, ParticipantsOnEventsUpdateArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Delete zero or more ParticipantsOnEvents.
     * @param {ParticipantsOnEventsDeleteManyArgs} args - Arguments to filter ParticipantsOnEvents to delete.
     * @example
     * // Delete a few ParticipantsOnEvents
     * const { count } = await prisma.participantsOnEvents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ParticipantsOnEventsDeleteManyArgs>(
      args?: SelectSubset<T, ParticipantsOnEventsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParticipantsOnEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ParticipantsOnEventsUpdateManyArgs>(
      args: SelectSubset<T, ParticipantsOnEventsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ParticipantsOnEvents.
     * @param {ParticipantsOnEventsUpsertArgs} args - Arguments to update or create a ParticipantsOnEvents.
     * @example
     * // Update or create a ParticipantsOnEvents
     * const participantsOnEvents = await prisma.participantsOnEvents.upsert({
     *   create: {
     *     // ... data to create a ParticipantsOnEvents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParticipantsOnEvents we want to update
     *   }
     * })
    **/
    upsert<T extends ParticipantsOnEventsUpsertArgs>(
      args: SelectSubset<T, ParticipantsOnEventsUpsertArgs>
    ): Prisma__ParticipantsOnEventsClient<ParticipantsOnEventsGetPayload<T>>

    /**
     * Count the number of ParticipantsOnEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsCountArgs} args - Arguments to filter ParticipantsOnEvents to count.
     * @example
     * // Count the number of ParticipantsOnEvents
     * const count = await prisma.participantsOnEvents.count({
     *   where: {
     *     // ... the filter for the ParticipantsOnEvents we want to count
     *   }
     * })
    **/
    count<T extends ParticipantsOnEventsCountArgs>(
      args?: Subset<T, ParticipantsOnEventsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantsOnEventsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParticipantsOnEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParticipantsOnEventsAggregateArgs>(args: Subset<T, ParticipantsOnEventsAggregateArgs>): PrismaPromise<GetParticipantsOnEventsAggregateType<T>>

    /**
     * Group by ParticipantsOnEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantsOnEventsGroupByArgs} args - Group by arguments.
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
      T extends ParticipantsOnEventsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipantsOnEventsGroupByArgs['orderBy'] }
        : { orderBy?: ParticipantsOnEventsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ParticipantsOnEventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantsOnEventsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ParticipantsOnEvents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ParticipantsOnEventsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    event<T extends EventArgs= {}>(args?: Subset<T, EventArgs>): Prisma__EventClient<EventGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ParticipantsOnEvents base type for findUnique actions
   */
  export type ParticipantsOnEventsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     * 
    **/
    where: ParticipantsOnEventsWhereUniqueInput
  }

  /**
   * ParticipantsOnEvents findUnique
   */
  export interface ParticipantsOnEventsFindUniqueArgs extends ParticipantsOnEventsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ParticipantsOnEvents findUniqueOrThrow
   */
  export type ParticipantsOnEventsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     * 
    **/
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents base type for findFirst actions
   */
  export type ParticipantsOnEventsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantsOnEvents.
     * 
    **/
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantsOnEvents.
     * 
    **/
    distinct?: Enumerable<ParticipantsOnEventsScalarFieldEnum>
  }

  /**
   * ParticipantsOnEvents findFirst
   */
  export interface ParticipantsOnEventsFindFirstArgs extends ParticipantsOnEventsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ParticipantsOnEvents findFirstOrThrow
   */
  export type ParticipantsOnEventsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantsOnEvents.
     * 
    **/
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantsOnEvents.
     * 
    **/
    distinct?: Enumerable<ParticipantsOnEventsScalarFieldEnum>
  }


  /**
   * ParticipantsOnEvents findMany
   */
  export type ParticipantsOnEventsFindManyArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     * 
    **/
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParticipantsOnEvents.
     * 
    **/
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ParticipantsOnEventsScalarFieldEnum>
  }


  /**
   * ParticipantsOnEvents create
   */
  export type ParticipantsOnEventsCreateArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * The data needed to create a ParticipantsOnEvents.
     * 
    **/
    data: XOR<ParticipantsOnEventsCreateInput, ParticipantsOnEventsUncheckedCreateInput>
  }


  /**
   * ParticipantsOnEvents createMany
   */
  export type ParticipantsOnEventsCreateManyArgs = {
    /**
     * The data used to create many ParticipantsOnEvents.
     * 
    **/
    data: Enumerable<ParticipantsOnEventsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ParticipantsOnEvents update
   */
  export type ParticipantsOnEventsUpdateArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * The data needed to update a ParticipantsOnEvents.
     * 
    **/
    data: XOR<ParticipantsOnEventsUpdateInput, ParticipantsOnEventsUncheckedUpdateInput>
    /**
     * Choose, which ParticipantsOnEvents to update.
     * 
    **/
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents updateMany
   */
  export type ParticipantsOnEventsUpdateManyArgs = {
    /**
     * The data used to update ParticipantsOnEvents.
     * 
    **/
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyInput>
    /**
     * Filter which ParticipantsOnEvents to update
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
  }


  /**
   * ParticipantsOnEvents upsert
   */
  export type ParticipantsOnEventsUpsertArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * The filter to search for the ParticipantsOnEvents to update in case it exists.
     * 
    **/
    where: ParticipantsOnEventsWhereUniqueInput
    /**
     * In case the ParticipantsOnEvents found by the `where` argument doesn't exist, create a new ParticipantsOnEvents with this data.
     * 
    **/
    create: XOR<ParticipantsOnEventsCreateInput, ParticipantsOnEventsUncheckedCreateInput>
    /**
     * In case the ParticipantsOnEvents was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ParticipantsOnEventsUpdateInput, ParticipantsOnEventsUncheckedUpdateInput>
  }


  /**
   * ParticipantsOnEvents delete
   */
  export type ParticipantsOnEventsDeleteArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    /**
     * Filter which ParticipantsOnEvents to delete.
     * 
    **/
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents deleteMany
   */
  export type ParticipantsOnEventsDeleteManyArgs = {
    /**
     * Filter which ParticipantsOnEvents to delete
     * 
    **/
    where?: ParticipantsOnEventsWhereInput
  }


  /**
   * ParticipantsOnEvents without action
   */
  export type ParticipantsOnEventsArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
  }



  /**
   * Model Payment
   */


  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
    gmailMailId: string | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
    gmailMailId: string | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    eventId: number
    userId: number
    amount: number
    paymentDate: number
    gmailMailId: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
    gmailMailId?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
    gmailMailId?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
    gmailMailId?: true
    _all?: true
  }

  export type PaymentAggregateArgs = {
    /**
     * Filter which Payment to aggregate.
     * 
    **/
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     * 
    **/
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs = {
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithAggregationInput>
    by: Array<PaymentScalarFieldEnum>
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }


  export type PaymentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    eventId: string
    userId: string
    amount: number
    paymentDate: Date
    gmailMailId: string
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    userId?: boolean
    amount?: boolean
    paymentDate?: boolean
    gmailMailId?: boolean
    event?: boolean | EventArgs
    user?: boolean | UserArgs
  }


  export type PaymentInclude = {
    event?: boolean | EventArgs
    user?: boolean | UserArgs
  } 

  export type PaymentGetPayload<S extends boolean | null | undefined | PaymentArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Payment :
    S extends undefined ? never :
    S extends { include: any } & (PaymentArgs | PaymentFindManyArgs)
    ? Payment  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'event' ? EventGetPayload<S['include'][P]> :
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PaymentArgs | PaymentFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'event' ? EventGetPayload<S['select'][P]> :
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Payment ? Payment[P] : never
  } 
      : Payment


  type PaymentCountArgs = Merge<
    Omit<PaymentFindManyArgs, 'select' | 'include'> & {
      select?: PaymentCountAggregateInputType | true
    }
  >

  export interface PaymentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PaymentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PaymentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Payment'> extends True ? Prisma__PaymentClient<PaymentGetPayload<T>> : Prisma__PaymentClient<PaymentGetPayload<T> | null, null>

    /**
     * Find one Payment that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PaymentFindUniqueOrThrowArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PaymentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PaymentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Payment'> extends True ? Prisma__PaymentClient<PaymentGetPayload<T>> : Prisma__PaymentClient<PaymentGetPayload<T> | null, null>

    /**
     * Find the first Payment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends PaymentFindManyArgs>(
      args?: SelectSubset<T, PaymentFindManyArgs>
    ): PrismaPromise<Array<PaymentGetPayload<T>>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
    **/
    create<T extends PaymentCreateArgs>(
      args: SelectSubset<T, PaymentCreateArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Create many Payments.
     *     @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     *     @example
     *     // Create many Payments
     *     const payment = await prisma.payment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PaymentCreateManyArgs>(
      args?: SelectSubset<T, PaymentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
    **/
    delete<T extends PaymentDeleteArgs>(
      args: SelectSubset<T, PaymentDeleteArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PaymentUpdateArgs>(
      args: SelectSubset<T, PaymentUpdateArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PaymentDeleteManyArgs>(
      args?: SelectSubset<T, PaymentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PaymentUpdateManyArgs>(
      args: SelectSubset<T, PaymentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
    **/
    upsert<T extends PaymentUpsertArgs>(
      args: SelectSubset<T, PaymentUpsertArgs>
    ): Prisma__PaymentClient<PaymentGetPayload<T>>

    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PaymentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    event<T extends EventArgs= {}>(args?: Subset<T, EventArgs>): Prisma__EventClient<EventGetPayload<T> | Null>;

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Payment base type for findUnique actions
   */
  export type PaymentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter, which Payment to fetch.
     * 
    **/
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUnique
   */
  export interface PaymentFindUniqueArgs extends PaymentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter, which Payment to fetch.
     * 
    **/
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment base type for findFirst actions
   */
  export type PaymentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter, which Payment to fetch.
     * 
    **/
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     * 
    **/
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     * 
    **/
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     * 
    **/
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }

  /**
   * Payment findFirst
   */
  export interface PaymentFindFirstArgs extends PaymentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter, which Payment to fetch.
     * 
    **/
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     * 
    **/
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     * 
    **/
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     * 
    **/
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter, which Payments to fetch.
     * 
    **/
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     * 
    **/
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     * 
    **/
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * Payment create
   */
  export type PaymentCreateArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * The data needed to create a Payment.
     * 
    **/
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }


  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs = {
    /**
     * The data used to create many Payments.
     * 
    **/
    data: Enumerable<PaymentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Payment update
   */
  export type PaymentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * The data needed to update a Payment.
     * 
    **/
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     * 
    **/
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs = {
    /**
     * The data used to update Payments.
     * 
    **/
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     * 
    **/
    where?: PaymentWhereInput
  }


  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * The filter to search for the Payment to update in case it exists.
     * 
    **/
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     * 
    **/
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }


  /**
   * Payment delete
   */
  export type PaymentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    /**
     * Filter which Payment to delete.
     * 
    **/
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs = {
    /**
     * Filter which Payments to delete
     * 
    **/
    where?: PaymentWhereInput
  }


  /**
   * Payment without action
   */
  export type PaymentArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
  }



  /**
   * Model Account
   */


  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs = {
    /**
     * Filter which Account to aggregate.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs = {
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithAggregationInput>
    by: Array<AccountScalarFieldEnum>
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }


  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserArgs
  }


  export type AccountInclude = {
    user?: boolean | UserArgs
  } 

  export type AccountGetPayload<S extends boolean | null | undefined | AccountArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Account :
    S extends undefined ? never :
    S extends { include: any } & (AccountArgs | AccountFindManyArgs)
    ? Account  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (AccountArgs | AccountFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Account ? Account[P] : never
  } 
      : Account


  type AccountCountArgs = Merge<
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }
  >

  export interface AccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Account'> extends True ? Prisma__AccountClient<AccountGetPayload<T>> : Prisma__AccountClient<AccountGetPayload<T> | null, null>

    /**
     * Find one Account that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Account'> extends True ? Prisma__AccountClient<AccountGetPayload<T>> : Prisma__AccountClient<AccountGetPayload<T> | null, null>

    /**
     * Find the first Account that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends AccountFindManyArgs>(
      args?: SelectSubset<T, AccountFindManyArgs>
    ): PrismaPromise<Array<AccountGetPayload<T>>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
    **/
    create<T extends AccountCreateArgs>(
      args: SelectSubset<T, AccountCreateArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Create many Accounts.
     *     @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     *     @example
     *     // Create many Accounts
     *     const account = await prisma.account.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends AccountCreateManyArgs>(
      args?: SelectSubset<T, AccountCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
    **/
    delete<T extends AccountDeleteArgs>(
      args: SelectSubset<T, AccountDeleteArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountUpdateArgs>(
      args: SelectSubset<T, AccountUpdateArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountDeleteManyArgs>(
      args?: SelectSubset<T, AccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountUpdateManyArgs>(
      args: SelectSubset<T, AccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
    **/
    upsert<T extends AccountUpsertArgs>(
      args: SelectSubset<T, AccountUpsertArgs>
    ): Prisma__AccountClient<AccountGetPayload<T>>

    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Account base type for findUnique actions
   */
  export type AccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUnique
   */
  export interface AccountFindUniqueArgs extends AccountFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account base type for findFirst actions
   */
  export type AccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     * 
    **/
    distinct?: Enumerable<AccountScalarFieldEnum>
  }

  /**
   * Account findFirst
   */
  export interface AccountFindFirstArgs extends AccountFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Account to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     * 
    **/
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account findMany
   */
  export type AccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter, which Accounts to fetch.
     * 
    **/
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     * 
    **/
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * Account create
   */
  export type AccountCreateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to create a Account.
     * 
    **/
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs = {
    /**
     * The data used to create many Accounts.
     * 
    **/
    data: Enumerable<AccountCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The data needed to update a Account.
     * 
    **/
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs = {
    /**
     * The data used to update Accounts.
     * 
    **/
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * The filter to search for the Account to update in case it exists.
     * 
    **/
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     * 
    **/
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    /**
     * Filter which Account to delete.
     * 
    **/
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs = {
    /**
     * Filter which Accounts to delete
     * 
    **/
    where?: AccountWhereInput
  }


  /**
   * Account without action
   */
  export type AccountArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
  }



  /**
   * Model Session
   */


  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs = {
    /**
     * Filter which Session to aggregate.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs = {
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithAggregationInput>
    by: Array<SessionScalarFieldEnum>
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }


  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = PrismaPromise<
    Array<
      PickArray<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserArgs
  }


  export type SessionInclude = {
    user?: boolean | UserArgs
  } 

  export type SessionGetPayload<S extends boolean | null | undefined | SessionArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Session :
    S extends undefined ? never :
    S extends { include: any } & (SessionArgs | SessionFindManyArgs)
    ? Session  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (SessionArgs | SessionFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Session ? Session[P] : never
  } 
      : Session


  type SessionCountArgs = Merge<
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }
  >

  export interface SessionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SessionFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SessionFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Session'> extends True ? Prisma__SessionClient<SessionGetPayload<T>> : Prisma__SessionClient<SessionGetPayload<T> | null, null>

    /**
     * Find one Session that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SessionFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SessionFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Session'> extends True ? Prisma__SessionClient<SessionGetPayload<T>> : Prisma__SessionClient<SessionGetPayload<T> | null, null>

    /**
     * Find the first Session that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs>
    ): PrismaPromise<Array<SessionGetPayload<T>>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
    **/
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Create many Sessions.
     *     @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     *     @example
     *     // Create many Sessions
     *     const session = await prisma.session.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
    **/
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
    **/
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs>
    ): Prisma__SessionClient<SessionGetPayload<T>>

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Session base type for findUnique actions
   */
  export type SessionFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUnique
   */
  export interface SessionFindUniqueArgs extends SessionFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session base type for findFirst actions
   */
  export type SessionFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }

  /**
   * Session findFirst
   */
  export interface SessionFindFirstArgs extends SessionFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Session to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     * 
    **/
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session findMany
   */
  export type SessionFindManyArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter, which Sessions to fetch.
     * 
    **/
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     * 
    **/
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     * 
    **/
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * Session create
   */
  export type SessionCreateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to create a Session.
     * 
    **/
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs = {
    /**
     * The data used to create many Sessions.
     * 
    **/
    data: Enumerable<SessionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The data needed to update a Session.
     * 
    **/
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs = {
    /**
     * The data used to update Sessions.
     * 
    **/
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * The filter to search for the Session to update in case it exists.
     * 
    **/
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     * 
    **/
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    /**
     * Filter which Session to delete.
     * 
    **/
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs = {
    /**
     * Filter which Sessions to delete
     * 
    **/
    where?: SessionWhereInput
  }


  /**
   * Session without action
   */
  export type SessionArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
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
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: string | null
    createdAt: Date | null
    password: string | null
    notificationsEnabled: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    role: string | null
    createdAt: Date | null
    password: string | null
    notificationsEnabled: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    role: number
    createdAt: number
    password: number
    notificationsEnabled: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    password?: true
    notificationsEnabled?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    password?: true
    notificationsEnabled?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    role?: true
    createdAt?: true
    password?: true
    notificationsEnabled?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
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




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: Date | null
    image: string | null
    role: string
    createdAt: Date
    password: string
    notificationsEnabled: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    password?: boolean
    notificationsEnabled?: boolean
    accounts?: boolean | UserAccountsArgs
    sessions?: boolean | UserSessionsArgs
    payments?: boolean | UserPaymentsArgs
    events?: boolean | UserEventsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    accounts?: boolean | UserAccountsArgs
    sessions?: boolean | UserSessionsArgs
    payments?: boolean | UserPaymentsArgs
    events?: boolean | UserEventsArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['include'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['include'][P]>>  :
        P extends 'payments' ? Array < PaymentGetPayload<S['include'][P]>>  :
        P extends 'events' ? Array < ParticipantsOnEventsGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'accounts' ? Array < AccountGetPayload<S['select'][P]>>  :
        P extends 'sessions' ? Array < SessionGetPayload<S['select'][P]>>  :
        P extends 'payments' ? Array < PaymentGetPayload<S['select'][P]>>  :
        P extends 'events' ? Array < ParticipantsOnEventsGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

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
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

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
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

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
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

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
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    accounts<T extends UserAccountsArgs= {}>(args?: Subset<T, UserAccountsArgs>): PrismaPromise<Array<AccountGetPayload<T>>| Null>;

    sessions<T extends UserSessionsArgs= {}>(args?: Subset<T, UserSessionsArgs>): PrismaPromise<Array<SessionGetPayload<T>>| Null>;

    payments<T extends UserPaymentsArgs= {}>(args?: Subset<T, UserPaymentsArgs>): PrismaPromise<Array<PaymentGetPayload<T>>| Null>;

    events<T extends UserEventsArgs= {}>(args?: Subset<T, UserEventsArgs>): PrismaPromise<Array<ParticipantsOnEventsGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User.accounts
   */
  export type UserAccountsArgs = {
    /**
     * Select specific fields to fetch from the Account
     * 
    **/
    select?: AccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: AccountInclude | null
    where?: AccountWhereInput
    orderBy?: Enumerable<AccountOrderByWithRelationInput>
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<AccountScalarFieldEnum>
  }


  /**
   * User.sessions
   */
  export type UserSessionsArgs = {
    /**
     * Select specific fields to fetch from the Session
     * 
    **/
    select?: SessionSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: SessionInclude | null
    where?: SessionWhereInput
    orderBy?: Enumerable<SessionOrderByWithRelationInput>
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SessionScalarFieldEnum>
  }


  /**
   * User.payments
   */
  export type UserPaymentsArgs = {
    /**
     * Select specific fields to fetch from the Payment
     * 
    **/
    select?: PaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PaymentInclude | null
    where?: PaymentWhereInput
    orderBy?: Enumerable<PaymentOrderByWithRelationInput>
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<PaymentScalarFieldEnum>
  }


  /**
   * User.events
   */
  export type UserEventsArgs = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     * 
    **/
    select?: ParticipantsOnEventsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ParticipantsOnEventsInclude | null
    where?: ParticipantsOnEventsWhereInput
    orderBy?: Enumerable<ParticipantsOnEventsOrderByWithRelationInput>
    cursor?: ParticipantsOnEventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ParticipantsOnEventsScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model VerificationToken
   */


  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs = {
    /**
     * Filter which VerificationToken to aggregate.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs = {
    where?: VerificationTokenWhereInput
    orderBy?: Enumerable<VerificationTokenOrderByWithAggregationInput>
    by: Array<VerificationTokenScalarFieldEnum>
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }


  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = PrismaPromise<
    Array<
      PickArray<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  export type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? VerificationToken :
    S extends undefined ? never :
    S extends { include: any } & (VerificationTokenArgs | VerificationTokenFindManyArgs)
    ? VerificationToken 
    : S extends { select: any } & (VerificationTokenArgs | VerificationTokenFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof VerificationToken ? VerificationToken[P] : never
  } 
      : VerificationToken


  type VerificationTokenCountArgs = Merge<
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }
  >

  export interface VerificationTokenDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends VerificationTokenFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>> : Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>

    /**
     * Find one VerificationToken that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends VerificationTokenFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'VerificationToken'> extends True ? Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>> : Prisma__VerificationTokenClient<VerificationTokenGetPayload<T> | null, null>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
    **/
    findMany<T extends VerificationTokenFindManyArgs>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs>
    ): PrismaPromise<Array<VerificationTokenGetPayload<T>>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
    **/
    create<T extends VerificationTokenCreateArgs>(
      args: SelectSubset<T, VerificationTokenCreateArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Create many VerificationTokens.
     *     @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     *     @example
     *     // Create many VerificationTokens
     *     const verificationToken = await prisma.verificationToken.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends VerificationTokenCreateManyArgs>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
    **/
    delete<T extends VerificationTokenDeleteArgs>(
      args: SelectSubset<T, VerificationTokenDeleteArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends VerificationTokenUpdateArgs>(
      args: SelectSubset<T, VerificationTokenUpdateArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends VerificationTokenDeleteManyArgs>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends VerificationTokenUpdateManyArgs>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
    **/
    upsert<T extends VerificationTokenUpsertArgs>(
      args: SelectSubset<T, VerificationTokenUpsertArgs>
    ): Prisma__VerificationTokenClient<VerificationTokenGetPayload<T>>

    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
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
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * VerificationToken base type for findUnique actions
   */
  export type VerificationTokenFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUnique
   */
  export interface VerificationTokenFindUniqueArgs extends VerificationTokenFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken base type for findFirst actions
   */
  export type VerificationTokenFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     * 
    **/
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }

  /**
   * VerificationToken findFirst
   */
  export interface VerificationTokenFindFirstArgs extends VerificationTokenFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationToken to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     * 
    **/
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter, which VerificationTokens to fetch.
     * 
    **/
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     * 
    **/
    orderBy?: Enumerable<VerificationTokenOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     * 
    **/
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<VerificationTokenScalarFieldEnum>
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to create a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs = {
    /**
     * The data used to create many VerificationTokens.
     * 
    **/
    data: Enumerable<VerificationTokenCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The data needed to update a VerificationToken.
     * 
    **/
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs = {
    /**
     * The data used to update VerificationTokens.
     * 
    **/
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     * 
    **/
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
    /**
     * Filter which VerificationToken to delete.
     * 
    **/
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs = {
    /**
     * Filter which VerificationTokens to delete
     * 
    **/
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs = {
    /**
     * Select specific fields to fetch from the VerificationToken
     * 
    **/
    select?: VerificationTokenSelect | null
  }



  /**
   * Model d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
   */


  export type AggregateD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = {
    _count: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateOutputType | null
    _avg: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateOutputType | null
    _sum: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateOutputType | null
    _min: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateOutputType | null
    _max: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateOutputType | null
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateOutputType = {
    amount: number | null
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateOutputType = {
    amount: number | null
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    eventId: number
    userId: number
    amount: number
    paymentDate: number
    _all: number
  }


  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateInputType = {
    amount?: true
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateInputType = {
    amount?: true
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
    _all?: true
  }

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateArgs = {
    /**
     * Filter which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to aggregate.
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
    **/
    _count?: true | D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateInputType
  }

  export type GetD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateType<T extends D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateArgs> = {
        [P in keyof T & keyof AggregateD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl[P]>
      : GetScalarType<T[P], AggregateD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl[P]>
  }




  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs = {
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
    orderBy?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithAggregationInput>
    by: Array<D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum>
    having?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateInputType | true
    _avg?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateInputType
    _sum?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateInputType
    _min?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateInputType
    _max?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateInputType
  }


  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    eventId: string
    userId: string
    amount: number
    paymentDate: Date
    _count: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateOutputType | null
    _avg: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgAggregateOutputType | null
    _sum: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumAggregateOutputType | null
    _min: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinAggregateOutputType | null
    _max: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxAggregateOutputType | null
  }

  type GetD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByPayload<T extends D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs> = PrismaPromise<
    Array<
      PickArray<D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByOutputType[P]>
            : GetScalarType<T[P], D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByOutputType[P]>
        }
      >
    >


  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    userId?: boolean
    amount?: boolean
    paymentDate?: boolean
  }


  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<S extends boolean | null | undefined | d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl :
    S extends undefined ? never :
    S extends { include: any } & (d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplArgs | d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs)
    ? d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl 
    : S extends { select: any } & (d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplArgs | d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl ? d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl[P] : never
  } 
      : d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl


  type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountArgs = Merge<
    Omit<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs, 'select' | 'include'> & {
      select?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateInputType | true
    }
  >

  export interface d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl that matches the filter.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgs} args - Arguments to find a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * @example
     * // Get one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'd6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl'> extends True ? Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>> : Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T> | null, null>

    /**
     * Find one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueOrThrowArgs} args - Arguments to find a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * @example
     * // Get one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueOrThrowArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Find the first D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgs} args - Arguments to find a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * @example
     * // Get one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'd6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl'> extends True ? Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>> : Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T> | null, null>

    /**
     * Find the first D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstOrThrowArgs} args - Arguments to find a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * @example
     * // Get one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstOrThrowArgs>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstOrThrowArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Find zero or more D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findMany()
     * 
     * // Get first 10 D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWithIdOnly = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs>
    ): PrismaPromise<Array<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>>

    /**
     * Create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateArgs} args - Arguments to create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @example
     * // Create one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.create({
     *   data: {
     *     // ... data to create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     *   }
     * })
     * 
    **/
    create<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateArgs>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Create many D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     *     @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyArgs} args - Arguments to create many D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     *     @example
     *     // Create many D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     *     const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyArgs>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteArgs} args - Arguments to delete one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @example
     * // Delete one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.delete({
     *   where: {
     *     // ... filter to delete one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     *   }
     * })
     * 
    **/
    delete<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteArgs>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Update one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateArgs} args - Arguments to update one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @example
     * // Update one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateArgs>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Delete zero or more D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteManyArgs} args - Arguments to filter D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to delete.
     * @example
     * // Delete a few D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     * const { count } = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteManyArgs>(
      args?: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyArgs>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpsertArgs} args - Arguments to update or create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * @example
     * // Update or create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * const d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.upsert({
     *   create: {
     *     // ... data to create a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl we want to update
     *   }
     * })
    **/
    upsert<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpsertArgs>(
      args: SelectSubset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpsertArgs>
    ): Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGetPayload<T>>

    /**
     * Count the number of D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountArgs} args - Arguments to filter D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to count.
     * @example
     * // Count the number of D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls
     * const count = await prisma.d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.count({
     *   where: {
     *     // ... the filter for the D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls we want to count
     *   }
     * })
    **/
    count<T extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountArgs>(
      args?: Subset<T, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateArgs>(args: Subset<T, D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateArgs>): PrismaPromise<GetD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAggregateType<T>>

    /**
     * Group by D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs} args - Group by arguments.
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
      T extends D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs['orderBy'] }
        : { orderBy?: D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetD6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl base type for findUnique actions
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to fetch.
     * 
    **/
    where: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
  }

  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl findUnique
   */
  export interface d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgs extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl findUniqueOrThrow
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to fetch.
     * 
    **/
    where: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl base type for findFirst actions
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to fetch.
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    cursor?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    distinct?: Enumerable<D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum>
  }

  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl findFirst
   */
  export interface d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgs extends d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl findFirstOrThrow
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to fetch.
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    cursor?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    distinct?: Enumerable<D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum>
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl findMany
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplFindManyArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to fetch.
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    cursor?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    skip?: number
    distinct?: Enumerable<D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum>
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl create
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * The data needed to create a d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * 
    **/
    data: XOR<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateInput, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedCreateInput>
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl createMany
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyArgs = {
    /**
     * The data used to create many d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    data: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl update
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * The data needed to update a d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl.
     * 
    **/
    data: XOR<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateInput, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedUpdateInput>
    /**
     * Choose, which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to update.
     * 
    **/
    where: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl updateMany
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyArgs = {
    /**
     * The data used to update d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls.
     * 
    **/
    data: XOR<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyMutationInput, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedUpdateManyInput>
    /**
     * Filter which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to update
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl upsert
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpsertArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * The filter to search for the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to update in case it exists.
     * 
    **/
    where: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
    /**
     * In case the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl found by the `where` argument doesn't exist, create a new d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl with this data.
     * 
    **/
    create: XOR<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateInput, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedCreateInput>
    /**
     * In case the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateInput, d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedUpdateInput>
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl delete
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
    /**
     * Filter which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl to delete.
     * 
    **/
    where: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl deleteMany
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplDeleteManyArgs = {
    /**
     * Filter which d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepls to delete
     * 
    **/
    where?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput
  }


  /**
   * d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl without action
   */
  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplArgs = {
    /**
     * Select specific fields to fetch from the d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vrepl
     * 
    **/
    select?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSelect | null
  }



  /**
   * Model edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
   */


  export type AggregateEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = {
    _count: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateOutputType | null
    _avg: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateOutputType | null
    _sum: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateOutputType | null
    _min: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateOutputType | null
    _max: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateOutputType | null
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateOutputType = {
    amount: number | null
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateOutputType = {
    amount: number | null
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    eventId: string | null
    userId: string | null
    amount: number | null
    paymentDate: Date | null
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    eventId: number
    userId: number
    amount: number
    paymentDate: number
    _all: number
  }


  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateInputType = {
    amount?: true
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateInputType = {
    amount?: true
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    eventId?: true
    userId?: true
    amount?: true
    paymentDate?: true
    _all?: true
  }

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateArgs = {
    /**
     * Filter which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to aggregate.
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
    **/
    _count?: true | Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateInputType
  }

  export type GetEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateType<T extends Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateArgs> = {
        [P in keyof T & keyof AggregateEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl[P]>
      : GetScalarType<T[P], AggregateEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl[P]>
  }




  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs = {
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
    orderBy?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithAggregationInput>
    by: Array<Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum>
    having?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateInputType | true
    _avg?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateInputType
    _sum?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateInputType
    _min?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateInputType
    _max?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateInputType
  }


  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    eventId: string
    userId: string
    amount: number
    paymentDate: Date
    _count: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateOutputType | null
    _avg: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgAggregateOutputType | null
    _sum: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumAggregateOutputType | null
    _min: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinAggregateOutputType | null
    _max: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxAggregateOutputType | null
  }

  type GetEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByPayload<T extends Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByOutputType[P]>
            : GetScalarType<T[P], Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByOutputType[P]>
        }
      >
    >


  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    userId?: boolean
    amount?: boolean
    paymentDate?: boolean
  }


  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<S extends boolean | null | undefined | edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl :
    S extends undefined ? never :
    S extends { include: any } & (edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplArgs | edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs)
    ? edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl 
    : S extends { select: any } & (edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplArgs | edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl ? edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl[P] : never
  } 
      : edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl


  type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountArgs = Merge<
    Omit<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs, 'select' | 'include'> & {
      select?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateInputType | true
    }
  >

  export interface edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl that matches the filter.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgs} args - Arguments to find a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * @example
     * // Get one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl'> extends True ? Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>> : Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T> | null, null>

    /**
     * Find one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueOrThrowArgs} args - Arguments to find a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * @example
     * // Get one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueOrThrowArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Find the first Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgs} args - Arguments to find a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * @example
     * // Get one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl'> extends True ? Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>> : Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T> | null, null>

    /**
     * Find the first Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstOrThrowArgs} args - Arguments to find a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * @example
     * // Get one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstOrThrowArgs>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstOrThrowArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Find zero or more Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findMany()
     * 
     * // Get first 10 Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWithIdOnly = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs>
    ): PrismaPromise<Array<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>>

    /**
     * Create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateArgs} args - Arguments to create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @example
     * // Create one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.create({
     *   data: {
     *     // ... data to create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     *   }
     * })
     * 
    **/
    create<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateArgs>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Create many Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     *     @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyArgs} args - Arguments to create many Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     *     @example
     *     // Create many Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     *     const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyArgs>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteArgs} args - Arguments to delete one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @example
     * // Delete one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.delete({
     *   where: {
     *     // ... filter to delete one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     *   }
     * })
     * 
    **/
    delete<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteArgs>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Update one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateArgs} args - Arguments to update one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @example
     * // Update one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateArgs>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Delete zero or more Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteManyArgs} args - Arguments to filter Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to delete.
     * @example
     * // Delete a few Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     * const { count } = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteManyArgs>(
      args?: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyArgs>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpsertArgs} args - Arguments to update or create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * @example
     * // Update or create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * const edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.upsert({
     *   create: {
     *     // ... data to create a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl we want to update
     *   }
     * })
    **/
    upsert<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpsertArgs>(
      args: SelectSubset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpsertArgs>
    ): Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGetPayload<T>>

    /**
     * Count the number of Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountArgs} args - Arguments to filter Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to count.
     * @example
     * // Count the number of Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls
     * const count = await prisma.edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.count({
     *   where: {
     *     // ... the filter for the Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls we want to count
     *   }
     * })
    **/
    count<T extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountArgs>(
      args?: Subset<T, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateArgs>(args: Subset<T, Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateArgs>): PrismaPromise<GetEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAggregateType<T>>

    /**
     * Group by Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs} args - Group by arguments.
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
      T extends Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs['orderBy'] }
        : { orderBy?: Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEdd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl base type for findUnique actions
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to fetch.
     * 
    **/
    where: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
  }

  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl findUnique
   */
  export interface edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgs extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl findUniqueOrThrow
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to fetch.
     * 
    **/
    where: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl base type for findFirst actions
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to fetch.
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    cursor?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    distinct?: Enumerable<Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum>
  }

  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl findFirst
   */
  export interface edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgs extends edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl findFirstOrThrow
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to fetch.
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    cursor?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    distinct?: Enumerable<Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum>
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl findMany
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplFindManyArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to fetch.
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to fetch.
     * 
    **/
    orderBy?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    cursor?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum>
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl create
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * The data needed to create a edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * 
    **/
    data: XOR<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateInput, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedCreateInput>
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl createMany
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyArgs = {
    /**
     * The data used to create many edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    data: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl update
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * The data needed to update a edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl.
     * 
    **/
    data: XOR<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateInput, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedUpdateInput>
    /**
     * Choose, which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to update.
     * 
    **/
    where: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl updateMany
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyArgs = {
    /**
     * The data used to update edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls.
     * 
    **/
    data: XOR<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyMutationInput, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedUpdateManyInput>
    /**
     * Filter which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to update
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl upsert
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpsertArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * The filter to search for the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to update in case it exists.
     * 
    **/
    where: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
    /**
     * In case the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl found by the `where` argument doesn't exist, create a new edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl with this data.
     * 
    **/
    create: XOR<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateInput, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedCreateInput>
    /**
     * In case the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateInput, edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedUpdateInput>
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl delete
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
    /**
     * Filter which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl to delete.
     * 
    **/
    where: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl deleteMany
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplDeleteManyArgs = {
    /**
     * Filter which edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepls to delete
     * 
    **/
    where?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput
  }


  /**
   * edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl without action
   */
  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplArgs = {
    /**
     * Select specific fields to fetch from the edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vrepl
     * 
    **/
    select?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    eventId: 'eventId',
    userId: 'userId',
    amount: 'amount',
    paymentDate: 'paymentDate'
  };

  export type D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum = (typeof D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum)[keyof typeof D6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarFieldEnum]


  export const Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    eventId: 'eventId',
    userId: 'userId',
    amount: 'amount',
    paymentDate: 'paymentDate'
  };

  export type Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum = (typeof Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum)[keyof typeof Edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    address: 'address',
    date: 'date',
    endTime: 'endTime',
    startTime: 'startTime',
    bookingDate: 'bookingDate',
    cost: 'cost',
    status: 'status',
    maxParticipants: 'maxParticipants'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ParticipantsOnEventsScalarFieldEnum: {
    eventId: 'eventId',
    date: 'date',
    id: 'id',
    userEventStatus: 'userEventStatus'
  };

  export type ParticipantsOnEventsScalarFieldEnum = (typeof ParticipantsOnEventsScalarFieldEnum)[keyof typeof ParticipantsOnEventsScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    eventId: 'eventId',
    userId: 'userId',
    amount: 'amount',
    paymentDate: 'paymentDate',
    gmailMailId: 'gmailMailId'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TokensScalarFieldEnum: {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expiry_date: 'expiry_date'
  };

  export type TokensScalarFieldEnum = (typeof TokensScalarFieldEnum)[keyof typeof TokensScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    password: 'password',
    notificationsEnabled: 'notificationsEnabled'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type TokensWhereInput = {
    AND?: Enumerable<TokensWhereInput>
    OR?: Enumerable<TokensWhereInput>
    NOT?: Enumerable<TokensWhereInput>
    access_token?: StringFilter | string
    refresh_token?: StringFilter | string
    expiry_date?: DateTimeFilter | Date | string
  }

  export type TokensOrderByWithRelationInput = {
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
  }

  export type TokensWhereUniqueInput = {
    refresh_token?: string
  }

  export type TokensOrderByWithAggregationInput = {
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    _count?: TokensCountOrderByAggregateInput
    _max?: TokensMaxOrderByAggregateInput
    _min?: TokensMinOrderByAggregateInput
  }

  export type TokensScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TokensScalarWhereWithAggregatesInput>
    OR?: Enumerable<TokensScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TokensScalarWhereWithAggregatesInput>
    access_token?: StringWithAggregatesFilter | string
    refresh_token?: StringWithAggregatesFilter | string
    expiry_date?: DateTimeWithAggregatesFilter | Date | string
  }

  export type EventWhereInput = {
    AND?: Enumerable<EventWhereInput>
    OR?: Enumerable<EventWhereInput>
    NOT?: Enumerable<EventWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    address?: StringFilter | string
    date?: DateTimeFilter | Date | string
    endTime?: StringFilter | string
    startTime?: StringFilter | string
    bookingDate?: DateTimeNullableFilter | Date | string | null
    cost?: FloatFilter | number
    status?: EnumEventStatusFilter | EventStatus
    maxParticipants?: IntFilter | number
    payments?: PaymentListRelationFilter
    participants?: ParticipantsOnEventsListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
    payments?: PaymentOrderByRelationAggregateInput
    participants?: ParticipantsOnEventsOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = {
    id?: string
  }

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EventScalarWhereWithAggregatesInput>
    OR?: Enumerable<EventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EventScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    address?: StringWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    endTime?: StringWithAggregatesFilter | string
    startTime?: StringWithAggregatesFilter | string
    bookingDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    cost?: FloatWithAggregatesFilter | number
    status?: EnumEventStatusWithAggregatesFilter | EventStatus
    maxParticipants?: IntWithAggregatesFilter | number
  }

  export type ParticipantsOnEventsWhereInput = {
    AND?: Enumerable<ParticipantsOnEventsWhereInput>
    OR?: Enumerable<ParticipantsOnEventsWhereInput>
    NOT?: Enumerable<ParticipantsOnEventsWhereInput>
    eventId?: StringFilter | string
    date?: DateTimeFilter | Date | string
    id?: StringFilter | string
    userEventStatus?: EnumUserEventStatusFilter | UserEventStatus
    user?: XOR<UserRelationFilter, UserWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type ParticipantsOnEventsOrderByWithRelationInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    userEventStatus?: SortOrder
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type ParticipantsOnEventsWhereUniqueInput = {
    id_eventId?: ParticipantsOnEventsIdEventIdCompoundUniqueInput
  }

  export type ParticipantsOnEventsOrderByWithAggregationInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    userEventStatus?: SortOrder
    _count?: ParticipantsOnEventsCountOrderByAggregateInput
    _max?: ParticipantsOnEventsMaxOrderByAggregateInput
    _min?: ParticipantsOnEventsMinOrderByAggregateInput
  }

  export type ParticipantsOnEventsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ParticipantsOnEventsScalarWhereWithAggregatesInput>
    OR?: Enumerable<ParticipantsOnEventsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ParticipantsOnEventsScalarWhereWithAggregatesInput>
    eventId?: StringWithAggregatesFilter | string
    date?: DateTimeWithAggregatesFilter | Date | string
    id?: StringWithAggregatesFilter | string
    userEventStatus?: EnumUserEventStatusWithAggregatesFilter | UserEventStatus
  }

  export type PaymentWhereInput = {
    AND?: Enumerable<PaymentWhereInput>
    OR?: Enumerable<PaymentWhereInput>
    NOT?: Enumerable<PaymentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventId?: StringFilter | string
    userId?: StringFilter | string
    amount?: FloatFilter | number
    paymentDate?: DateTimeFilter | Date | string
    gmailMailId?: StringFilter | string
    event?: XOR<EventRelationFilter, EventWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    gmailMailId?: SortOrder
    event?: EventOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = {
    id?: string
  }

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    gmailMailId?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    OR?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PaymentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    eventId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    amount?: FloatWithAggregatesFilter | number
    paymentDate?: DateTimeWithAggregatesFilter | Date | string
    gmailMailId?: StringWithAggregatesFilter | string
  }

  export type AccountWhereInput = {
    AND?: Enumerable<AccountWhereInput>
    OR?: Enumerable<AccountWhereInput>
    NOT?: Enumerable<AccountWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = {
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
  }

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    type?: StringWithAggregatesFilter | string
    provider?: StringWithAggregatesFilter | string
    providerAccountId?: StringWithAggregatesFilter | string
    refresh_token?: StringNullableWithAggregatesFilter | string | null
    access_token?: StringNullableWithAggregatesFilter | string | null
    expires_at?: IntNullableWithAggregatesFilter | number | null
    token_type?: StringNullableWithAggregatesFilter | string | null
    scope?: StringNullableWithAggregatesFilter | string | null
    id_token?: StringNullableWithAggregatesFilter | string | null
    session_state?: StringNullableWithAggregatesFilter | string | null
  }

  export type SessionWhereInput = {
    AND?: Enumerable<SessionWhereInput>
    OR?: Enumerable<SessionWhereInput>
    NOT?: Enumerable<SessionWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = {
    id?: string
    sessionToken?: string
  }

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SessionScalarWhereWithAggregatesInput>
    OR?: Enumerable<SessionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SessionScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sessionToken?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    email?: StringFilter | string
    emailVerified?: DateTimeNullableFilter | Date | string | null
    image?: StringNullableFilter | string | null
    role?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    password?: StringFilter | string
    notificationsEnabled?: BoolFilter | boolean
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    payments?: PaymentListRelationFilter
    events?: ParticipantsOnEventsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrder
    notificationsEnabled?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    events?: ParticipantsOnEventsOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    name?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrder
    notificationsEnabled?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    emailVerified?: DateTimeNullableWithAggregatesFilter | Date | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    role?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    password?: StringWithAggregatesFilter | string
    notificationsEnabled?: BoolWithAggregatesFilter | boolean
  }

  export type VerificationTokenWhereInput = {
    AND?: Enumerable<VerificationTokenWhereInput>
    OR?: Enumerable<VerificationTokenWhereInput>
    NOT?: Enumerable<VerificationTokenWhereInput>
    identifier?: StringFilter | string
    token?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = {
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
  }

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    OR?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    NOT?: Enumerable<VerificationTokenScalarWhereWithAggregatesInput>
    identifier?: StringWithAggregatesFilter | string
    token?: StringWithAggregatesFilter | string
    expires?: DateTimeWithAggregatesFilter | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput = {
    AND?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput>
    OR?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput>
    NOT?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventId?: StringFilter | string
    userId?: StringFilter | string
    amount?: FloatFilter | number
    paymentDate?: DateTimeFilter | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplWhereUniqueInput = {
    id?: string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    _count?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountOrderByAggregateInput
    _avg?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgOrderByAggregateInput
    _max?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxOrderByAggregateInput
    _min?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinOrderByAggregateInput
    _sum?: d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumOrderByAggregateInput
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarWhereWithAggregatesInput = {
    AND?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarWhereWithAggregatesInput>
    OR?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarWhereWithAggregatesInput>
    NOT?: Enumerable<d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    eventId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    amount?: FloatWithAggregatesFilter | number
    paymentDate?: DateTimeWithAggregatesFilter | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput = {
    AND?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput>
    OR?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput>
    NOT?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventId?: StringFilter | string
    userId?: StringFilter | string
    amount?: FloatFilter | number
    paymentDate?: DateTimeFilter | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplWhereUniqueInput = {
    id?: string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    _count?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountOrderByAggregateInput
    _avg?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgOrderByAggregateInput
    _max?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxOrderByAggregateInput
    _min?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinOrderByAggregateInput
    _sum?: edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumOrderByAggregateInput
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarWhereWithAggregatesInput = {
    AND?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarWhereWithAggregatesInput>
    OR?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarWhereWithAggregatesInput>
    NOT?: Enumerable<edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    eventId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    amount?: FloatWithAggregatesFilter | number
    paymentDate?: DateTimeWithAggregatesFilter | Date | string
  }

  export type TokensCreateInput = {
    access_token: string
    refresh_token: string
    expiry_date: Date | string
  }

  export type TokensUncheckedCreateInput = {
    access_token: string
    refresh_token: string
    expiry_date: Date | string
  }

  export type TokensUpdateInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensCreateManyInput = {
    access_token: string
    refresh_token: string
    expiry_date: Date | string
  }

  export type TokensUpdateManyMutationInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateManyInput = {
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    payments?: PaymentCreateNestedManyWithoutEventInput
    participants?: ParticipantsOnEventsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    payments?: PaymentUncheckedCreateNestedManyWithoutEventInput
    participants?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUpdateManyWithoutEventNestedInput
    participants?: ParticipantsOnEventsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUncheckedUpdateManyWithoutEventNestedInput
    participants?: ParticipantsOnEventsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
  }

  export type ParticipantsOnEventsCreateInput = {
    date?: Date | string
    userEventStatus?: UserEventStatus
    user: UserCreateNestedOneWithoutEventsInput
    event: EventCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsOnEventsUncheckedCreateInput = {
    eventId: string
    date?: Date | string
    id: string
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    event?: EventUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsCreateManyInput = {
    eventId: string
    date?: Date | string
    id: string
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type PaymentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
    event: EventCreateNestedOneWithoutPaymentsInput
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
    event?: EventUpdateOneRequiredWithoutPaymentsNestedInput
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type TokensCountOrderByAggregateInput = {
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
  }

  export type TokensMaxOrderByAggregateInput = {
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
  }

  export type TokensMinOrderByAggregateInput = {
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type EnumEventStatusFilter = {
    equals?: EventStatus
    in?: Enumerable<EventStatus>
    notIn?: Enumerable<EventStatus>
    not?: NestedEnumEventStatusFilter | EventStatus
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type ParticipantsOnEventsListRelationFilter = {
    every?: ParticipantsOnEventsWhereInput
    some?: ParticipantsOnEventsWhereInput
    none?: ParticipantsOnEventsWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParticipantsOnEventsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    cost?: SortOrder
    maxParticipants?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    cost?: SortOrder
    maxParticipants?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type EnumEventStatusWithAggregatesFilter = {
    equals?: EventStatus
    in?: Enumerable<EventStatus>
    notIn?: Enumerable<EventStatus>
    not?: NestedEnumEventStatusWithAggregatesFilter | EventStatus
    _count?: NestedIntFilter
    _min?: NestedEnumEventStatusFilter
    _max?: NestedEnumEventStatusFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type EnumUserEventStatusFilter = {
    equals?: UserEventStatus
    in?: Enumerable<UserEventStatus>
    notIn?: Enumerable<UserEventStatus>
    not?: NestedEnumUserEventStatusFilter | UserEventStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EventRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type ParticipantsOnEventsIdEventIdCompoundUniqueInput = {
    id: string
    eventId: string
  }

  export type ParticipantsOnEventsCountOrderByAggregateInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    userEventStatus?: SortOrder
  }

  export type ParticipantsOnEventsMaxOrderByAggregateInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    userEventStatus?: SortOrder
  }

  export type ParticipantsOnEventsMinOrderByAggregateInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    userEventStatus?: SortOrder
  }

  export type EnumUserEventStatusWithAggregatesFilter = {
    equals?: UserEventStatus
    in?: Enumerable<UserEventStatus>
    notIn?: Enumerable<UserEventStatus>
    not?: NestedEnumUserEventStatusWithAggregatesFilter | UserEventStatus
    _count?: NestedIntFilter
    _min?: NestedEnumUserEventStatusFilter
    _max?: NestedEnumUserEventStatusFilter
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    gmailMailId?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    gmailMailId?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
    gmailMailId?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrder
    notificationsEnabled?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrder
    notificationsEnabled?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrder
    notificationsEnabled?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type d6bf9b_e9bb_5beb_beb7_b788875819cb_20221108200923_vreplSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eventId?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    paymentDate?: SortOrder
  }

  export type edd42fc_e6d5_54f8_8c3e_b7fbbb4c8905_20221108235218_vreplSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PaymentCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutEventInput>, Enumerable<PaymentUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutEventInput>
    createMany?: PaymentCreateManyEventInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type ParticipantsOnEventsCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutEventInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutEventInput>
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
  }

  export type PaymentUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutEventInput>, Enumerable<PaymentUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutEventInput>
    createMany?: PaymentCreateManyEventInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type ParticipantsOnEventsUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutEventInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutEventInput>
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumEventStatusFieldUpdateOperationsInput = {
    set?: EventStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaymentUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutEventInput>, Enumerable<PaymentUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutEventInput>
    createMany?: PaymentCreateManyEventInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type ParticipantsOnEventsUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutEventInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput>
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    set?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    disconnect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    delete?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    update?: Enumerable<ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<ParticipantsOnEventsScalarWhereInput>
  }

  export type PaymentUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutEventInput>, Enumerable<PaymentUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutEventInput>
    createMany?: PaymentCreateManyEventInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutEventInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutEventInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutEventInput>
    upsert?: Enumerable<ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput>
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    set?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    disconnect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    delete?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    update?: Enumerable<ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput>
    updateMany?: Enumerable<ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput>
    deleteMany?: Enumerable<ParticipantsOnEventsScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutEventsInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    connect?: UserWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: EventCreateOrConnectWithoutParticipantsInput
    connect?: EventWhereUniqueInput
  }

  export type EnumUserEventStatusFieldUpdateOperationsInput = {
    set?: UserEventStatus
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type EventUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: EventCreateOrConnectWithoutParticipantsInput
    upsert?: EventUpsertWithoutParticipantsInput
    connect?: EventWhereUniqueInput
    update?: XOR<EventUpdateWithoutParticipantsInput, EventUncheckedUpdateWithoutParticipantsInput>
  }

  export type EventCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<EventCreateWithoutPaymentsInput, EventUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutPaymentsInput
    connect?: EventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type EventUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<EventCreateWithoutPaymentsInput, EventUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutPaymentsInput
    upsert?: EventUpsertWithoutPaymentsInput
    connect?: EventWhereUniqueInput
    update?: XOR<EventUpdateWithoutPaymentsInput, EventUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type ParticipantsOnEventsCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutUserInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutUserInput>
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: Enumerable<AccountWhereUniqueInput>
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: Enumerable<SessionWhereUniqueInput>
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: Enumerable<PaymentWhereUniqueInput>
  }

  export type ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutUserInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutUserInput>
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type ParticipantsOnEventsUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutUserInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    set?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    disconnect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    delete?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    update?: Enumerable<ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ParticipantsOnEventsScalarWhereInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<AccountCreateWithoutUserInput>, Enumerable<AccountUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<AccountCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<AccountUpsertWithWhereUniqueWithoutUserInput>
    createMany?: AccountCreateManyUserInputEnvelope
    set?: Enumerable<AccountWhereUniqueInput>
    disconnect?: Enumerable<AccountWhereUniqueInput>
    delete?: Enumerable<AccountWhereUniqueInput>
    connect?: Enumerable<AccountWhereUniqueInput>
    update?: Enumerable<AccountUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<AccountUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<AccountScalarWhereInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<SessionCreateWithoutUserInput>, Enumerable<SessionUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<SessionCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<SessionUpsertWithWhereUniqueWithoutUserInput>
    createMany?: SessionCreateManyUserInputEnvelope
    set?: Enumerable<SessionWhereUniqueInput>
    disconnect?: Enumerable<SessionWhereUniqueInput>
    delete?: Enumerable<SessionWhereUniqueInput>
    connect?: Enumerable<SessionWhereUniqueInput>
    update?: Enumerable<SessionUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<SessionUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<SessionScalarWhereInput>
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<PaymentCreateWithoutUserInput>, Enumerable<PaymentUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<PaymentCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<PaymentUpsertWithWhereUniqueWithoutUserInput>
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: Enumerable<PaymentWhereUniqueInput>
    disconnect?: Enumerable<PaymentWhereUniqueInput>
    delete?: Enumerable<PaymentWhereUniqueInput>
    connect?: Enumerable<PaymentWhereUniqueInput>
    update?: Enumerable<PaymentUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<PaymentUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<PaymentScalarWhereInput>
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ParticipantsOnEventsCreateWithoutUserInput>, Enumerable<ParticipantsOnEventsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ParticipantsOnEventsCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    set?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    disconnect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    delete?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    connect?: Enumerable<ParticipantsOnEventsWhereUniqueInput>
    update?: Enumerable<ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ParticipantsOnEventsScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedEnumEventStatusFilter = {
    equals?: EventStatus
    in?: Enumerable<EventStatus>
    notIn?: Enumerable<EventStatus>
    not?: NestedEnumEventStatusFilter | EventStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedEnumEventStatusWithAggregatesFilter = {
    equals?: EventStatus
    in?: Enumerable<EventStatus>
    notIn?: Enumerable<EventStatus>
    not?: NestedEnumEventStatusWithAggregatesFilter | EventStatus
    _count?: NestedIntFilter
    _min?: NestedEnumEventStatusFilter
    _max?: NestedEnumEventStatusFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedEnumUserEventStatusFilter = {
    equals?: UserEventStatus
    in?: Enumerable<UserEventStatus>
    notIn?: Enumerable<UserEventStatus>
    not?: NestedEnumUserEventStatusFilter | UserEventStatus
  }

  export type NestedEnumUserEventStatusWithAggregatesFilter = {
    equals?: UserEventStatus
    in?: Enumerable<UserEventStatus>
    notIn?: Enumerable<UserEventStatus>
    not?: NestedEnumUserEventStatusWithAggregatesFilter | UserEventStatus
    _count?: NestedIntFilter
    _min?: NestedEnumUserEventStatusFilter
    _max?: NestedEnumUserEventStatusFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type PaymentCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentCreateOrConnectWithoutEventInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutEventInput, PaymentUncheckedCreateWithoutEventInput>
  }

  export type PaymentCreateManyEventInputEnvelope = {
    data: Enumerable<PaymentCreateManyEventInput>
    skipDuplicates?: boolean
  }

  export type ParticipantsOnEventsCreateWithoutEventInput = {
    date?: Date | string
    userEventStatus?: UserEventStatus
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type ParticipantsOnEventsUncheckedCreateWithoutEventInput = {
    date?: Date | string
    id: string
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsCreateOrConnectWithoutEventInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    create: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput>
  }

  export type ParticipantsOnEventsCreateManyEventInputEnvelope = {
    data: Enumerable<ParticipantsOnEventsCreateManyEventInput>
    skipDuplicates?: boolean
  }

  export type PaymentUpsertWithWhereUniqueWithoutEventInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutEventInput, PaymentUncheckedUpdateWithoutEventInput>
    create: XOR<PaymentCreateWithoutEventInput, PaymentUncheckedCreateWithoutEventInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutEventInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutEventInput, PaymentUncheckedUpdateWithoutEventInput>
  }

  export type PaymentUpdateManyWithWhereWithoutEventInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: Enumerable<PaymentScalarWhereInput>
    OR?: Enumerable<PaymentScalarWhereInput>
    NOT?: Enumerable<PaymentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    eventId?: StringFilter | string
    userId?: StringFilter | string
    amount?: FloatFilter | number
    paymentDate?: DateTimeFilter | Date | string
    gmailMailId?: StringFilter | string
  }

  export type ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    update: XOR<ParticipantsOnEventsUpdateWithoutEventInput, ParticipantsOnEventsUncheckedUpdateWithoutEventInput>
    create: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput>
  }

  export type ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    data: XOR<ParticipantsOnEventsUpdateWithoutEventInput, ParticipantsOnEventsUncheckedUpdateWithoutEventInput>
  }

  export type ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput = {
    where: ParticipantsOnEventsScalarWhereInput
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyWithoutParticipantsInput>
  }

  export type ParticipantsOnEventsScalarWhereInput = {
    AND?: Enumerable<ParticipantsOnEventsScalarWhereInput>
    OR?: Enumerable<ParticipantsOnEventsScalarWhereInput>
    NOT?: Enumerable<ParticipantsOnEventsScalarWhereInput>
    eventId?: StringFilter | string
    date?: DateTimeFilter | Date | string
    id?: StringFilter | string
    userEventStatus?: EnumUserEventStatusFilter | UserEventStatus
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type EventCreateWithoutParticipantsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    payments?: PaymentCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutParticipantsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    payments?: PaymentUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutParticipantsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithoutParticipantsInput = {
    update: XOR<EventUpdateWithoutParticipantsInput, EventUncheckedUpdateWithoutParticipantsInput>
    create: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
  }

  export type EventUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutParticipantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    payments?: PaymentUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateWithoutPaymentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    participants?: ParticipantsOnEventsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutPaymentsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    address: string
    date: Date | string
    endTime: string
    startTime: string
    bookingDate?: Date | string | null
    cost: number
    status?: EventStatus
    maxParticipants?: number
    participants?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutPaymentsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutPaymentsInput, EventUncheckedCreateWithoutPaymentsInput>
  }

  export type UserCreateWithoutPaymentsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type EventUpsertWithoutPaymentsInput = {
    update: XOR<EventUpdateWithoutPaymentsInput, EventUncheckedUpdateWithoutPaymentsInput>
    create: XOR<EventCreateWithoutPaymentsInput, EventUncheckedCreateWithoutPaymentsInput>
  }

  export type EventUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    participants?: ParticipantsOnEventsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    bookingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cost?: FloatFieldUpdateOperationsInput | number
    status?: EnumEventStatusFieldUpdateOperationsInput | EventStatus
    maxParticipants?: IntFieldUpdateOperationsInput | number
    participants?: ParticipantsOnEventsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    sessions?: SessionCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role: string
    createdAt?: Date | string
    password: string
    notificationsEnabled?: boolean
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: StringFieldUpdateOperationsInput | string
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: Enumerable<AccountCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: Enumerable<SessionCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
    event: EventCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: Enumerable<PaymentCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ParticipantsOnEventsCreateWithoutUserInput = {
    date?: Date | string
    userEventStatus?: UserEventStatus
    event: EventCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsOnEventsUncheckedCreateWithoutUserInput = {
    eventId: string
    date?: Date | string
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsCreateOrConnectWithoutUserInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    create: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput>
  }

  export type ParticipantsOnEventsCreateManyUserInputEnvelope = {
    data: Enumerable<ParticipantsOnEventsCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutAccountsInput>
  }

  export type AccountScalarWhereInput = {
    AND?: Enumerable<AccountScalarWhereInput>
    OR?: Enumerable<AccountScalarWhereInput>
    NOT?: Enumerable<AccountScalarWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    type?: StringFilter | string
    provider?: StringFilter | string
    providerAccountId?: StringFilter | string
    refresh_token?: StringNullableFilter | string | null
    access_token?: StringNullableFilter | string | null
    expires_at?: IntNullableFilter | number | null
    token_type?: StringNullableFilter | string | null
    scope?: StringNullableFilter | string | null
    id_token?: StringNullableFilter | string | null
    session_state?: StringNullableFilter | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSessionsInput>
  }

  export type SessionScalarWhereInput = {
    AND?: Enumerable<SessionScalarWhereInput>
    OR?: Enumerable<SessionScalarWhereInput>
    NOT?: Enumerable<SessionScalarWhereInput>
    id?: StringFilter | string
    sessionToken?: StringFilter | string
    userId?: StringFilter | string
    expires?: DateTimeFilter | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  export type ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    update: XOR<ParticipantsOnEventsUpdateWithoutUserInput, ParticipantsOnEventsUncheckedUpdateWithoutUserInput>
    create: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput>
  }

  export type ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    data: XOR<ParticipantsOnEventsUpdateWithoutUserInput, ParticipantsOnEventsUncheckedUpdateWithoutUserInput>
  }

  export type ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput = {
    where: ParticipantsOnEventsScalarWhereInput
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyWithoutEventsInput>
  }

  export type PaymentCreateManyEventInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type ParticipantsOnEventsCreateManyEventInput = {
    date?: Date | string
    id: string
    userEventStatus?: UserEventStatus
  }

  export type PaymentUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUncheckedUpdateManyWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type ParticipantsOnEventsUpdateWithoutEventInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateWithoutEventInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutParticipantsInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type ParticipantsOnEventsCreateManyUserInput = {
    eventId: string
    date?: Date | string
    userEventStatus?: UserEventStatus
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
    event?: EventUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type ParticipantsOnEventsUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    event?: EventUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutEventsInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }



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