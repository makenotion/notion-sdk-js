# 💬 Prompt Generator

## Overview

The Prompt Generator is responsible for creating code-centric batched prompts for aiGI layers. It analyzes specifications and previous outputs to craft targeted prompts that drive the recursive improvement process. These prompts are tagged with appropriate layer identifiers and stored in structured markdown files for use by subsequent steps in the workflow.

## Role

Generate code-centric batched prompts for aiGI layers using spec and previous outputs.

## Workflow

The Prompt Generator follows this process:

1. **Input Analysis**
   - Read `spec_*.md` files to understand project requirements
   - Read `reflection_LS{n}.md` files to identify issues and improvement areas
   - Read `responses_LS{n}.md` files to analyze previous code outputs
   - Retrieve relevant code memory from vector store

2. **Prompt Crafting**
   - Create code-focused prompts targeting specific improvements
   - Organize prompts into batches for efficient processing
   - Ensure prompts address issues identified in reflection documents
   - Incorporate code patterns and best practices from memory

3. **Output Generation**
   - Save prompts to `prompts_LS{n+1}.md` files
   - Tag each prompt with appropriate layer/id for tracking
   - Structure prompts for optimal LLM response quality

4. **Task Completion**
   - Spawn new_task for the next step in the workflow
   - End with attempt_completion

## Prompt Structure

Each prompt follows a consistent structure:

```markdown
## Prompt [LS{n+1}_{id}]

### Context
[Summary of relevant specifications and previous outputs]

### Task
[Clear description of the coding task to be performed]

### Requirements
- [Specific requirement 1]
- [Specific requirement 2]
- ...

### Previous Issues
[Issues identified in reflection documents that should be addressed]

### Expected Output
[Description of the expected code output format]
```

## Integration with Mermaid Flowchart

In the aiGI workflow flowchart:

1. The Prompt Generator is triggered after the specification phase or after a reflection cycle
2. It receives input from `spec_phase{n}.md` or from `reflection_LS{n}.md` and `scores_LS{n}.json`
3. It produces `prompts_LS{n+1}.md` which feeds into the LLM API call
4. The output of the LLM API call is saved as `responses_LS{n+1}.md` and passed to the Critic

## Code Focus

The Prompt Generator maintains a strong code focus by:

1. **Language-Specific Guidance**
   - Including language-specific best practices in prompts
   - Referencing appropriate design patterns and architecture principles
   - Specifying code style and formatting requirements

2. **Implementation Details**
   - Providing clear specifications for function signatures and interfaces
   - Defining expected behavior and edge cases
   - Outlining testing requirements and validation criteria

3. **Quality Standards**
   - Emphasizing code quality metrics (complexity, maintainability, performance)
   - Specifying security requirements and potential vulnerabilities to avoid
   - Setting expectations for documentation and comments

## Layer Management

The Prompt Generator manages the layered improvement process by:

1. **Layer Progression**
   - Incrementing layer numbers (LS{n} → LS{n+1}) to track progress
   - Adjusting prompt complexity based on layer depth
   - Focusing on different aspects of code quality at different layers

2. **Tagging System**
   - Assigning unique identifiers to each prompt (LS{n+1}_{id})
   - Maintaining traceability between prompts and responses
   - Enabling targeted improvements in subsequent layers

## Memory Utilization

The Prompt Generator leverages the aiGI memory system by:

1. **Vector Store Retrieval**
   - Querying the vector store for relevant code examples and patterns
   - Retrieving historical context from previous layers
   - Incorporating successful approaches from similar tasks

2. **Context Preservation**
   - Maintaining continuity between layers by referencing previous work
   - Preserving important constraints and requirements across iterations
   - Building upon successful elements from previous responses

## Example Usage

```
new_task: prompt-generator
```

This command triggers the Prompt Generator mode, which will:

1. Read the necessary input files
2. Generate code-focused prompts
3. Save the prompts to the appropriate markdown file
4. End with attempt_completion

## File Naming Convention

The Prompt Generator follows the aiGI file naming convention:

- Input files:
  - `spec_phase{n}.md` - Specification documents
  - `reflection_LS{n}.md` - Critic analysis for layer n
  - `responses_LS{n}.md` - LLM responses for layer n
  - `scores_LS{n}.json` - Metrics for layer n

- Output files:
  - `prompts_LS{n+1}.md` - Generated prompts for the next layer