
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 5.0.0
 * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
 */
Prisma.prismaVersion = {
  client: "5.0.0",
  engine: "6b0aef69b7cdfc787f822ecd7cdc76d5f1991584"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TokensScalarFieldEnum = {
  id: 'id',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  expiry_date: 'expiry_date',
  ownerId: 'ownerId'
};

exports.Prisma.EventScalarFieldEnum = {
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

exports.Prisma.ParticipantsOnEventsScalarFieldEnum = {
  eventId: 'eventId',
  date: 'date',
  id: 'id',
  comment: 'comment',
  paymentId: 'paymentId',
  userEventStatus: 'userEventStatus'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  eventId: 'eventId',
  userId: 'userId',
  amount: 'amount',
  paymentDate: 'paymentDate',
  gmailMailId: 'gmailMailId'
};

exports.Prisma.AccountScalarFieldEnum = {
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

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.GroupScalarFieldEnum = {
  id: 'id',
  ownerId: 'ownerId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  pricingModel: 'pricingModel'
};

exports.Prisma.UserScalarFieldEnum = {
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

exports.Prisma.UserOnGroupsScalarFieldEnum = {
  id: 'id',
  groupId: 'groupId',
  role: 'role'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.EventStatus = {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  BOOKED: 'BOOKED'
};

exports.UserEventStatus = {
  MAYBE: 'MAYBE',
  AVAILABLE: 'AVAILABLE',
  JOINED: 'JOINED',
  CANCELED: 'CANCELED'
};

exports.PricingModel = {
  FREE: 'FREE',
  SUPPORTER: 'SUPPORTER',
  PREMIUM: 'PREMIUM'
};

exports.GroupRole = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER'
};

exports.Prisma.ModelName = {
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

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
