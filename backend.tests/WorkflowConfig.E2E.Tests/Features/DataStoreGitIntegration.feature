Feature: DataStore Git Integration
  As a user of the Insurance Workflow Configuration system
  I want datastore changes to appear in version control
  So that I can track datastore modifications in commits and pull requests

  @api
  Scenario: DataStore changes appear in PR comparison and individual commits
    Given the repository is reset to initial state for user "testuser1"
    When I create a new branch "datastore-test-branch" for user "testuser1"
    And I create a new datastore with the following details for user "testuser1":
      | Field       | Value            |
      | Name        | Test Datastore   |
      | Description | A test datastore |
    Then the datastore should appear in the datastore list for user "testuser1"
    When I commit the changes with message "Add test datastore" for user "testuser1"
    And I push the changes for user "testuser1"
    And I create a pull request from "datastore-test-branch" to "master" for user "testuser1"
    Then the pull request comparison should contain the datastore in dataStoreChanges
    And at least one commit in the pull request should contain the datastore in dataStoreChanges
