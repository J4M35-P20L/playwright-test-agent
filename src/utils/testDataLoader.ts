import * as testData from '../data/testData.json';

export interface User {
  username: string;
  password: string;
}

export interface Facility {
  name: string;
  fullName: string;
  location: string;
}

export interface TestData {
  users: {
    walkthrough: User;
    default: User;
  };
  urls: {
    local: string;
    dev: string;
    staging: string;
    prod: string;
    edge: string;
  };
  companies: {
    primary: string;
    secondary: string;
  };
  facilities: {
    primary: Facility;
    secondary: Facility;
  };
  units: {
    primary: string;
    testing: string;
    sample: string;
  };
  messages: {
    testNote: string;
    playwrightTest: string;
    defaultNote: string;
  };
  timeouts: {
    pageLoad: number;
    elementWait: number;
    login: number;
    sso: number;
  };
  selectors: {
    buttons: {
      [key: string]: string;
    };
    links: {
      [key: string]: string;
    };
    textboxes: {
      [key: string]: string;
    };
  };
}

class TestDataLoader {
  private data: TestData;

  constructor() {
    this.data = testData as TestData;
  }

  // User data access methods
  getUser(type: keyof TestData['users'] = 'walkthrough'): User {
    return this.data.users[type];
  }

  // URL access methods
  getUrl(environment: keyof TestData['urls'] = 'local'): string {
    return this.data.urls[environment];
  }

  // Company access methods
  getCompany(type: keyof TestData['companies'] = 'primary'): string {
    return this.data.companies[type];
  }

  // Facility access methods
  getFacility(type: keyof TestData['facilities'] = 'primary'): Facility {
    return this.data.facilities[type];
  }

  // Unit access methods
  getUnit(type: keyof TestData['units'] = 'primary'): string {
    return this.data.units[type];
  }

  // Message access methods
  getMessage(type: keyof TestData['messages'] = 'defaultNote'): string {
    return this.data.messages[type];
  }

  // Timeout access methods
  getTimeout(type: keyof TestData['timeouts']): number {
    return this.data.timeouts[type];
  }

  // Selector access methods
  getSelector(category: keyof TestData['selectors'], key: string): string {
    return this.data.selectors[category][key];
  }

  // Convenience methods for common operations
  getLocalUrl(): string {
    return this.getUrl('local');
  }

  getEdgeUrl(): string {
    return this.getUrl('edge');
  }

  getWalkthroughUser(): User {
    return this.getUser('walkthrough');
  }

  getPrimaryCompany(): string {
    return this.getCompany('primary');
  }

  getPrimaryFacility(): Facility {
    return this.getFacility('primary');
  }

  getTestingUnit(): string {
    return this.getUnit('testing');
  }

  getTestNote(): string {
    return this.getMessage('testNote');
  }

  // Get all data (for debugging)
  getAllData(): TestData {
    return this.data;
  }
}

// Export a singleton instance
export const testDataLoader = new TestDataLoader();
export default testDataLoader;