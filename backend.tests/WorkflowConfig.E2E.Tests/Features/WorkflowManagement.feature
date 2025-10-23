Feature: Workflow Management
  As a user of the Insurance Workflow Configuration system
  I want to create and manage insurance workflows
  So that I can configure business processes

  Background:
    Given the application is running
    And I am logged in as "userA"

  Scenario: View list of workflows
    Given I am on the workflows page
    Then I should see a list of workflows
    And each workflow should display its name and description

  Scenario: Create a new workflow
    Given I am on the workflows page
    When I click the "Add Workflow" button
    And I enter workflow name "Claims Processing"
    And I enter workflow key "claims-processing"
    And I enter workflow description "Handle insurance claims"
    And I submit the workflow form
    Then the workflow "Claims Processing" should appear in the list

  Scenario: Edit an existing workflow
    Given a workflow exists with name "New Business"
    And I am on the workflows page
    When I click the edit button for "New Business"
    And I change the description to "Updated description for new business"
    And I save the changes
    Then the workflow description should be updated

  Scenario: Add a phase to a workflow
    Given a workflow exists with name "New Business"
    And I am editing the workflow
    When I click "Add Phase"
    And I enter phase name "Risk Assessment"
    And I save the phase
    Then the phase "Risk Assessment" should be added to the workflow

  Scenario: Add a task to a phase
    Given a workflow has a phase "Risk Assessment"
    And I am editing the workflow
    When I expand the "Risk Assessment" phase
    And I click "Add Task"
    And I enter task name "Evaluate risk score"
    And I select role "Underwriter"
    And I save the task
    Then the task "Evaluate risk score" should appear in the phase

  Scenario: Delete a workflow
    Given a workflow exists with name "Test Workflow"
    And I am on the workflows page
    When I click the delete button for "Test Workflow"
    And I confirm the deletion
    Then the workflow "Test Workflow" should be removed from the list
