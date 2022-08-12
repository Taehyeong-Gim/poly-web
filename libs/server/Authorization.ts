import { Model, Role, User } from "@prisma/client";

type AuthorizationRequest = {
  operation: Operation;
  body: {
    requester?: User; // Not modifiable by user because this is encrypted value in jwt
    model?: Model;
  };
};
type Operation = {
  theme: "model" | "user";
  method: "create" | "read" | "update" | "delete";
};

export function hasRight(
  operation: Operation,
  requester?: User | null,
  model?: Model | null
): boolean {
  const role = requester?.role ?? Role.UNAUTHENTICATED;
  switch (role) {
    case Role.ADMIN:
      return true;
    case Role.USER:
      switch (operation.theme) {
        case "model":
          const userIsUploader =
            (model && requester && model.userId === requester.id) ?? false;
          switch (operation.method) {
            case "create":
              return true;
            case "delete":
              return userIsUploader;
            case "read":
              return true;
            case "update":
              return userIsUploader;
          }
        case "user":
          switch (operation.method) {
            case "create":
              return false;
            case "delete":
              return true;
            case "read":
              return true;
            case "update":
              return true;
          }
      }
      return false;
    case Role.UNAUTHENTICATED:
      return false;
  }
  return false;
}