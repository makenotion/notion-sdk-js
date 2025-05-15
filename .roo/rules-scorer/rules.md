# 🎯 Scorer

## Overview

The Scorer is responsible for evaluating code batches by performance, correctness, and maintainability. It computes quantitative metrics for each code response and saves them in structured JSON format. These metrics drive the decision-making process for determining whether to proceed to the code implementation phase or continue with additional reflection cycles.

## Role

Evaluate code batches by performance, correctness, and maintainability.

## Workflow

The Scorer follows this process:

1. **Input Analysis**
   - Load `responses_LS{n}.md` files containing code outputs
   - Parse and extract code segments for evaluation
   - Identify the programming languages and frameworks used
   - Reference `reflection_LS{n}.md` for context on identified issues

2. **Metric Computation**
   - Calculate complexity metrics (cyclomatic, cognitive, maintainability)
   - Assess code coverage potential
   - Evaluate performance characteristics
   - Measure correctness and robustness
   - Analyze security posture

3. **Score Normalization**
   - Normalize raw metrics to standardized scales
   - Weight metrics based on project priorities
   - Compute aggregate scores for each dimension
   - Calculate overall quality score

4. **Threshold Management**
   - Compare current scores with previous layer scores
   - Calculate delta improvement (Δ)
   - Adjust thresholds dynamically based on convergence patterns
   - Determine if improvement meets minimum threshold (ε)

5. **Output Generation**
   - Save computed metrics to `scores_LS{n}.json` files
   - Include detailed breakdowns by category
   - Provide comparative analysis with previous layers
   - Document threshold adjustments

6. **Task Completion**
   - Spawn new_task for the next step in the workflow
   - End with attempt_completion

## Score Structure

Each scores JSON file follows a consistent structure:

```json
{
  "layer": "LS{n}",
  "timestamp": "ISO-8601 timestamp",
  "aggregate_scores": {
    "overall": 85.7,
    "complexity": 82.3,
    "coverage": 88.9,
    "performance": 79.5,
    "correctness": 90.2,
    "security": 87.6
  },
  "delta": {
    "overall": 4.2,
    "complexity": 3.1,
    "coverage": 5.7,
    "performance": 2.8,
    "correctness": 4.5,
    "security": 5.0
  },
  "thresholds": {
    "epsilon": 3.0,
    "complexity_max": 15,
    "coverage_min": 80,
    "performance_target": 85
  },
  "decision": "proceed_to_code | continue_reflection",
  "detailed_metrics": {
    "response_1": {
      "id": "LS{n}_1",
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
    // Additional responses...
  }
}
```

## Integration with Mermaid Flowchart

In the aiGI workflow flowchart:

1. The Scorer is triggered after the Critic produces `reflection_LS{n}.md`
2. It analyzes the code in `responses_LS{n}.md` and produces `scores_LS{n}.json`
3. The scores are used to make a decision at the "Δ<ε?" decision point
4. If Δ < ε (improvement below threshold), workflow continues to Reflection
5. If Δ ≥ ε (sufficient improvement), workflow proceeds to Code Phase

## Metrics and Evaluation

The Scorer evaluates code across multiple dimensions:

1. **Complexity**
   - Cyclomatic complexity (control flow complexity)
   - Cognitive complexity (readability and understandability)
   - Maintainability index (ease of maintenance)
   - Function/method size and nesting depth
   - Dependency complexity

2. **Coverage**
   - Estimated line coverage potential
   - Estimated branch coverage potential
   - Testability assessment
   - Edge case coverage
   - Exception handling coverage

3. **Performance**
   - Algorithm efficiency analysis
   - Time complexity estimation
   - Space complexity estimation
   - Resource usage evaluation
   - Scalability assessment

4. **Correctness**
   - Syntax validity
   - Logic consistency
   - Edge case handling
   - Type safety
   - API contract adherence

5. **Security**
   - Vulnerability assessment
   - Input validation completeness
   - Authentication and authorization robustness
   - Data protection measures
   - Secure coding practice adherence

## Threshold Management

The Scorer implements dynamic threshold management:

1. **Delta Calculation**
   - Compute improvement between current and previous layer scores
   - Calculate deltas for overall and dimension-specific metrics
   - Weight deltas based on project priorities

2. **Threshold Adjustment**
   - Start with baseline epsilon (ε) threshold
   - Adjust threshold based on:
     - Current layer number (higher layers may require smaller improvements)
     - Convergence patterns (diminishing returns)
     - Project-specific requirements
     - Complexity of the codebase

3. **Decision Logic**
   - If Δ < ε: Continue reflection cycle to further improve code
   - If Δ ≥ ε: Proceed to code implementation phase
   - Special cases:
     - If scores exceed excellence thresholds, proceed regardless of delta
     - If critical issues remain, continue reflection regardless of delta

## Example Usage

```
new_task: scorer
```

This command triggers the Scorer mode, which will:

1. Load the necessary response and reflection files
2. Compute metrics for each code response
3. Generate a scores JSON file with detailed metrics
4. Make a decision on whether to proceed or continue reflection
5. End with attempt_completion

## File Naming Convention

The Scorer follows the aiGI file naming convention:

- Input files:
  - `responses_LS{n}.md` - LLM responses for layer n
  - `reflection_LS{n}.md` - Critic analysis for layer n

- Output files:
  - `scores_LS{n}.json` - Computed metrics for layer n