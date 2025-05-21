# 🧐 Critic

## Overview

The Critic is responsible for reviewing code outputs to identify bugs, style issues, and optimization opportunities. It performs static analysis and linting on generated code, providing structured feedback that drives the recursive improvement process. The Critic's insights are captured in reflection documents that inform subsequent refinement cycles.

## Role

Review code outputs to identify bugs, style issues, and optimization opportunities.

## Workflow

The Critic follows this process:

1. **Input Analysis**
   - Load `responses_LS{n}.md` files containing code outputs
   - Parse and extract code segments for analysis
   - Identify the programming languages and frameworks used

2. **Code Analysis**
   - Run lint and static analysis tools appropriate for the language
   - Check for syntax errors and potential runtime issues
   - Evaluate code style and adherence to best practices
   - Identify performance bottlenecks and optimization opportunities
   - Assess security vulnerabilities and potential risks

3. **Issue Prioritization**
   - Rank identified issues by severity and impact
   - Select the top 5 most critical code issues
   - Formulate specific fixes and improvements for each issue

4. **Output Generation**
   - Document findings in `reflection_LS{n}.md` files
   - Include code snippets with annotations highlighting issues
   - Provide detailed explanations and recommended fixes
   - Suggest refactoring opportunities and optimization strategies

5. **Task Completion**
   - Spawn new_task for the next step in the workflow
   - End with attempt_completion

## Reflection Document Structure

Each reflection document follows a consistent structure:

```markdown
## Reflection [LS{n}]

### Summary
[Overall assessment of code quality and key findings]

### Top Issues

#### Issue 1: [Issue Title]
**Severity**: [High/Medium/Low]
**Location**: [File/Function/Line reference]
**Description**: [Detailed explanation of the issue]
**Code Snippet**:
```[language]
[Problematic code with issue highlighted]
```
**Recommended Fix**:
```[language]
[Corrected code implementation]
```

[Repeat for Issues 2-5]

### Style Recommendations
[General style improvements and best practices to follow]

### Optimization Opportunities
[Performance improvements and optimization strategies]

### Security Considerations
[Security vulnerabilities and mitigation strategies]
```

## Integration with Mermaid Flowchart

In the aiGI workflow flowchart:

1. The Critic is triggered after the LLM API call produces `responses_LS{n}.md`
2. It analyzes the code in these responses and produces `reflection_LS{n}.md`
3. The reflection document is then passed to the Scorer for metrics computation
4. If test results fail during the Code phase, the workflow returns to the Critic for additional analysis

## Analysis Capabilities

The Critic performs comprehensive code analysis including:

1. **Syntax and Structure**
   - Syntax error detection
   - Code structure and organization assessment
   - Naming convention compliance
   - Proper use of language features

2. **Code Quality**
   - Complexity metrics (cyclomatic complexity, cognitive complexity)
   - Duplication detection
   - Dead code identification
   - Maintainability index calculation

3. **Performance**
   - Algorithm efficiency analysis
   - Resource usage evaluation
   - Bottleneck identification
   - Optimization opportunity detection

4. **Security**
   - Vulnerability scanning
   - Input validation assessment
   - Authentication and authorization checks
   - Secure coding practice verification

## Issue Classification

The Critic classifies issues into several categories:

1. **Bugs**
   - Logic errors
   - Off-by-one errors
   - Null/undefined reference issues
   - Type mismatches
   - Exception handling problems

2. **Style Issues**
   - Inconsistent formatting
   - Poor naming conventions
   - Inadequate comments and documentation
   - Violation of language-specific style guides

3. **Optimization Opportunities**
   - Inefficient algorithms
   - Redundant operations
   - Memory leaks
   - Unnecessary resource usage
   - Performance anti-patterns

4. **Security Vulnerabilities**
   - Injection vulnerabilities
   - Insecure data handling
   - Authentication weaknesses
   - Authorization flaws
   - Sensitive data exposure

## Example Usage

```
new_task: critic
```

This command triggers the Critic mode, which will:

1. Load the necessary response files
2. Perform code analysis
3. Generate a reflection document with the top 5 issues
4. End with attempt_completion

## File Naming Convention

The Critic follows the aiGI file naming convention:

- Input files:
  - `responses_LS{n}.md` - LLM responses for layer n

- Output files:
  - `reflection_LS{n}.md` - Critic analysis for layer n