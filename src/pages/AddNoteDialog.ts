import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Add Note Dialog Page Object
 * Handles add note dialog functionality
 */
export class AddNoteDialog extends BasePage {
  // Locators
  private readonly addNoteHeader: Locator;
  private readonly noteTextbox: Locator;
  private readonly addNoteSubmitButton: Locator;
  private readonly cancelButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.addNoteHeader = this.page.getByRole('dialog').getByText('Add Note', { exact: true }).first();
    this.noteTextbox = this.page.getByRole('textbox', { name: 'Enter a short description of the work needed' });
    this.addNoteSubmitButton = this.page.getByText('Add Note').nth(1);
    this.cancelButton = this.page.getByText('Cancel');
  }

  /**
   * Verify add note dialog is open
   */
  async verifyDialogIsOpen(): Promise<void> {
    await this.waitForCompletePageLoad();
    await this.waitForLocator(this.addNoteHeader);
    await this.waitForLocator(this.noteTextbox);
    await expect(this.addNoteHeader).toBeVisible();
    await expect(this.noteTextbox).toBeVisible();
  }

  /**
   * Enter note text in the textbox
   */
  async enterNoteText(noteText: string): Promise<void> {
    await this.waitForLocator(this.noteTextbox);
    await this.fillLocatorInput(this.noteTextbox, noteText);
  }

  /**
   * Click the Add Note button to submit
   */
  async submitNote(): Promise<void> {
    await this.waitForLocator(this.addNoteSubmitButton);
    await this.clickLocator(this.addNoteSubmitButton);
    // Wait extra time for note submission to process
    await this.page.waitForTimeout(1000);
  }

  /**
   * Cancel adding note
   */
  async cancelNote(): Promise<void> {
    await this.waitForLocator(this.cancelButton);
    await this.clickLocator(this.cancelButton);
  }

  /**
   * Complete add note process (enter text and submit)
   */
  async addNote(noteText: string): Promise<void> {
    await this.verifyDialogIsOpen();
    await this.enterNoteText(noteText);
    await this.submitNote();
  }

  /**
   * Verify dialog is closed (note saved successfully)
   */
  async verifyDialogIsClosed(): Promise<void> {
    await this.page.waitForTimeout(1000); // Wait for close animation and save processing
    await expect(this.addNoteHeader).not.toBeVisible();
  }

  /**
   * Clear existing text in note field
   */
  async clearNoteText(): Promise<void> {
    await this.waitForLocator(this.noteTextbox);
    await this.noteTextbox.clear();
  }

  /**
   * Get current note text
   */
  async getCurrentNoteText(): Promise<string> {
    await this.waitForLocator(this.noteTextbox);
    return (await this.noteTextbox.inputValue()) || '';
  }

  /**
   * Verify note textbox is empty
   */
  async verifyNoteTextboxEmpty(): Promise<void> {
    const text = await this.getCurrentNoteText();
    expect(text).toBe('');
  }

  /**
   * Verify note textbox has specific text
   */
  async verifyNoteTextboxHasText(expectedText: string): Promise<void> {
    const text = await this.getCurrentNoteText();
    expect(text).toBe(expectedText);
  }
}