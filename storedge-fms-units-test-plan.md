# StorEDGE FMS Units Module Test Plan

## Application Overview

This comprehensive test plan covers the StorEDGE Facility Management System (FMS) Units module, which allows facility managers to view, manage, and track storage units in their facilities. The system includes individual unit management, unit filtering/search, notes management, tenant operations, and detailed unit information tracking.

## Test Scenarios

### 1. Unit List and Management

**Seed:** `tests/seed/units-list-setup.spec.ts`

#### 1.1. View Units List with All Information

**File:** `tests/units/view-units-list.spec.ts`

**Steps:**
  1. -
    - expect: Navigate to Units > Individual section
    - expect: Units list should display with table format showing Type, Size, Unit, Area, Rate, Description, Status columns
    - expect: Each unit should show complete information including tenant details, move-in dates, and action buttons
  2. -
    - expect: All units display correct unit names (e.g., Testing3, Testing59, etc.)
    - expect: Unit types show appropriate icons (Indoor units with building icon)
    - expect: Sizes display correctly (e.g., 20x25, 11x11x11)
    - expect: Square footage shown accurately (e.g., 500 sqft, 121 sqft)
  3. -
    - expect: Rates display with pricing tiers (Good, Better, Best, Test Rails7.0 tier)
    - expect: Status column shows current state (Occupied/Reserved/Vacant) with tenant names and dates
    - expect: Action buttons (Move-Out, Transfer, Reserve) appear for appropriate unit statuses

#### 1.2. Search Units Functionality

**File:** `tests/units/search-units.spec.ts`

**Steps:**
  1. -
    - expect: Enter unit name in search box
    - expect: System should filter results to show only matching units
    - expect: Search results update in real-time as user types
  2. -
    - expect: Search for occupied unit (e.g., Testing3)
    - expect: Only matching units should appear in results
    - expect: Clear search should restore full list
  3. -
    - expect: Search for non-existent unit
    - expect: No results should be shown with appropriate message
    - expect: Search box should remain functional for new searches

#### 1.3. Filter Units by Status

**File:** `tests/units/filter-units-status.spec.ts`

**Steps:**
  1. -
    - expect: Click Status filter dropdown
    - expect: Filter options should appear (Occupied, Reserved, Vacant, etc.)
    - expect: Select 'Occupied' filter
  2. -
    - expect: Only occupied units should display in list
    - expect: Filter should show accurate count of results
    - expect: Status column should only show 'Occupied by [tenant]' entries
  3. -
    - expect: Apply multiple status filters
    - expect: Results should include all selected statuses
    - expect: Clear filters should restore complete unit list

#### 1.4. Filter Units by Type Size and Amenities

**File:** `tests/units/filter-units-multiple.spec.ts`

**Steps:**
  1. -
    - expect: Apply Type filter (Indoor)
    - expect: Only indoor units should display with indoor icon
    - expect: Size filter should work in combination with type filter
  2. -
    - expect: Filter by size range (e.g., 20x25)
    - expect: Results should only show units matching size criteria
    - expect: Square footage should match selected size parameters
  3. -
    - expect: Apply Amenities and Area filters
    - expect: Results should reflect all active filter combinations
    - expect: Filter combinations should work logically together

#### 1.5. Units List Pagination

**File:** `tests/units/units-pagination.spec.ts`

**Steps:**
  1. -
    - expect: Navigate to page 2 of units list
    - expect: New set of units should load
    - expect: Page numbers should update to show current page
  2. -
    - expect: Use next/previous navigation buttons
    - expect: Page navigation should work smoothly
    - expect: Unit data should load correctly for each page
  3. -
    - expect: Jump to specific page number
    - expect: System should navigate to correct page
    - expect: Pagination controls should remain functional throughout navigation
