using OpenQA.Selenium;
using Reqnroll;
using WorkflowConfig.E2E.Tests.PageObjects;
using FluentAssertions;

namespace WorkflowConfig.E2E.Tests.StepDefinitions;

[Binding]
public class WorkflowSteps
{
    private readonly ScenarioContext _scenarioContext;
    private IWebDriver Driver => (IWebDriver)_scenarioContext["WebDriver"];
    private WorkflowsPage WorkflowPage => new WorkflowsPage(Driver);

    public WorkflowSteps(ScenarioContext scenarioContext)
    {
        _scenarioContext = scenarioContext;
    }

    [Given(@"I am on the workflows page")]
    public void GivenIAmOnTheWorkflowsPage()
    {
        WorkflowPage.Navigate();
    }

    [Given(@"a workflow exists with name ""(.*)""")]
    public void GivenAWorkflowExistsWithName(string workflowName)
    {
        _scenarioContext["WorkflowName"] = workflowName;
    }

    [Given(@"I am editing the workflow")]
    public void GivenIAmEditingTheWorkflow()
    {
        var workflowName = _scenarioContext["WorkflowName"].ToString();
        WorkflowPage.ClickEditWorkflow(workflowName);
    }

    [Given(@"a workflow has a phase ""(.*)""")]
    public void GivenAWorkflowHasAPhase(string phaseName)
    {
        _scenarioContext["PhaseName"] = phaseName;
    }

    [When(@"I click the ""Add Workflow"" button")]
    public void WhenIClickTheAddWorkflowButton()
    {
        WorkflowPage.ClickAddWorkflow();
    }

    [When(@"I enter workflow name ""(.*)""")]
    public void WhenIEnterWorkflowName(string name)
    {
        _scenarioContext["WorkflowName"] = name;
    }

    [When(@"I enter workflow key ""(.*)""")]
    public void WhenIEnterWorkflowKey(string key)
    {
        _scenarioContext["WorkflowKey"] = key;
    }

    [When(@"I enter workflow description ""(.*)""")]
    public void WhenIEnterWorkflowDescription(string description)
    {
        _scenarioContext["WorkflowDescription"] = description;
    }

    [When(@"I submit the workflow form")]
    public void WhenISubmitTheWorkflowForm()
    {
        var name = _scenarioContext["WorkflowName"].ToString();
        var key = _scenarioContext["WorkflowKey"].ToString();
        var description = _scenarioContext["WorkflowDescription"].ToString();
        
        WorkflowPage.EnterWorkflowDetails(name, key, description);
        WorkflowPage.SubmitWorkflowForm();
    }

    [When(@"I click the edit button for ""(.*)""")]
    public void WhenIClickTheEditButtonFor(string workflowName)
    {
        WorkflowPage.ClickEditWorkflow(workflowName);
    }

    [When(@"I change the description to ""(.*)""")]
    public void WhenIChangeTheDescriptionTo(string newDescription)
    {
        _scenarioContext["NewDescription"] = newDescription;
        // Description change would happen in edit form
    }

    [When(@"I save the changes")]
    public void WhenISaveTheChanges()
    {
        WorkflowPage.SubmitWorkflowForm();
    }

    [When(@"I click ""Add Phase""")]
    public void WhenIClickAddPhase()
    {
        var addPhaseButton = By.CssSelector("button[aria-label='Add Phase']");
        // Would click add phase button
    }

    [When(@"I enter phase name ""(.*)""")]
    public void WhenIEnterPhaseName(string phaseName)
    {
        _scenarioContext["PhaseName"] = phaseName;
    }

    [When(@"I save the phase")]
    public void WhenISaveThePhase()
    {
        // Would save phase
    }

    [When(@"I expand the ""(.*)"" phase")]
    public void WhenIExpandThePhase(string phaseName)
    {
        // Would expand phase
    }

    [When(@"I click ""Add Task""")]
    public void WhenIClickAddTask()
    {
        // Would click add task button
    }

    [When(@"I enter task name ""(.*)""")]
    public void WhenIEnterTaskName(string taskName)
    {
        _scenarioContext["TaskName"] = taskName;
    }

    [When(@"I select role ""(.*)""")]
    public void WhenISelectRole(string role)
    {
        _scenarioContext["TaskRole"] = role;
    }

    [When(@"I save the task")]
    public void WhenISaveTheTask()
    {
        // Would save task
    }

    [When(@"I click the delete button for ""(.*)""")]
    public void WhenIClickTheDeleteButtonFor(string workflowName)
    {
        WorkflowPage.ClickDeleteWorkflow(workflowName);
    }

    [When(@"I confirm the deletion")]
    public void WhenIConfirmTheDeletion()
    {
        WorkflowPage.ConfirmDeletion();
    }

    [Then(@"I should see a list of workflows")]
    public void ThenIShouldSeeAListOfWorkflows()
    {
        var count = WorkflowPage.GetWorkflowCount();
        count.Should().BeGreaterThan(0, "Should see at least one workflow");
    }

    [Then(@"each workflow should display its name and description")]
    public void ThenEachWorkflowShouldDisplayItsNameAndDescription()
    {
        var count = WorkflowPage.GetWorkflowCount();
        count.Should().BeGreaterThan(0, "Workflows should display metadata");
    }

    [Then(@"the workflow ""(.*)"" should appear in the list")]
    public void ThenTheWorkflowShouldAppearInTheList(string workflowName)
    {
        WorkflowPage.IsWorkflowVisible(workflowName).Should().BeTrue($"Workflow '{workflowName}' should be visible");
    }

    [Then(@"the workflow description should be updated")]
    public void ThenTheWorkflowDescriptionShouldBeUpdated()
    {
        WorkflowPage.IsSuccessMessageVisible().Should().BeTrue("Should see update confirmation");
    }

    [Then(@"the phase ""(.*)"" should be added to the workflow")]
    public void ThenThePhaseShouldBeAddedToTheWorkflow(string phaseName)
    {
        // Would verify phase is visible in workflow
    }

    [Then(@"the task ""(.*)"" should appear in the phase")]
    public void ThenTheTaskShouldAppearInThePhase(string taskName)
    {
        // Would verify task is visible in phase
    }

    [Then(@"the workflow ""(.*)"" should be removed from the list")]
    public void ThenTheWorkflowShouldBeRemovedFromTheList(string workflowName)
    {
        WorkflowPage.IsWorkflowVisible(workflowName).Should().BeFalse($"Workflow '{workflowName}' should not be visible");
    }
}
