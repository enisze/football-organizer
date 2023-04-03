
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.12.0
 * Query Engine version: 659ef412370fa3b41cd7bf6e94587c1dfb7f67e7
 */
Prisma.prismaVersion = {
  client: "4.12.0",
  engine: "659ef412370fa3b41cd7bf6e94587c1dfb7f67e7"
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
Prisma.validator = () => (val) => val


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
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AccountScalarFieldEnum = makeEnum({
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
});

exports.Prisma.EventScalarFieldEnum = makeEnum({
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
});

exports.Prisma.GroupScalarFieldEnum = makeEnum({
  id: 'id',
  ownerId: 'ownerId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  pricingModel: 'pricingModel'
});

exports.Prisma.ParticipantsOnEventsScalarFieldEnum = makeEnum({
  eventId: 'eventId',
  date: 'date',
  id: 'id',
  userEventStatus: 'userEventStatus'
});

exports.Prisma.PaymentScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  eventId: 'eventId',
  userId: 'userId',
  amount: 'amount',
  paymentDate: 'paymentDate',
  gmailMailId: 'gmailMailId'
});

exports.Prisma.SessionScalarFieldEnum = makeEnum({
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TokensScalarFieldEnum = makeEnum({
  id: 'id',
  access_token: 'access_token',
  refresh_token: 'refresh_token',
  expiry_date: 'expiry_date',
  ownerId: 'ownerId'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserOnGroupsScalarFieldEnum = makeEnum({
  id: 'id',
  groupId: 'groupId',
  role: 'role'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
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
});

exports.Prisma.VerificationTokenScalarFieldEnum = makeEnum({
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
});
exports.EventStatus = makeEnum({
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  BOOKED: 'BOOKED'
});

exports.GroupRole = makeEnum({
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  USER: 'USER'
});

exports.PricingModel = makeEnum({
  FREE: 'FREE',
  SUPPORTER: 'SUPPORTER',
  PREMIUM: 'PREMIUM'
});

exports.UserEventStatus = makeEnum({
  MAYBE: 'MAYBE',
  AVAILABLE: 'AVAILABLE',
  JOINED: 'JOINED',
  CANCELED: 'CANCELED'
});

exports.Prisma.ModelName = makeEnum({
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
});

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
