# aiGI: Artificial Intelligence Guided Implementation

## Introduction

aiGI (Artificial Intelligence Guided Implementation) is a sophisticated system that implements a layered recursive reflection workflow with a code-centric approach to software development. It leverages specialized AI modes working in concert to iteratively improve code quality through structured feedback loops and quantitative metrics.

The system follows these key principles:

1. **Layered Improvement**: Code is refined through multiple layers (LS1, LS2, etc.), with each layer building upon the insights and improvements of previous layers.
2. **Recursive Reflection**: The system continuously evaluates its own outputs, identifies areas for improvement, and refines its approach accordingly.
3. **Code-Centric Focus**: All aspects of the workflow prioritize code quality, maintainability, and performance.
4. **Adaptive Learning**: The system adjusts its strategies based on feedback and metrics, optimizing for increasingly better results.
5. **Structured Memory**: All artifacts are systematically stored and referenced, creating a comprehensive knowledge base that informs future decisions.

## System Architecture

The aiGI system architecture is built around a workflow of specialized modes that work together to implement the recursive improvement process:

```mermaid
flowchart TD
  %% Entry point
  UR([User Task Request])

  %% Memory Manager integration
  subgraph MemorySystem["🧠 Vector Memory System"]
    VectorStore((Vector Store))
    JSdiv["Jensen-Shannon Divergence"]
    EmbedSim["Embedding Similarity"]
    MetadataIndex["Metadata Index"]
    
    VectorStore <--> JSdiv
    VectorStore <--> EmbedSim
    VectorStore <--> MetadataIndex
  end

  %% Specification phase
  UR --> SpecTask["new_task: spec-pseudocode"]
  SpecTask --> SpecMD[/"spec_phase1.md"/]
  SpecMD -.-> VectorStore

  %% Layered reflection loop (LS1…LSn)
  SpecMD --> PromptTask1["new_task: prompt-generator"]
  PromptTask1 --> Prompts1[/"prompts_LS1.md"/]
  Prompts1 --> LLM1["LLM API Call"]
  LLM1 --> Resp1[/"responses_LS1.md"/]
  Resp1 -.-> VectorStore
  Resp1 --> CriticTask1["new_task: critic"]
  CriticTask1 --> Refl1[/"reflection_LS1.md"/]
  Refl1 -.-> VectorStore
  Refl1 --> ScorerTask1["new_task: scorer"]
  ScorerTask1 --> Scores1[["scores_LS1.json"]]
  Scores1 -.-> VectorStore
  Scores1 --> TDDTask1["new_task: tdd"]
  TDDTask1 --> TDDSpec1[/"tdd_spec_LS1.md"/]
  TDDSpec1 -.-> VectorStore
  
  %% Enhanced decision point with embedding similarity
  TDDSpec1 --> MemoryTask1["new_task: memory-manager"]
  MemoryTask1 --> EmbedSim
  EmbedSim --> Decision1{Δ<ε OR Sim>τ?}
  Decision1 -->|No| PromptTask2["new_task: reflection"]
  Decision1 -->|Yes| CodePhase

  %% Next layer with memory integration
  PromptTask2 --> Prompts2[/"prompts_LS2.md"/]
  Prompts2 --> LLM2["LLM API Call"]
  LLM2 --> Resp2[/"responses_LS2.md"/]
  Resp2 -.-> VectorStore
  Resp2 --> CriticTask2["new_task: critic"]
  CriticTask2 --> Refl2[/"reflection_LS2.md"/]
  Refl2 -.-> VectorStore
  Refl2 --> ScorerTask2["new_task: scorer"]
  ScorerTask2 --> Scores2[["scores_LS2.json"]]
  Scores2 -.-> VectorStore
  Scores2 --> TDDTask2["new_task: tdd"]
  TDDTask2 --> TDDSpec2[/"tdd_spec_LS2.md"/]
  TDDSpec2 -.-> VectorStore
  
  %% Enhanced decision point with JS divergence
  TDDSpec2 --> MemoryTask2["new_task: memory-manager"]
  MemoryTask2 --> JSdiv
  JSdiv --> Decision2{Δ<ε OR JSD<δ?}
  Decision2 -->|No| PromptTask3["new_task: reflection"]
  Decision2 -->|Yes| CodePhase

  %% Code implementation phase
  subgraph CodePhase["🧠 Auto-Coder & Testing"]
    CodePhase --> CodeTask["new_task: code"]
    CodeTask --> TDDImpl["new_task: tdd"]
    TDDImpl --> CodeFiles[/"*.ts & tests"/]
    CodeFiles -.-> VectorStore
    CodeFiles --> TestTask["new_task: test"]
    TestTask --> TestResults[["test_results.json"]]
    TestResults -->|fail| ErrorCount{Failures > 3?}
    ErrorCount -->|Yes| MCPToolFix["MCP Tool Error Resolution"]
    ErrorCount -->|No| TDDImpl
    MCPToolFix --> TDDImpl
    TestResults -->|pass| TDDVerify["TDD Verification"]
    TDDVerify --> MCPOpt
  end

  %% Optional MCP integration
  subgraph MCPOpt["♾️ MCP Integration (optional)"]
    MCPOpt --> MCPTask["new_task: mcp"]
    MCPTask --> MCPCode[/"mcp_integration.ts"/]
    MCPCode -.-> VectorStore
    MCPCode --> TDDValidate["TDD Final Validation"]
    TDDValidate --> FinalPhase
  end
  TestResults -->|pass| MCPOpt

  %% Final assembly
  subgraph FinalPhase["🏁 Final Assembly"]
    FinalPhase --> FinalTask["new_task: final-assembly"]
    FinalTask --> FinalMD[/"final.md"/]
    FinalMD -.-> VectorStore
    FinalMD --> Output([Final Deliverable])
  end
```

The workflow consists of:

1. **Specification Phase**: Creating detailed requirements and constraints
2. **Layered Reflection Loop**: Iterative improvement through prompt generation, code critique, scoring, and TDD specification
3. **Code Implementation Phase**: Implementing and testing code based on refined prompts with TDD validation
4. **MCP Integration (Optional)**: Connecting external services and APIs with TDD verification
5. **Final Assembly**: Compiling all artifacts into a comprehensive deliverable after final TDD validation

## Mode Directory

The aiGI system is composed of several specialized modes, each with a specific role in the workflow:
| Mode | Description | Documentation |
|------|-------------|---------------|
| **Orchestrator** | Coordinates the entire aiGI workflow, managing the recursive improvement process through multiple layers of refinement | [orchestrator.md](./orchestrator/orchestrator.md) |
| **Memory Manager** | Manages vector memory storage, similarity search, and novelty detection for the aiGI workflow | [memory-manager.md](./memory-manager/memory-manager.md) |
| **Prompt Generator** | Creates code-centric batched prompts for aiGI layers using specifications and previous outputs | [prompt-generator.md](./prompt-generator/prompt-generator.md) |
| **Critic** | Reviews code outputs to identify bugs, style issues, and optimization opportunities | [critic.md](./critic/critic.md) |
| **Scorer** | Evaluates code batches by performance, correctness, and maintainability using quantitative metrics | [scorer.md](./scorer/scorer.md) |
| **Reflection** | Generates refined code prompts and plans iterations based on previous outputs and metrics | [reflection.md](./reflection/reflection.md) |
| **Code** | Implements, refactors, and self-tests modular code based on specifications and prompts | [code.md](./code/code.md) |
| **TDD** | Implements test-driven development practices, ensuring code meets requirements through automated testing | [tdd.md](./tdd/tdd.md) |
| **MCP Integration** | Connects external services via the Model Context Protocol for code deployment and management | [mcp.md](./mcp/mcp.md) |
| **Final-Assembly** | Compiles code, documentation, and metrics into the final deliverable after validation | [final-assembly.md](./final-assembly/final-assembly.md) |
| **Tutorial** | Onboards and educates users on the aiGI workflow and best practices | [tutorial.md](./tutorial/tutorial.md) |

## File Structure

The aiGI system uses a consistent file naming convention to track artifacts across layers:

| File Pattern | Description |
|--------------|-------------|
| `spec_phase{n}.md` | Specification documents for each phase |
| `prompts_LS{n}.md` | Generated prompts for layer n |
| `responses_LS{n}.md` | LLM responses for layer n |
| `reflection_LS{n}.md` | Critic analysis for layer n |
| `scores_LS{n}.json` | Metrics for layer n |
| `tdd_spec_LS{n}.md` | TDD specifications for layer n |
| `tdd_tests_LS{n}.ts` | TDD test implementations for layer n |
| `final.md` | Consolidated final deliverable |

The "LS" prefix stands for "Layer Score" and is followed by a number indicating the iteration (LS1, LS2, etc.). Each layer builds upon the insights and improvements of previous layers, creating a recursive improvement process.

## Getting Started

To start using the aiGI system:

1. **Create a Specification**: Begin by creating a detailed specification document (`spec_phase1.md`) that outlines requirements, constraints, and acceptance criteria.

2. **Initiate the Workflow**: Use the orchestrator mode to start the aiGI workflow:
   ```
   new_task: orchestrator
   ```

3. **Follow the Recursive Process**: The system will guide you through the layered improvement process, generating prompts, analyzing code, computing metrics, and implementing solutions.

4. **Review and Refine**: Monitor the progress through each layer, reviewing the generated artifacts and adjusting specifications as needed.

5. **Finalize the Deliverable**: Once the code meets quality thresholds, the system will assemble the final deliverable with complete documentation.

For a more detailed guide on using the aiGI system, refer to the [tutorial mode](./tutorial/tutorial.md), which provides comprehensive instructions, examples, and best practices.

## Advanced Usage

The aiGI system supports advanced features such as:

- **Delta Improvement Calculation**: Automatically computes improvement between layers to determine when to proceed to code implementation
- **Dynamic Depth and Batch Sizing**: Adjusts recursion depth and batch sizes based on complexity and performance metrics
- **Vector Store Integration**: Maintains embeddings and metadata for efficient retrieval of relevant context
- **MCP Integration**: Optional connection to external services and APIs through the Model Context Protocol
- **Test-Driven Development**: Implements TDD practices throughout the workflow with automated test generation and validation
- **MCP Tool Error Resolution**: Automatically resolves errors in MCP tool usage after multiple failures

Refer to the specific mode documentation for detailed information on these advanced features.

## Vector Memory and Embedding Divergence

The aiGI system incorporates sophisticated vector memory capabilities through the Memory Manager mode:

### Vector Memory Storage

The system uses a markdown-based vector memory approach:

1. **Embedding Generation**
   - All artifacts (prompts, responses, reflections) are converted to vector embeddings
   - Embeddings capture semantic meaning and code structure
   - Consistent embedding dimensions maintained across all artifacts
   - Incremental embedding updates when files change

2. **Metadata Tagging**
   - Each memory artifact is tagged with rich metadata:
     - `layer`: Identifies which reflection layer (LS1, LS2, LS3, etc.)
     - `prompt_id`: Unique identifier linking related artifacts
     - `score`: Numerical evaluation from the Scorer mode
     - `timestamp`: Creation and modification timestamps
     - `artifact_type`: Classification (prompt, response, reflection, etc.)

3. **Similarity Search**
   - Vector-based retrieval using cosine similarity
   - Context-aware search within or across layers
   - Hybrid retrieval combining vector and metadata filtering
   - Efficient indexing for fast retrieval

### Embedding Divergence for Reflection Pruning

The system uses embedding divergence to optimize the reflection process:

1. **Jensen-Shannon Divergence**
   - Measures information gain between iterations
   - Quantifies semantic distance between related artifacts
   - Provides mathematical foundation for novelty detection
   - Enables data-driven decisions about reflection continuation

2. **Novelty Detection**
   - `noveltyScore`: Numerical measure of information novelty (0-1)
   - `redundancyDetection`: Identification of duplicate information
   - `innovationRate`: Change in novelty across iterations
   - `saturationPoint`: Detection of diminishing returns

3. **Reflection Pruning**
   - Terminates reflection loops when novelty falls below threshold
   - Prevents redundant processing of similar content
   - Optimizes computational resources
   - Balances quality improvement with efficiency

4. **Decision Metrics**
   - Combined score-based and embedding-based decision criteria
   - Threshold parameters (ε for scores, τ for similarity, δ for divergence)
   - Adaptive thresholds based on task complexity
   - Historical performance tracking for continuous improvement

The vector memory system enables the aiGI workflow to become increasingly efficient over time, learning from past iterations and avoiding redundant work. The embedding divergence calculations provide a mathematical foundation for determining when further reflection would yield diminishing returns, allowing the system to focus computational resources on the most productive paths.