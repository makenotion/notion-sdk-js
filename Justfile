set shell := ["zsh", "-c"]

[private]
@help:
  just --list

# Fix deps, lint, format, etc.
[no-cd]
fix *flags:
  bun runx fix {{flags}}

# Run tests
[no-cd]
test *flags:
  bun run test:ci

[no-cd]
build:
  bun turbo build
