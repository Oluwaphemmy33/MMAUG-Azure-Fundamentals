# Lab 1: Explore the Azure Portal

**Time:** 10 minutes

## Objective

Sign in to the Azure portal, confirm the correct subscription, and locate the services used in this workshop.

## What You Will Learn

- How to search for Azure services.
- Where subscriptions, Resource Groups, Microsoft Entra ID, Cost Management, and Azure Monitor are located.
- Why checking the active directory and subscription matters before creating resources.

## Prerequisites

- Bootcamp-provided Azure credentials.
- The subscription name supplied by the instructor.
- A private browser window if you also use another Microsoft account.

## Architecture

This exploration does not create resources. An Azure **subscription** is the billing and access boundary that will contain the lab resource group.

## Step-by-Step Instructions

1. Open [https://portal.azure.com](https://portal.azure.com).
2. Sign in with the account supplied or approved by the bootcamp.
3. If prompted, complete multifactor authentication.
4. Check the account and directory shown in the upper-right corner. Confirm both with the instructor.
5. Use the search bar at the top to find **Subscriptions**. Open it and identify the assigned subscription.
6. Return to the search bar and open **Resource groups**. Do not create anything yet.
7. Search for and open **Microsoft Entra ID**. This service manages identities such as users and groups. Do not change any settings.
8. Search for and open **Cost Management + Billing**. Your bootcamp permissions may allow only a limited view.
9. Search for and open **Monitor**. Notice options for metrics, logs, alerts, and Activity Log.
10. Select the Cloud Shell icon in the top bar. If the instructor permits it, choose **Bash** and accept only the bootcamp-approved setup options.

## What You Should See

- The Azure portal home page.
- One instructor-approved subscription.
- Service pages for Resource groups, Microsoft Entra ID, Cost Management, and Monitor.
- Cloud Shell may show a prompt after initialization; access can be disabled by bootcamp policy.

## Validation

In Cloud Shell, run this read-only command:

```bash
az account show --output table
```

Confirm the subscription name and tenant with the instructor. Do not continue if the subscription is wrong.

## Common Errors

| Issue | Safe action |
|---|---|
| The subscription is missing | Check the signed-in account and directory; then ask the instructor. |
| Access denied appears | Do not request or assign roles. Ask the instructor to verify access. |
| Cloud Shell cannot start | Continue with Portal steps; CLI is optional. |

## Knowledge Check

1. What boundary contains Resource Groups and records usage for billing?
2. Why should you confirm the subscription before deploying anything?

## Cleanup

No resources were created in this lab.

