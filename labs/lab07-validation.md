# Lab 7: Activity Log and Final Validation

**Time:** 5 minutes

## Objective

Use Azure's Activity Log and a final checklist to confirm what was deployed.

## What You Will Learn

- The **Activity Log** records control-plane events such as creating, updating, or deleting Azure resources.
- Validation checks compare the intended environment with what actually exists.

## Prerequisites

- Complete as many of Labs 1-6 as your bootcamp permissions allow.
- Keep the Resource Group until this validation is complete.

## Architecture

Review [the lab architecture diagram](../diagrams/azure-architecture.md) and compare it with the Resource Group contents.

## Step-by-Step Instructions

1. Open `rg-mmaug-azurefundamentals`.
2. Select **Activity log** in the Resource Group menu.
3. Set a time range that includes this workshop.
4. Look for successful operations such as **Create or Update Resource Group**, VM writes, Storage account writes, or Web App writes.
5. Select one event and identify its time, status, operation name, and caller. Do not display the caller's details on a public screen.
6. Return to **Overview** and review the resources.

## What You Should See

Activity Log entries with **Succeeded**, **Failed**, or **Started** status. A failed event is not automatically a security issue; open it to understand the attempted operation.

## Validation

Mark each item that exists and opens successfully:

- [ ] Resource Group: `rg-mmaug-azurefundamentals`
- [ ] Virtual Network: `vnet-mmaug-demo`
- [ ] Subnet: `snet-workload`
- [ ] Network Security Group: `nsg-mmaug-demo`
- [ ] Virtual Machine: `vm-mmaug-demo01`
- [ ] Storage Account: `stmmaug<uniquevalue>`
- [ ] Blob container: `labfiles`
- [ ] Blob: `azure-fundamentals.txt`
- [ ] App Service plan: `asp-mmaug-demo`
- [ ] Web App: `app-mmaug-<uniquevalue>`
- [ ] Web page loads over HTTPS
- [ ] Activity Log contains workshop events

Run this read-only inventory command:

```bash
az resource list \
  --resource-group rg-mmaug-azurefundamentals \
  --query "[].{name:name, type:type, location:location}" \
  --output table
```

An empty result means the group has no resources, the group is wrong, or your account cannot list them.

## Common Errors

| Issue | Safe action |
|---|---|
| Recent events are missing | Increase the time range and refresh. |
| A resource name differs | Trace it from the parent resource; generated NIC, disk, and IP names may differ. |
| A resource failed to deploy | Record the error. Do not delay mandatory cleanup to rebuild it. |

## Knowledge Check

1. What kind of actions appear in the Activity Log?
2. Why should deployment be validated before cleanup?

## Cleanup

Continue immediately to Lab 8.

