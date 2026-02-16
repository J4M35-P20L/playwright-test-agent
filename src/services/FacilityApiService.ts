import { APIRequestContext, expect } from '@playwright/test';

/**
 * Facility Management API Service
 * Handles API interactions for facility management operations
 */
export class FacilityApiService {
  private request: APIRequestContext;
  private baseUrl: string;
  private companyId: number;
  private facilityId: number;

  constructor(
    request: APIRequestContext,
    baseUrl: string = 'https://dev.storedgefms.com',
    companyId: number = 403,
    facilityId: number = 3544
  ) {
    this.request = request;
    this.baseUrl = baseUrl;
    this.companyId = companyId;
    this.facilityId = facilityId;
  }

  /**
   * Get authentication headers
   * Update this method based on actual authentication mechanism
   */
  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add authentication headers as needed (e.g., Bearer token)
      // 'Authorization': 'Bearer YOUR_TOKEN'
    };
  }

  /**
   * Get units for a facility
   */
  async getUnits(): Promise<any> {
    const response = await this.request.get(
      `${this.baseUrl}/api/company/${this.companyId}/facility/${this.facilityId}/units`,
      { headers: this.getHeaders() }
    );
    
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Get specific unit by ID
   */
  async getUnitById(unitId: number | string): Promise<any> {
    const response = await this.request.get(
      `${this.baseUrl}/api/company/${this.companyId}/facility/${this.facilityId}/units/${unitId}`,
      { headers: this.getHeaders() }
    );
    
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Get unit by name
   */
  async getUnitByName(unitName: string): Promise<any> {
    const units = await this.getUnits();
    const unit = units.find((u: any) => u.name === unitName || u.unitName === unitName);
    
    if (!unit) {
      throw new Error(`Unit with name '${unitName}' not found`);
    }
    
    return unit;
  }

  /**
   * Add a note to a unit
   */
  async addNoteToUnit(unitId: number | string, noteText: string): Promise<any> {
    const response = await this.request.post(
      `${this.baseUrl}/api/company/${this.companyId}/facility/${this.facilityId}/units/${unitId}/notes`,
      {
        headers: this.getHeaders(),
        data: {
          note: noteText,
          description: noteText,
          text: noteText,
          // Include other fields as required by your API
        }
      }
    );
    
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Get notes for a unit
   */
  async getUnitNotes(unitId: number | string): Promise<any> {
    const response = await this.request.get(
      `${this.baseUrl}/api/company/${this.companyId}/facility/${this.facilityId}/units/${unitId}/notes`,
      { headers: this.getHeaders() }
    );
    
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  /**
   * Delete a note from a unit
   */
  async deleteNote(unitId: number | string, noteId: number | string): Promise<void> {
    const response = await this.request.delete(
      `${this.baseUrl}/api/company/${this.companyId}/facility/${this.facilityId}/units/${unitId}/notes/${noteId}`,
      { headers: this.getHeaders() }
    );
    
    expect(response.ok()).toBeTruthy();
  }

  /**
   * Verify note exists in unit's notes
   */
  async verifyNoteExists(unitId: number | string, noteText: string): Promise<boolean> {
    const notes = await this.getUnitNotes(unitId);
    
    // Check if notes is an array or object with notes property
    const notesList = Array.isArray(notes) ? notes : notes.notes || notes.data || [];
    
    return notesList.some((note: any) => 
      note.note === noteText || 
      note.description === noteText || 
      note.text === noteText ||
      note.content === noteText
    );
  }

  /**
   * Get the most recent note for a unit
   */
  async getLatestNote(unitId: number | string): Promise<any> {
    const notes = await this.getUnitNotes(unitId);
    
    // Check if notes is an array or object with notes property
    const notesList = Array.isArray(notes) ? notes : notes.notes || notes.data || [];
    
    if (notesList.length === 0) {
      throw new Error('No notes found for this unit');
    }
    
    // Assuming notes are sorted by creation date descending
    return notesList[0];
  }

  /**
   * Update company and facility IDs
   */
  setCompanyAndFacility(companyId: number, facilityId: number): void {
    this.companyId = companyId;
    this.facilityId = facilityId;
  }
}
