Feature: Add Note to a Unit within a Facility
  Short description: Allow a user to select a facility, load its units, and add a note to a chosen unit so the note is saved in FMS and visible in the Edge portal.

  Background:
    Given the user is logged into the Edge portal
    And the user is on the Facility Units management page

  # Sanity: happy-path
  Scenario: Sanity - Add note to a unit and verify persistence
    Given the user selects "CK Self Storage" from the Facility dropdown
    When the user clicks "Go"
    Then the system displays the list of units for "CK Self Storage" with filters, unit status and status message
    When the user selects unit "Testing3" from the units list
    And the user opens the Add Note dialog for unit "Testing3"
    And the user enters "This is a test note." into the Note field
    And the user clicks "Save Note"
    Then the system shows the note saved confirmation
    And the note "This is a test note." is visible against unit "Testing3" in the Edge portal after the user logs out and logs back in

  # Negative: missing selection and validation
  Scenario: Negative - Click Go without selecting a facility
    Given no facility is selected in the Facility dropdown
    When the user clicks "Go"
    Then the system displays a validation message prompting the user to select a facility
    And no units are loaded

  Scenario: Negative - Prevent saving an empty note
    Given the user selects "CK Self Storage" from the Facility dropdown
    When the user clicks "Go"
    And the user selects unit "Testing3"
    When the user opens the Add Note dialog and leaves the Note field empty
    And the user clicks "Save Note"
    Then the system displays a validation error "Note cannot be empty"
    And the note is not saved

  # UI Compatibility: visibility and controls across viewports
  Scenario: UI Compatibility - Note input and controls visible and usable on common viewports
    Given the user opens the Facility Units page on a desktop viewport
    Then the Note field and "Save Note" control are visible and usable for a selected unit
    When the user opens the same page on a mobile-sized viewport
    Then the Note field and "Save Note" control remain accessible and usable for a selected unit

  # Edge cases: length and content handling
  Scenario: Edge Case - Save a note at maximum allowed length
    Given the user selects "CK Self Storage" and unit "Testing3"
    When the user enters a note that is exactly the system's maximum allowed length
    And the user clicks "Save Note"
    Then the system accepts and saves the note and displays it against the unit

  Scenario: Edge Case - Reject note exceeding maximum length
    Given the user selects "CK Self Storage" and unit "Testing3"
    When the user enters a note that exceeds the system's maximum allowed length
    And the user clicks "Save Note"
    Then the system displays a validation error indicating the note is too long
    And the note is not saved

  Scenario: Edge Case - Special characters and HTML content are stored safely
    Given the user selects "CK Self Storage" and unit "Testing3"
    When the user enters a note containing special characters and HTML tags "<script>alert(1)</script> & <b>bold</b>"
    And the user clicks "Save Note"
    Then the system saves the note as plain text (no active HTML or script execution)
    And the rendered note shown in Edge escapes HTML so it displays as text

  @e2etestcase
  Scenario: E2E - Add note to a unit and verify persistence
    Given the user selects "CK Self Storage" from the Facility dropdown
    When the user clicks "Go"
    Then the system displays the list of units for "CK Self Storage" with filters, unit status and status message
    When the user selects unit "Testing3" from the units list
    And the user opens the Add Note dialog for unit "Testing3"
    And the user enters "This is a test note." into the Note field
    And the user clicks "Save Note"
    Then the system shows the note saved confirmation
    And the note "This is a test note." is visible against unit "Testing3" in the Edge portal after the user logs out and logs back in
    Then login to Edge portal "Url https://dev.storedgefms.com/company/403/facility/3544/dashboard"
    And use usename "Walk-thru@2026", password "Walk-thru@2026"
    And click skip on sso page
    And click "UNITS" in the left menu
    And select "Groups" tab
    And search for the unit used above steps, select it
    And click "History" tab
    Then search for the latest message eneterd in above steps

