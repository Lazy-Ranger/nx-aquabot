export const UserResource = {
  name: "User",

  collectionName: "users",

  pathTemplate: {
    DEFAULT: "users/{user_id}"
  } as const
} as const;
