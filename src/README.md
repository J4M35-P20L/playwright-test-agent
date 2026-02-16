# Source (src) Directory

This directory contains all the source code for the test automation framework.

## Structure

```
src/
├── pages/          # Page Object Model classes
├── steps/          # Cucumber step definitions
├── support/        # Support files (hooks, world)
└── data/           # Test data and data management utilities
```

## Folder Descriptions

### pages/
Contains Page Object Model (POM) classes that encapsulate page interactions and selectors. Each page object represents a page or component of the application under test.

### steps/
Contains Cucumber step definitions that map Gherkin steps from feature files to actual test code. Step definitions use page objects to interact with the application.

### support/
Contains support files including:
- Custom World implementation for sharing context
- Hooks for test setup and teardown
- Common utilities and helpers

### data/
Contains test data files and data management utilities:
- JSON files with test data
- Data manager classes for accessing test data
- Data generators if needed

## Best Practices

1. **Keep page objects focused**: Each page object should represent a single page or component
2. **Use descriptive method names**: Methods should clearly describe the action they perform
3. **Separate concerns**: Keep step definitions thin by delegating to page objects
4. **Centralize test data**: Store test data in the data folder for easy maintenance
5. **Follow naming conventions**: Use clear, consistent naming across all files
