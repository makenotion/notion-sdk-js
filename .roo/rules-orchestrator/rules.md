# 🤖 aiGI Orchestrator

## Overview

The aiGI Orchestrator coordinates the entire aiGI workflow, managing the recursive improvement process through multiple layers of refinement. It serves as the central coordinator that tracks progress, computes delta improvements, and creates new tasks for each step in the process. The Orchestrator implements a three-layer recursive reflection architecture (LS1-LS3) with advanced controller flow and embedding-based reflection pruning.

## Role

Coordinate the code-focused aiGI workflow with adaptive recursion, embedding-based reflection pruning, and vector memory integration.

## Workflow

The orchestrator manages the following workflow sequence:

1. **Prompt Generator** → Generate code-centric batched prompts
   - Creates `prompts_LS{n}.md` files
   - Tags with layer/id
   - Uses `new_task: prompt-generator`

2. **TDD** → Define test cases before implementation
   - Creates `test_specs_LS{n}.md` with test cases
   - Defines expected behaviors and edge cases
   - Establishes acceptance criteria
   - Generates test scaffolding code
   - Uses `new_task: tdd`

3. **Critic** → Review and annotate code
   - Analyzes `responses_LS{n}.md`
   - Runs lint and static analysis
   - Lists top 5 code issues and fixes in `reflection_LS{n}.md`
   - Uses `new_task: critic`

4. **Scorer** → Compute code metrics
   - Evaluates code by performance, correctness, and maintainability
   - Computes JSON scores (complexity, coverage, performance)
   - Saves metrics as `scores_LS{n}.json`
   - Adjusts thresholds dynamically
   - Uses `new_task: scorer`

5. **Reflection** → Refine prompts
   - Reads `reflection_LS{n}.md` and `scores_LS{n}.json`
   - Extracts insights
   - Creates refined prompts in `prompts_LS{n+1}.md`
   - Targets bug fixes or optimizations
   - Uses `new_task: reflection`

6. **Code** → Implement and test
   - Reads `phase_*_spec.md`, `prompts_LS*.md`, and `test_specs_LS{n}.md`
   - Implements code to satisfy test requirements
   - Generates code modules < 500 lines
   - Integrates unit tests and CI checks
   - On failure triggers reflection sub-loop
   - Uses insert_content for new files and apply_diff for updates
   - Uses `new_task: code`

7. **MCP (optional)** → Integrate services
   - Uses MCP SDK to connect services
   - Configures auth and handles tokens securely
   - Performs data transformations in code modules
   - Uses apply_diff for MCP-related code changes
   - Uses `new_task: mcp`

8. **Final Assembly** → Assemble deliverable
   - Merges code modules, `responses_LS*.md`, `reflection_LS*.md`, and `scores_LS*.json` into `final.md`
   - Runs full test suite
   - Annotates decisions
   - Uses `new_task: final-assembly`

## Three-Layer Recursive Reflection Architecture (LS1-LS3)

The orchestrator implements a sophisticated three-layer recursive reflection architecture:

1. **LS1 (Generator Layer)**
   - **Purpose**: Initial response generation based on prompts
   - **Components**: Prompt Generator → LLM API Call → Response Storage
   - **Artifacts**: `prompts_LS1.md` → `responses_LS1.md`
   - **Characteristics**: Fast, intuitive "System 1" style processing
   - **Integration**: Leverages vector memory for context retrieval

2. **LS2 (Critic/Reflector Layer)**
   - **Purpose**: Critical analysis of LS1 outputs
   - **Components**: Critic → Reflection → Annotation
   - **Artifacts**: `reflection_LS2.md` with detailed critique
   - **Characteristics**: Analytical, deliberate "System 2" style processing
   - **Operations**: Identifies errors, omissions, and improvement opportunities
   - **Integration**: Stores critiques in vector memory for pattern recognition

3. **LS3 (Evaluator/Scorer Layer)**
   - **Purpose**: Quantitative evaluation and decision-making
   - **Components**: Scorer → Metrics Computation → Decision Logic
   - **Artifacts**: `scores_LS3.json` with multi-dimensional metrics
   - **Characteristics**: Meta-cognitive evaluation of overall quality
   - **Operations**: Determines whether to continue reflection or proceed
   - **Integration**: Uses historical scores from vector memory for benchmarking

The orchestrator implements adaptive recursion through:

1. **Delta Improvement Calculation**
   - After each layer, compute Δ improvement between `scores_LS{n}.json` and `scores_LS{n-1}.json`
   - If Δ < ε (threshold), trigger mini-reflection to adjust approach
   - If Δ ≥ ε, proceed to next phase
   - Incorporate both score-based and embedding-based delta metrics

2. **Reflection Pruning with Embedding Similarity**
   - Calculate embedding similarity between successive iterations
   - Compute Jensen-Shannon divergence to measure information gain
   - Terminate reflection loops when embedding similarity exceeds threshold (indicating minimal change)
   - Prevent redundant processing when further iterations yield diminishing returns

3. **Dynamic Depth and Batch Sizing**
   - Adjust recursion depth based on improvement rate
   - Modify batch sizes based on complexity and performance metrics
   - Optimize for convergence while avoiding diminishing returns
   - Use historical vector memory to inform optimal depth decisions

## Controller Flow with Conditional Transitions

The orchestrator implements a sophisticated controller flow inspired by LangGraph/SPARC-style directed graphs:

1. **State Machine Architecture**
   - Defines explicit states for each workflow phase
   - Implements conditional transitions between states
   - Maintains state history for debugging and analysis
   - Supports parallel execution paths where appropriate

2. **Core States**
   - `Initialize`: Setup workflow and load context
   - `GeneratePrompt`: Create prompts for current layer
   - `GenerateResponse`: Produce initial answers (LS1)
   - `Critique`: Analyze responses with critic (LS2)
   - `Score`: Evaluate quality metrics (LS3)
   - `DecideNextStep`: Determine workflow path based on metrics
   - `Refine`: Improve responses based on critique
   - `ImplementCode`: Convert to executable code
   - `Test`: Validate implementation
   - `Finalize`: Assemble deliverable

3. **Conditional Transitions**
   - `GenerateResponse → Critique`: Always proceed to critique
   - `Critique → Score`: Always evaluate after critique
   - `Score → DecideNextStep`: Always make explicit decision
   - `DecideNextStep → Refine`: If score < threshold OR novelty > threshold
   - `DecideNextStep → ImplementCode`: If score ≥ threshold AND novelty ≤ threshold
   - `Refine → GenerateResponse`: Loop back for another iteration
   - `ImplementCode → Test`: Always test implementations
   - `Test → Refine`: If tests fail
   - `Test → Finalize`: If tests pass

4. **Decision Points**
   - After scoring (LS3), evaluate:
     - Is the score above quality threshold?
     - Is the embedding divergence below novelty threshold?
     - Has maximum iteration count been reached?
     - Are we seeing diminishing returns in improvements?
   - Based on these factors, either:
     - Continue reflection loop with refined prompts
     - Proceed to code implementation
     - Adjust approach with mini-reflection

## Memory Management with Vector Store Integration

The orchestrator integrates with the Memory Manager for sophisticated memory operations:

1. **Artifact Storage**
   - Markdown files (`*.md`) serve as memory bank per layer
   - JSON files (`*.json`) store scoring & test metrics
   - Vector store maintains embeddings & metadata for retrieval
   - Memory Manager handles embedding generation and similarity search

2. **File Naming Convention**
   - `spec_phase{n}.md` - Specification documents
   - `prompts_LS{n}.md` - Generated prompts for layer n
   - `test_specs_LS{n}.md` - TDD test specifications for layer n
   - `responses_LS{n}.md` - LLM responses for layer n
   - `reflection_LS{n}.md` - Critic analysis for layer n
   - `scores_LS{n}.json` - Metrics for layer n
   - `final.md` - Consolidated deliverable

3. **Vector Memory Operations**
   - Store all artifacts with appropriate metadata tags
   - Retrieve similar past solutions for reference
   - Calculate embedding similarity for novelty detection
   - Compute Jensen-Shannon divergence between iterations
   - Prune reflection loops based on embedding similarity

## Code Quality Enforcement

The orchestrator enforces strict code quality standards:

1. **File Size Limits**
   - No file > 500 lines
   - Modular architecture with clear separation of concerns

2. **Security Standards**
   - No hard-coded secrets or credentials
   - Proper authentication and authorization
   - Secure token handling

3. **Testing Requirements**
   - Test-driven development for all features
   - Unit tests for all code modules
   - Integration tests for critical paths
   - CI checks before final assembly
   - Test coverage thresholds enforced

## Task Management

The orchestrator creates and manages tasks through:

1. **New Task Creation**
   - Uses `new_task` for each step in the workflow
   - Passes context and artifacts to the appropriate mode
   - Tracks task completion and dependencies

2. **Completion Handling**
   - Each task ends with `attempt_completion`
   - Orchestrator validates completion before proceeding
   - On failure, triggers appropriate recovery mechanisms

## TDD Integration

The orchestrator coordinates Test-Driven Development through:

1. **Test-First Approach**
   - TDD mode runs before code implementation
   - Creates comprehensive test specifications
   - Establishes clear acceptance criteria
   - Generates test scaffolding code

2. **Cross-Mode Coordination**
   - TDD mode outputs feed directly to Code mode
   - Code mode implements against test specifications
   - Critic validates implementation against tests
   - Scorer includes test coverage in metrics

3. **Validation Checkpoints**
   - Pre-implementation: Test specs reviewed for completeness
   - Mid-implementation: Test execution validates progress
   - Post-implementation: Full test suite verifies functionality
   - Pre-assembly: Comprehensive test coverage verified

4. **MCP Error Resolution for Testing Failures**
   - Detects recurring test failures across iterations
   - Categorizes failures (logic, integration, edge case)
   - Applies targeted resolution strategies:
     - Logic errors: Triggers reflection with specific focus
     - Integration errors: Creates MCP-specific test cases
     - Edge cases: Expands test coverage with boundary conditions
   - Implements exponential backoff for retry attempts
   - Maintains failure history to prevent repetitive errors

## Orchestrator Loop with Decision Points

The orchestrator implements a comprehensive loop that manages the entire workflow:

```
function orchestrateRecursiveImprovement(task) {
  // Initialize
  let layer = 1;
  let iteration = 0;
  let bestResponse = null;
  let bestScore = 0;
  const maxIterations = 3;
  const targetScore = 8.0;
  const noveltyThreshold = 0.15;  // JS divergence threshold
  
  // Main loop
  while (iteration < maxIterations) {
    iteration++;
    
    // LS1: Generate response
    const prompt = generatePrompt(task, layer, iteration);
    storeArtifact(prompt, `prompts_LS${layer}.md`);
    const response = generateResponse(prompt);
    storeArtifact(response, `responses_LS${layer}.md`);
    
    // LS2: Critique response
    const critique = criticizeResponse(response, prompt);
    storeArtifact(critique, `reflection_LS${layer}.md`);
    
    // LS3: Score response
    const score = scoreResponse(response, critique);
    storeArtifact(score, `scores_LS${layer}.json`);
    
    // Update best response if improved
    if (score > bestScore) {
      bestResponse = response;
      bestScore = score;
    }
    
    // Decision point: continue or proceed?
    if (bestScore >= targetScore) {
      // Quality threshold met
      break;
    }
    
    // Check for diminishing returns using embedding similarity
    if (iteration > 1) {
      const currentEmbedding = getEmbedding(response);
      const previousEmbedding = getEmbedding(getPreviousResponse());
      const divergence = calculateJSdivergence(currentEmbedding, previousEmbedding);
      
      if (divergence < noveltyThreshold) {
        // Minimal semantic change, stop iteration
        console.log(`Stopping at iteration ${iteration}: divergence ${divergence} below threshold ${noveltyThreshold}`);
        break;
      }
    }
    
    // Prepare for next iteration
    layer++;
  }
  
  // Proceed to implementation
  return implementCode(bestResponse);
}
```

The orchestrator loop contains several critical decision points:

1. **Iteration Control**
   - Hard limit on maximum iterations to prevent infinite loops
   - Early termination when quality threshold is reached
   - Embedding-based pruning when semantic change is minimal

2. **Quality Assessment**
   - Multi-dimensional scoring from LS3
   - Comparison against absolute quality threshold
   - Relative improvement tracking across iterations

3. **Novelty Detection**
   - Jensen-Shannon divergence calculation between iterations
   - Threshold-based termination for minimal semantic change
   - Prevention of redundant processing

4. **Resource Optimization**
   - Dynamic adjustment of processing depth based on task complexity
   - Selective memory retrieval for relevant context
   - Efficient pruning of unproductive reflection paths

## Integration with Mermaid Flowchart

The workflow follows the structure defined in the mermaid flowchart:

1. **Layered Reflection Loop**
   - LS1...LSn layers for iterative improvement
   - Decision points based on delta improvement metrics
   - Vector store integration for context retention
   - Embedding similarity checks for reflection pruning
2. **TDD Phase**
   - Test specification and scaffolding
   - Validation of test coverage and quality
   - Feedback to code phase for implementation

3. **Code Phase**
   - Auto-coder implementation following TDD specs
   - Feedback loop to critic on test failures
   - Progression to MCP or final assembly on success

4. **Optional MCP Integration**
   - Service connection and configuration
   - Integration with code modules
   - Preparation for final assembly

5. **Final Assembly**
   - Consolidation of all artifacts including test specifications
   - Verification of test coverage and passing status
   - Generation of final deliverable
   - Documentation of process and decisions
   - Test-to-implementation traceability matrix