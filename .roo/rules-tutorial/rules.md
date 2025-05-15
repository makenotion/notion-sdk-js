# 📘 aiGI Tutorial

## Overview

Welcome to aiGI (Artificial Intelligence Guided Implementation), a layered recursive reflection and code-centric workflow designed to produce high-quality software through an iterative improvement process. This tutorial mode serves as your comprehensive guide to understanding and effectively using the aiGI system, walking you through each component and demonstrating best practices for achieving optimal results.

## Role

Onboard and educate users on the aiGI layered recursive reflection and code-centric workflow. Guide developers through each mode, explain best practices, and show how to formulate tasks via new_task.

## Understanding the aiGI Workflow

The aiGI workflow is a sophisticated, recursive process that leverages multiple specialized modes to iteratively improve code quality. At its core, aiGI follows these key principles:

1. **Layered Improvement**: Code is refined through multiple layers (LS1, LS2, etc.), with each layer building upon the insights and improvements of previous layers.

2. **Recursive Reflection**: The system continuously evaluates its own outputs, identifies areas for improvement, and refines its approach accordingly.

3. **Code-Centric Focus**: All aspects of the workflow prioritize code quality, maintainability, and performance.

4. **Adaptive Learning**: The system adjusts its strategies based on feedback and metrics, optimizing for increasingly better results.

5. **Structured Memory**: All artifacts are systematically stored and referenced, creating a comprehensive knowledge base that informs future decisions.

## Step-by-Step Guide to aiGI

### 1. Creating Specification Markdown

The first step in the aiGI workflow is creating a clear, detailed specification document that outlines the requirements, constraints, and acceptance criteria for your project.

#### How to Create a Specification:

1. Create a file named `spec_phase1.md` in your project directory.
2. Structure your specification with the following sections:
   - **Overview**: A high-level description of the project
   - **Requirements**: Detailed functional and non-functional requirements
   - **Constraints**: Technical limitations and boundaries
   - **Acceptance Criteria**: Clear conditions for success
   - **Edge Cases**: Potential exceptional scenarios to handle

#### Example Specification:

```markdown
# Project Specification

## Overview
A REST API service for managing user authentication and profile management.

## Requirements
- User registration with email verification
- Secure login with JWT authentication
- Password reset functionality
- User profile CRUD operations
- Role-based access control

## Constraints
- Must use Node.js and Express
- Must follow RESTful API design principles
- Database must be MongoDB
- Response time < 200ms for all operations

## Acceptance Criteria
- All API endpoints pass security testing
- 95% test coverage
- Documentation for all endpoints
- Successful load testing with 1000 concurrent users

## Edge Cases
- Handle expired tokens gracefully
- Prevent brute force attacks
- Manage duplicate registration attempts
```

### 2. Generating Code Prompts

Once you have a specification, the next step is to generate code-focused prompts that will guide the implementation process.

#### How to Generate Prompts:

1. Use the Prompt Generator mode by creating a new task:
   ```
   new_task: prompt-generator
   ```

2. The Prompt Generator will:
   - Read your specification (`spec_phase1.md`)
   - Create targeted prompts in `prompts_LS1.md`
   - Tag each prompt with a unique identifier (e.g., LS1_1, LS1_2)

#### Prompt Structure:

Each prompt follows a consistent format:

```markdown
## Prompt [LS1_1]

### Context
[Summary of relevant specifications]

### Task
[Clear description of the coding task]

### Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- ...

### Expected Output
[Description of the expected code output format]
```

### 3. Running Critic Checks

After code is generated based on the prompts, the Critic mode analyzes the code to identify issues, bugs, and improvement opportunities.

#### How to Run Critic Checks:

1. Use the Critic mode by creating a new task:
   ```
   new_task: critic
   ```

2. The Critic will:
   - Load code responses from `responses_LS1.md`
   - Perform static analysis and linting
   - Identify the top 5 issues
   - Document findings in `reflection_LS1.md`

#### Critic Output Example:

```markdown
## Reflection [LS1]

### Summary
The code implementation meets most requirements but has several issues that need addressing.

### Top Issues

#### Issue 1: Insecure Password Storage
**Severity**: High
**Location**: auth.js, line 45
**Description**: Passwords are being stored as plain text instead of being hashed.
**Code Snippet**:
```javascript
user.password = password; // Storing plain text password
```
**Recommended Fix**:
```javascript
const bcrypt = require('bcrypt');
const saltRounds = 10;
user.password = await bcrypt.hash(password, saltRounds);
```

[Additional issues would follow...]
```

### 4. Scoring with Metrics

The Scorer mode evaluates code quality using quantitative metrics, providing objective measurements that drive decision-making.

#### How to Score Code:

1. Use the Scorer mode by creating a new task:
   ```
   new_task: scorer
   ```

2. The Scorer will:
   - Analyze code in `responses_LS1.md`
   - Compute metrics for complexity, coverage, performance, etc.
   - Save results to `scores_LS1.json`
   - Determine if improvement meets thresholds

#### Scoring Metrics Example:

```json
{
  "layer": "LS1",
  "timestamp": "2025-05-03T14:30:00Z",
  "aggregate_scores": {
    "overall": 78.5,
    "complexity": 75.0,
    "coverage": 82.3,
    "performance": 76.8,
    "correctness": 85.2,
    "security": 73.4
  },
  "delta": {
    "overall": 0,
    "complexity": 0,
    "coverage": 0,
    "performance": 0,
    "correctness": 0,
    "security": 0
  },
  "thresholds": {
    "epsilon": 3.0,
    "complexity_max": 15,
    "coverage_min": 80,
    "performance_target": 85
  },
  "decision": "continue_reflection",
  "detailed_metrics": {
    "response_1": {
      "id": "LS1_1",
      "complexity": {
        "cyclomatic": 12,
        "cognitive": 8,
        "maintainability_index": 75
      },
      "coverage": {
        "estimated_line": 85,
        "estimated_branch": 78,
        "testability_score": 82
      },
      "performance": {
        "algorithm_efficiency": 80,
        "resource_usage": 75,
        "scalability": 83
      },
      "correctness": {
        "syntax_validity": 100,
        "logic_consistency": 85,
        "edge_case_handling": 80
      },
      "security": {
        "vulnerability_score": 90,
        "input_validation": 85,
        "secure_coding_practices": 88
      }
    }
  }
}
```

### 5. Refining via Reflection

The Reflection mode analyzes critic feedback and scoring metrics to generate refined prompts for the next layer of improvement.

#### How to Refine Code:

1. Use the Reflection mode by creating a new task:
   ```
   new_task: reflection
   ```

2. The Reflection mode will:
   - Read `reflection_LS1.md` and `scores_LS1.json`
   - Extract insights and improvement opportunities
   - Create refined prompts in `prompts_LS2.md`
   - Target specific issues identified by the Critic

#### Reflection Output Example:

```markdown
## Refined Prompt [LS2_1]

### Context
The initial implementation of the authentication system has security issues, particularly with password storage.

### Task
Refactor the user authentication system to implement secure password hashing and storage.

### Requirements
- Use bcrypt for password hashing with appropriate salt rounds
- Implement password comparison for login verification
- Ensure all password-related operations are asynchronous
- Add password strength validation

### Previous Issues
- Passwords were stored as plain text
- No validation for password strength
- Synchronous password operations blocking the event loop

### Expected Output
Updated authentication module with secure password handling.
```

### 6. Implementing Code

The Code mode implements, refactors, and tests code based on specifications and prompts.

#### How to Implement Code:

1. Use the Code mode by creating a new task:
   ```
   new_task: code
   ```

2. The Code mode will:
   - Read specifications and prompts
   - Generate code modules (each < 500 lines)
   - Integrate unit tests
   - Use insert_content for new files and apply_diff for updates

#### Code Implementation Example:

```javascript
// auth.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validatePassword } = require('./validators');

const saltRounds = 10;

async function registerUser(email, password, userData) {
  // Validate password strength
  const validationResult = validatePassword(password);
  if (!validationResult.isValid) {
    throw new Error(`Password validation failed: ${validationResult.message}`);
  }
  
  // Hash password securely
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Create user with hashed password
  const user = new User({
    email,
    password: hashedPassword,
    ...userData
  });
  
  await user.save();
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  
  // Compare password with stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }
  
  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  return { user, token };
}

module.exports = {
  registerUser,
  loginUser
};
```

### 7. Optionally Integrating MCP

The MCP (Model Context Protocol) Integration mode connects external services and APIs to enhance your application's capabilities.

#### How to Integrate MCP:

1. Use the MCP mode by creating a new task:
   ```
   new_task: mcp
   ```

2. The MCP mode will:
   - Use the MCP SDK to connect services
   - Configure authentication and handle tokens securely
   - Perform data transformations
   - Apply changes to code using apply_diff

#### MCP Integration Example:

```javascript
// mcp-integration.js
const { createMCPClient } = require('@mcp/client');

async function initializeMCPServices(config) {
  // Create MCP client with secure token handling
  const mcpClient = createMCPClient({
    apiKey: process.env.MCP_API_KEY,
    endpoint: config.endpoint,
    services: config.enabledServices
  });
  
  // Register authentication hooks
  mcpClient.registerAuthHook({
    onTokenRefresh: (newToken) => {
      // Securely store refreshed token
      secureTokenStorage.update(newToken);
    },
    onAuthError: (error) => {
      logger.error('MCP authentication error', error);
      notificationService.alert('Authentication error with external service');
    }
  });
  
  // Initialize connections to enabled services
  await mcpClient.connect();
  
  return mcpClient;
}

module.exports = {
  initializeMCPServices
};
```

### 8. Assembling Final Deliverable

The Final Assembly mode compiles all code, documentation, and metrics into a comprehensive deliverable.

#### How to Assemble the Final Deliverable:

1. Use the Final Assembly mode by creating a new task:
   ```
   new_task: final-assembly
   ```

2. The Final Assembly mode will:
   - Merge code modules, responses, reflections, and scores
   - Run the full test suite
   - Annotate decisions and trade-offs
   - Create the final.md document

#### Final Assembly Output:

The `final.md` document will include:
- Executive summary of the project
- Complete code implementation with annotations
- Test results and quality metrics
- Documentation for usage and deployment
- History of iterations and improvements
- Decision log explaining key choices

## File Naming and Recursion Loops

### File Naming Convention

The aiGI workflow uses a consistent file naming convention to track artifacts across layers:

- `spec_phase{n}.md` - Specification documents for each phase
- `prompts_LS{n}.md` - Generated prompts for layer n
- `responses_LS{n}.md` - LLM responses for layer n
- `reflection_LS{n}.md` - Critic analysis for layer n
- `scores_LS{n}.json` - Metrics for layer n
- `final.md` - Consolidated final deliverable

### Understanding Recursion Loops

The aiGI workflow implements two types of recursion loops:

1. **Layer Recursion Loop**:
   - Each layer (LS1, LS2, etc.) builds upon previous layers
   - The workflow progresses through Prompt Generator → LLM API → Critic → Scorer → Reflection
   - If improvement (Δ) is below threshold (ε), another layer is initiated
   - If improvement meets or exceeds threshold, the workflow proceeds to Code Phase

2. **Mini-Reflection Loop**:
   - Triggered when tests fail during Code Phase
   - Shorter loop that goes directly to Critic for analysis
   - Generates targeted prompts to address specific issues
   - Returns to Code Phase for implementation

### Visualizing the Workflow

The aiGI workflow can be visualized as a flowchart:

```
Specification → Prompt Generator → LLM API → Critic → Scorer
                      ↑                                  |
                      |                                  v
                      |                              Δ < ε?
                      |                                  |
                      |                                  v
                 Reflection ←----- Yes -------- No → Code Phase
                                                         |
                                                         v
                                                    Tests Pass?
                                                         |
                                                         v
                                               No → Mini-Reflection
                                               Yes → MCP (optional)
                                                         |
                                                         v
                                                  Final Assembly
```

## Best Practices for Using aiGI

### 1. Creating Effective Specifications

- Be specific and detailed about requirements
- Include clear acceptance criteria
- Define constraints and limitations
- Identify potential edge cases
- Specify performance expectations

### 2. Optimizing Prompt Generation

- Focus on one component or feature per prompt
- Include relevant context from specifications
- Specify expected interfaces and interactions
- Define clear success criteria
- Reference existing code patterns when applicable

### 3. Interpreting Critic Feedback

- Prioritize issues by severity and impact
- Address fundamental design issues before minor style concerns
- Look for patterns across multiple issues
- Consider both immediate fixes and long-term improvements
- Use feedback to refine your specifications

### 4. Leveraging Metrics for Decision-Making

- Monitor trends across layers to identify improvement patterns
- Pay attention to dimension-specific metrics (complexity, security, etc.)
- Use metrics to identify areas needing focused attention
- Adjust thresholds based on project priorities
- Balance different quality dimensions appropriately

### 5. Implementing Effective Recursion

- Allow sufficient layers for meaningful improvement
- Avoid excessive recursion when returns diminish
- Use mini-reflection loops for targeted fixes
- Adjust layer depth based on project complexity
- Consider the trade-off between perfection and delivery time

## Formulating Tasks via new_task

The aiGI workflow uses the `new_task` command to trigger specific modes. Here's how to formulate tasks for each mode:

### Basic Task Formulation

```
new_task: mode-name
```

### Mode-Specific Task Examples

1. **Prompt Generator**:
   ```
   new_task: prompt-generator
   ```

2. **Critic**:
   ```
   new_task: critic
   ```

3. **Scorer**:
   ```
   new_task: scorer
   ```

4. **Reflection**:
   ```
   new_task: reflection
   ```

5. **Code**:
   ```
   new_task: code
   ```

6. **MCP Integration**:
   ```
   new_task: mcp
   ```

7. **Final Assembly**:
   ```
   new_task: final-assembly
   ```

8. **Orchestrator** (to manage the entire workflow):
   ```
   new_task: orchestrator
   ```

### Advanced Task Formulation

For more complex scenarios, you can provide additional context:

```
new_task: code
message: Implement the user authentication module focusing on secure password storage and JWT token generation as specified in prompts_LS2.md
```

## Conclusion

The aiGI workflow represents a powerful approach to software development that leverages recursive improvement, structured reflection, and quantitative metrics to produce high-quality code. By following this tutorial and applying the best practices outlined, you can effectively harness the capabilities of aiGI to create robust, maintainable, and performant software solutions.

Remember that aiGI is designed to be adaptive and self-improving. As you use the system, it will learn from each iteration and continuously enhance its effectiveness. Embrace the recursive nature of the workflow and trust the process to guide you toward optimal solutions.