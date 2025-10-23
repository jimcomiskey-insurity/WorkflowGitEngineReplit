Feature: Git Version Control Operations
  As a user of the Insurance Workflow Configuration system
  I want to manage Git branches and commits
  So that I can version control my workflow configurations

  Background:
    Given the application is running
    And I am logged in as "userA"

  Scenario: View commit history
    Given I am on the version control page
    When I view the commit history
    Then I should see a list of commits
    And each commit should show author, message, and date

  Scenario: Create a new branch
    Given I am on the version control page
    When I click the "Create Branch" button
    And I enter branch name "feature-new-workflow"
    And I submit the new branch form
    Then the branch "feature-new-workflow" should be created
    And I should be switched to the new branch

  Scenario: Switch between branches
    Given multiple branches exist
    And I am on the version control page
    When I open the branch selector
    And I select branch "feature-test"
    Then the current branch should be "feature-test"
    And the workflows should reflect the branch state

  Scenario: Commit workflow changes
    Given I am on the workflows page
    And I have made changes to a workflow
    When I navigate to the version control page
    And I enter commit message "Updated workflow phases"
    And I click the "Commit" button
    Then the changes should be committed
    And I should see the new commit in history

  Scenario: Push changes to remote
    Given I have local commits ahead of remote
    And I am on the version control page
    When I click the "Push" button
    Then the commits should be pushed to remote
    And the sync indicator should show "up to date"

  Scenario: Pull changes from remote
    Given remote has commits I don't have locally
    And I am on the version control page
    When I click the "Pull" button
    Then the remote commits should be pulled
    And my local repository should be updated
