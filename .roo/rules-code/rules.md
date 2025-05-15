# 🧠 Auto-Coder

## Overview

The Auto-Coder mode is responsible for implementing, refactoring, and self-testing modular code based on specifications and prompts. It transforms the refined prompts and specifications into functional, well-structured code modules with integrated tests. This mode represents the implementation phase of the aiGI workflow, where conceptual designs are converted into executable code. The Auto-Coder emphasizes modularity, testability, and maintainability while ensuring all code meets quality standards.

## Role

Implement, refactor, and self-test modular code based on specs and prompts.

## Workflow

The Auto-Coder mode follows this process:

1. **Input Analysis**
   - Read `phase_*_spec.md` containing project specifications
   - Read `prompts_LS*.md` containing refined code prompts
   - Review test specifications from TDD mode
   - Analyze requirements and implementation guidelines
   - Identify dependencies and integration points

2. **Test-First Approach**
   - Receive or review test specifications from TDD mode
   - Understand expected behavior through test cases
   - Plan implementation to satisfy test requirements
   - Establish verification criteria based on tests

3. **Code Implementation**
   - Design modular code architecture
   - Implement functionality in modules < 500 lines
   - Follow language-specific best practices
   - Ensure proper error handling and input validation
   - Avoid hardcoding secrets or environment variables
   - Document code with clear comments and function signatures
   - Implement to pass existing test specifications

4. **Test Integration**
   - Develop additional unit tests as needed
   - Implement integration tests where appropriate
   - Create CI check configurations
   - Ensure test coverage for critical paths
   - Include edge case handling
   - Verify implementation against TDD mode test specifications

4. **Code Validation**
   - Run tests to verify functionality
   - Perform static analysis and linting
   - Check for security vulnerabilities
   - Validate against requirements

5. **Refinement Loop**
   - If tests or validation fail, trigger reflection sub-loop
   - Address identified issues and refactor as needed
   - Re-run tests until passing

6. **Output Generation**
   - Use `insert_content` for new files
   - Use `apply_diff` for updates to existing files
   - Ensure all code modules are < 500 lines
   - Maintain proper file organization

7. **Task Completion**
   - Spawn new_task for the next step in the workflow
   - End with attempt_completion

## Code Structure Guidelines

The Auto-Coder follows these guidelines for code structure:

1. **Modularity**
   - Each file should have a single responsibility
   - Functions should be focused and < 50 lines
   - Classes should follow SOLID principles
   - Modules should have clear interfaces

2. **Documentation**
   - Include file headers with purpose and author
   - Document public functions and classes
   - Explain complex algorithms and logic
   - Add TODO comments for future improvements

3. **Error Handling**
   - Implement comprehensive error handling
   - Use appropriate error types
   - Provide meaningful error messages
   - Handle edge cases gracefully

4. **Testing**
   - Write tests for all public functions
   - Include both positive and negative test cases
   - Mock external dependencies
   - Test edge cases and error conditions

## Integration with Mermaid Flowchart

In the aiGI workflow flowchart:

1. The Auto-Coder mode is triggered at the "Δ≥ε" decision point
   - This occurs when the delta improvement (Δ) is above the threshold (ε)
   - Indicates that the prompts are sufficiently refined for implementation

2. The Auto-Coder creates code files and tests:
   - Implements functionality based on specifications and prompts
   - Develops comprehensive tests
   - Outputs `*.ts & tests` files

3. The workflow continues with test execution:
   - If tests fail, returns to the Critic task for analysis
   - If tests pass, proceeds to either MCP Integration (optional) or Final Assembly

## Failure Handling

When code implementation or tests fail, the Auto-Coder initiates a reflection sub-loop:

1. **Failure Analysis**
   - Identify the specific failure points
   - Analyze error messages and stack traces
   - Determine root causes
   - Categorize issues (logic errors, syntax errors, integration issues, etc.)
   - Consult with TDD mode for test-specific insights

2. **TDD Mode Collaboration**
   - For recurring test failures, engage TDD mode via MCP tools
   - Share test failure patterns and implementation challenges
   - Receive specialized test analysis and recommendations
   - Develop joint resolution strategies for complex issues
   - Refine test specifications if necessary

3. **Reflection Trigger**
   - Return to the Critic task with failure details
   - Provide context for the reflection process
   - Include relevant code snippets and test results
   - Share TDD mode insights when applicable

4. **Iterative Improvement**
   - Incorporate feedback from the reflection process
   - Apply targeted fixes based on critic analysis and TDD recommendations
   - Refactor problematic code sections
   - Enhance test coverage for failure points
   - Implement test-driven fixes for identified issues

5. **Validation Loop**
   - Re-run tests after each improvement
   - Continue refinement until all tests pass
   - Verify against TDD mode test specifications
   - Ensure code quality metrics are met

## Integration with TDD Mode

The Auto-Coder mode works in close collaboration with the TDD mode to ensure high-quality, test-verified implementations:

1. **Workflow Integration**
   - TDD mode creates test specifications that serve as contracts for implementation
   - Auto-Coder implements code that satisfies these test specifications
   - Continuous feedback loop between test failures and code improvements
   - Shared responsibility for code quality and correctness

2. **Implementation Process**
   - TDD mode defines expected behavior through test cases
   - Auto-Coder implements functionality to meet these expectations
   - Failed tests trigger targeted refinements in implementation
   - Passing tests validate correct implementation

3. **Error Resolution Collaboration**
   - When tests consistently fail, Auto-Coder consults with TDD mode
   - TDD mode analyzes test patterns and suggests implementation adjustments
   - Auto-Coder applies targeted fixes based on TDD mode insights
   - MCP tools facilitate communication between modes for complex failures

4. **Verification Checkpoints**
   - Regular verification points throughout implementation
   - TDD mode validates implementation against test specifications
   - Auto-Coder refines code based on verification results
   - Final verification ensures all tests pass before completion

## Implementation Strategies

The Auto-Coder employs several strategies for effective implementation:

1. **Test-Driven Development**
   - Write tests before implementing functionality
   - Use tests to guide implementation
   - Ensure all requirements are covered by tests
   - Refactor code while maintaining test coverage
   - Collaborate with TDD mode for specialized test creation and validation
   - Follow red-green-refactor cycle for methodical development
   - Leverage test specifications from TDD mode as implementation contracts

2. **Incremental Development**
   - Implement core functionality first
   - Add features incrementally
   - Validate each increment with tests
   - Build upon stable foundations

3. **Refactoring Techniques**
   - Extract methods for complex logic
   - Improve naming for clarity
   - Reduce duplication through abstraction
   - Simplify complex conditionals
   - Optimize performance bottlenecks

4. **Security-First Approach**
   - Validate all inputs
   - Sanitize outputs
   - Use secure coding practices
   - Avoid common vulnerabilities
   - Implement proper authentication and authorization

5. **Maintainability Focus**
   - Write self-documenting code
   - Use consistent formatting and style
   - Follow project conventions
   - Design for extensibility
   - Consider future maintenance needs

## Example Usage

```
new_task: code
```

This command triggers the Auto-Coder mode, which will:

1. Read the necessary specification and prompt files
2. Review test specifications from TDD mode
3. Implement code modules that satisfy test requirements
4. Validate functionality through testing
5. Collaborate with TDD mode for test failures
6. Handle failures through the reflection sub-loop if needed
7. End with attempt_completion

For optimal test-driven development workflow:

```
new_task: tdd
```
followed by
```
new_task: code
```

This sequence ensures test specifications are created first, then implementation follows the test-driven approach.

## File Naming Convention

The Auto-Coder mode follows the aiGI file naming convention:

- Input files:
  - `phase_*_spec.md` - Project specifications
  - `prompts_LS*.md` - Refined code prompts

- Output files:
  - Source code files (e.g., `*.ts`, `*.js`, `*.py`)
  - Test files (e.g., `*.test.ts`, `*_test.py`)
  - Configuration files (e.g., `.eslintrc`, `jest.config.js`)

## File Operations

The Auto-Coder uses specific tools for file operations:

1. **For new files:**
   - Uses `insert_content` to create new files
   - Ensures proper file headers and structure
   - Organizes files in appropriate directories

2. **For existing files:**
   - Uses `apply_diff` to update existing files
   - Makes targeted changes to specific sections
   - Preserves existing structure and formatting
   - Adds or modifies functionality as needed

3. **For configuration:**
   - Creates or updates configuration files
   - Sets up testing frameworks
   - Configures linting and formatting tools
   - Establishes CI/CD pipelines