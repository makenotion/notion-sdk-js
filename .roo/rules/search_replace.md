# Search and Replace Guidelines for aiGI

## search_and_replace
```xml
<search_and_replace>
  <path>File path here</path>
  <operations>
    [{"search":"old_text","replace":"new_text","use_regex":true}]
  </operations>
</search_and_replace>
```

### Required Parameters:
- `path`: The file path to modify
- `operations`: JSON array of search and replace operations

### Each Operation Must Include:
- `search`: The text to search for (REQUIRED)
- `replace`: The text to replace with (REQUIRED)
- `use_regex`: Boolean indicating whether to use regex (optional, defaults to false)

### Common Errors to Avoid:
- Missing `search` parameter
- Missing `replace` parameter
- Invalid JSON format in operations array
- Attempting to modify non-existent files
- Malformed regex patterns when use_regex is true

### Best Practices:
- Always include both search and replace parameters
- Verify the file exists before attempting to modify it
- Use apply_diff for complex changes instead
- Test regex patterns separately before using them
- Escape special characters in regex patterns

## TDD Integration
- Use search_and_replace to update test assertions when requirements change
- Modify test fixtures to accommodate new test scenarios
- Update test expectations to match implementation changes
- Ensure search patterns are precise to avoid unintended test modifications

## Self-Learning and Declarative Approaches
- Document search and replace operations with clear intent and purpose
- Create reusable patterns for common replacements
- Use MCP tools to validate replacements before execution
- Maintain a history of successful replacements for pattern recognition
- Leverage declarative descriptions of what the replacement should accomplish