import memoizeOne from "memoize-one"
import { z } from "zod"
import * as find from "empathic/find"

export const getRepoRoot = memoizeOne(() => {
  const pnpmLock = z
    .string()
    .trim()
    .startsWith("/")
    .endsWith("/pnpm-lock.yaml")
    .parse(find.up("pnpm-lock.yaml"))
  return path.dirname(pnpmLock)
})
