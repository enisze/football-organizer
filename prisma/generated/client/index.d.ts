
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type TokensPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Tokens"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    access_token: string
    refresh_token: string
    expiry_date: Date
    ownerId: string
  }, ExtArgs["result"]["tokens"]>
  composites: {}
}

/**
 * Model Tokens
 * 
 */
export type Tokens = runtime.Types.DefaultSelection<TokensPayload>
export type EventPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Event"
  objects: {
    participants: ParticipantsOnEventsPayload<ExtArgs>[]
    Group: GroupPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
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
    groupId: string | null
  }, ExtArgs["result"]["event"]>
  composites: {}
}

/**
 * Model Event
 * 
 */
export type Event = runtime.Types.DefaultSelection<EventPayload>
export type ParticipantsOnEventsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "ParticipantsOnEvents"
  objects: {
    payment: PaymentPayload<ExtArgs> | null
    user: UserPayload<ExtArgs>
    event: EventPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    eventId: string
    date: Date
    id: string
    comment: string | null
    paymentId: string | null
    userEventStatus: UserEventStatus
  }, ExtArgs["result"]["participantsOnEvents"]>
  composites: {}
}

/**
 * Model ParticipantsOnEvents
 * 
 */
export type ParticipantsOnEvents = runtime.Types.DefaultSelection<ParticipantsOnEventsPayload>
export type PaymentPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Payment"
  objects: {
    ParticipantsOnEvents: ParticipantsOnEventsPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    createdAt: Date
    updatedAt: Date
    eventId: string
    userId: string
    amount: number
    paymentDate: Date
    gmailMailId: string
  }, ExtArgs["result"]["payment"]>
  composites: {}
}

/**
 * Model Payment
 * 
 */
export type Payment = runtime.Types.DefaultSelection<PaymentPayload>
export type AccountPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Account"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
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
  }, ExtArgs["result"]["account"]>
  composites: {}
}

/**
 * Model Account
 * 
 */
export type Account = runtime.Types.DefaultSelection<AccountPayload>
export type SessionPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Session"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    sessionToken: string
    userId: string
    expires: Date
  }, ExtArgs["result"]["session"]>
  composites: {}
}

/**
 * Model Session
 * 
 */
export type Session = runtime.Types.DefaultSelection<SessionPayload>
export type GroupPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Group"
  objects: {
    events: EventPayload<ExtArgs>[]
    users: UserOnGroupsPayload<ExtArgs>[]
    owner: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    ownerId: string
    name: string
    createdAt: Date
    updatedAt: Date
    pricingModel: PricingModel
  }, ExtArgs["result"]["group"]>
  composites: {}
}

/**
 * Model Group
 * 
 */
export type Group = runtime.Types.DefaultSelection<GroupPayload>
export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    accounts: AccountPayload<ExtArgs>[]
    sessions: SessionPayload<ExtArgs>[]
    events: ParticipantsOnEventsPayload<ExtArgs>[]
    groups: UserOnGroupsPayload<ExtArgs>[]
    ownedGroups: GroupPayload<ExtArgs>[]
    Tokens: TokensPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    email: string
    emailVerified: Date | null
    image: string | null
    role: string
    createdAt: Date
    password: string | null
    notificationsEnabled: boolean
    paypalName: string | null
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>
export type UserOnGroupsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "UserOnGroups"
  objects: {
    user: UserPayload<ExtArgs>
    group: GroupPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    groupId: string
    role: GroupRole
  }, ExtArgs["result"]["userOnGroups"]>
  composites: {}
}

/**
 * Model UserOnGroups
 * 
 */
export type UserOnGroups = runtime.Types.DefaultSelection<UserOnGroupsPayload>
export type VerificationTokenPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "VerificationToken"
  objects: {}
  scalars: $Extensions.GetResult<{
    identifier: string
    token: string
    expires: Date
  }, ExtArgs["result"]["verificationToken"]>
  composites: {}
}

/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = runtime.Types.DefaultSelection<VerificationTokenPayload>

/**
 * Enums
 */

export const EventStatus: {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  BOOKED: 'BOOKED'
};

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus]


export const UserEventStatus: {
  MAYBE: 'MAYBE',
  AVAILABLE: 'AVAILABLE',
  JOINED: 'JOINED',
  CANCELED: 'CANCELED'
};

export type UserEventStatus = (typeof UserEventStatus)[keyof typeof UserEventStatus]


export const PricingModel: {
  FREE: 'FREE',
  SUPPORTER: 'SUPPORTER',
  PREMIUM: 'PREMIUM'
};

export type PricingModel = (typeof PricingModel)[keyof typeof PricingModel]


export const GroupRole: {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type GroupRole = (typeof GroupRole)[keyof typeof GroupRole]


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
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

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
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.tokens`: Exposes CRUD operations for the **Tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.tokens.findMany()
    * ```
    */
  get tokens(): Prisma.TokensDelegate<ExtArgs>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs>;

  /**
   * `prisma.participantsOnEvents`: Exposes CRUD operations for the **ParticipantsOnEvents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParticipantsOnEvents
    * const participantsOnEvents = await prisma.participantsOnEvents.findMany()
    * ```
    */
  get participantsOnEvents(): Prisma.ParticipantsOnEventsDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs>;

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
   * `prisma.userOnGroups`: Exposes CRUD operations for the **UserOnGroups** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserOnGroups
    * const userOnGroups = await prisma.userOnGroups.findMany()
    * ```
    */
  get userOnGroups(): Prisma.UserOnGroupsDelegate<ExtArgs>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs>;
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
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
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
    Tokens: 'Tokens',
    Event: 'Event',
    ParticipantsOnEvents: 'ParticipantsOnEvents',
    Payment: 'Payment',
    Account: 'Account',
    Session: 'Session',
    Group: 'Group',
    User: 'User',
    UserOnGroups: 'UserOnGroups',
    VerificationToken: 'VerificationToken'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'tokens' | 'event' | 'participantsOnEvents' | 'payment' | 'account' | 'session' | 'group' | 'user' | 'userOnGroups' | 'verificationToken'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Tokens: {
        payload: TokensPayload<ExtArgs>
        fields: Prisma.TokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokensFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokensFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          findFirst: {
            args: Prisma.TokensFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokensFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          findMany: {
            args: Prisma.TokensFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>[]
          }
          create: {
            args: Prisma.TokensCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          createMany: {
            args: Prisma.TokensCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TokensDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          update: {
            args: Prisma.TokensUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          deleteMany: {
            args: Prisma.TokensDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TokensUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TokensUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TokensPayload>
          }
          aggregate: {
            args: Prisma.TokensAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTokens>
          }
          groupBy: {
            args: Prisma.TokensGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokensCountArgs<ExtArgs>,
            result: $Utils.Optional<TokensCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>,
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      ParticipantsOnEvents: {
        payload: ParticipantsOnEventsPayload<ExtArgs>
        fields: Prisma.ParticipantsOnEventsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipantsOnEventsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipantsOnEventsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          findFirst: {
            args: Prisma.ParticipantsOnEventsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipantsOnEventsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          findMany: {
            args: Prisma.ParticipantsOnEventsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>[]
          }
          create: {
            args: Prisma.ParticipantsOnEventsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          createMany: {
            args: Prisma.ParticipantsOnEventsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ParticipantsOnEventsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          update: {
            args: Prisma.ParticipantsOnEventsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          deleteMany: {
            args: Prisma.ParticipantsOnEventsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipantsOnEventsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ParticipantsOnEventsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ParticipantsOnEventsPayload>
          }
          aggregate: {
            args: Prisma.ParticipantsOnEventsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateParticipantsOnEvents>
          }
          groupBy: {
            args: Prisma.ParticipantsOnEventsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ParticipantsOnEventsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipantsOnEventsCountArgs<ExtArgs>,
            result: $Utils.Optional<ParticipantsOnEventsCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>,
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>,
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>,
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>,
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>,
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>,
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserOnGroups: {
        payload: UserOnGroupsPayload<ExtArgs>
        fields: Prisma.UserOnGroupsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserOnGroupsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserOnGroupsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          findFirst: {
            args: Prisma.UserOnGroupsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserOnGroupsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          findMany: {
            args: Prisma.UserOnGroupsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>[]
          }
          create: {
            args: Prisma.UserOnGroupsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          createMany: {
            args: Prisma.UserOnGroupsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserOnGroupsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          update: {
            args: Prisma.UserOnGroupsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          deleteMany: {
            args: Prisma.UserOnGroupsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserOnGroupsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserOnGroupsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserOnGroupsPayload>
          }
          aggregate: {
            args: Prisma.UserOnGroupsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserOnGroups>
          }
          groupBy: {
            args: Prisma.UserOnGroupsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserOnGroupsGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserOnGroupsCountArgs<ExtArgs>,
            result: $Utils.Optional<UserOnGroupsCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>,
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
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
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
    participants: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    participants?: boolean | EventCountOutputTypeCountParticipantsArgs
  }

  // Custom InputTypes

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ParticipantsOnEventsWhereInput
  }



  /**
   * Count Type PaymentCountOutputType
   */


  export type PaymentCountOutputType = {
    ParticipantsOnEvents: number
  }

  export type PaymentCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ParticipantsOnEvents?: boolean | PaymentCountOutputTypeCountParticipantsOnEventsArgs
  }

  // Custom InputTypes

  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentCountOutputType
     */
    select?: PaymentCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * PaymentCountOutputType without action
   */
  export type PaymentCountOutputTypeCountParticipantsOnEventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ParticipantsOnEventsWhereInput
  }



  /**
   * Count Type GroupCountOutputType
   */


  export type GroupCountOutputType = {
    events: number
    users: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    events?: boolean | GroupCountOutputTypeCountEventsArgs
    users?: boolean | GroupCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }


  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnGroupsWhereInput
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    accounts: number
    sessions: number
    events: number
    groups: number
    ownedGroups: number
    Tokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    events?: boolean | UserCountOutputTypeCountEventsArgs
    groups?: boolean | UserCountOutputTypeCountGroupsArgs
    ownedGroups?: boolean | UserCountOutputTypeCountOwnedGroupsArgs
    Tokens?: boolean | UserCountOutputTypeCountTokensArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ParticipantsOnEventsWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnGroupsWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedGroupsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTokensArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TokensWhereInput
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
    id: string | null
    access_token: string | null
    refresh_token: string | null
    expiry_date: Date | null
    ownerId: string | null
  }

  export type TokensMaxAggregateOutputType = {
    id: string | null
    access_token: string | null
    refresh_token: string | null
    expiry_date: Date | null
    ownerId: string | null
  }

  export type TokensCountAggregateOutputType = {
    id: number
    access_token: number
    refresh_token: number
    expiry_date: number
    ownerId: number
    _all: number
  }


  export type TokensMinAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expiry_date?: true
    ownerId?: true
  }

  export type TokensMaxAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expiry_date?: true
    ownerId?: true
  }

  export type TokensCountAggregateInputType = {
    id?: true
    access_token?: true
    refresh_token?: true
    expiry_date?: true
    ownerId?: true
    _all?: true
  }

  export type TokensAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to aggregate.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokensWhereUniqueInput
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




  export type TokensGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TokensWhereInput
    orderBy?: TokensOrderByWithAggregationInput | TokensOrderByWithAggregationInput[]
    by: TokensScalarFieldEnum[] | TokensScalarFieldEnum
    having?: TokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokensCountAggregateInputType | true
    _min?: TokensMinAggregateInputType
    _max?: TokensMaxAggregateInputType
  }


  export type TokensGroupByOutputType = {
    id: string
    access_token: string
    refresh_token: string
    expiry_date: Date
    ownerId: string
    _count: TokensCountAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  type GetTokensGroupByPayload<T extends TokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokensGroupByOutputType[P]>
            : GetScalarType<T[P], TokensGroupByOutputType[P]>
        }
      >
    >


  export type TokensSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expiry_date?: boolean
    ownerId?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["tokens"]>

  export type TokensSelectScalar = {
    id?: boolean
    access_token?: boolean
    refresh_token?: boolean
    expiry_date?: boolean
    ownerId?: boolean
  }

  export type TokensInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type TokensGetPayload<S extends boolean | null | undefined | TokensArgs> = $Types.GetResult<TokensPayload, S>

  type TokensCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<TokensFindManyArgs, 'select' | 'include'> & {
      select?: TokensCountAggregateInputType | true
    }

  export interface TokensDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tokens'], meta: { name: 'Tokens' } }
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
    findUnique<T extends TokensFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TokensFindUniqueArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends TokensFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends TokensFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensFindFirstArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Tokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends TokensFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
     * // Only select the `id`
     * const tokensWithIdOnly = await prisma.tokens.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TokensFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends TokensCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TokensCreateArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends TokensCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends TokensDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TokensDeleteArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends TokensUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TokensUpdateArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends TokensDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TokensDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends TokensUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TokensUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends TokensUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TokensUpsertArgs<ExtArgs>>
    ): Prisma__TokensClient<$Types.GetResult<TokensPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends TokensAggregateArgs>(args: Subset<T, TokensAggregateArgs>): Prisma.PrismaPromise<GetTokensAggregateType<T>>

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
    >(args: SubsetIntersection<T, TokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tokens model
   */
  readonly fields: TokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TokensClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the Tokens model
   */ 
  interface TokensFieldRefs {
    readonly id: FieldRef<"Tokens", 'String'>
    readonly access_token: FieldRef<"Tokens", 'String'>
    readonly refresh_token: FieldRef<"Tokens", 'String'>
    readonly expiry_date: FieldRef<"Tokens", 'DateTime'>
    readonly ownerId: FieldRef<"Tokens", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Tokens findUnique
   */
  export type TokensFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens findUniqueOrThrow
   */
  export type TokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens findFirst
   */
  export type TokensFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokensWhereUniqueInput
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
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }


  /**
   * Tokens findFirstOrThrow
   */
  export type TokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokensWhereUniqueInput
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
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }


  /**
   * Tokens findMany
   */
  export type TokensFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokensWhereUniqueInput
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
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }


  /**
   * Tokens create
   */
  export type TokensCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * The data needed to create a Tokens.
     */
    data: XOR<TokensCreateInput, TokensUncheckedCreateInput>
  }


  /**
   * Tokens createMany
   */
  export type TokensCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokensCreateManyInput | TokensCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Tokens update
   */
  export type TokensUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * The data needed to update a Tokens.
     */
    data: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
    /**
     * Choose, which Tokens to update.
     */
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens updateMany
   */
  export type TokensUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokensUpdateManyMutationInput, TokensUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokensWhereInput
  }


  /**
   * Tokens upsert
   */
  export type TokensUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * The filter to search for the Tokens to update in case it exists.
     */
    where: TokensWhereUniqueInput
    /**
     * In case the Tokens found by the `where` argument doesn't exist, create a new Tokens with this data.
     */
    create: XOR<TokensCreateInput, TokensUncheckedCreateInput>
    /**
     * In case the Tokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokensUpdateInput, TokensUncheckedUpdateInput>
  }


  /**
   * Tokens delete
   */
  export type TokensDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    /**
     * Filter which Tokens to delete.
     */
    where: TokensWhereUniqueInput
  }


  /**
   * Tokens deleteMany
   */
  export type TokensDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokensWhereInput
  }


  /**
   * Tokens without action
   */
  export type TokensArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
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
    groupId: string | null
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
    groupId: string | null
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
    groupId: number
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
    groupId?: true
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
    groupId?: true
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
    groupId?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
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




  export type EventGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
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
    groupId: string | null
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    groupId?: boolean
    participants?: boolean | Event$participantsArgs<ExtArgs>
    Group?: boolean | Event$GroupArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
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
    groupId?: boolean
  }

  export type EventInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    participants?: boolean | Event$participantsArgs<ExtArgs>
    Group?: boolean | Event$GroupArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeArgs<ExtArgs>
  }


  type EventGetPayload<S extends boolean | null | undefined | EventArgs> = $Types.GetResult<EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<EventFindManyArgs, 'select' | 'include'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
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
    findUnique<T extends EventFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends EventFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends EventFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<EventPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends EventCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EventCreateArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends EventCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends EventDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EventDeleteArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends EventUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends EventDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends EventUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends EventUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EventUpsertArgs<ExtArgs>>
    ): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    participants<T extends Event$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Event$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findMany'>| Null>;

    Group<T extends Event$GroupArgs<ExtArgs> = {}>(args?: Subset<T, Event$GroupArgs<ExtArgs>>): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
    readonly updatedAt: FieldRef<"Event", 'DateTime'>
    readonly address: FieldRef<"Event", 'String'>
    readonly date: FieldRef<"Event", 'DateTime'>
    readonly endTime: FieldRef<"Event", 'String'>
    readonly startTime: FieldRef<"Event", 'String'>
    readonly bookingDate: FieldRef<"Event", 'DateTime'>
    readonly cost: FieldRef<"Event", 'Float'>
    readonly status: FieldRef<"Event", 'EventStatus'>
    readonly maxParticipants: FieldRef<"Event", 'Int'>
    readonly groupId: FieldRef<"Event", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }


  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }


  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }


  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }


  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }


  /**
   * Event.participants
   */
  export type Event$participantsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    where?: ParticipantsOnEventsWhereInput
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    cursor?: ParticipantsOnEventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * Event.Group
   */
  export type Event$GroupArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
  }


  /**
   * Event without action
   */
  export type EventArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
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
    comment: string | null
    paymentId: string | null
    userEventStatus: UserEventStatus | null
  }

  export type ParticipantsOnEventsMaxAggregateOutputType = {
    eventId: string | null
    date: Date | null
    id: string | null
    comment: string | null
    paymentId: string | null
    userEventStatus: UserEventStatus | null
  }

  export type ParticipantsOnEventsCountAggregateOutputType = {
    eventId: number
    date: number
    id: number
    comment: number
    paymentId: number
    userEventStatus: number
    _all: number
  }


  export type ParticipantsOnEventsMinAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    comment?: true
    paymentId?: true
    userEventStatus?: true
  }

  export type ParticipantsOnEventsMaxAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    comment?: true
    paymentId?: true
    userEventStatus?: true
  }

  export type ParticipantsOnEventsCountAggregateInputType = {
    eventId?: true
    date?: true
    id?: true
    comment?: true
    paymentId?: true
    userEventStatus?: true
    _all?: true
  }

  export type ParticipantsOnEventsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantsOnEvents to aggregate.
     */
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     */
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     */
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




  export type ParticipantsOnEventsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ParticipantsOnEventsWhereInput
    orderBy?: ParticipantsOnEventsOrderByWithAggregationInput | ParticipantsOnEventsOrderByWithAggregationInput[]
    by: ParticipantsOnEventsScalarFieldEnum[] | ParticipantsOnEventsScalarFieldEnum
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
    comment: string | null
    paymentId: string | null
    userEventStatus: UserEventStatus
    _count: ParticipantsOnEventsCountAggregateOutputType | null
    _min: ParticipantsOnEventsMinAggregateOutputType | null
    _max: ParticipantsOnEventsMaxAggregateOutputType | null
  }

  type GetParticipantsOnEventsGroupByPayload<T extends ParticipantsOnEventsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantsOnEventsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantsOnEventsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantsOnEventsGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantsOnEventsGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantsOnEventsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    date?: boolean
    id?: boolean
    comment?: boolean
    paymentId?: boolean
    userEventStatus?: boolean
    payment?: boolean | ParticipantsOnEvents$paymentArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
    event?: boolean | EventArgs<ExtArgs>
  }, ExtArgs["result"]["participantsOnEvents"]>

  export type ParticipantsOnEventsSelectScalar = {
    eventId?: boolean
    date?: boolean
    id?: boolean
    comment?: boolean
    paymentId?: boolean
    userEventStatus?: boolean
  }

  export type ParticipantsOnEventsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    payment?: boolean | ParticipantsOnEvents$paymentArgs<ExtArgs>
    user?: boolean | UserArgs<ExtArgs>
    event?: boolean | EventArgs<ExtArgs>
  }


  type ParticipantsOnEventsGetPayload<S extends boolean | null | undefined | ParticipantsOnEventsArgs> = $Types.GetResult<ParticipantsOnEventsPayload, S>

  type ParticipantsOnEventsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ParticipantsOnEventsFindManyArgs, 'select' | 'include'> & {
      select?: ParticipantsOnEventsCountAggregateInputType | true
    }

  export interface ParticipantsOnEventsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParticipantsOnEvents'], meta: { name: 'ParticipantsOnEvents' } }
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
    findUnique<T extends ParticipantsOnEventsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsFindUniqueArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends ParticipantsOnEventsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends ParticipantsOnEventsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsFindFirstArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ParticipantsOnEvents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends ParticipantsOnEventsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends ParticipantsOnEventsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends ParticipantsOnEventsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsCreateArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends ParticipantsOnEventsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends ParticipantsOnEventsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsDeleteArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends ParticipantsOnEventsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsUpdateArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends ParticipantsOnEventsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantsOnEventsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends ParticipantsOnEventsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends ParticipantsOnEventsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantsOnEventsUpsertArgs<ExtArgs>>
    ): Prisma__ParticipantsOnEventsClient<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends ParticipantsOnEventsAggregateArgs>(args: Subset<T, ParticipantsOnEventsAggregateArgs>): Prisma.PrismaPromise<GetParticipantsOnEventsAggregateType<T>>

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
    >(args: SubsetIntersection<T, ParticipantsOnEventsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantsOnEventsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParticipantsOnEvents model
   */
  readonly fields: ParticipantsOnEventsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParticipantsOnEvents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ParticipantsOnEventsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    payment<T extends ParticipantsOnEvents$paymentArgs<ExtArgs> = {}>(args?: Subset<T, ParticipantsOnEvents$paymentArgs<ExtArgs>>): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    event<T extends EventArgs<ExtArgs> = {}>(args?: Subset<T, EventArgs<ExtArgs>>): Prisma__EventClient<$Types.GetResult<EventPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the ParticipantsOnEvents model
   */ 
  interface ParticipantsOnEventsFieldRefs {
    readonly eventId: FieldRef<"ParticipantsOnEvents", 'String'>
    readonly date: FieldRef<"ParticipantsOnEvents", 'DateTime'>
    readonly id: FieldRef<"ParticipantsOnEvents", 'String'>
    readonly comment: FieldRef<"ParticipantsOnEvents", 'String'>
    readonly paymentId: FieldRef<"ParticipantsOnEvents", 'String'>
    readonly userEventStatus: FieldRef<"ParticipantsOnEvents", 'UserEventStatus'>
  }
    

  // Custom InputTypes

  /**
   * ParticipantsOnEvents findUnique
   */
  export type ParticipantsOnEventsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     */
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents findUniqueOrThrow
   */
  export type ParticipantsOnEventsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     */
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents findFirst
   */
  export type ParticipantsOnEventsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     */
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     */
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantsOnEvents.
     */
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantsOnEvents.
     */
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * ParticipantsOnEvents findFirstOrThrow
   */
  export type ParticipantsOnEventsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     */
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     */
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantsOnEvents.
     */
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantsOnEvents.
     */
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * ParticipantsOnEvents findMany
   */
  export type ParticipantsOnEventsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantsOnEvents to fetch.
     */
    where?: ParticipantsOnEventsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantsOnEvents to fetch.
     */
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParticipantsOnEvents.
     */
    cursor?: ParticipantsOnEventsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantsOnEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantsOnEvents.
     */
    skip?: number
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * ParticipantsOnEvents create
   */
  export type ParticipantsOnEventsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * The data needed to create a ParticipantsOnEvents.
     */
    data: XOR<ParticipantsOnEventsCreateInput, ParticipantsOnEventsUncheckedCreateInput>
  }


  /**
   * ParticipantsOnEvents createMany
   */
  export type ParticipantsOnEventsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParticipantsOnEvents.
     */
    data: ParticipantsOnEventsCreateManyInput | ParticipantsOnEventsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * ParticipantsOnEvents update
   */
  export type ParticipantsOnEventsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * The data needed to update a ParticipantsOnEvents.
     */
    data: XOR<ParticipantsOnEventsUpdateInput, ParticipantsOnEventsUncheckedUpdateInput>
    /**
     * Choose, which ParticipantsOnEvents to update.
     */
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents updateMany
   */
  export type ParticipantsOnEventsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParticipantsOnEvents.
     */
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyInput>
    /**
     * Filter which ParticipantsOnEvents to update
     */
    where?: ParticipantsOnEventsWhereInput
  }


  /**
   * ParticipantsOnEvents upsert
   */
  export type ParticipantsOnEventsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * The filter to search for the ParticipantsOnEvents to update in case it exists.
     */
    where: ParticipantsOnEventsWhereUniqueInput
    /**
     * In case the ParticipantsOnEvents found by the `where` argument doesn't exist, create a new ParticipantsOnEvents with this data.
     */
    create: XOR<ParticipantsOnEventsCreateInput, ParticipantsOnEventsUncheckedCreateInput>
    /**
     * In case the ParticipantsOnEvents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipantsOnEventsUpdateInput, ParticipantsOnEventsUncheckedUpdateInput>
  }


  /**
   * ParticipantsOnEvents delete
   */
  export type ParticipantsOnEventsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    /**
     * Filter which ParticipantsOnEvents to delete.
     */
    where: ParticipantsOnEventsWhereUniqueInput
  }


  /**
   * ParticipantsOnEvents deleteMany
   */
  export type ParticipantsOnEventsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantsOnEvents to delete
     */
    where?: ParticipantsOnEventsWhereInput
  }


  /**
   * ParticipantsOnEvents.payment
   */
  export type ParticipantsOnEvents$paymentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
  }


  /**
   * ParticipantsOnEvents without action
   */
  export type ParticipantsOnEventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
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

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
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




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
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

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    userId?: boolean
    amount?: boolean
    paymentDate?: boolean
    gmailMailId?: boolean
    ParticipantsOnEvents?: boolean | Payment$ParticipantsOnEventsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eventId?: boolean
    userId?: boolean
    amount?: boolean
    paymentDate?: boolean
    gmailMailId?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    ParticipantsOnEvents?: boolean | Payment$ParticipantsOnEventsArgs<ExtArgs>
    _count?: boolean | PaymentCountOutputTypeArgs<ExtArgs>
  }


  type PaymentGetPayload<S extends boolean | null | undefined | PaymentArgs> = $Types.GetResult<PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
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
    findUnique<T extends PaymentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends PaymentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends PaymentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends PaymentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends PaymentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends PaymentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends PaymentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends PaymentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends PaymentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends PaymentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>
    ): Prisma__PaymentClient<$Types.GetResult<PaymentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    ParticipantsOnEvents<T extends Payment$ParticipantsOnEventsArgs<ExtArgs> = {}>(args?: Subset<T, Payment$ParticipantsOnEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findMany'>| Null>;

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



  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly eventId: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly gmailMailId: FieldRef<"Payment", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }


  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }


  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }


  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }


  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }


  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }


  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }


  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }


  /**
   * Payment.ParticipantsOnEvents
   */
  export type Payment$ParticipantsOnEventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    where?: ParticipantsOnEventsWhereInput
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    cursor?: ParticipantsOnEventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * Payment without action
   */
  export type PaymentArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PaymentInclude<ExtArgs> | null
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

  export type AccountAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
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




  export type AccountGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
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

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
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
  }

  export type AccountInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type AccountGetPayload<S extends boolean | null | undefined | AccountArgs> = $Types.GetResult<AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<AccountFindManyArgs, 'select' | 'include'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
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
    findUnique<T extends AccountFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends AccountFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends AccountFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends AccountCreateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountCreateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends AccountCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends AccountDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends AccountUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends AccountDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends AccountUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends AccountUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>
    ): Prisma__AccountClient<$Types.GetResult<AccountPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the Account model
   */ 
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }


  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }


  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }


  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }


  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
  }


  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }


  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }


  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
  }


  /**
   * Account without action
   */
  export type AccountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
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

  export type SessionAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
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




  export type SessionGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
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

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type SessionGetPayload<S extends boolean | null | undefined | SessionArgs> = $Types.GetResult<SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
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
    findUnique<T extends SessionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends SessionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends SessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends SessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends SessionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends SessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends SessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends SessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends SessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends SessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>
    ): Prisma__SessionClient<$Types.GetResult<SessionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }


  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }


  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }


  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }


  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }


  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }


  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }


  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }


  /**
   * Session without action
   */
  export type SessionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
  }



  /**
   * Model Group
   */


  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pricingModel: PricingModel | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pricingModel: PricingModel | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    ownerId: number
    name: number
    createdAt: number
    updatedAt: number
    pricingModel: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    pricingModel?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    pricingModel?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    ownerId?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    pricingModel?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }


  export type GroupGroupByOutputType = {
    id: string
    ownerId: string
    name: string
    createdAt: Date
    updatedAt: Date
    pricingModel: PricingModel
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pricingModel?: boolean
    events?: boolean | Group$eventsArgs<ExtArgs>
    users?: boolean | Group$usersArgs<ExtArgs>
    owner?: boolean | UserArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    id?: boolean
    ownerId?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pricingModel?: boolean
  }

  export type GroupInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    events?: boolean | Group$eventsArgs<ExtArgs>
    users?: boolean | Group$usersArgs<ExtArgs>
    owner?: boolean | UserArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeArgs<ExtArgs>
  }


  type GroupGetPayload<S extends boolean | null | undefined | GroupArgs> = $Types.GetResult<GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<GroupFindManyArgs, 'select' | 'include'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends GroupFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Group that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends GroupFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends GroupFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
    **/
    create<T extends GroupCreateArgs<ExtArgs>>(
      args: SelectSubset<T, GroupCreateArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Groups.
     *     @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     *     @example
     *     // Create many Groups
     *     const group = await prisma.group.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends GroupCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
    **/
    delete<T extends GroupDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends GroupUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends GroupDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends GroupUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
    **/
    upsert<T extends GroupUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>
    ): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    events<T extends Group$eventsArgs<ExtArgs> = {}>(args?: Subset<T, Group$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<EventPayload<ExtArgs>, T, 'findMany'>| Null>;

    users<T extends Group$usersArgs<ExtArgs> = {}>(args?: Subset<T, Group$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findMany'>| Null>;

    owner<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the Group model
   */ 
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly ownerId: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
    readonly pricingModel: FieldRef<"Group", 'PricingModel'>
  }
    

  // Custom InputTypes

  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }


  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
  }


  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }


  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }


  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
  }


  /**
   * Group.events
   */
  export type Group$eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }


  /**
   * Group.users
   */
  export type Group$usersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    where?: UserOnGroupsWhereInput
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    cursor?: UserOnGroupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOnGroupsScalarFieldEnum | UserOnGroupsScalarFieldEnum[]
  }


  /**
   * Group without action
   */
  export type GroupArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
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
    paypalName: string | null
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
    paypalName: string | null
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
    paypalName: number
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
    paypalName?: true
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
    paypalName?: true
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
    paypalName?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    name: string
    email: string
    emailVerified: Date | null
    image: string | null
    role: string
    createdAt: Date
    password: string | null
    notificationsEnabled: boolean
    paypalName: string | null
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


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    password?: boolean
    notificationsEnabled?: boolean
    paypalName?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    ownedGroups?: boolean | User$ownedGroupsArgs<ExtArgs>
    Tokens?: boolean | User$TokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    role?: boolean
    createdAt?: boolean
    password?: boolean
    notificationsEnabled?: boolean
    paypalName?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    events?: boolean | User$eventsArgs<ExtArgs>
    groups?: boolean | User$groupsArgs<ExtArgs>
    ownedGroups?: boolean | User$ownedGroupsArgs<ExtArgs>
    Tokens?: boolean | User$TokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

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
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<AccountPayload<ExtArgs>, T, 'findMany'>| Null>;

    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SessionPayload<ExtArgs>, T, 'findMany'>| Null>;

    events<T extends User$eventsArgs<ExtArgs> = {}>(args?: Subset<T, User$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ParticipantsOnEventsPayload<ExtArgs>, T, 'findMany'>| Null>;

    groups<T extends User$groupsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findMany'>| Null>;

    ownedGroups<T extends User$ownedGroupsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findMany'>| Null>;

    Tokens<T extends User$TokensArgs<ExtArgs> = {}>(args?: Subset<T, User$TokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<TokensPayload<ExtArgs>, T, 'findMany'>| Null>;

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



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
    readonly notificationsEnabled: FieldRef<"User", 'Boolean'>
    readonly paypalName: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes

  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }


  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }


  /**
   * User.events
   */
  export type User$eventsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantsOnEvents
     */
    select?: ParticipantsOnEventsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ParticipantsOnEventsInclude<ExtArgs> | null
    where?: ParticipantsOnEventsWhereInput
    orderBy?: ParticipantsOnEventsOrderByWithRelationInput | ParticipantsOnEventsOrderByWithRelationInput[]
    cursor?: ParticipantsOnEventsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantsOnEventsScalarFieldEnum | ParticipantsOnEventsScalarFieldEnum[]
  }


  /**
   * User.groups
   */
  export type User$groupsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    where?: UserOnGroupsWhereInput
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    cursor?: UserOnGroupsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserOnGroupsScalarFieldEnum | UserOnGroupsScalarFieldEnum[]
  }


  /**
   * User.ownedGroups
   */
  export type User$ownedGroupsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }


  /**
   * User.Tokens
   */
  export type User$TokensArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tokens
     */
    select?: TokensSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TokensInclude<ExtArgs> | null
    where?: TokensWhereInput
    orderBy?: TokensOrderByWithRelationInput | TokensOrderByWithRelationInput[]
    cursor?: TokensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TokensScalarFieldEnum | TokensScalarFieldEnum[]
  }


  /**
   * User without action
   */
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model UserOnGroups
   */


  export type AggregateUserOnGroups = {
    _count: UserOnGroupsCountAggregateOutputType | null
    _min: UserOnGroupsMinAggregateOutputType | null
    _max: UserOnGroupsMaxAggregateOutputType | null
  }

  export type UserOnGroupsMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    role: GroupRole | null
  }

  export type UserOnGroupsMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    role: GroupRole | null
  }

  export type UserOnGroupsCountAggregateOutputType = {
    id: number
    groupId: number
    role: number
    _all: number
  }


  export type UserOnGroupsMinAggregateInputType = {
    id?: true
    groupId?: true
    role?: true
  }

  export type UserOnGroupsMaxAggregateInputType = {
    id?: true
    groupId?: true
    role?: true
  }

  export type UserOnGroupsCountAggregateInputType = {
    id?: true
    groupId?: true
    role?: true
    _all?: true
  }

  export type UserOnGroupsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnGroups to aggregate.
     */
    where?: UserOnGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnGroups to fetch.
     */
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserOnGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserOnGroups
    **/
    _count?: true | UserOnGroupsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserOnGroupsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserOnGroupsMaxAggregateInputType
  }

  export type GetUserOnGroupsAggregateType<T extends UserOnGroupsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserOnGroups]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserOnGroups[P]>
      : GetScalarType<T[P], AggregateUserOnGroups[P]>
  }




  export type UserOnGroupsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserOnGroupsWhereInput
    orderBy?: UserOnGroupsOrderByWithAggregationInput | UserOnGroupsOrderByWithAggregationInput[]
    by: UserOnGroupsScalarFieldEnum[] | UserOnGroupsScalarFieldEnum
    having?: UserOnGroupsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserOnGroupsCountAggregateInputType | true
    _min?: UserOnGroupsMinAggregateInputType
    _max?: UserOnGroupsMaxAggregateInputType
  }


  export type UserOnGroupsGroupByOutputType = {
    id: string
    groupId: string
    role: GroupRole
    _count: UserOnGroupsCountAggregateOutputType | null
    _min: UserOnGroupsMinAggregateOutputType | null
    _max: UserOnGroupsMaxAggregateOutputType | null
  }

  type GetUserOnGroupsGroupByPayload<T extends UserOnGroupsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserOnGroupsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserOnGroupsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserOnGroupsGroupByOutputType[P]>
            : GetScalarType<T[P], UserOnGroupsGroupByOutputType[P]>
        }
      >
    >


  export type UserOnGroupsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    role?: boolean
    user?: boolean | UserArgs<ExtArgs>
    group?: boolean | GroupArgs<ExtArgs>
  }, ExtArgs["result"]["userOnGroups"]>

  export type UserOnGroupsSelectScalar = {
    id?: boolean
    groupId?: boolean
    role?: boolean
  }

  export type UserOnGroupsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
    group?: boolean | GroupArgs<ExtArgs>
  }


  type UserOnGroupsGetPayload<S extends boolean | null | undefined | UserOnGroupsArgs> = $Types.GetResult<UserOnGroupsPayload, S>

  type UserOnGroupsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserOnGroupsFindManyArgs, 'select' | 'include'> & {
      select?: UserOnGroupsCountAggregateInputType | true
    }

  export interface UserOnGroupsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserOnGroups'], meta: { name: 'UserOnGroups' } }
    /**
     * Find zero or one UserOnGroups that matches the filter.
     * @param {UserOnGroupsFindUniqueArgs} args - Arguments to find a UserOnGroups
     * @example
     * // Get one UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserOnGroupsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsFindUniqueArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserOnGroups that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserOnGroupsFindUniqueOrThrowArgs} args - Arguments to find a UserOnGroups
     * @example
     * // Get one UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserOnGroupsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserOnGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsFindFirstArgs} args - Arguments to find a UserOnGroups
     * @example
     * // Get one UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserOnGroupsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsFindFirstArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserOnGroups that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsFindFirstOrThrowArgs} args - Arguments to find a UserOnGroups
     * @example
     * // Get one UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserOnGroupsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserOnGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findMany()
     * 
     * // Get first 10 UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userOnGroupsWithIdOnly = await prisma.userOnGroups.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserOnGroupsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserOnGroups.
     * @param {UserOnGroupsCreateArgs} args - Arguments to create a UserOnGroups.
     * @example
     * // Create one UserOnGroups
     * const UserOnGroups = await prisma.userOnGroups.create({
     *   data: {
     *     // ... data to create a UserOnGroups
     *   }
     * })
     * 
    **/
    create<T extends UserOnGroupsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsCreateArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserOnGroups.
     *     @param {UserOnGroupsCreateManyArgs} args - Arguments to create many UserOnGroups.
     *     @example
     *     // Create many UserOnGroups
     *     const userOnGroups = await prisma.userOnGroups.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserOnGroupsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserOnGroups.
     * @param {UserOnGroupsDeleteArgs} args - Arguments to delete one UserOnGroups.
     * @example
     * // Delete one UserOnGroups
     * const UserOnGroups = await prisma.userOnGroups.delete({
     *   where: {
     *     // ... filter to delete one UserOnGroups
     *   }
     * })
     * 
    **/
    delete<T extends UserOnGroupsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsDeleteArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserOnGroups.
     * @param {UserOnGroupsUpdateArgs} args - Arguments to update one UserOnGroups.
     * @example
     * // Update one UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserOnGroupsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsUpdateArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserOnGroups.
     * @param {UserOnGroupsDeleteManyArgs} args - Arguments to filter UserOnGroups to delete.
     * @example
     * // Delete a few UserOnGroups
     * const { count } = await prisma.userOnGroups.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserOnGroupsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserOnGroupsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserOnGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserOnGroupsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserOnGroups.
     * @param {UserOnGroupsUpsertArgs} args - Arguments to update or create a UserOnGroups.
     * @example
     * // Update or create a UserOnGroups
     * const userOnGroups = await prisma.userOnGroups.upsert({
     *   create: {
     *     // ... data to create a UserOnGroups
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserOnGroups we want to update
     *   }
     * })
    **/
    upsert<T extends UserOnGroupsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserOnGroupsUpsertArgs<ExtArgs>>
    ): Prisma__UserOnGroupsClient<$Types.GetResult<UserOnGroupsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserOnGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsCountArgs} args - Arguments to filter UserOnGroups to count.
     * @example
     * // Count the number of UserOnGroups
     * const count = await prisma.userOnGroups.count({
     *   where: {
     *     // ... the filter for the UserOnGroups we want to count
     *   }
     * })
    **/
    count<T extends UserOnGroupsCountArgs>(
      args?: Subset<T, UserOnGroupsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserOnGroupsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserOnGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserOnGroupsAggregateArgs>(args: Subset<T, UserOnGroupsAggregateArgs>): Prisma.PrismaPromise<GetUserOnGroupsAggregateType<T>>

    /**
     * Group by UserOnGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserOnGroupsGroupByArgs} args - Group by arguments.
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
      T extends UserOnGroupsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserOnGroupsGroupByArgs['orderBy'] }
        : { orderBy?: UserOnGroupsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserOnGroupsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserOnGroupsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserOnGroups model
   */
  readonly fields: UserOnGroupsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserOnGroups.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserOnGroupsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    group<T extends GroupArgs<ExtArgs> = {}>(args?: Subset<T, GroupArgs<ExtArgs>>): Prisma__GroupClient<$Types.GetResult<GroupPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

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



  /**
   * Fields of the UserOnGroups model
   */ 
  interface UserOnGroupsFieldRefs {
    readonly id: FieldRef<"UserOnGroups", 'String'>
    readonly groupId: FieldRef<"UserOnGroups", 'String'>
    readonly role: FieldRef<"UserOnGroups", 'GroupRole'>
  }
    

  // Custom InputTypes

  /**
   * UserOnGroups findUnique
   */
  export type UserOnGroupsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter, which UserOnGroups to fetch.
     */
    where: UserOnGroupsWhereUniqueInput
  }


  /**
   * UserOnGroups findUniqueOrThrow
   */
  export type UserOnGroupsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter, which UserOnGroups to fetch.
     */
    where: UserOnGroupsWhereUniqueInput
  }


  /**
   * UserOnGroups findFirst
   */
  export type UserOnGroupsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter, which UserOnGroups to fetch.
     */
    where?: UserOnGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnGroups to fetch.
     */
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnGroups.
     */
    cursor?: UserOnGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnGroups.
     */
    distinct?: UserOnGroupsScalarFieldEnum | UserOnGroupsScalarFieldEnum[]
  }


  /**
   * UserOnGroups findFirstOrThrow
   */
  export type UserOnGroupsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter, which UserOnGroups to fetch.
     */
    where?: UserOnGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnGroups to fetch.
     */
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserOnGroups.
     */
    cursor?: UserOnGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserOnGroups.
     */
    distinct?: UserOnGroupsScalarFieldEnum | UserOnGroupsScalarFieldEnum[]
  }


  /**
   * UserOnGroups findMany
   */
  export type UserOnGroupsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter, which UserOnGroups to fetch.
     */
    where?: UserOnGroupsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserOnGroups to fetch.
     */
    orderBy?: UserOnGroupsOrderByWithRelationInput | UserOnGroupsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserOnGroups.
     */
    cursor?: UserOnGroupsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserOnGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserOnGroups.
     */
    skip?: number
    distinct?: UserOnGroupsScalarFieldEnum | UserOnGroupsScalarFieldEnum[]
  }


  /**
   * UserOnGroups create
   */
  export type UserOnGroupsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * The data needed to create a UserOnGroups.
     */
    data: XOR<UserOnGroupsCreateInput, UserOnGroupsUncheckedCreateInput>
  }


  /**
   * UserOnGroups createMany
   */
  export type UserOnGroupsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserOnGroups.
     */
    data: UserOnGroupsCreateManyInput | UserOnGroupsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserOnGroups update
   */
  export type UserOnGroupsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * The data needed to update a UserOnGroups.
     */
    data: XOR<UserOnGroupsUpdateInput, UserOnGroupsUncheckedUpdateInput>
    /**
     * Choose, which UserOnGroups to update.
     */
    where: UserOnGroupsWhereUniqueInput
  }


  /**
   * UserOnGroups updateMany
   */
  export type UserOnGroupsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserOnGroups.
     */
    data: XOR<UserOnGroupsUpdateManyMutationInput, UserOnGroupsUncheckedUpdateManyInput>
    /**
     * Filter which UserOnGroups to update
     */
    where?: UserOnGroupsWhereInput
  }


  /**
   * UserOnGroups upsert
   */
  export type UserOnGroupsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * The filter to search for the UserOnGroups to update in case it exists.
     */
    where: UserOnGroupsWhereUniqueInput
    /**
     * In case the UserOnGroups found by the `where` argument doesn't exist, create a new UserOnGroups with this data.
     */
    create: XOR<UserOnGroupsCreateInput, UserOnGroupsUncheckedCreateInput>
    /**
     * In case the UserOnGroups was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserOnGroupsUpdateInput, UserOnGroupsUncheckedUpdateInput>
  }


  /**
   * UserOnGroups delete
   */
  export type UserOnGroupsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
    /**
     * Filter which UserOnGroups to delete.
     */
    where: UserOnGroupsWhereUniqueInput
  }


  /**
   * UserOnGroups deleteMany
   */
  export type UserOnGroupsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserOnGroups to delete
     */
    where?: UserOnGroupsWhereInput
  }


  /**
   * UserOnGroups without action
   */
  export type UserOnGroupsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserOnGroups
     */
    select?: UserOnGroupsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserOnGroupsInclude<ExtArgs> | null
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

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
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




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
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

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }


  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenArgs> = $Types.GetResult<VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<VerificationTokenFindManyArgs, 'select' | 'include'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
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
    findUnique<T extends VerificationTokenFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    findFirst<T extends VerificationTokenFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

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
    findMany<T extends VerificationTokenFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'findMany'>>

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
    create<T extends VerificationTokenCreateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

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
    createMany<T extends VerificationTokenCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends VerificationTokenDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    update<T extends VerificationTokenUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    deleteMany<T extends VerificationTokenDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends VerificationTokenUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends VerificationTokenUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>
    ): Prisma__VerificationTokenClient<$Types.GetResult<VerificationTokenPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

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
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
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
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


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



  /**
   * Fields of the VerificationToken model
   */ 
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }


  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }


  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }


  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }


  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }


  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }


  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
  }


  /**
   * VerificationToken without action
   */
  export type VerificationTokenArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
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


  export const TokensScalarFieldEnum: {
    id: 'id',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    expiry_date: 'expiry_date',
    ownerId: 'ownerId'
  };

  export type TokensScalarFieldEnum = (typeof TokensScalarFieldEnum)[keyof typeof TokensScalarFieldEnum]


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
    maxParticipants: 'maxParticipants',
    groupId: 'groupId'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const ParticipantsOnEventsScalarFieldEnum: {
    eventId: 'eventId',
    date: 'date',
    id: 'id',
    comment: 'comment',
    paymentId: 'paymentId',
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


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pricingModel: 'pricingModel'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    role: 'role',
    createdAt: 'createdAt',
    password: 'password',
    notificationsEnabled: 'notificationsEnabled',
    paypalName: 'paypalName'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserOnGroupsScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    role: 'role'
  };

  export type UserOnGroupsScalarFieldEnum = (typeof UserOnGroupsScalarFieldEnum)[keyof typeof UserOnGroupsScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'EventStatus'
   */
  export type EnumEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventStatus'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'UserEventStatus'
   */
  export type EnumUserEventStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserEventStatus'>
    


  /**
   * Reference to a field of type 'PricingModel'
   */
  export type EnumPricingModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PricingModel'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'GroupRole'
   */
  export type EnumGroupRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GroupRole'>
    
  /**
   * Deep Input Types
   */


  export type TokensWhereInput = {
    AND?: TokensWhereInput | TokensWhereInput[]
    OR?: TokensWhereInput[]
    NOT?: TokensWhereInput | TokensWhereInput[]
    id?: StringFilter<"Tokens"> | string
    access_token?: StringFilter<"Tokens"> | string
    refresh_token?: StringFilter<"Tokens"> | string
    expiry_date?: DateTimeFilter<"Tokens"> | Date | string
    ownerId?: StringFilter<"Tokens"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TokensOrderByWithRelationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    ownerId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokensWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refresh_token?: string
    AND?: TokensWhereInput | TokensWhereInput[]
    OR?: TokensWhereInput[]
    NOT?: TokensWhereInput | TokensWhereInput[]
    access_token?: StringFilter<"Tokens"> | string
    expiry_date?: DateTimeFilter<"Tokens"> | Date | string
    ownerId?: StringFilter<"Tokens"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "refresh_token">

  export type TokensOrderByWithAggregationInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    ownerId?: SortOrder
    _count?: TokensCountOrderByAggregateInput
    _max?: TokensMaxOrderByAggregateInput
    _min?: TokensMinOrderByAggregateInput
  }

  export type TokensScalarWhereWithAggregatesInput = {
    AND?: TokensScalarWhereWithAggregatesInput | TokensScalarWhereWithAggregatesInput[]
    OR?: TokensScalarWhereWithAggregatesInput[]
    NOT?: TokensScalarWhereWithAggregatesInput | TokensScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tokens"> | string
    access_token?: StringWithAggregatesFilter<"Tokens"> | string
    refresh_token?: StringWithAggregatesFilter<"Tokens"> | string
    expiry_date?: DateTimeWithAggregatesFilter<"Tokens"> | Date | string
    ownerId?: StringWithAggregatesFilter<"Tokens"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    address?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    endTime?: StringFilter<"Event"> | string
    startTime?: StringFilter<"Event"> | string
    bookingDate?: DateTimeNullableFilter<"Event"> | Date | string | null
    cost?: FloatFilter<"Event"> | number
    status?: EnumEventStatusFilter<"Event"> | EventStatus
    maxParticipants?: IntFilter<"Event"> | number
    groupId?: StringNullableFilter<"Event"> | string | null
    participants?: ParticipantsOnEventsListRelationFilter
    Group?: XOR<GroupNullableRelationFilter, GroupWhereInput> | null
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrderInput | SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
    groupId?: SortOrderInput | SortOrder
    participants?: ParticipantsOnEventsOrderByRelationAggregateInput
    Group?: GroupOrderByWithRelationInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    address?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    endTime?: StringFilter<"Event"> | string
    startTime?: StringFilter<"Event"> | string
    bookingDate?: DateTimeNullableFilter<"Event"> | Date | string | null
    cost?: FloatFilter<"Event"> | number
    status?: EnumEventStatusFilter<"Event"> | EventStatus
    maxParticipants?: IntFilter<"Event"> | number
    groupId?: StringNullableFilter<"Event"> | string | null
    participants?: ParticipantsOnEventsListRelationFilter
    Group?: XOR<GroupNullableRelationFilter, GroupWhereInput> | null
  }, "id">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    address?: SortOrder
    date?: SortOrder
    endTime?: SortOrder
    startTime?: SortOrder
    bookingDate?: SortOrderInput | SortOrder
    cost?: SortOrder
    status?: SortOrder
    maxParticipants?: SortOrder
    groupId?: SortOrderInput | SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    address?: StringWithAggregatesFilter<"Event"> | string
    date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    endTime?: StringWithAggregatesFilter<"Event"> | string
    startTime?: StringWithAggregatesFilter<"Event"> | string
    bookingDate?: DateTimeNullableWithAggregatesFilter<"Event"> | Date | string | null
    cost?: FloatWithAggregatesFilter<"Event"> | number
    status?: EnumEventStatusWithAggregatesFilter<"Event"> | EventStatus
    maxParticipants?: IntWithAggregatesFilter<"Event"> | number
    groupId?: StringNullableWithAggregatesFilter<"Event"> | string | null
  }

  export type ParticipantsOnEventsWhereInput = {
    AND?: ParticipantsOnEventsWhereInput | ParticipantsOnEventsWhereInput[]
    OR?: ParticipantsOnEventsWhereInput[]
    NOT?: ParticipantsOnEventsWhereInput | ParticipantsOnEventsWhereInput[]
    eventId?: StringFilter<"ParticipantsOnEvents"> | string
    date?: DateTimeFilter<"ParticipantsOnEvents"> | Date | string
    id?: StringFilter<"ParticipantsOnEvents"> | string
    comment?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    paymentId?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    userEventStatus?: EnumUserEventStatusFilter<"ParticipantsOnEvents"> | UserEventStatus
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
  }

  export type ParticipantsOnEventsOrderByWithRelationInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    comment?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    userEventStatus?: SortOrder
    payment?: PaymentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
  }

  export type ParticipantsOnEventsWhereUniqueInput = Prisma.AtLeast<{
    id_eventId?: ParticipantsOnEventsIdEventIdCompoundUniqueInput
    AND?: ParticipantsOnEventsWhereInput | ParticipantsOnEventsWhereInput[]
    OR?: ParticipantsOnEventsWhereInput[]
    NOT?: ParticipantsOnEventsWhereInput | ParticipantsOnEventsWhereInput[]
    eventId?: StringFilter<"ParticipantsOnEvents"> | string
    date?: DateTimeFilter<"ParticipantsOnEvents"> | Date | string
    id?: StringFilter<"ParticipantsOnEvents"> | string
    comment?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    paymentId?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    userEventStatus?: EnumUserEventStatusFilter<"ParticipantsOnEvents"> | UserEventStatus
    payment?: XOR<PaymentNullableRelationFilter, PaymentWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    event?: XOR<EventRelationFilter, EventWhereInput>
  }, "id_eventId">

  export type ParticipantsOnEventsOrderByWithAggregationInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    comment?: SortOrderInput | SortOrder
    paymentId?: SortOrderInput | SortOrder
    userEventStatus?: SortOrder
    _count?: ParticipantsOnEventsCountOrderByAggregateInput
    _max?: ParticipantsOnEventsMaxOrderByAggregateInput
    _min?: ParticipantsOnEventsMinOrderByAggregateInput
  }

  export type ParticipantsOnEventsScalarWhereWithAggregatesInput = {
    AND?: ParticipantsOnEventsScalarWhereWithAggregatesInput | ParticipantsOnEventsScalarWhereWithAggregatesInput[]
    OR?: ParticipantsOnEventsScalarWhereWithAggregatesInput[]
    NOT?: ParticipantsOnEventsScalarWhereWithAggregatesInput | ParticipantsOnEventsScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"ParticipantsOnEvents"> | string
    date?: DateTimeWithAggregatesFilter<"ParticipantsOnEvents"> | Date | string
    id?: StringWithAggregatesFilter<"ParticipantsOnEvents"> | string
    comment?: StringNullableWithAggregatesFilter<"ParticipantsOnEvents"> | string | null
    paymentId?: StringNullableWithAggregatesFilter<"ParticipantsOnEvents"> | string | null
    userEventStatus?: EnumUserEventStatusWithAggregatesFilter<"ParticipantsOnEvents"> | UserEventStatus
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    eventId?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    gmailMailId?: StringFilter<"Payment"> | string
    ParticipantsOnEvents?: ParticipantsOnEventsListRelationFilter
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
    ParticipantsOnEvents?: ParticipantsOnEventsOrderByRelationAggregateInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    eventId?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    gmailMailId?: StringFilter<"Payment"> | string
    ParticipantsOnEvents?: ParticipantsOnEventsListRelationFilter
  }, "id">

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
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    eventId?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    gmailMailId?: StringWithAggregatesFilter<"Payment"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

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
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    ownerId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    pricingModel?: EnumPricingModelFilter<"Group"> | PricingModel
    events?: EventListRelationFilter
    users?: UserOnGroupsListRelationFilter
    owner?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pricingModel?: SortOrder
    events?: EventOrderByRelationAggregateInput
    users?: UserOnGroupsOrderByRelationAggregateInput
    owner?: UserOrderByWithRelationInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    ownerId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    pricingModel?: EnumPricingModelFilter<"Group"> | PricingModel
    events?: EventListRelationFilter
    users?: UserOnGroupsListRelationFilter
    owner?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pricingModel?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    ownerId?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    pricingModel?: EnumPricingModelWithAggregatesFilter<"Group"> | PricingModel
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    notificationsEnabled?: BoolFilter<"User"> | boolean
    paypalName?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    events?: ParticipantsOnEventsListRelationFilter
    groups?: UserOnGroupsListRelationFilter
    ownedGroups?: GroupListRelationFilter
    Tokens?: TokensListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrderInput | SortOrder
    notificationsEnabled?: SortOrder
    paypalName?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    events?: ParticipantsOnEventsOrderByRelationAggregateInput
    groups?: UserOnGroupsOrderByRelationAggregateInput
    ownedGroups?: GroupOrderByRelationAggregateInput
    Tokens?: TokensOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    notificationsEnabled?: BoolFilter<"User"> | boolean
    paypalName?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    events?: ParticipantsOnEventsListRelationFilter
    groups?: UserOnGroupsListRelationFilter
    ownedGroups?: GroupListRelationFilter
    Tokens?: TokensListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    password?: SortOrderInput | SortOrder
    notificationsEnabled?: SortOrder
    paypalName?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    notificationsEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    paypalName?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type UserOnGroupsWhereInput = {
    AND?: UserOnGroupsWhereInput | UserOnGroupsWhereInput[]
    OR?: UserOnGroupsWhereInput[]
    NOT?: UserOnGroupsWhereInput | UserOnGroupsWhereInput[]
    id?: StringFilter<"UserOnGroups"> | string
    groupId?: StringFilter<"UserOnGroups"> | string
    role?: EnumGroupRoleFilter<"UserOnGroups"> | GroupRole
    user?: XOR<UserRelationFilter, UserWhereInput>
    group?: XOR<GroupRelationFilter, GroupWhereInput>
  }

  export type UserOnGroupsOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    user?: UserOrderByWithRelationInput
    group?: GroupOrderByWithRelationInput
  }

  export type UserOnGroupsWhereUniqueInput = Prisma.AtLeast<{
    id_groupId?: UserOnGroupsIdGroupIdCompoundUniqueInput
    AND?: UserOnGroupsWhereInput | UserOnGroupsWhereInput[]
    OR?: UserOnGroupsWhereInput[]
    NOT?: UserOnGroupsWhereInput | UserOnGroupsWhereInput[]
    id?: StringFilter<"UserOnGroups"> | string
    groupId?: StringFilter<"UserOnGroups"> | string
    role?: EnumGroupRoleFilter<"UserOnGroups"> | GroupRole
    user?: XOR<UserRelationFilter, UserWhereInput>
    group?: XOR<GroupRelationFilter, GroupWhereInput>
  }, "id_groupId">

  export type UserOnGroupsOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
    _count?: UserOnGroupsCountOrderByAggregateInput
    _max?: UserOnGroupsMaxOrderByAggregateInput
    _min?: UserOnGroupsMinOrderByAggregateInput
  }

  export type UserOnGroupsScalarWhereWithAggregatesInput = {
    AND?: UserOnGroupsScalarWhereWithAggregatesInput | UserOnGroupsScalarWhereWithAggregatesInput[]
    OR?: UserOnGroupsScalarWhereWithAggregatesInput[]
    NOT?: UserOnGroupsScalarWhereWithAggregatesInput | UserOnGroupsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserOnGroups"> | string
    groupId?: StringWithAggregatesFilter<"UserOnGroups"> | string
    role?: EnumGroupRoleWithAggregatesFilter<"UserOnGroups"> | GroupRole
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type TokensCreateInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
    user: UserCreateNestedOneWithoutTokensInput
  }

  export type TokensUncheckedCreateInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
    ownerId: string
  }

  export type TokensUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTokensNestedInput
  }

  export type TokensUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type TokensCreateManyInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
    ownerId: string
  }

  export type TokensUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
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
    participants?: ParticipantsOnEventsCreateNestedManyWithoutEventInput
    Group?: GroupCreateNestedOneWithoutEventsInput
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
    groupId?: string | null
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
    participants?: ParticipantsOnEventsUpdateManyWithoutEventNestedInput
    Group?: GroupUpdateOneWithoutEventsNestedInput
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
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
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
    groupId?: string | null
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
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantsOnEventsCreateInput = {
    date?: Date | string
    comment?: string | null
    userEventStatus?: UserEventStatus
    payment?: PaymentCreateNestedOneWithoutParticipantsOnEventsInput
    user: UserCreateNestedOneWithoutEventsInput
    event: EventCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsOnEventsUncheckedCreateInput = {
    eventId: string
    date?: Date | string
    id: string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    payment?: PaymentUpdateOneWithoutParticipantsOnEventsNestedInput
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    event?: EventUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsCreateManyInput = {
    eventId: string
    date?: Date | string
    id: string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type PaymentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
    ParticipantsOnEvents?: ParticipantsOnEventsCreateNestedManyWithoutPaymentInput
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
    ParticipantsOnEvents?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutPaymentInput
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
    ParticipantsOnEvents?: ParticipantsOnEventsUpdateManyWithoutPaymentNestedInput
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
    ParticipantsOnEvents?: ParticipantsOnEventsUncheckedUpdateManyWithoutPaymentNestedInput
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
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
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

  export type GroupCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventCreateNestedManyWithoutGroupInput
    users?: UserOnGroupsCreateNestedManyWithoutGroupInput
    owner: UserCreateNestedOneWithoutOwnedGroupsInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    ownerId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventUncheckedCreateNestedManyWithoutGroupInput
    users?: UserOnGroupsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUpdateManyWithoutGroupNestedInput
    users?: UserOnGroupsUpdateManyWithoutGroupNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedGroupsNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUncheckedUpdateManyWithoutGroupNestedInput
    users?: UserOnGroupsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    ownerId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserOnGroupsCreateInput = {
    role?: GroupRole
    user: UserCreateNestedOneWithoutGroupsInput
    group: GroupCreateNestedOneWithoutUsersInput
  }

  export type UserOnGroupsUncheckedCreateInput = {
    id: string
    groupId: string
    role?: GroupRole
  }

  export type UserOnGroupsUpdateInput = {
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
    group?: GroupUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserOnGroupsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
  }

  export type UserOnGroupsCreateManyInput = {
    id: string
    groupId: string
    role?: GroupRole
  }

  export type UserOnGroupsUpdateManyMutationInput = {
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
  }

  export type UserOnGroupsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
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

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokensCountOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    ownerId?: SortOrder
  }

  export type TokensMaxOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    ownerId?: SortOrder
  }

  export type TokensMinOrderByAggregateInput = {
    id?: SortOrder
    access_token?: SortOrder
    refresh_token?: SortOrder
    expiry_date?: SortOrder
    ownerId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumEventStatusFilter<$PrismaModel = never> = {
    equals?: EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: EventStatus[]
    notIn?: EventStatus[]
    not?: NestedEnumEventStatusFilter<$PrismaModel> | EventStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ParticipantsOnEventsListRelationFilter = {
    every?: ParticipantsOnEventsWhereInput
    some?: ParticipantsOnEventsWhereInput
    none?: ParticipantsOnEventsWhereInput
  }

  export type GroupNullableRelationFilter = {
    is?: GroupWhereInput | null
    isNot?: GroupWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
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
    groupId?: SortOrder
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
    groupId?: SortOrder
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
    groupId?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    cost?: SortOrder
    maxParticipants?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: EventStatus[]
    notIn?: EventStatus[]
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserEventStatusFilter<$PrismaModel = never> = {
    equals?: UserEventStatus | EnumUserEventStatusFieldRefInput<$PrismaModel>
    in?: UserEventStatus[]
    notIn?: UserEventStatus[]
    not?: NestedEnumUserEventStatusFilter<$PrismaModel> | UserEventStatus
  }

  export type PaymentNullableRelationFilter = {
    is?: PaymentWhereInput | null
    isNot?: PaymentWhereInput | null
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
    comment?: SortOrder
    paymentId?: SortOrder
    userEventStatus?: SortOrder
  }

  export type ParticipantsOnEventsMaxOrderByAggregateInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    comment?: SortOrder
    paymentId?: SortOrder
    userEventStatus?: SortOrder
  }

  export type ParticipantsOnEventsMinOrderByAggregateInput = {
    eventId?: SortOrder
    date?: SortOrder
    id?: SortOrder
    comment?: SortOrder
    paymentId?: SortOrder
    userEventStatus?: SortOrder
  }

  export type EnumUserEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: UserEventStatus | EnumUserEventStatusFieldRefInput<$PrismaModel>
    in?: UserEventStatus[]
    notIn?: UserEventStatus[]
    not?: NestedEnumUserEventStatusWithAggregatesFilter<$PrismaModel> | UserEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserEventStatusFilter<$PrismaModel>
    _max?: NestedEnumUserEventStatusFilter<$PrismaModel>
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type EnumPricingModelFilter<$PrismaModel = never> = {
    equals?: PricingModel | EnumPricingModelFieldRefInput<$PrismaModel>
    in?: PricingModel[]
    notIn?: PricingModel[]
    not?: NestedEnumPricingModelFilter<$PrismaModel> | PricingModel
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type UserOnGroupsListRelationFilter = {
    every?: UserOnGroupsWhereInput
    some?: UserOnGroupsWhereInput
    none?: UserOnGroupsWhereInput
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOnGroupsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pricingModel?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pricingModel?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pricingModel?: SortOrder
  }

  export type EnumPricingModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: PricingModel | EnumPricingModelFieldRefInput<$PrismaModel>
    in?: PricingModel[]
    notIn?: PricingModel[]
    not?: NestedEnumPricingModelWithAggregatesFilter<$PrismaModel> | PricingModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingModelFilter<$PrismaModel>
    _max?: NestedEnumPricingModelFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type TokensListRelationFilter = {
    every?: TokensWhereInput
    some?: TokensWhereInput
    none?: TokensWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TokensOrderByRelationAggregateInput = {
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
    paypalName?: SortOrder
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
    paypalName?: SortOrder
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
    paypalName?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumGroupRoleFilter<$PrismaModel = never> = {
    equals?: GroupRole | EnumGroupRoleFieldRefInput<$PrismaModel>
    in?: GroupRole[]
    notIn?: GroupRole[]
    not?: NestedEnumGroupRoleFilter<$PrismaModel> | GroupRole
  }

  export type GroupRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type UserOnGroupsIdGroupIdCompoundUniqueInput = {
    id: string
    groupId: string
  }

  export type UserOnGroupsCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
  }

  export type UserOnGroupsMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
  }

  export type UserOnGroupsMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    role?: SortOrder
  }

  export type EnumGroupRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: GroupRole | EnumGroupRoleFieldRefInput<$PrismaModel>
    in?: GroupRole[]
    notIn?: GroupRole[]
    not?: NestedEnumGroupRoleWithAggregatesFilter<$PrismaModel> | GroupRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupRoleFilter<$PrismaModel>
    _max?: NestedEnumGroupRoleFilter<$PrismaModel>
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

  export type UserCreateNestedOneWithoutTokensInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutTokensNestedInput = {
    create?: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutTokensInput
    upsert?: UserUpsertWithoutTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTokensInput, UserUpdateWithoutTokensInput>, UserUncheckedUpdateWithoutTokensInput>
  }

  export type ParticipantsOnEventsCreateNestedManyWithoutEventInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput> | ParticipantsOnEventsCreateWithoutEventInput[] | ParticipantsOnEventsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutEventInput | ParticipantsOnEventsCreateOrConnectWithoutEventInput[]
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
  }

  export type GroupCreateNestedOneWithoutEventsInput = {
    create?: XOR<GroupCreateWithoutEventsInput, GroupUncheckedCreateWithoutEventsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutEventsInput
    connect?: GroupWhereUniqueInput
  }

  export type ParticipantsOnEventsUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput> | ParticipantsOnEventsCreateWithoutEventInput[] | ParticipantsOnEventsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutEventInput | ParticipantsOnEventsCreateOrConnectWithoutEventInput[]
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
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

  export type ParticipantsOnEventsUpdateManyWithoutEventNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput> | ParticipantsOnEventsCreateWithoutEventInput[] | ParticipantsOnEventsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutEventInput | ParticipantsOnEventsCreateOrConnectWithoutEventInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput | ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type GroupUpdateOneWithoutEventsNestedInput = {
    create?: XOR<GroupCreateWithoutEventsInput, GroupUncheckedCreateWithoutEventsInput>
    connectOrCreate?: GroupCreateOrConnectWithoutEventsInput
    upsert?: GroupUpsertWithoutEventsInput
    disconnect?: GroupWhereInput | boolean
    delete?: GroupWhereInput | boolean
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutEventsInput, GroupUpdateWithoutEventsInput>, GroupUncheckedUpdateWithoutEventsInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput> | ParticipantsOnEventsCreateWithoutEventInput[] | ParticipantsOnEventsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutEventInput | ParticipantsOnEventsCreateOrConnectWithoutEventInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: ParticipantsOnEventsCreateManyEventInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput | ParticipantsOnEventsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type PaymentCreateNestedOneWithoutParticipantsOnEventsInput = {
    create?: XOR<PaymentCreateWithoutParticipantsOnEventsInput, PaymentUncheckedCreateWithoutParticipantsOnEventsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutParticipantsOnEventsInput
    connect?: PaymentWhereUniqueInput
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

  export type PaymentUpdateOneWithoutParticipantsOnEventsNestedInput = {
    create?: XOR<PaymentCreateWithoutParticipantsOnEventsInput, PaymentUncheckedCreateWithoutParticipantsOnEventsInput>
    connectOrCreate?: PaymentCreateOrConnectWithoutParticipantsOnEventsInput
    upsert?: PaymentUpsertWithoutParticipantsOnEventsInput
    disconnect?: PaymentWhereInput | boolean
    delete?: PaymentWhereInput | boolean
    connect?: PaymentWhereUniqueInput
    update?: XOR<XOR<PaymentUpdateToOneWithWhereWithoutParticipantsOnEventsInput, PaymentUpdateWithoutParticipantsOnEventsInput>, PaymentUncheckedUpdateWithoutParticipantsOnEventsInput>
  }

  export type UserUpdateOneRequiredWithoutEventsNestedInput = {
    create?: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    connectOrCreate?: UserCreateOrConnectWithoutEventsInput
    upsert?: UserUpsertWithoutEventsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEventsInput, UserUpdateWithoutEventsInput>, UserUncheckedUpdateWithoutEventsInput>
  }

  export type EventUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: EventCreateOrConnectWithoutParticipantsInput
    upsert?: EventUpsertWithoutParticipantsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutParticipantsInput, EventUpdateWithoutParticipantsInput>, EventUncheckedUpdateWithoutParticipantsInput>
  }

  export type ParticipantsOnEventsCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput> | ParticipantsOnEventsCreateWithoutPaymentInput[] | ParticipantsOnEventsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutPaymentInput | ParticipantsOnEventsCreateOrConnectWithoutPaymentInput[]
    createMany?: ParticipantsOnEventsCreateManyPaymentInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
  }

  export type ParticipantsOnEventsUncheckedCreateNestedManyWithoutPaymentInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput> | ParticipantsOnEventsCreateWithoutPaymentInput[] | ParticipantsOnEventsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutPaymentInput | ParticipantsOnEventsCreateOrConnectWithoutPaymentInput[]
    createMany?: ParticipantsOnEventsCreateManyPaymentInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
  }

  export type ParticipantsOnEventsUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput> | ParticipantsOnEventsCreateWithoutPaymentInput[] | ParticipantsOnEventsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutPaymentInput | ParticipantsOnEventsCreateOrConnectWithoutPaymentInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutPaymentInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ParticipantsOnEventsCreateManyPaymentInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutPaymentInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutPaymentInput | ParticipantsOnEventsUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutPaymentNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput> | ParticipantsOnEventsCreateWithoutPaymentInput[] | ParticipantsOnEventsUncheckedCreateWithoutPaymentInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutPaymentInput | ParticipantsOnEventsCreateOrConnectWithoutPaymentInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutPaymentInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutPaymentInput[]
    createMany?: ParticipantsOnEventsCreateManyPaymentInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutPaymentInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutPaymentInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutPaymentInput | ParticipantsOnEventsUpdateManyWithWhereWithoutPaymentInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
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
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
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
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type EventCreateNestedManyWithoutGroupInput = {
    create?: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput> | EventCreateWithoutGroupInput[] | EventUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: EventCreateOrConnectWithoutGroupInput | EventCreateOrConnectWithoutGroupInput[]
    createMany?: EventCreateManyGroupInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserOnGroupsCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput> | UserOnGroupsCreateWithoutGroupInput[] | UserOnGroupsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutGroupInput | UserOnGroupsCreateOrConnectWithoutGroupInput[]
    createMany?: UserOnGroupsCreateManyGroupInputEnvelope
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutOwnedGroupsInput = {
    create?: XOR<UserCreateWithoutOwnedGroupsInput, UserUncheckedCreateWithoutOwnedGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type EventUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput> | EventCreateWithoutGroupInput[] | EventUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: EventCreateOrConnectWithoutGroupInput | EventCreateOrConnectWithoutGroupInput[]
    createMany?: EventCreateManyGroupInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserOnGroupsUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput> | UserOnGroupsCreateWithoutGroupInput[] | UserOnGroupsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutGroupInput | UserOnGroupsCreateOrConnectWithoutGroupInput[]
    createMany?: UserOnGroupsCreateManyGroupInputEnvelope
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
  }

  export type EnumPricingModelFieldUpdateOperationsInput = {
    set?: PricingModel
  }

  export type EventUpdateManyWithoutGroupNestedInput = {
    create?: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput> | EventCreateWithoutGroupInput[] | EventUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: EventCreateOrConnectWithoutGroupInput | EventCreateOrConnectWithoutGroupInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutGroupInput | EventUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: EventCreateManyGroupInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutGroupInput | EventUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: EventUpdateManyWithWhereWithoutGroupInput | EventUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserOnGroupsUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput> | UserOnGroupsCreateWithoutGroupInput[] | UserOnGroupsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutGroupInput | UserOnGroupsCreateOrConnectWithoutGroupInput[]
    upsert?: UserOnGroupsUpsertWithWhereUniqueWithoutGroupInput | UserOnGroupsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserOnGroupsCreateManyGroupInputEnvelope
    set?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    disconnect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    delete?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    update?: UserOnGroupsUpdateWithWhereUniqueWithoutGroupInput | UserOnGroupsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserOnGroupsUpdateManyWithWhereWithoutGroupInput | UserOnGroupsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutOwnedGroupsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedGroupsInput, UserUncheckedCreateWithoutOwnedGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGroupsInput
    upsert?: UserUpsertWithoutOwnedGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedGroupsInput, UserUpdateWithoutOwnedGroupsInput>, UserUncheckedUpdateWithoutOwnedGroupsInput>
  }

  export type EventUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput> | EventCreateWithoutGroupInput[] | EventUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: EventCreateOrConnectWithoutGroupInput | EventCreateOrConnectWithoutGroupInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutGroupInput | EventUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: EventCreateManyGroupInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutGroupInput | EventUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: EventUpdateManyWithWhereWithoutGroupInput | EventUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserOnGroupsUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput> | UserOnGroupsCreateWithoutGroupInput[] | UserOnGroupsUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutGroupInput | UserOnGroupsCreateOrConnectWithoutGroupInput[]
    upsert?: UserOnGroupsUpsertWithWhereUniqueWithoutGroupInput | UserOnGroupsUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: UserOnGroupsCreateManyGroupInputEnvelope
    set?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    disconnect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    delete?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    update?: UserOnGroupsUpdateWithWhereUniqueWithoutGroupInput | UserOnGroupsUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: UserOnGroupsUpdateManyWithWhereWithoutGroupInput | UserOnGroupsUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ParticipantsOnEventsCreateNestedManyWithoutUserInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput> | ParticipantsOnEventsCreateWithoutUserInput[] | ParticipantsOnEventsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutUserInput | ParticipantsOnEventsCreateOrConnectWithoutUserInput[]
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
  }

  export type UserOnGroupsCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput> | UserOnGroupsCreateWithoutUserInput[] | UserOnGroupsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutUserInput | UserOnGroupsCreateOrConnectWithoutUserInput[]
    createMany?: UserOnGroupsCreateManyUserInputEnvelope
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
  }

  export type GroupCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput> | GroupCreateWithoutOwnerInput[] | GroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutOwnerInput | GroupCreateOrConnectWithoutOwnerInput[]
    createMany?: GroupCreateManyOwnerInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type TokensCreateNestedManyWithoutUserInput = {
    create?: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput> | TokensCreateWithoutUserInput[] | TokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokensCreateOrConnectWithoutUserInput | TokensCreateOrConnectWithoutUserInput[]
    createMany?: TokensCreateManyUserInputEnvelope
    connect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput> | ParticipantsOnEventsCreateWithoutUserInput[] | ParticipantsOnEventsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutUserInput | ParticipantsOnEventsCreateOrConnectWithoutUserInput[]
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
  }

  export type UserOnGroupsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput> | UserOnGroupsCreateWithoutUserInput[] | UserOnGroupsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutUserInput | UserOnGroupsCreateOrConnectWithoutUserInput[]
    createMany?: UserOnGroupsCreateManyUserInputEnvelope
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput> | GroupCreateWithoutOwnerInput[] | GroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutOwnerInput | GroupCreateOrConnectWithoutOwnerInput[]
    createMany?: GroupCreateManyOwnerInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type TokensUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput> | TokensCreateWithoutUserInput[] | TokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokensCreateOrConnectWithoutUserInput | TokensCreateOrConnectWithoutUserInput[]
    createMany?: TokensCreateManyUserInputEnvelope
    connect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ParticipantsOnEventsUpdateManyWithoutUserNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput> | ParticipantsOnEventsCreateWithoutUserInput[] | ParticipantsOnEventsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutUserInput | ParticipantsOnEventsCreateOrConnectWithoutUserInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput | ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type UserOnGroupsUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput> | UserOnGroupsCreateWithoutUserInput[] | UserOnGroupsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutUserInput | UserOnGroupsCreateOrConnectWithoutUserInput[]
    upsert?: UserOnGroupsUpsertWithWhereUniqueWithoutUserInput | UserOnGroupsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOnGroupsCreateManyUserInputEnvelope
    set?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    disconnect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    delete?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    update?: UserOnGroupsUpdateWithWhereUniqueWithoutUserInput | UserOnGroupsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOnGroupsUpdateManyWithWhereWithoutUserInput | UserOnGroupsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
  }

  export type GroupUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput> | GroupCreateWithoutOwnerInput[] | GroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutOwnerInput | GroupCreateOrConnectWithoutOwnerInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutOwnerInput | GroupUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GroupCreateManyOwnerInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutOwnerInput | GroupUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutOwnerInput | GroupUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type TokensUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput> | TokensCreateWithoutUserInput[] | TokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokensCreateOrConnectWithoutUserInput | TokensCreateOrConnectWithoutUserInput[]
    upsert?: TokensUpsertWithWhereUniqueWithoutUserInput | TokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokensCreateManyUserInputEnvelope
    set?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    disconnect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    delete?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    connect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    update?: TokensUpdateWithWhereUniqueWithoutUserInput | TokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokensUpdateManyWithWhereWithoutUserInput | TokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokensScalarWhereInput | TokensScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput> | ParticipantsOnEventsCreateWithoutUserInput[] | ParticipantsOnEventsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantsOnEventsCreateOrConnectWithoutUserInput | ParticipantsOnEventsCreateOrConnectWithoutUserInput[]
    upsert?: ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput | ParticipantsOnEventsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ParticipantsOnEventsCreateManyUserInputEnvelope
    set?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    disconnect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    delete?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    connect?: ParticipantsOnEventsWhereUniqueInput | ParticipantsOnEventsWhereUniqueInput[]
    update?: ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput | ParticipantsOnEventsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput | ParticipantsOnEventsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
  }

  export type UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput> | UserOnGroupsCreateWithoutUserInput[] | UserOnGroupsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserOnGroupsCreateOrConnectWithoutUserInput | UserOnGroupsCreateOrConnectWithoutUserInput[]
    upsert?: UserOnGroupsUpsertWithWhereUniqueWithoutUserInput | UserOnGroupsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserOnGroupsCreateManyUserInputEnvelope
    set?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    disconnect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    delete?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    connect?: UserOnGroupsWhereUniqueInput | UserOnGroupsWhereUniqueInput[]
    update?: UserOnGroupsUpdateWithWhereUniqueWithoutUserInput | UserOnGroupsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserOnGroupsUpdateManyWithWhereWithoutUserInput | UserOnGroupsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput> | GroupCreateWithoutOwnerInput[] | GroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutOwnerInput | GroupCreateOrConnectWithoutOwnerInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutOwnerInput | GroupUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: GroupCreateManyOwnerInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutOwnerInput | GroupUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutOwnerInput | GroupUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type TokensUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput> | TokensCreateWithoutUserInput[] | TokensUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TokensCreateOrConnectWithoutUserInput | TokensCreateOrConnectWithoutUserInput[]
    upsert?: TokensUpsertWithWhereUniqueWithoutUserInput | TokensUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TokensCreateManyUserInputEnvelope
    set?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    disconnect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    delete?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    connect?: TokensWhereUniqueInput | TokensWhereUniqueInput[]
    update?: TokensUpdateWithWhereUniqueWithoutUserInput | TokensUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TokensUpdateManyWithWhereWithoutUserInput | TokensUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TokensScalarWhereInput | TokensScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGroupsInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutUsersInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput
    connect?: GroupWhereUniqueInput
  }

  export type EnumGroupRoleFieldUpdateOperationsInput = {
    set?: GroupRole
  }

  export type UserUpdateOneRequiredWithoutGroupsNestedInput = {
    create?: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupsInput
    upsert?: UserUpsertWithoutGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupsInput, UserUpdateWithoutGroupsInput>, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type GroupUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutUsersInput
    upsert?: GroupUpsertWithoutUsersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutUsersInput, GroupUpdateWithoutUsersInput>, GroupUncheckedUpdateWithoutUsersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumEventStatusFilter<$PrismaModel = never> = {
    equals?: EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: EventStatus[]
    notIn?: EventStatus[]
    not?: NestedEnumEventStatusFilter<$PrismaModel> | EventStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: EventStatus | EnumEventStatusFieldRefInput<$PrismaModel>
    in?: EventStatus[]
    notIn?: EventStatus[]
    not?: NestedEnumEventStatusWithAggregatesFilter<$PrismaModel> | EventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEventStatusFilter<$PrismaModel>
    _max?: NestedEnumEventStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserEventStatusFilter<$PrismaModel = never> = {
    equals?: UserEventStatus | EnumUserEventStatusFieldRefInput<$PrismaModel>
    in?: UserEventStatus[]
    notIn?: UserEventStatus[]
    not?: NestedEnumUserEventStatusFilter<$PrismaModel> | UserEventStatus
  }

  export type NestedEnumUserEventStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: UserEventStatus | EnumUserEventStatusFieldRefInput<$PrismaModel>
    in?: UserEventStatus[]
    notIn?: UserEventStatus[]
    not?: NestedEnumUserEventStatusWithAggregatesFilter<$PrismaModel> | UserEventStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserEventStatusFilter<$PrismaModel>
    _max?: NestedEnumUserEventStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumPricingModelFilter<$PrismaModel = never> = {
    equals?: PricingModel | EnumPricingModelFieldRefInput<$PrismaModel>
    in?: PricingModel[]
    notIn?: PricingModel[]
    not?: NestedEnumPricingModelFilter<$PrismaModel> | PricingModel
  }

  export type NestedEnumPricingModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: PricingModel | EnumPricingModelFieldRefInput<$PrismaModel>
    in?: PricingModel[]
    notIn?: PricingModel[]
    not?: NestedEnumPricingModelWithAggregatesFilter<$PrismaModel> | PricingModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPricingModelFilter<$PrismaModel>
    _max?: NestedEnumPricingModelFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumGroupRoleFilter<$PrismaModel = never> = {
    equals?: GroupRole | EnumGroupRoleFieldRefInput<$PrismaModel>
    in?: GroupRole[]
    notIn?: GroupRole[]
    not?: NestedEnumGroupRoleFilter<$PrismaModel> | GroupRole
  }

  export type NestedEnumGroupRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: GroupRole | EnumGroupRoleFieldRefInput<$PrismaModel>
    in?: GroupRole[]
    notIn?: GroupRole[]
    not?: NestedEnumGroupRoleWithAggregatesFilter<$PrismaModel> | GroupRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGroupRoleFilter<$PrismaModel>
    _max?: NestedEnumGroupRoleFilter<$PrismaModel>
  }

  export type UserCreateWithoutTokensInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
  }

  export type UserUncheckedCreateWithoutTokensInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
  }

  export type UserCreateOrConnectWithoutTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
  }

  export type UserUpsertWithoutTokensInput = {
    update: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
    create: XOR<UserCreateWithoutTokensInput, UserUncheckedCreateWithoutTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTokensInput, UserUncheckedUpdateWithoutTokensInput>
  }

  export type UserUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
  }

  export type UserUncheckedUpdateWithoutTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
  }

  export type ParticipantsOnEventsCreateWithoutEventInput = {
    date?: Date | string
    comment?: string | null
    userEventStatus?: UserEventStatus
    payment?: PaymentCreateNestedOneWithoutParticipantsOnEventsInput
    user: UserCreateNestedOneWithoutEventsInput
  }

  export type ParticipantsOnEventsUncheckedCreateWithoutEventInput = {
    date?: Date | string
    id: string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsCreateOrConnectWithoutEventInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    create: XOR<ParticipantsOnEventsCreateWithoutEventInput, ParticipantsOnEventsUncheckedCreateWithoutEventInput>
  }

  export type ParticipantsOnEventsCreateManyEventInputEnvelope = {
    data: ParticipantsOnEventsCreateManyEventInput | ParticipantsOnEventsCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutEventsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    users?: UserOnGroupsCreateNestedManyWithoutGroupInput
    owner: UserCreateNestedOneWithoutOwnedGroupsInput
  }

  export type GroupUncheckedCreateWithoutEventsInput = {
    id?: string
    ownerId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    users?: UserOnGroupsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutEventsInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutEventsInput, GroupUncheckedCreateWithoutEventsInput>
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
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyWithoutEventInput>
  }

  export type ParticipantsOnEventsScalarWhereInput = {
    AND?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
    OR?: ParticipantsOnEventsScalarWhereInput[]
    NOT?: ParticipantsOnEventsScalarWhereInput | ParticipantsOnEventsScalarWhereInput[]
    eventId?: StringFilter<"ParticipantsOnEvents"> | string
    date?: DateTimeFilter<"ParticipantsOnEvents"> | Date | string
    id?: StringFilter<"ParticipantsOnEvents"> | string
    comment?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    paymentId?: StringNullableFilter<"ParticipantsOnEvents"> | string | null
    userEventStatus?: EnumUserEventStatusFilter<"ParticipantsOnEvents"> | UserEventStatus
  }

  export type GroupUpsertWithoutEventsInput = {
    update: XOR<GroupUpdateWithoutEventsInput, GroupUncheckedUpdateWithoutEventsInput>
    create: XOR<GroupCreateWithoutEventsInput, GroupUncheckedCreateWithoutEventsInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutEventsInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutEventsInput, GroupUncheckedUpdateWithoutEventsInput>
  }

  export type GroupUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    users?: UserOnGroupsUpdateManyWithoutGroupNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedGroupsNestedInput
  }

  export type GroupUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    users?: UserOnGroupsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type PaymentCreateWithoutParticipantsOnEventsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentUncheckedCreateWithoutParticipantsOnEventsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    eventId: string
    userId: string
    amount: number
    paymentDate: Date | string
    gmailMailId: string
  }

  export type PaymentCreateOrConnectWithoutParticipantsOnEventsInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutParticipantsOnEventsInput, PaymentUncheckedCreateWithoutParticipantsOnEventsInput>
  }

  export type UserCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
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
    Group?: GroupCreateNestedOneWithoutEventsInput
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
    groupId?: string | null
  }

  export type EventCreateOrConnectWithoutParticipantsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
  }

  export type PaymentUpsertWithoutParticipantsOnEventsInput = {
    update: XOR<PaymentUpdateWithoutParticipantsOnEventsInput, PaymentUncheckedUpdateWithoutParticipantsOnEventsInput>
    create: XOR<PaymentCreateWithoutParticipantsOnEventsInput, PaymentUncheckedCreateWithoutParticipantsOnEventsInput>
    where?: PaymentWhereInput
  }

  export type PaymentUpdateToOneWithWhereWithoutParticipantsOnEventsInput = {
    where?: PaymentWhereInput
    data: XOR<PaymentUpdateWithoutParticipantsOnEventsInput, PaymentUncheckedUpdateWithoutParticipantsOnEventsInput>
  }

  export type PaymentUpdateWithoutParticipantsOnEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentUncheckedUpdateWithoutParticipantsOnEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eventId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    gmailMailId?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpsertWithoutEventsInput = {
    update: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
    create: XOR<UserCreateWithoutEventsInput, UserUncheckedCreateWithoutEventsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEventsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEventsInput, UserUncheckedUpdateWithoutEventsInput>
  }

  export type UserUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventUpsertWithoutParticipantsInput = {
    update: XOR<EventUpdateWithoutParticipantsInput, EventUncheckedUpdateWithoutParticipantsInput>
    create: XOR<EventCreateWithoutParticipantsInput, EventUncheckedCreateWithoutParticipantsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutParticipantsInput, EventUncheckedUpdateWithoutParticipantsInput>
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
    Group?: GroupUpdateOneWithoutEventsNestedInput
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
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantsOnEventsCreateWithoutPaymentInput = {
    date?: Date | string
    comment?: string | null
    userEventStatus?: UserEventStatus
    user: UserCreateNestedOneWithoutEventsInput
    event: EventCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsOnEventsUncheckedCreateWithoutPaymentInput = {
    eventId: string
    date?: Date | string
    id: string
    comment?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsCreateOrConnectWithoutPaymentInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    create: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput>
  }

  export type ParticipantsOnEventsCreateManyPaymentInputEnvelope = {
    data: ParticipantsOnEventsCreateManyPaymentInput | ParticipantsOnEventsCreateManyPaymentInput[]
    skipDuplicates?: boolean
  }

  export type ParticipantsOnEventsUpsertWithWhereUniqueWithoutPaymentInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    update: XOR<ParticipantsOnEventsUpdateWithoutPaymentInput, ParticipantsOnEventsUncheckedUpdateWithoutPaymentInput>
    create: XOR<ParticipantsOnEventsCreateWithoutPaymentInput, ParticipantsOnEventsUncheckedCreateWithoutPaymentInput>
  }

  export type ParticipantsOnEventsUpdateWithWhereUniqueWithoutPaymentInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    data: XOR<ParticipantsOnEventsUpdateWithoutPaymentInput, ParticipantsOnEventsUncheckedUpdateWithoutPaymentInput>
  }

  export type ParticipantsOnEventsUpdateManyWithWhereWithoutPaymentInput = {
    where: ParticipantsOnEventsScalarWhereInput
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyWithoutPaymentInput>
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EventCreateWithoutGroupInput = {
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

  export type EventUncheckedCreateWithoutGroupInput = {
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

  export type EventCreateOrConnectWithoutGroupInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput>
  }

  export type EventCreateManyGroupInputEnvelope = {
    data: EventCreateManyGroupInput | EventCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserOnGroupsCreateWithoutGroupInput = {
    role?: GroupRole
    user: UserCreateNestedOneWithoutGroupsInput
  }

  export type UserOnGroupsUncheckedCreateWithoutGroupInput = {
    id: string
    role?: GroupRole
  }

  export type UserOnGroupsCreateOrConnectWithoutGroupInput = {
    where: UserOnGroupsWhereUniqueInput
    create: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput>
  }

  export type UserOnGroupsCreateManyGroupInputEnvelope = {
    data: UserOnGroupsCreateManyGroupInput | UserOnGroupsCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutOwnedGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsCreateNestedManyWithoutUserInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOwnedGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    groups?: UserOnGroupsUncheckedCreateNestedManyWithoutUserInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOwnedGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedGroupsInput, UserUncheckedCreateWithoutOwnedGroupsInput>
  }

  export type EventUpsertWithWhereUniqueWithoutGroupInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutGroupInput, EventUncheckedUpdateWithoutGroupInput>
    create: XOR<EventCreateWithoutGroupInput, EventUncheckedCreateWithoutGroupInput>
  }

  export type EventUpdateWithWhereUniqueWithoutGroupInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutGroupInput, EventUncheckedUpdateWithoutGroupInput>
  }

  export type EventUpdateManyWithWhereWithoutGroupInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutGroupInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    id?: StringFilter<"Event"> | string
    createdAt?: DateTimeFilter<"Event"> | Date | string
    updatedAt?: DateTimeFilter<"Event"> | Date | string
    address?: StringFilter<"Event"> | string
    date?: DateTimeFilter<"Event"> | Date | string
    endTime?: StringFilter<"Event"> | string
    startTime?: StringFilter<"Event"> | string
    bookingDate?: DateTimeNullableFilter<"Event"> | Date | string | null
    cost?: FloatFilter<"Event"> | number
    status?: EnumEventStatusFilter<"Event"> | EventStatus
    maxParticipants?: IntFilter<"Event"> | number
    groupId?: StringNullableFilter<"Event"> | string | null
  }

  export type UserOnGroupsUpsertWithWhereUniqueWithoutGroupInput = {
    where: UserOnGroupsWhereUniqueInput
    update: XOR<UserOnGroupsUpdateWithoutGroupInput, UserOnGroupsUncheckedUpdateWithoutGroupInput>
    create: XOR<UserOnGroupsCreateWithoutGroupInput, UserOnGroupsUncheckedCreateWithoutGroupInput>
  }

  export type UserOnGroupsUpdateWithWhereUniqueWithoutGroupInput = {
    where: UserOnGroupsWhereUniqueInput
    data: XOR<UserOnGroupsUpdateWithoutGroupInput, UserOnGroupsUncheckedUpdateWithoutGroupInput>
  }

  export type UserOnGroupsUpdateManyWithWhereWithoutGroupInput = {
    where: UserOnGroupsScalarWhereInput
    data: XOR<UserOnGroupsUpdateManyMutationInput, UserOnGroupsUncheckedUpdateManyWithoutGroupInput>
  }

  export type UserOnGroupsScalarWhereInput = {
    AND?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
    OR?: UserOnGroupsScalarWhereInput[]
    NOT?: UserOnGroupsScalarWhereInput | UserOnGroupsScalarWhereInput[]
    id?: StringFilter<"UserOnGroups"> | string
    groupId?: StringFilter<"UserOnGroups"> | string
    role?: EnumGroupRoleFilter<"UserOnGroups"> | GroupRole
  }

  export type UserUpsertWithoutOwnedGroupsInput = {
    update: XOR<UserUpdateWithoutOwnedGroupsInput, UserUncheckedUpdateWithoutOwnedGroupsInput>
    create: XOR<UserCreateWithoutOwnedGroupsInput, UserUncheckedCreateWithoutOwnedGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedGroupsInput, UserUncheckedUpdateWithoutOwnedGroupsInput>
  }

  export type UserUpdateWithoutOwnedGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUpdateManyWithoutUserNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    groups?: UserOnGroupsUncheckedUpdateManyWithoutUserNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
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
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
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
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ParticipantsOnEventsCreateWithoutUserInput = {
    date?: Date | string
    comment?: string | null
    userEventStatus?: UserEventStatus
    payment?: PaymentCreateNestedOneWithoutParticipantsOnEventsInput
    event: EventCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantsOnEventsUncheckedCreateWithoutUserInput = {
    eventId: string
    date?: Date | string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsCreateOrConnectWithoutUserInput = {
    where: ParticipantsOnEventsWhereUniqueInput
    create: XOR<ParticipantsOnEventsCreateWithoutUserInput, ParticipantsOnEventsUncheckedCreateWithoutUserInput>
  }

  export type ParticipantsOnEventsCreateManyUserInputEnvelope = {
    data: ParticipantsOnEventsCreateManyUserInput | ParticipantsOnEventsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserOnGroupsCreateWithoutUserInput = {
    role?: GroupRole
    group: GroupCreateNestedOneWithoutUsersInput
  }

  export type UserOnGroupsUncheckedCreateWithoutUserInput = {
    groupId: string
    role?: GroupRole
  }

  export type UserOnGroupsCreateOrConnectWithoutUserInput = {
    where: UserOnGroupsWhereUniqueInput
    create: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput>
  }

  export type UserOnGroupsCreateManyUserInputEnvelope = {
    data: UserOnGroupsCreateManyUserInput | UserOnGroupsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventCreateNestedManyWithoutGroupInput
    users?: UserOnGroupsCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventUncheckedCreateNestedManyWithoutGroupInput
    users?: UserOnGroupsUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutOwnerInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput>
  }

  export type GroupCreateManyOwnerInputEnvelope = {
    data: GroupCreateManyOwnerInput | GroupCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type TokensCreateWithoutUserInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
  }

  export type TokensUncheckedCreateWithoutUserInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
  }

  export type TokensCreateOrConnectWithoutUserInput = {
    where: TokensWhereUniqueInput
    create: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput>
  }

  export type TokensCreateManyUserInputEnvelope = {
    data: TokensCreateManyUserInput | TokensCreateManyUserInput[]
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
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
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
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
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
    data: XOR<ParticipantsOnEventsUpdateManyMutationInput, ParticipantsOnEventsUncheckedUpdateManyWithoutUserInput>
  }

  export type UserOnGroupsUpsertWithWhereUniqueWithoutUserInput = {
    where: UserOnGroupsWhereUniqueInput
    update: XOR<UserOnGroupsUpdateWithoutUserInput, UserOnGroupsUncheckedUpdateWithoutUserInput>
    create: XOR<UserOnGroupsCreateWithoutUserInput, UserOnGroupsUncheckedCreateWithoutUserInput>
  }

  export type UserOnGroupsUpdateWithWhereUniqueWithoutUserInput = {
    where: UserOnGroupsWhereUniqueInput
    data: XOR<UserOnGroupsUpdateWithoutUserInput, UserOnGroupsUncheckedUpdateWithoutUserInput>
  }

  export type UserOnGroupsUpdateManyWithWhereWithoutUserInput = {
    where: UserOnGroupsScalarWhereInput
    data: XOR<UserOnGroupsUpdateManyMutationInput, UserOnGroupsUncheckedUpdateManyWithoutUserInput>
  }

  export type GroupUpsertWithWhereUniqueWithoutOwnerInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutOwnerInput, GroupUncheckedUpdateWithoutOwnerInput>
    create: XOR<GroupCreateWithoutOwnerInput, GroupUncheckedCreateWithoutOwnerInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutOwnerInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutOwnerInput, GroupUncheckedUpdateWithoutOwnerInput>
  }

  export type GroupUpdateManyWithWhereWithoutOwnerInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutOwnerInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    id?: StringFilter<"Group"> | string
    ownerId?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    pricingModel?: EnumPricingModelFilter<"Group"> | PricingModel
  }

  export type TokensUpsertWithWhereUniqueWithoutUserInput = {
    where: TokensWhereUniqueInput
    update: XOR<TokensUpdateWithoutUserInput, TokensUncheckedUpdateWithoutUserInput>
    create: XOR<TokensCreateWithoutUserInput, TokensUncheckedCreateWithoutUserInput>
  }

  export type TokensUpdateWithWhereUniqueWithoutUserInput = {
    where: TokensWhereUniqueInput
    data: XOR<TokensUpdateWithoutUserInput, TokensUncheckedUpdateWithoutUserInput>
  }

  export type TokensUpdateManyWithWhereWithoutUserInput = {
    where: TokensScalarWhereInput
    data: XOR<TokensUpdateManyMutationInput, TokensUncheckedUpdateManyWithoutUserInput>
  }

  export type TokensScalarWhereInput = {
    AND?: TokensScalarWhereInput | TokensScalarWhereInput[]
    OR?: TokensScalarWhereInput[]
    NOT?: TokensScalarWhereInput | TokensScalarWhereInput[]
    id?: StringFilter<"Tokens"> | string
    access_token?: StringFilter<"Tokens"> | string
    refresh_token?: StringFilter<"Tokens"> | string
    expiry_date?: DateTimeFilter<"Tokens"> | Date | string
    ownerId?: StringFilter<"Tokens"> | string
  }

  export type UserCreateWithoutGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsCreateNestedManyWithoutUserInput
    ownedGroups?: GroupCreateNestedManyWithoutOwnerInput
    Tokens?: TokensCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    role?: string
    createdAt?: Date | string
    password?: string | null
    notificationsEnabled?: boolean
    paypalName?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    events?: ParticipantsOnEventsUncheckedCreateNestedManyWithoutUserInput
    ownedGroups?: GroupUncheckedCreateNestedManyWithoutOwnerInput
    Tokens?: TokensUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
  }

  export type GroupCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventCreateNestedManyWithoutGroupInput
    owner: UserCreateNestedOneWithoutOwnedGroupsInput
  }

  export type GroupUncheckedCreateWithoutUsersInput = {
    id?: string
    ownerId: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
    events?: EventUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupCreateOrConnectWithoutUsersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutGroupsInput = {
    update: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
    create: XOR<UserCreateWithoutGroupsInput, UserUncheckedCreateWithoutGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupsInput, UserUncheckedUpdateWithoutGroupsInput>
  }

  export type UserUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    notificationsEnabled?: BoolFieldUpdateOperationsInput | boolean
    paypalName?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    events?: ParticipantsOnEventsUncheckedUpdateManyWithoutUserNestedInput
    ownedGroups?: GroupUncheckedUpdateManyWithoutOwnerNestedInput
    Tokens?: TokensUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GroupUpsertWithoutUsersInput = {
    update: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>
    create: XOR<GroupCreateWithoutUsersInput, GroupUncheckedCreateWithoutUsersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutUsersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutUsersInput, GroupUncheckedUpdateWithoutUsersInput>
  }

  export type GroupUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUpdateManyWithoutGroupNestedInput
    owner?: UserUpdateOneRequiredWithoutOwnedGroupsNestedInput
  }

  export type GroupUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type ParticipantsOnEventsCreateManyEventInput = {
    date?: Date | string
    id: string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateWithoutEventInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    payment?: PaymentUpdateOneWithoutParticipantsOnEventsNestedInput
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateWithoutEventInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutEventInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsCreateManyPaymentInput = {
    eventId: string
    date?: Date | string
    id: string
    comment?: string | null
    userEventStatus?: UserEventStatus
  }

  export type ParticipantsOnEventsUpdateWithoutPaymentInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    user?: UserUpdateOneRequiredWithoutEventsNestedInput
    event?: EventUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateWithoutPaymentInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutPaymentInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    id?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type EventCreateManyGroupInput = {
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

  export type UserOnGroupsCreateManyGroupInput = {
    id: string
    role?: GroupRole
  }

  export type EventUpdateWithoutGroupInput = {
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

  export type EventUncheckedUpdateWithoutGroupInput = {
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

  export type EventUncheckedUpdateManyWithoutGroupInput = {
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

  export type UserOnGroupsUpdateWithoutGroupInput = {
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
    user?: UserUpdateOneRequiredWithoutGroupsNestedInput
  }

  export type UserOnGroupsUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
  }

  export type UserOnGroupsUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
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

  export type ParticipantsOnEventsCreateManyUserInput = {
    eventId: string
    date?: Date | string
    comment?: string | null
    paymentId?: string | null
    userEventStatus?: UserEventStatus
  }

  export type UserOnGroupsCreateManyUserInput = {
    groupId: string
    role?: GroupRole
  }

  export type GroupCreateManyOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricingModel?: PricingModel
  }

  export type TokensCreateManyUserInput = {
    id?: string
    access_token: string
    refresh_token: string
    expiry_date: Date | string
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

  export type AccountUncheckedUpdateManyWithoutUserInput = {
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

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParticipantsOnEventsUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
    payment?: PaymentUpdateOneWithoutParticipantsOnEventsNestedInput
    event?: EventUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantsOnEventsUncheckedUpdateWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type ParticipantsOnEventsUncheckedUpdateManyWithoutUserInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    paymentId?: NullableStringFieldUpdateOperationsInput | string | null
    userEventStatus?: EnumUserEventStatusFieldUpdateOperationsInput | UserEventStatus
  }

  export type UserOnGroupsUpdateWithoutUserInput = {
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
    group?: GroupUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserOnGroupsUncheckedUpdateWithoutUserInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
  }

  export type UserOnGroupsUncheckedUpdateManyWithoutUserInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    role?: EnumGroupRoleFieldUpdateOperationsInput | GroupRole
  }

  export type GroupUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUpdateManyWithoutGroupNestedInput
    users?: UserOnGroupsUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
    events?: EventUncheckedUpdateManyWithoutGroupNestedInput
    users?: UserOnGroupsUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pricingModel?: EnumPricingModelFieldUpdateOperationsInput | PricingModel
  }

  export type TokensUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokensUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    access_token?: StringFieldUpdateOperationsInput | string
    refresh_token?: StringFieldUpdateOperationsInput | string
    expiry_date?: DateTimeFieldUpdateOperationsInput | Date | string
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