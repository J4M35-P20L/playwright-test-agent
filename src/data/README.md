# Test Data

This folder contains test data files and utilities for managing test data.

## Files

- **testData.json**: Contains test users, URLs, and other test data
- **Note**: testDataManager.ts has been removed - use testDataLoader.ts from src/utils/ instead

## Usage

```typescript
import { testDataLoader } from '../../utils/testDataLoader';

// Access test data using the centralized loader
const user = testDataLoader.getWalkthroughUser();
const url = testDataLoader.getLocalUrl();
const facility = testDataLoader.getPrimaryFacility();
```

## Adding New Test Data

1. Add your data to `testData.json`
2. Update interfaces in `testDataLoader.ts` (located in src/utils/) if needed
3. Add convenience methods to `testDataLoader.ts` for easy access
4. Import and use in your test files
