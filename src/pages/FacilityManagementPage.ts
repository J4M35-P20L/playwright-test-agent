import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { CompanySelectionPage } from './CompanySelectionPage';
import { FacilitySelectionPage } from './FacilitySelectionPage';
import { UnitsListPage } from './UnitsListPage';
import { UnitDetailsDialog } from './UnitDetailsDialog';
import { AddNoteDialog } from './AddNoteDialog';


/**
 * Main Facility Management Page Object
 * Combines all page objects for the facility management workflow
 */
export class FacilityManagementPage extends BasePage {
  // Page Objects
  public readonly companySelection: CompanySelectionPage;
  public readonly facilitySelection: FacilitySelectionPage;
  public readonly unitsList: UnitsListPage;
  public readonly unitDetails: UnitDetailsDialog;
  public readonly addNote: AddNoteDialog;

  constructor(page: Page) {
    super(page);
    this.companySelection = new CompanySelectionPage(page);
    this.facilitySelection = new FacilitySelectionPage(page);
    this.unitsList = new UnitsListPage(page);
    this.unitDetails = new UnitDetailsDialog(page);
    this.addNote = new AddNoteDialog(page);
  }

  /**
   * Complete full facility setup workflow
   */
  async setupFacility(url: string, companyName: string = 'storEDGE Demo', facilityName: string = 'CK Self Storage'): Promise<void> {
    await this.navigate(url);
    await this.waitForCompletePageLoad();
    await this.companySelection.selectCompany(companyName);
    await this.facilitySelection.selectFacilityAndLoadUnits(facilityName);
    await this.unitsList.verifyPageElements(facilityName);
  }

  /**
   * Complete add note workflow for a specific unit
   */
  async addNoteToUnit(unitName: string, noteText: string): Promise<void> {
    // Select unit and verify details
    await this.unitsList.selectUnitByName(unitName);
    await this.unitDetails.verifyAndCloseDialog();
    
    // Add note
    await this.unitsList.clickAddNoteButton();
    await this.addNote.addNote(noteText);
    await this.addNote.verifyDialogIsClosed();
  }

  /**
   * Add note to default test unit
   */
  async addNoteToDefaultUnit(noteText: string = 'Test Playwright'): Promise<void> {
    await this.unitsList.selectDefaultTestUnit();
    await this.unitDetails.verifyAndCloseDialog();
    await this.unitsList.clickAddNoteButton();
    await this.addNote.addNote(noteText);
    await this.addNote.verifyDialogIsClosed();
  }

  /**
   * Navigate to facility management system
   */
  async navigateToFacilityManagement(url: string): Promise<void> {
    await this.navigate(url);
    await this.waitForCompletePageLoad();
  }
}