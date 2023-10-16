
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.4.2
 * Query Engine version: ac9d7041ed77bcc8a8dbd2ab6616b39013829574
 */
Prisma.prismaVersion = {
  client: "5.4.2",
  engine: "ac9d7041ed77bcc8a8dbd2ab6616b39013829574"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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
exports.EventStatus = exports.$Enums.EventStatus = {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  BOOKED: 'BOOKED'
};

exports.UserEventStatus = exports.$Enums.UserEventStatus = {
  MAYBE: 'MAYBE',
  AVAILABLE: 'AVAILABLE',
  JOINED: 'JOINED',
  CANCELED: 'CANCELED'
};

exports.PricingModel = exports.$Enums.PricingModel = {
  FREE: 'FREE',
  SUPPORTER: 'SUPPORTER',
  PREMIUM: 'PREMIUM'
};

exports.GroupRole = exports.$Enums.GroupRole = {
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
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/enis/football-organizer/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [
      "referentialIntegrity"
    ],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../..",
  "clientVersion": "5.4.2",
  "engineVersion": "ac9d7041ed77bcc8a8dbd2ab6616b39013829574",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgb3V0cHV0ICAgICAgICAgID0gIi4vZ2VuZXJhdGVkL2NsaWVudCIKICBwcmV2aWV3RmVhdHVyZXMgPSBbInJlZmVyZW50aWFsSW50ZWdyaXR5Il0KICBiaW5hcnlUYXJnZXRzICAgPSBbIm5hdGl2ZSJdCn0KCmRhdGFzb3VyY2UgZGIgewogIHByb3ZpZGVyICAgICA9ICJteXNxbCIKICB1cmwgICAgICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCiAgcmVsYXRpb25Nb2RlID0gInByaXNtYSIKfQoKbW9kZWwgVG9rZW5zIHsKICBpZCAgICAgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgYWNjZXNzX3Rva2VuICBTdHJpbmcgICBAZGIuVGV4dAogIHJlZnJlc2hfdG9rZW4gU3RyaW5nICAgQHVuaXF1ZQogIGV4cGlyeV9kYXRlICAgRGF0ZVRpbWUKICBvd25lcklkICAgICAgIFN0cmluZwogIHVzZXIgICAgICAgICAgVXNlciAgICAgQHJlbGF0aW9uKGZpZWxkczogW293bmVySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgQEBpbmRleChbb3duZXJJZF0pCn0KCm1vZGVsIEV2ZW50IHsKICBpZCAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIGNyZWF0ZWRBdCAgICAgICBEYXRlVGltZSAgICAgICAgICAgICAgIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCAgICAgICBEYXRlVGltZSAgICAgICAgICAgICAgIEB1cGRhdGVkQXQKICBhZGRyZXNzICAgICAgICAgU3RyaW5nCiAgZGF0ZSAgICAgICAgICAgIERhdGVUaW1lCiAgZW5kVGltZSAgICAgICAgIFN0cmluZwogIHN0YXJ0VGltZSAgICAgICBTdHJpbmcKICBib29raW5nRGF0ZSAgICAgRGF0ZVRpbWU/CiAgY29zdCAgICAgICAgICAgIEZsb2F0CiAgc3RhdHVzICAgICAgICAgIEV2ZW50U3RhdHVzICAgICAgICAgICAgQGRlZmF1bHQoQ1JFQVRFRCkKICBtYXhQYXJ0aWNpcGFudHMgSW50ICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdCgxMCkKICBwYXJ0aWNpcGFudHMgICAgUGFydGljaXBhbnRzT25FdmVudHNbXQogIEdyb3VwICAgICAgICAgICBHcm91cD8gICAgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtncm91cElkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCiAgZ3JvdXBJZCAgICAgICAgIFN0cmluZz8KCiAgQEBpbmRleChbZ3JvdXBJZF0pCn0KCm1vZGVsIFBhcnRpY2lwYW50c09uRXZlbnRzIHsKICBldmVudElkICAgU3RyaW5nCiAgZGF0ZSAgICAgIERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIGlkICAgICAgICBTdHJpbmcKICBjb21tZW50ICAgU3RyaW5nPwogIHBheW1lbnRJZCBTdHJpbmc/CgogIHBheW1lbnQgICAgICAgICBQYXltZW50PyAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3BheW1lbnRJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQogIHVzZXJFdmVudFN0YXR1cyBVc2VyRXZlbnRTdGF0dXMgQGRlZmF1bHQoQVZBSUxBQkxFKQogIHVzZXIgICAgICAgICAgICBVc2VyICAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2lkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCiAgZXZlbnQgICAgICAgICAgIEV2ZW50ICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbZXZlbnRJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQoKICBAQGlkKFtpZCwgZXZlbnRJZF0pCiAgQEBpbmRleChbaWRdKQogIEBAaW5kZXgoW2V2ZW50SWRdKQogIEBAaW5kZXgoW3BheW1lbnRJZF0pCn0KCm1vZGVsIFBheW1lbnQgewogIGlkICAgICAgICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBjcmVhdGVkQXQgICAgICAgICAgICBEYXRlVGltZSAgICAgICAgICAgICAgIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCAgICAgICAgICAgIERhdGVUaW1lICAgICAgICAgICAgICAgQHVwZGF0ZWRBdAogIGV2ZW50SWQgICAgICAgICAgICAgIFN0cmluZwogIHVzZXJJZCAgICAgICAgICAgICAgIFN0cmluZwogIGFtb3VudCAgICAgICAgICAgICAgIEZsb2F0CiAgcGF5bWVudERhdGUgICAgICAgICAgRGF0ZVRpbWUKICBnbWFpbE1haWxJZCAgICAgICAgICBTdHJpbmcKICBQYXJ0aWNpcGFudHNPbkV2ZW50cyBQYXJ0aWNpcGFudHNPbkV2ZW50c1tdCgogIEBAaW5kZXgoW2V2ZW50SWRdKQogIEBAaW5kZXgoW3VzZXJJZF0pCn0KCm1vZGVsIEFjY291bnQgewogIGlkICAgICAgICAgICAgICAgIFN0cmluZyAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICB1c2VySWQgICAgICAgICAgICBTdHJpbmcKICB0eXBlICAgICAgICAgICAgICBTdHJpbmcKICBwcm92aWRlciAgICAgICAgICBTdHJpbmcKICBwcm92aWRlckFjY291bnRJZCBTdHJpbmcKICByZWZyZXNoX3Rva2VuICAgICBTdHJpbmc/IEBkYi5UZXh0CiAgYWNjZXNzX3Rva2VuICAgICAgU3RyaW5nPyBAZGIuVGV4dAogIGV4cGlyZXNfYXQgICAgICAgIEludD8KICB0b2tlbl90eXBlICAgICAgICBTdHJpbmc/CiAgc2NvcGUgICAgICAgICAgICAgU3RyaW5nPwogIGlkX3Rva2VuICAgICAgICAgIFN0cmluZz8gQGRiLlRleHQKICBzZXNzaW9uX3N0YXRlICAgICBTdHJpbmc/CiAgdXNlciAgICAgICAgICAgICAgVXNlciAgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIEBAdW5pcXVlKFtwcm92aWRlciwgcHJvdmlkZXJBY2NvdW50SWRdKQogIEBAaW5kZXgoW3VzZXJJZF0pCn0KCm1vZGVsIFNlc3Npb24gewogIGlkICAgICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIHNlc3Npb25Ub2tlbiBTdHJpbmcgICBAdW5pcXVlCiAgdXNlcklkICAgICAgIFN0cmluZwogIGV4cGlyZXMgICAgICBEYXRlVGltZQogIHVzZXIgICAgICAgICBVc2VyICAgICBAcmVsYXRpb24oZmllbGRzOiBbdXNlcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIEBAaW5kZXgoW3VzZXJJZF0pCn0KCm1vZGVsIEdyb3VwIHsKICBpZCAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBvd25lcklkICAgICAgU3RyaW5nCiAgbmFtZSAgICAgICAgIFN0cmluZwogIGNyZWF0ZWRBdCAgICBEYXRlVGltZSAgICAgICBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgICAgRGF0ZVRpbWUgICAgICAgQHVwZGF0ZWRBdAogIGV2ZW50cyAgICAgICBFdmVudFtdCiAgdXNlcnMgICAgICAgIFVzZXJPbkdyb3Vwc1tdCiAgcHJpY2luZ01vZGVsIFByaWNpbmdNb2RlbCAgIEBkZWZhdWx0KEZSRUUpCiAgb3duZXIgICAgICAgIFVzZXIgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtvd25lcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIEBAaW5kZXgoW293bmVySWRdKQp9Cgptb2RlbCBVc2VyIHsKICBpZCAgICAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgbmFtZSAgICAgICAgICAgICAgICAgU3RyaW5nCiAgZW1haWwgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICBAdW5pcXVlCiAgZW1haWxWZXJpZmllZCAgICAgICAgRGF0ZVRpbWU/CiAgaW1hZ2UgICAgICAgICAgICAgICAgU3RyaW5nPwogIHJvbGUgICAgICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgICAgICAgQGRlZmF1bHQoInVzZXIiKQogIGNyZWF0ZWRBdCAgICAgICAgICAgIERhdGVUaW1lICAgICAgICAgICAgICAgQGRlZmF1bHQobm93KCkpCiAgcGFzc3dvcmQgICAgICAgICAgICAgU3RyaW5nPwogIG5vdGlmaWNhdGlvbnNFbmFibGVkIEJvb2xlYW4gICAgICAgICAgICAgICAgQGRlZmF1bHQodHJ1ZSkKICBwYXlwYWxOYW1lICAgICAgICAgICBTdHJpbmc/CiAgYWNjb3VudHMgICAgICAgICAgICAgQWNjb3VudFtdCiAgc2Vzc2lvbnMgICAgICAgICAgICAgU2Vzc2lvbltdCiAgZXZlbnRzICAgICAgICAgICAgICAgUGFydGljaXBhbnRzT25FdmVudHNbXQogIGdyb3VwcyAgICAgICAgICAgICAgIFVzZXJPbkdyb3Vwc1tdCiAgb3duZWRHcm91cHMgICAgICAgICAgR3JvdXBbXQogIFRva2VucyAgICAgICAgICAgICAgIFRva2Vuc1tdCn0KCm1vZGVsIFVzZXJPbkdyb3VwcyB7CiAgaWQgICAgICBTdHJpbmcKICBncm91cElkIFN0cmluZwogIHJvbGUgICAgR3JvdXBSb2xlIEBkZWZhdWx0KFVTRVIpCiAgdXNlciAgICBVc2VyICAgICAgQHJlbGF0aW9uKGZpZWxkczogW2lkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCiAgZ3JvdXAgICBHcm91cCAgICAgQHJlbGF0aW9uKGZpZWxkczogW2dyb3VwSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgQEBpZChbaWQsIGdyb3VwSWRdKQogIEBAaW5kZXgoW2lkXSkKICBAQGluZGV4KFtncm91cElkXSkKfQoKbW9kZWwgVmVyaWZpY2F0aW9uVG9rZW4gewogIGlkZW50aWZpZXIgU3RyaW5nCiAgdG9rZW4gICAgICBTdHJpbmcgICBAdW5pcXVlCiAgZXhwaXJlcyAgICBEYXRlVGltZQoKICBAQHVuaXF1ZShbaWRlbnRpZmllciwgdG9rZW5dKQp9CgplbnVtIEdyb3VwUm9sZSB7CiAgT1dORVIKICBBRE1JTgogIFVTRVIKfQoKZW51bSBFdmVudFN0YXR1cyB7CiAgQ0FOQ0VMRUQKICBDUkVBVEVECiAgQk9PS0VECn0KCmVudW0gVXNlckV2ZW50U3RhdHVzIHsKICBNQVlCRQogIEFWQUlMQUJMRQogIEpPSU5FRAogIENBTkNFTEVECn0KCmVudW0gUHJpY2luZ01vZGVsIHsKICBGUkVFCiAgU1VQUE9SVEVSCiAgUFJFTUlVTQp9Cg==",
  "inlineSchemaHash": "ddfb06b9ad3c303ebb0d2935a2dc348b57c2af0f9ae64e174f703f290673ce24",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Tokens\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiry_date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"TokensToUser\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Event\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"endTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"startTime\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bookingDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EventStatus\",\"default\":\"CREATED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"maxParticipants\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":10,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"participants\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ParticipantsOnEvents\",\"relationName\":\"EventToParticipantsOnEvents\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Group\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Group\",\"relationName\":\"EventToGroup\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ParticipantsOnEvents\":{\"dbName\":null,\"fields\":[{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"ParticipantsOnEventsToPayment\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userEventStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"UserEventStatus\",\"default\":\"AVAILABLE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"ParticipantsOnEventsToUser\",\"relationFromFields\":[\"id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"event\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"relationName\":\"EventToParticipantsOnEvents\",\"relationFromFields\":[\"eventId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\",\"eventId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payment\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"eventId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gmailMailId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ParticipantsOnEvents\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ParticipantsOnEvents\",\"relationName\":\"ParticipantsOnEventsToPayment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Account\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"providerAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refresh_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"access_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token_type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"scope\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"id_token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"session_state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"provider\",\"providerAccountId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"provider\",\"providerAccountId\"]}],\"isGenerated\":false},\"Session\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessionToken\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Group\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"events\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Event\",\"relationName\":\"EventToGroup\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"users\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnGroups\",\"relationName\":\"GroupToUserOnGroups\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pricingModel\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"PricingModel\",\"default\":\"FREE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"GroupToUser\",\"relationFromFields\":[\"ownerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"emailVerified\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"image\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"user\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notificationsEnabled\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paypalName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"accounts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Account\",\"relationName\":\"AccountToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sessions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Session\",\"relationName\":\"SessionToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"events\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ParticipantsOnEvents\",\"relationName\":\"ParticipantsOnEventsToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"UserOnGroups\",\"relationName\":\"UserToUserOnGroups\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ownedGroups\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Group\",\"relationName\":\"GroupToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Tokens\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Tokens\",\"relationName\":\"TokensToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"UserOnGroups\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"groupId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"GroupRole\",\"default\":\"USER\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"UserToUserOnGroups\",\"relationFromFields\":[\"id\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"group\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Group\",\"relationName\":\"GroupToUserOnGroups\",\"relationFromFields\":[\"groupId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"id\",\"groupId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"VerificationToken\":{\"dbName\":null,\"fields\":[{\"name\":\"identifier\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"token\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expires\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"identifier\",\"token\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"identifier\",\"token\"]}],\"isGenerated\":false}},\"enums\":{\"GroupRole\":{\"values\":[{\"name\":\"OWNER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"USER\",\"dbName\":null}],\"dbName\":null},\"EventStatus\":{\"values\":[{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"CREATED\",\"dbName\":null},{\"name\":\"BOOKED\",\"dbName\":null}],\"dbName\":null},\"UserEventStatus\":{\"values\":[{\"name\":\"MAYBE\",\"dbName\":null},{\"name\":\"AVAILABLE\",\"dbName\":null},{\"name\":\"JOINED\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null}],\"dbName\":null},\"PricingModel\":{\"values\":[{\"name\":\"FREE\",\"dbName\":null},{\"name\":\"SUPPORTER\",\"dbName\":null},{\"name\":\"PREMIUM\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)


config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

