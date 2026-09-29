# Lab 8: Clean Up the Azure Environment

**Time:** 5 minutes

## Objective

Delete all workshop resources together and confirm removal.

## What You Will Learn

- Resources can continue generating charges after a workshop.
- Deleting the lab Resource Group removes its contained resources as one lifecycle unit.
- Deletion must be verified rather than assumed.

## Prerequisites

- Lab 7 validation is complete.
- The instructor has confirmed that nothing in the Resource Group must be retained.

## Architecture

The cleanup target is exactly:

```text
rg-mmaug-azurefundamentals
```

Do not delete any subscription, bootcamp-shared Resource Group, or resource outside this target.

## Step-by-Step Instructions

> **WARNING:** Deleting a Resource Group permanently deletes all resources contained inside it. This operation is irreversible.

1. Search for **Resource groups** and open `rg-mmaug-azurefundamentals`.
2. Confirm the exact Resource Group name and correct subscription.
3. Review every item on the Resource Group overview. Stop if an item is not part of this workshop.
4. Select **Delete resource group**.
5. Read Azure's deletion warning.
6. Enter `rg-mmaug-azurefundamentals` when Azure asks you to confirm the name.
7. Complete any additional confirmation shown by the portal.
8. Select **Delete**.
9. Wait for the deletion notification. Resource deletion can continue in the background.

### Azure CLI alternative

First, list the target and its resources:

```bash
az group show --name rg-mmaug-azurefundamentals --output table
az resource list --resource-group rg-mmaug-azurefundamentals --output table
```

Only after checking the exact target, start deletion. Omitting `--yes` keeps the confirmation prompt:

```bash
az group delete --name rg-mmaug-azurefundamentals
```

## What You Should See

Azure should accept the deletion request. The Resource Group may remain visible briefly with deletion in progress.

## Validation

Run:

```bash
az group exists --name rg-mmaug-azurefundamentals
```

Expected final output:

```text
false
```

If it returns `true`, wait a few minutes and check again. If deletion fails, open the notification or Activity Log and tell the instructor.

## Common Errors

| Issue | Safe action |
|---|---|
| Delete button is unavailable | Ask the instructor; a role or resource lock may prevent deletion. |
| Resource Group contains unfamiliar resources | Stop immediately and ask the instructor before deleting. |
| Deletion remains in progress | Wait and validate again; some resources take longer. |
| Deletion fails | Record the exact error and ask the instructor to check locks or policy. |

## Knowledge Check

1. Why is stopping a VM not the same as deleting the lab environment?
2. What output confirms that the Resource Group is gone?

## Cleanup

This lab is the cleanup. Before leaving, show the instructor either the portal result or `false` from `az group exists`.

