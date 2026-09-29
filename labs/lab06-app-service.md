# Lab 6: Deploy an App Service Web App

**Time:** 25 minutes

> **COST NOTICE:** An App Service plan may incur charges even when the web app is idle. Use only an instructor-approved pricing plan and complete Lab 8.

## Objective

Create Azure App Service resources and deploy the supplied static HTML page.

## What You Will Learn

- **App Service** is a managed platform for web applications.
- An **App Service plan** supplies compute capacity.
- A **Web App** is the application resource with an HTTPS address.
- ZIP deployment uploads application files without managing a server operating system.

## Prerequisites

- `rg-mmaug-azurefundamentals` exists.
- A globally unique Web App suffix.
- Azure Cloud Shell or local Azure CLI.
- [index.html](../starter-files/index.html) is available.

## Architecture

```text
App Service plan: asp-mmaug-demo
`-- Web App: app-mmaug-<uniquevalue>
    `-- index.html
```

## Step-by-Step Instructions

### Part A: Create the Web App in the portal

1. Search for **App Services** and select **Create** > **Web App**.
2. Select the bootcamp subscription and `rg-mmaug-azurefundamentals`.
3. Enter `app-mmaug-<uniquevalue>`. Replace the placeholder with lowercase letters, numbers, or hyphens.
4. Select **Code** as the publish option.
5. Choose a current supported runtime stack approved by the instructor. The static HTML deployment does not depend on application code from that runtime.
6. Select **Windows** as the operating system for this lab.
7. Select **Sweden Central** unless instructed otherwise.
8. Create `asp-mmaug-demo` as the App Service plan.
9. Select the lowest instructor-approved pricing plan available in the bootcamp subscription. Do not select premium features.
10. Leave continuous deployment disabled for this one-time ZIP deployment.
11. Select **Review + create**, review the estimated cost, and select **Create** after validation succeeds.
12. Open the Web App and copy its **Default domain**. Use the HTTPS address.

### Part B: Prepare and deploy the ZIP

The ZIP root must contain `index.html`; do not zip the parent repository folder.

On Windows PowerShell, from the repository root:

```powershell
Compress-Archive -Path .\starter-files\index.html -DestinationPath .\site.zip -Force
```

On Bash:

```bash
cd starter-files
zip ../site.zip index.html
cd ..
```

Sign in locally only if needed. Cloud Shell is already authenticated:

```bash
az account show --output table
```

Replace the Web App placeholder and deploy:

```bash
az webapp deploy \
  --resource-group rg-mmaug-azurefundamentals \
  --name app-mmaug-<uniquevalue> \
  --src-path site.zip \
  --type zip
```

If using Cloud Shell, upload `site.zip` with **Manage files** > **Upload** before running the deployment command.

### Part C: Test the site

1. Return to the Web App overview.
2. Select **Browse**, or open `https://app-mmaug-<uniquevalue>.azurewebsites.net`.
3. Wait up to two minutes and refresh once if the first response shows the default page.

## What You Should See

The page should display:

- **Welcome to Microsoft Azure Fundamentals**
- **MMAUG 30-Day AI and DevOps Fundamentals Bootcamp**
- **Deployment successful.**

## Validation

```bash
az webapp show \
  --resource-group rg-mmaug-azurefundamentals \
  --name app-mmaug-<uniquevalue> \
  --query "{name:name, state:state, host:defaultHostName, httpsOnly:httpsOnly}" \
  --output table
```

Confirm that state is `Running`. Open the returned hostname with `https://`.

## Common Errors

| Issue | Safe action |
|---|---|
| Web App name unavailable | Change only `<uniquevalue>`. |
| ZIP deploy cannot find the file | Check the current directory and upload `site.zip` to Cloud Shell. |
| Default page remains | Confirm `index.html` is at the ZIP root, redeploy once, and wait a minute. |
| App creation denied | Ask the instructor to verify policy and allowed App Service SKUs. |
| Site returns an error | Open **Deployment Center** logs and review the latest deployment. |

## Knowledge Check

1. Which resource supplies compute for the Web App?
2. Who manages the operating system in App Service?
3. Why must `index.html` be at the root of the ZIP package?

## Cleanup

Keep the Web App and plan for final validation. Both will be deleted with the Resource Group in Lab 8.

