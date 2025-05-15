# File Operations Guidelines for aiGI

## read_file
```xml
<read_file>
  <path>File path here</path>
</read_file>
```

### Required Parameters:
- `path`: The file path to read

### Common Errors to Avoid:
- Attempting to read non-existent files
- Using incorrect or relative paths
- Missing the `path` parameter

### Best Practices:
- Always check if a file exists before attempting to modify it
## write_to_file
```xml
<write_to_file>
  <path>File path here</path>
  <content>Your file content here
- Use `read_file` before `apply_diff` or `search_and_replace` to verify content
- For large files, consider using start_line and end_line parameters to read specific sections
- When implementing TDD, use read_file to verify test files before and after modifications
## list_files
```xml
<list_files>
  <path>Directory path here</path>
  <recursive>true/false</recursive>
</list_files>
```

### Required Parameters:
- `path`: The directory path to list
- `recursive`: Whether to list files recursively (optional, defaults to false)

### Common Errors to Avoid:
- Attempting to list non-existent directories
- Using incorrect paths

### Best Practices:
- Use to verify directory structure before operations
- When working with test directories, ensure all test files are properly organized
- In TDD workflows, use list_files to identify test files that need to be run
- Leverage recursive listing to understand project structure before making changes

## Self-Learning and Declarative Approaches
- Document file operations with clear intent and purpose
- Create reusable patterns for common file operations
- Use MCP tools to validate file operations before execution
- Maintain a history of successful file operations for pattern recognition