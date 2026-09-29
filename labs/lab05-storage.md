# Lab 5: Use Azure Blob Storage

**Time:** 20 minutes

> **COST NOTICE:** Storage operations and retained data can incur small charges. This lab uses one tiny file and removes the complete Resource Group afterward.

## Objective

Create a Storage account, make a private Blob container, and upload and download a sample file.

## What You Will Learn

- A **Storage account** is the top-level Azure resource for storage services.
- A **container** groups Blob objects.
- A **Blob** stores unstructured data such as text, images, or backups.
- LRS keeps multiple copies in one datacenter; ZRS distributes copies across availability zones; GRS also replicates to a secondary region.

## Prerequisites

- `rg-mmaug-azurefundamentals` exists.
- A unique suffix from the instructor.
- [azure-fundamentals.txt](../starter-files/azure-fundamentals.txt) is available locally.

## Architecture

```text
Storage account: stmmaug<uniquevalue>
`-- Private container: labfiles
    `-- Blob: azure-fundamentals.txt
```

## Step-by-Step Instructions

1. Search for **Storage accounts** and select **Create**.
2. Select the bootcamp subscription and `rg-mmaug-azurefundamentals`.
3. Enter `stmmaug<uniquevalue>` using only lowercase letters and numbers. Replace the placeholder; the final name must be 3-24 characters and globally unique.
4. Select **Sweden Central** unless the instructor specifies otherwise.
5. Choose **Standard** performance and **Locally-redundant storage (LRS)** for this short lab, subject to bootcamp policy.
6. On the advanced settings, keep secure transfer required. Keep anonymous Blob access disabled.
7. Leave unmentioned options at instructor-approved defaults.
8. Select **Review + create**, wait for validation, then select **Create**.
9. Open the Storage account after deployment.
10. Under **Data storage**, select **Containers**.
11. Select **+ Container** and enter `labfiles`.
12. Keep anonymous access set to **Private (no anonymous access)** and create the container.
13. Open `labfiles` and select **Upload**.
14. Select `starter-files/azure-fundamentals.txt` from this repository and upload it.
15. Select the uploaded Blob and review its properties. Do not copy or share account keys.
16. Download the Blob and open it locally.
17. Return to the Storage account overview and identify performance, redundancy, region, and secure transfer settings.

## What You Should See

- A StorageV2 account in `Sweden Central`.
- One private container named `labfiles`.
- One Blob named `azure-fundamentals.txt`.
- Downloaded text: `Welcome to the MMAUG Microsoft Azure Fundamentals Lab.`

## Validation

Replace the placeholder in the following read-only commands:

```bash
STORAGE_ACCOUNT="stmmaug<uniquevalue>"

az storage account show \
  --resource-group rg-mmaug-azurefundamentals \
  --name "$STORAGE_ACCOUNT" \
  --query "{name:name, location:location, sku:sku.name, httpsOnly:enableHttpsTrafficOnly}" \
  --output table
```

If your account has data-plane permission, list Blobs using your signed-in identity:

```bash
az storage blob list \
  --account-name "$STORAGE_ACCOUNT" \
  --container-name labfiles \
  --auth-mode login \
  --output table
```

If the second command is denied, do not retrieve access keys. Portal upload may have used a permitted access path; ask the instructor about data-plane RBAC.

## Common Errors

| Issue | Safe action |
|---|---|
| Storage name unavailable | Change only `<uniquevalue>`; use lowercase letters and numbers. |
| Container creation denied | Ask the instructor to verify Blob data permissions. |
| Blob cannot be viewed anonymously | This is expected because the container is private. |
| CLI requests a key | Stop and use `--auth-mode login`; do not expose account keys. |

## Knowledge Check

1. Why must a Storage account name be globally unique?
2. What security benefit comes from a private container?
3. What is the basic difference between LRS and ZRS?

## Cleanup

Keep the Storage account for final validation. Lab 8 deletes it with the Resource Group.

