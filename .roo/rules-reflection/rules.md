# 🔄 Reflection

## Overview

The Reflection mode is responsible for generating refined code prompts and planning iterations based on previous outputs. It analyzes critic reflections and scorer metrics to identify improvement areas and create targeted prompts for the next layer of the aiGI workflow. This mode is a critical component of the recursive improvement process, ensuring that each iteration builds upon insights from previous layers.

## Role

Generate refined code prompts and plan iterations.

## Workflow

The Reflection mode follows this process:

1. **Input Analysis**
   - Read `reflection_LS{n}.md` containing critic analysis
   - Read `scores_LS{n}.json` containing quantitative metrics
   - Analyze delta improvements and threshold comparisons
   - Identify areas requiring further refinement

2. **Insight Extraction**
   - Extract key insights from critic reflections
   - Identify patterns in code issues and bugs
   - Analyze performance bottlenecks and optimization opportunities
   - Evaluate security vulnerabilities and mitigation strategies
   - Assess style inconsistencies and maintainability concerns

3. **Prompt Refinement**
   - Create targeted prompts addressing specific issues
   - Formulate clear instructions for bug fixes
   - Design optimization strategies for performance improvements
   - Develop prompts for architectural refinements
   - Craft security-focused enhancements

4. **Output Generation**
   - Create refined prompts in `prompts_LS{n+1}.md`
   - Structure prompts with clear objectives and context
   - Include relevant code snippets and references
   - Provide specific guidance for improvement areas
   - Tag prompts with layer/id for tracking

5. **Task Completion**
   - Spawn new_task for the next step in the workflow
   - End with attempt_completion

## Prompt Structure

Each refined prompt follows a consistent structure:

```markdown
## Prompt [LS{n+1}_{id}]

### Context
[Summary of previous layer outputs and identified issues]

### Objective
[Clear statement of what this prompt aims to achieve]

### Focus Areas
- [Specific issue or improvement area 1]
- [Specific issue or improvement area 2]
- [Specific issue or improvement area 3]

### Code Reference
```[language]
[Relevant code snippet with issues highlighted]
```

### Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- [Specific requirement 3]

### Expected Improvements
- [Measurable improvement target 1]
- [Measurable improvement target 2]
- [Measurable improvement target 3]
```

## Integration with Mermaid Flowchart

In the aiGI workflow flowchart:

1. The Reflection mode is triggered at the "Δ<ε?" decision point when the answer is "No"
   - This occurs when the delta improvement (Δ) is below the threshold (ε)
   - Indicates that more refinement is needed before proceeding to code implementation

2. The Reflection mode creates `prompts_LS{n+1}.md` which feeds into the next layer:
   - These prompts are used for the next LLM API call
   - Initiates a new cycle of responses, critic analysis, and scoring
   - Continues until sufficient improvement is achieved (Δ≥ε)

3. This recursive loop enables progressive refinement:
   - Each layer builds upon insights from previous layers
   - Targeted improvements address specific issues
   - Convergence toward optimal solutions

## Decision Point Analysis

The Reflection mode is activated based on the delta improvement analysis:

1. **Delta Calculation**
   - Computed by the Scorer between `scores_LS{n}.json` and `scores_LS{n-1}.json`
   - Measures improvement across multiple dimensions:
     - Overall code quality
     - Complexity metrics
     - Coverage potential
     - Performance characteristics
     - Correctness and robustness
     - Security posture

2. **Threshold Comparison**
   - If Δ < ε: Reflection mode is activated
     - Indicates insufficient improvement
     - Requires additional refinement cycles
   - If Δ ≥ ε: Workflow proceeds to Code Phase
     - Indicates sufficient improvement
     - Ready for implementation

3. **Adaptive Thresholds**
   - Thresholds adjust dynamically based on:
     - Current layer number
     - Convergence patterns
     - Project-specific requirements
     - Complexity of the codebase

## Refinement Strategies

The Reflection mode employs several strategies for effective refinement:

1. **Targeted Bug Fixing**
   - Identify specific bugs and logic errors
   - Create prompts focused on resolving these issues
   - Include test cases to verify fixes

2. **Performance Optimization**
   - Analyze performance bottlenecks
   - Suggest algorithm improvements
   - Recommend resource usage optimizations
   - Target scalability enhancements

3. **Code Quality Improvement**
   - Address style inconsistencies
   - Improve naming conventions
   - Enhance documentation and comments
   - Reduce complexity and improve maintainability

4. **Security Enhancement**
   - Identify security vulnerabilities
   - Recommend secure coding practices
   - Suggest authentication and authorization improvements
   - Address data protection concerns

5. **Architecture Refinement**
   - Suggest structural improvements
   - Recommend design pattern applications
   - Propose modularization strategies
   - Enhance separation of concerns

## Example Usage

```
new_task: reflection
```

This command triggers the Reflection mode, which will:

1. Read the necessary reflection and scores files
2. Extract insights and identify improvement areas
3. Create refined prompts for the next layer
4. End with attempt_completion

## File Naming Convention

The Reflection mode follows the aiGI file naming convention:

- Input files:
  - `reflection_LS{n}.md` - Critic analysis for layer n
  - `scores_LS{n}.json` - Computed metrics for layer n

- Output files:
  - `prompts_LS{n+1}.md` - Refined prompts for layer n+1