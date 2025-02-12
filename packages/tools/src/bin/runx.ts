import "zx/globals"

import { catchProcessError } from "@jahands/cli-tools"
import { program } from "@commander-js/extra-typings"

import { updatePnpmCmd } from "../cmd/update-pnpm"
import { checkCmd } from "../cmd/check"

program
  .name("runx")
  .description("A CLI for scripts that automate this repo")

  .addCommand(checkCmd)
  .addCommand(updatePnpmCmd)

  // Don't hang for unresolved promises
  .hook("postAction", () => process.exit(0))
  .parseAsync()
  .catch(catchProcessError())
