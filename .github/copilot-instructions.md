# Notion SDK for JavaScript - Copilot Instructions

## Repository Overview

This is the official Notion SDK for JavaScript, a client library for interacting with the Notion API. The SDK provides a simple and type-safe interface to all Notion API endpoints.

**Repository Details:**
- **Type**: Node.js TypeScript SDK
- **Package**: `@notionhq/client`
- **Target Runtime**: Node.js ≥ 18
- **TypeScript**: ≥ 5.9
- **Build System**: TypeScript compiler (tsc)
- **Test Framework**: Jest with ts-jest
- **Code Style**: Prettier (no semicolons, ES5 trailing commas, LF line endings)
- **Linting**: ESLint with TypeScript rules + cspell for spell checking

## Important Files and Warnings

### ⚠️ Generated Files - DO NOT EDIT

- `src/api-endpoints.ts` - This is an auto-generated file (see header comment). Never suggest changes to this file.
- All files in `build/` directory - These are compiled outputs

### Key Source Files

- `src/Client.ts` - Main client implementation
- `src/index.ts` - Public API exports
- `src/errors.ts` - Error types and handling
- `src/helpers.ts` - Utility functions for pagination
- `src/type-utils.ts` - TypeScript type guards and utilities
- `src/logging.ts` - Logging implementation

## Build and Validation

### Prerequisites

Always run these commands from the repository root:

```bash
# Install dependencies first
npm install
```

### Build Process

```bash
# Clean and build the project
npm run build
# This runs: rm -rf ./build && tsc
```

### Validation Pipeline

The following checks must pass before any code changes:

1. **Linting** (required for CI):
   ```bash
   npm run lint
   # Runs: prettier --check . && eslint . --ext .ts && cspell '**/*'
   ```

2. **Tests** (required for CI):
   ```bash
   npm test
   # Runs: jest ./test
   ```

3. **Type Checking Examples** (CI also validates):
   ```bash
   npm run examples:install  # Install dependencies for all examples
   npm run examples:typecheck  # Type-check all examples
   ```

### CI/CD Pipeline

GitHub Actions runs on push/PR to main branch:
- Tests on Node.js versions: 18.x, 19.x, 20.x, 22.x
- Linting on all versions
- Example type checking on Node.js 20.x

## Development Guidelines

### Code Style Requirements

- **NO semicolons** (enforced by Prettier)
- **NO redundant code comments** - Only add comments for motivation/reasoning
- **Comment length**: Max 80 characters, use multiline comments for longer text
- **Import style**: CommonJS (`require`/`module.exports`)
- **Avoid TypeScript escape hatches**: No `as any`, prefer type guards from `type-utils.ts`

### Making Changes

1. **Always build before testing**:
   ```bash
   npm run build && npm test
   ```

2. **For API endpoint changes**: Remember that `src/api-endpoints.ts` is generated. Changes to API endpoints must be made upstream.

3. **For new functionality**:
   - Add corresponding tests in `test/`
   - Export new types/functions from `src/index.ts`
   - Add type guards to `src/type-utils.ts` if working with API responses

4. **Error handling**: Use the error types from `src/errors.ts` and follow the existing patterns

### Publishing Prerequisites

Before publishing (handled by maintainers):
```bash
# Must be logged into npm
npm whoami  # Should not fail
npm run prepublishOnly  # Runs all checks
```

## Project Structure

```
notion-sdk-js/
├── src/                    # TypeScript source files
│   ├── Client.ts          # Main client class
│   ├── api-endpoints.ts   # ⚠️ GENERATED - DO NOT EDIT
│   ├── errors.ts          # Error types
│   ├── helpers.ts         # Pagination utilities
│   ├── index.ts           # Public exports
│   └── type-utils.ts      # Type guards
├── test/                   # Jest test files
├── examples/               # Usage examples (each with own package.json)
├── build/                  # Compiled output (git-ignored)
└── scripts/               # Build scripts
```

## Common Issues and Solutions

1. **TypeScript version warning**: The project uses TypeScript 5.9.2 which may show warnings with ts-jest. This is expected and tests still pass.

2. **Build failures**: Always run `npm run clean` before `npm run build` if you encounter issues.

3. **Import errors**: This SDK uses CommonJS. Use `require()` not ES6 imports internally.

4. **Type errors**: Check `src/type-utils.ts` for existing type guards before creating new ones.

## Key Concepts

- **Pagination**: Use `iteratePaginatedAPI` or `collectPaginatedAPI` helpers from `src/helpers.ts`
- **Type Guards**: Use `isFullPage`, `isFullBlock`, etc. from the public API
- **Error Codes**: Compare against `APIErrorCode` and `ClientErrorCode` enums
- **Logging**: Configurable via `LogLevel` enum in client options

## Final Note

Trust these instructions for common tasks. Only search the codebase if the information here is incomplete or incorrect. The patterns and practices documented here are consistently applied throughout the codebase.
