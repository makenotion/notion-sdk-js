# Tool Usage Guidelines Index for aiGI

To prevent common errors when using tools, refer to these detailed guidelines:

## File Operations
- [File Operations Guidelines](agGI/.roo/rules/file_operations_guidelines.md) - Guidelines for read_file, write_to_file, and list_files

## Code Editing
- [Apply Diff Guidelines](agGI/.roo/rules/apply_diff_guidelines.md) - Guidelines for apply_diff
- [Search and Replace Guidelines](agGI/.roo/rules/search_replace.md) - Guidelines for search_and_replace
- [Insert Content Guidelines](agGI/.roo/rules/insert_content.md) - Guidelines for insert_content

## Testing
- [TDD Guidelines](agGI/.roo/rules/tdd_guidelines.md) - Guidelines for test-driven development

## Common Error Prevention
- [Apply Diff Error Prevention](agGI/.roo/rules/apply_diff_guidelines.md) - Specific guidelines to prevent errors with apply_diff

## Key Points to Remember:
1. Always include all required parameters for each tool
2. Verify file existence before attempting modifications
3. For apply_diff, never include literal diff markers in code examples
4. For search_and_replace, always include both search and replace parameters
5. For write_to_file, always include the line_count parameter
6. For insert_content, always include valid line and content parameters
7. Follow TDD principles by writing tests before implementation
8. Use MCP tools to validate operations before execution

## Test-Driven Development Integration
1. Write tests before implementation code
2. Use tools to incrementally update code to pass tests
3. Maintain comprehensive test coverage
4. Leverage MCP for test enhancement and error resolution