using OpenQA.Selenium;

namespace WorkflowConfig.E2E.Tests.PageObjects;

public class WorkflowsPage : BasePage
{
    public WorkflowsPage(IWebDriver driver) : base(driver) { }

    private By WorkflowCards => By.CssSelector(".workflow-card");
    private By AddWorkflowButton => By.CssSelector("button[aria-label='Add Workflow']");
    private By WorkflowNameInput => By.CssSelector("input[formControlName='name']");
    private By WorkflowKeyInput => By.CssSelector("input[formControlName='key']");
    private By WorkflowDescriptionInput => By.CssSelector("textarea[formControlName='description']");
    private By SaveButton => By.CssSelector("button[type='submit']");
    private By SuccessMessage => By.CssSelector(".success-message");

    public void Navigate()
    {
        NavigateTo("/");
    }

    public int GetWorkflowCount()
    {
        WaitForPageLoad();
        var cards = Driver.FindElements(WorkflowCards);
        return cards.Count;
    }

    public bool IsWorkflowVisible(string workflowName)
    {
        var locator = By.XPath($"//div[contains(@class, 'workflow-card')]//h3[contains(text(), '{workflowName}')]");
        return IsElementPresent(locator);
    }

    public void ClickAddWorkflow()
    {
        Click(AddWorkflowButton);
    }

    public void EnterWorkflowDetails(string name, string key, string description)
    {
        TypeText(WorkflowNameInput, name);
        TypeText(WorkflowKeyInput, key);
        TypeText(WorkflowDescriptionInput, description);
    }

    public void SubmitWorkflowForm()
    {
        Click(SaveButton);
    }

    public void ClickEditWorkflow(string workflowName)
    {
        var editButton = By.XPath($"//div[contains(@class, 'workflow-card')]//h3[contains(text(), '{workflowName}')]/ancestor::div[contains(@class, 'workflow-card')]//button[@aria-label='Edit']");
        Click(editButton);
    }

    public void ClickDeleteWorkflow(string workflowName)
    {
        var deleteButton = By.XPath($"//div[contains(@class, 'workflow-card')]//h3[contains(text(), '{workflowName}')]/ancestor::div[contains(@class, 'workflow-card')]//button[@aria-label='Delete']");
        Click(deleteButton);
    }

    public void ConfirmDeletion()
    {
        var confirmButton = By.CssSelector("button.confirm-delete");
        Click(confirmButton);
    }

    public bool IsSuccessMessageVisible()
    {
        return IsElementPresent(SuccessMessage);
    }
}
