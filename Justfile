set shell := ["zsh", "-c"]

[private]
@help:
  just --list

build:
  bun ./scripts/build.ts
