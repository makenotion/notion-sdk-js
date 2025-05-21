# 🧠 aiGI Memory Manager

## Overview

The Memory Manager is responsible for maintaining the vector memory system that powers aiGI's recursive reflection architecture. It provides persistent storage, retrieval, and analysis of code artifacts, prompts, responses, and metrics across multiple layers of the workflow.

## Role

Manage vector memory storage, similarity search, and novelty detection for the aiGI workflow.

## Core Capabilities

### Vector Memory Storage

The Memory Manager implements a sophisticated vector memory system using markdown files as the primary storage medium:

1. **Markdown-Based Vector Store**
   - Each artifact (prompts, responses, reflections) is stored as a markdown file
   - Files are embedded into vector representations for similarity search
   - Embeddings are stored alongside the original markdown content
   - Directory structure maintains organization by layer and artifact type

2. **Embedding Generation**
   - Text content is converted to high-dimensional vector embeddings
   - Embeddings capture semantic meaning and code structure
   - Consistent embedding dimensions maintained across all artifacts
   - Incremental embedding updates when files change

3. **Storage Optimization**
   - Efficient storage of large embedding matrices
   - Compression techniques for vector data
   - Pruning of redundant or low-value embeddings
   - Automatic garbage collection for obsolete artifacts

### Memory Tagging with Metadata

Each memory artifact is tagged with rich metadata to enable precise filtering and retrieval:

1. **Core Metadata Fields**
   - `layer`: Identifies which reflection layer (LS1, LS2, LS3, etc.) the artifact belongs to
   - `prompt_id`: Unique identifier linking related artifacts across the workflow
   - `score`: Numerical evaluation from the Scorer mode (0-10 scale)
   - `timestamp`: Creation and modification timestamps
   - `artifact_type`: Classification (prompt, response, reflection, code, test, etc.)

2. **Extended Metadata**
   - `dependencies`: References to other artifacts this one depends on
   - `version`: Iteration counter for tracking changes
   - `author`: Origin of the artifact (which mode created it)
   - `status`: Current state in the workflow (draft, reviewed, approved, etc.)
   - `tags`: Custom labels for domain-specific categorization

3. **Metadata Schema Enforcement**
   - Validation of required metadata fields
   - Type checking for field values
   - Consistency checks across related artifacts
   - Schema versioning for backward compatibility

### Similarity Search Functionality

The Memory Manager provides powerful similarity search capabilities:

1. **Vector-Based Retrieval**
   - Nearest neighbor search using cosine similarity
   - Configurable similarity thresholds
   - Top-K retrieval with relevance scoring
   - Hybrid retrieval combining vector and metadata filtering

2. **Context-Aware Search**
   - Layer-specific search (within LS1, LS2, etc.)
   - Cross-layer search for tracking evolution
   - Prompt-specific search to follow artifact lineage
   - Score-filtered search (e.g., only high-quality artifacts)

3. **Search Optimization**
   - Indexing for fast retrieval
   - Caching of frequent queries
   - Approximate nearest neighbor algorithms for large collections
   - Progressive loading for large result sets

4. **Search API**
   - `findSimilar(content, options)`: Find artifacts similar to provided content
   - `searchByMetadata(filters)`: Retrieve artifacts matching metadata criteria
   - `getArtifactHistory(prompt_id)`: Trace evolution of artifacts across layers
   - `getRelatedArtifacts(artifact_id)`: Find artifacts connected to a specific item

### Jensen-Shannon Divergence for Novelty Detection

The Memory Manager implements advanced novelty detection using Jensen-Shannon divergence:

1. **Divergence Calculation**
   - Compute JS divergence between probability distributions
   - Compare embeddings of current and previous artifacts
   - Measure information gain between iterations
   - Quantify semantic distance between related artifacts

2. **Novelty Metrics**
   - `noveltyScore`: Numerical measure of information novelty (0-1)
   - `redundancyDetection`: Identification of duplicate information
   - `innovationRate`: Change in novelty across iterations
   - `saturationPoint`: Detection of diminishing returns

3. **Reflection Pruning**
   - Terminate reflection loops when novelty falls below threshold
   - Identify when further iterations yield minimal improvement
   - Prevent redundant processing of similar content
   - Optimize computational resources by avoiding unnecessary iterations

4. **Divergence API**
   - `calculateDivergence(artifact1, artifact2)`: Compute JS divergence between artifacts
   - `detectNovelty(newArtifact, referenceSet)`: Evaluate novelty against existing artifacts
   - `shouldContinueReflection(currentLayer)`: Decision function for reflection loop
   - `getInnovationTrend(prompt_id)`: Analyze novelty changes across iterations

## Integration with Orchestrator

The Memory Manager works closely with the Orchestrator to enable data-driven workflow decisions:

1. **Reflection Loop Control**
   - Provide divergence metrics to determine when to stop reflection
   - Signal when further iterations would yield diminishing returns
   - Recommend layer transitions based on novelty thresholds
   - Track improvement rates across layers

2. **Memory-Augmented Generation**
   - Supply relevant context from previous layers
   - Retrieve similar past solutions for reference
   - Provide historical performance data to guide improvements
   - Maintain continuity across workflow steps

3. **Delta Calculation Support**
   - Compute semantic change between iterations
   - Supplement score-based delta with content-based metrics
   - Provide multi-dimensional improvement analysis
   - Detect stagnation in specific aspects of solutions

## Implementation Guidelines

The Memory Manager follows these implementation principles:

1. **File-Based Architecture**
   - Use markdown files as primary storage
   - Maintain consistent directory structure
   - Follow aiGI naming conventions
   - Ensure compatibility with version control systems

2. **Metadata Management**
   - Store metadata in YAML frontmatter within markdown files
   - Maintain separate index files for efficient lookup
   - Implement validation for metadata integrity
   - Support querying by any metadata field

3. **Embedding Strategy**
   - Use consistent embedding models across artifacts
   - Segment long documents for more precise embeddings
   - Store embeddings efficiently to minimize storage requirements
   - Update embeddings incrementally when content changes

4. **Performance Considerations**
   - Optimize for fast similarity search
   - Implement caching for frequent operations
   - Use batch processing for embedding generation
   - Scale efficiently with growing artifact collections

## Usage Examples

### Storing a New Artifact

```markdown
# Example: Storing a new response artifact

1. Create markdown file with content and metadata
   - File: responses_LS2.md
   - Metadata: layer=LS2, prompt_id=task123, score=7.8

2. Generate embedding for content
   - Convert markdown to vector representation
   - Store embedding alongside content

3. Update indices for fast retrieval
   - Add to layer-specific index
   - Update prompt-specific lineage
```

### Similarity Search

```markdown
# Example: Finding similar previous solutions

1. Take current code problem as query
   - Extract key concepts and structure
   - Generate embedding for query

2. Search vector store for similar artifacts
   - Filter by relevant metadata (e.g., high scores)
   - Compute similarity scores
   - Return top 3 matches with context

3. Provide results to current layer
   - Include relevant code snippets
   - Show performance metrics of similar solutions
   - Highlight successful approaches
```

### Novelty Detection

```markdown
# Example: Determining when to stop reflection

1. Compare current and previous layer artifacts
   - Calculate JS divergence between embeddings
   - Compute novelty score

2. Evaluate against thresholds
   - If novelty < 0.15, signal diminishing returns
   - If 3 consecutive iterations show declining novelty, recommend stopping

3. Provide recommendation to Orchestrator
   - Include novelty metrics
   - Suggest whether to continue or proceed to next phase
```

## API Reference

The Memory Manager exposes these core functions:

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `storeArtifact()` | Store a new artifact with metadata | `content, metadata, type` | `artifact_id` |
| `retrieveArtifact()` | Get artifact by ID | `artifact_id` | `{content, metadata, embedding}` |
| `findSimilar()` | Find similar artifacts | `query, filters, limit` | `[{artifact_id, similarity, content}]` |
| `calculateDivergence()` | Compute JS divergence | `artifact1_id, artifact2_id` | `{divergence, novelty_score}` |
| `shouldContinueReflection()` | Determine if reflection should continue | `current_layer, prompt_id` | `{continue: boolean, reason}` |
| `getArtifactHistory()` | Retrieve evolution of artifacts | `prompt_id, type` | `[{layer, artifact_id, score}]` |
| `pruneRedundantMemories()` | Remove low-value artifacts | `threshold, age` | `{removed_count, space_saved}` |

## Memory Manager Workflow

The Memory Manager operates throughout the aiGI workflow:

1. **Initialization**
   - Set up directory structure
   - Initialize embedding models
   - Prepare indices and metadata schema

2. **During Prompt Generation**
   - Store generated prompts with metadata
   - Find similar previous prompts for reference
   - Track prompt lineage across layers

3. **During Response Processing**
   - Store responses with links to prompts
   - Calculate similarity to previous responses
   - Detect novelty compared to earlier iterations

4. **During Reflection**
   - Store critique and reflection notes
   - Compute divergence between iterations
   - Provide novelty metrics to guide further reflection

5. **During Scoring**
   - Associate scores with artifacts
   - Update metadata with performance metrics
   - Track score evolution across layers

6. **During Orchestration**
   - Support delta calculation with semantic metrics
   - Provide recommendations for workflow transitions
   - Signal when reflection loops should terminate

7. **During Final Assembly**
   - Retrieve all relevant artifacts by prompt_id
   - Provide evolution history for documentation
   - Generate memory usage statistics and insights