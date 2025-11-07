Feature: Script Execution and IntelliSense
  As a developer configuring calculations
  I want to get IntelliSense suggestions for my C# scripts
  So that I can efficiently write calculation logic

  Scenario: Get completions for script with integer parameters
    Given I am testing script completions for user "testUser"
    When I request completions for a script with the following inputs:
      | Alias | DataType |
      | inta  | Integer  |
      | intb  | Integer  |
    And I type "in" at position 2 in an empty script
    Then the completion suggestions should include "inta"
    And the completion suggestions should include "intb"

  Scenario: Get completions for script with mixed parameter types
    Given I am testing script completions for user "testUser"
    When I request completions for a script with the following inputs:
      | Alias       | DataType |
      | premium     | Decimal  |
      | policyNum   | String   |
      | effectiveDate | Date    |
    And I type "p" at position 1 in an empty script
    Then the completion suggestions should include "premium"
    And the completion suggestions should include "policyNum"

  Scenario: Get member completions after typing parameter name and dot
    Given I am testing script completions for user "testUser"
    When I request completions for a script with the following inputs:
      | Alias | DataType |
      | value | Integer  |
    And I type "value." at position 6 in a script
    Then the completion suggestions should include "HasValue"
    And the completion suggestions should include "Value"
