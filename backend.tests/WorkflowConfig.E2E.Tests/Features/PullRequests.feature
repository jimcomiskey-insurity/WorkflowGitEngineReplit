Feature: Pull Request Management
  As a user of the Insurance Workflow Configuration system
  I want to create and manage pull requests
  So that I can propose and review workflow changes

  Background:
    Given the application is running
    And I am logged in as "userA"

  Scenario: Create a new pull request
    Given I am on the version control page
    And I have switched to branch "feature-test"
    When I click the "Create Pull Request" button
    And I fill in the PR title as "Test Feature PR"
    And I fill in the PR description as "Adding test feature workflows"
    And I select target branch "main"
    And I submit the pull request form
    Then I should see a success message
    And the PR should appear in the pull requests list

  Scenario: View pull request details
    Given a pull request exists with title "Test Feature PR"
    When I navigate to the pull requests page
    And I click on the pull request "Test Feature PR"
    Then I should see the PR details page
    And I should see the PR title "Test Feature PR"
    And I should see the source branch
    And I should see the target branch
    And I should see the commit count

  Scenario: Merge a pull request
    Given a pull request exists with title "Ready to Merge PR"
    And the pull request status is "open"
    When I navigate to the pull requests page
    And I click on the pull request "Ready to Merge PR"
    And I click the "Merge" button
    And I confirm the merge
    Then the PR status should be "merged"
    And I should see a success message

  Scenario: Filter pull requests by status
    Given multiple pull requests exist with different statuses
    When I navigate to the pull requests page
    And I select the "Open" filter
    Then I should only see open pull requests
    When I select the "Merged" filter
    Then I should only see merged pull requests
