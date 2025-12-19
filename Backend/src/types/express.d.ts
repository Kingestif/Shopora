import type { User } from "../lib/schemas/user.ts"

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
