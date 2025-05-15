# Insert Content Guidelines for aiGI

## insert_content
```xml
<insert_content>
  <path>File path here</path>
  <line>Line number</line>
  <content>New code</content>
</insert_content>
```

### Required Parameters:
- `path`: The file path to modify
- `line`: The line number where content should be inserted
- `content`: The content to insert

### Common Errors to Avoid:
- Missing `line` parameter
- Missing `content` parameter
- Using non-numeric values for line
- Attempting to insert at line numbers beyond file length
- Attempting to modify non-existent files

### Best Practices:
- Always verify the file exists before attempting to modify it
- Check file length before specifying line
- Use read_file first to confirm file content and structure
- Use for adding new content rather than modifying existing content
- Prefer for documentation additions and new code blocks

## TDD Integration
- Use insert_content to add test cases incrementally
- Insert test assertions that validate specific behaviors
- Add test setup and teardown code at appropriate locations
- Insert documentation that explains test coverage and intent

## Self-Learning and Declarative Approaches
- Document inserted content with clear intent and purpose
- Create reusable patterns for common insertions
- Use MCP tools to validate insertions before execution
- Maintain a history of successful insertions for pattern recognition
- Leverage declarative descriptions of what the inserted code should accomplish