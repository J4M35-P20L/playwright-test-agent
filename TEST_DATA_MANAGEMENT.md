# Test Data Management

This project now uses a centralized data management system for all test data to ensure consistency and easier maintenance.

## Data Structure

All test data is stored in `src/data/testData.json` and accessed through `src/utils/testDataLoader.ts`.

### Test Data Categories

1. **Users**: Login credentials for different user types
2. **URLs**: Environment URLs (local, dev, staging, prod, edge)
3. **Companies**: Available companies in the system
4. **Facilities**: Test facilities with names and locations
5. **Units**: Test unit identifiers
6. **Messages**: Predefined test messages and notes
7. **Timeouts**: Standardized timeout values
8. **Selectors**: UI element identifiers and labels

## Usage in Tests

Import the testDataLoader at the top of your test file:

```typescript
import { testDataLoader } from '../src/utils/testDataLoader';
```

### Common Usage Examples

```typescript
// Navigate to environments
await page.goto(testDataLoader.getLocalUrl());
await page.goto(testDataLoader.getEdgeUrl());

// Use credentials
const user = testDataLoader.getWalkthroughUser();
await page.fill('input[name="username"]', user.username);
await page.fill('input[name="password"]', user.password);

// Select companies and facilities
await page.click(`button:has-text("${testDataLoader.getPrimaryCompany()}")`);
await page.click(`button:has-text("${testDataLoader.getPrimaryFacility().fullName}")`);

// Use units and messages
await page.fill('input[name="search"]', testDataLoader.getTestingUnit());
await page.fill('textarea', testDataLoader.getTestNote());

// Use standardized timeouts
await page.waitForSelector('selector', { timeout: testDataLoader.getTimeout('elementWait') });

// Use selectors for UI elements
await page.click(`button:has-text("${testDataLoader.getSelector('buttons', 'addNote')}")`);
```

## Data Maintenance

### Adding New Data

1. **New URLs**: Add to `urls` section in testData.json
2. **New Companies/Facilities**: Add to respective sections
3. **New Selectors**: Add to `selectors` section by category
4. **New Messages**: Add to `messages` section

### Modifying Existing Data

1. Update the value in `testData.json`
2. The change will automatically apply to all tests using that data

### Best Practices

1. **Use descriptive keys**: Make data keys self-explanatory
2. **Group related data**: Keep similar data types together
3. **Use helper methods**: Create convenience methods in testDataLoader for common operations
4. **Document changes**: Update this README when adding new data categories

## Available Helper Methods

- `getLocalUrl()`: Get local environment URL
- `getEdgeUrl()`: Get Edge portal URL
- `getWalkthroughUser()`: Get walkthrough user credentials
- `getPrimaryCompany()`: Get primary test company
- `getPrimaryFacility()`: Get primary test facility
- `getTestingUnit()`: Get test unit identifier
- `getTestNote()`: Get default test note message

## Environment-Specific Data

The system supports multiple environments:
- **local**: Local development environment
- **dev**: Development environment
- **staging**: Staging environment
- **prod**: Production environment
- **edge**: Edge portal environment

Switch between environments by updating the URL methods or passing environment parameters.

## Benefits

1. **Single Source of Truth**: All test data in one location
2. **Easy Maintenance**: Change once, update everywhere
3. **Type Safety**: TypeScript interfaces ensure data consistency
4. **Environment Management**: Easy switching between environments
5. **Reusability**: Common data can be reused across all tests
6. **Consistency**: Ensures all tests use the same data values