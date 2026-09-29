# Lab 2: Create a Resource Group

**Time:** 10 minutes

## Objective

Create the lifecycle container for all workshop resources.

## What You Will Learn

- What a Resource Group does.
- How to create one in the portal.
- How to validate it with Azure CLI.

## Prerequisites

- Completed Lab 1.
- Permission to create Resource Groups.
- Instructor approval to use `Sweden Central`.

## Architecture

```text
Azure subscription
`-- rg-mmaug-azurefundamentals
```

A **Resource Group** is a logical container for resources that share a lifecycle. It does not place them on the same server.

## Step-by-Step Instructions

1. In the portal search bar, enter **Resource groups** and open the service.
2. Select **Create**.
3. Under **Project details**, select the subscription confirmed in Lab 1.
4. Enter `rg-mmaug-azurefundamentals` for **Resource group**.
5. Select **Sweden Central** for **Region**. This stores Resource Group metadata; individual resources can have their own supported locations.
6. If a **Tags** tab is available and the instructor supplied values, add the required tags. Do not invent personal data.
7. Select **Review + create**.
8. Wait for validation to pass, then select **Create**.
9. Open the new Resource Group.

### Optional Azure CLI equivalent

`az login` opens an interactive sign-in when Azure CLI is installed locally. Cloud Shell is already signed in.

`az account show` displays the active subscription without changing it:

```bash
az account show --output table
```

`az group create` creates or updates the named Resource Group in the selected location:

```bash
az group create \
  --name rg-mmaug-azurefundamentals \
  --location swedencentral \
  --output table
```

## What You Should See

The Resource Group overview should show:

- Name: `rg-mmaug-azurefundamentals`
- Subscription: the bootcamp subscription
- Location: `Sweden Central`
- No resources yet

## Validation

```bash
az group show \
  --name rg-mmaug-azurefundamentals \
  --query "{name:name, location:location, state:properties.provisioningState}" \
  --output table
```

Expected state: `Succeeded`.

## Common Errors

| Issue | Safe action |
|---|---|
| Resource Group already exists | Open it and confirm it belongs to this lab before continuing. |
| Permission denied | Ask the instructor to check your assigned scope. |
| Region is not permitted | Use only the alternative chosen by the instructor. |

## Knowledge Check

1. Does a Resource Group force all contained resources into one region?
2. What happens to contained resources when their Resource Group is deleted?

## Cleanup

Keep this Resource Group for the remaining labs. It will be deleted in Lab 8.

