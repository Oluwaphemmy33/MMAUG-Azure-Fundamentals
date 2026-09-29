# Microsoft Azure Fundamentals: Two-Hour Hands-On Labs

Student lab repository for the **MMAUG 30-Day AI and DevOps Fundamentals Bootcamp** (1-30 October 2026).

This lab-only workshop introduces Azure through six guided activities. It is designed for complete beginners and fits a 120-minute instructor-led session.

## Learning outcomes

By the end of the workshop, you should be able to:

- Navigate the Azure portal and find core services.
- Create and validate an Azure resource group.
- Deploy and inspect a small Windows virtual machine.
- Identify a virtual network, subnet, network interface, IP addresses, and network security group.
- Create private Blob storage and upload and download a file.
- Deploy a simple static page to Azure App Service.
- Find resource creation events in the Activity Log.
- Validate and safely remove all lab resources.

## Required access

- A modern browser and internet connection.
- A bootcamp-provided Azure account and subscription.
- Permission to create resources in the assigned subscription or resource group.
- Permission from the instructor before creating billable resources.

Optional: Azure CLI, Git, Visual Studio Code, or PowerShell. Azure Cloud Shell in the portal already includes Azure CLI.

## Important notices

> **COST NOTICE:** Virtual Machines and App Service plans can incur charges. Use only the subscription, region, and sizes approved by the instructor. Complete the cleanup lab before leaving.

> **SECURITY NOTICE:** Never place passwords, access keys, tokens, or connection strings in this repository. Create your own strong VM password only when authorized. Do not share it with classmates or the instructor.

## Two-hour schedule

| Time | Activity |
|---:|---|
| 10 min | [Lab 1: Explore the Azure Portal](labs/lab01-azure-portal.md) |
| 10 min | [Lab 2: Create a Resource Group](labs/lab02-resource-group.md) |
| 30 min | [Lab 3: Deploy a Windows Virtual Machine](labs/lab03-virtual-machine.md) |
| 10 min | [Lab 4: Explore Azure Networking](labs/lab04-networking.md) |
| 20 min | [Lab 5: Use Azure Blob Storage](labs/lab05-storage.md) |
| 25 min | [Lab 6: Deploy an App Service Web App](labs/lab06-app-service.md) |
| 5 min | [Activity Log and Final Validation](labs/lab07-validation.md) |
| 5 min | [Cleanup](labs/lab08-cleanup.md) |
| **120 min** | **Total** |

## Resource names

| Resource | Name |
|---|---|
| Resource group | `rg-mmaug-azurefundamentals` |
| Region | `Sweden Central` / CLI value `swedencentral` |
| Virtual machine | `vm-mmaug-demo01` |
| Virtual network | `vnet-mmaug-demo` |
| Subnet | `snet-workload` |
| Network security group | `nsg-mmaug-demo` |
| Storage account | `stmmaug<uniquevalue>` |
| Blob container | `labfiles` |
| App Service plan | `asp-mmaug-demo` |
| Web app | `app-mmaug-<uniquevalue>` |

Azure Storage and Web App names must be globally unique. Replace `<uniquevalue>` with a short value assigned by the instructor, such as your initials plus four digits. Storage account names allow only lowercase letters and numbers.

## Repository contents

```text
.
|-- README.md
|-- INSTRUCTOR-GUIDE.md
|-- labs/
|   |-- lab01-azure-portal.md
|   |-- lab02-resource-group.md
|   |-- lab03-virtual-machine.md
|   |-- lab04-networking.md
|   |-- lab05-storage.md
|   |-- lab06-app-service.md
|   |-- lab07-validation.md
|   `-- lab08-cleanup.md
|-- starter-files/
|   |-- index.html
|   `-- azure-fundamentals.txt
|-- scripts/
|   |-- create-resource-group.sh
|   |-- validate-resources.sh
|   `-- cleanup.sh
`-- diagrams/
    `-- azure-architecture.md
```

## Lab rules

1. Use only the Azure subscription identified by the instructor.
2. Stop if a requested region, size, or permission differs from the lab environment.
3. Do not enable anonymous Blob access.
4. Do not expose RDP or other ports to the entire internet unless the instructor explicitly authorizes a temporary, restricted rule.
5. Never paste credentials into chat, screenshots, source files, or commands.
6. Delete the lab resource group at the end and confirm that it no longer exists.

## Quick CLI checks

Open **Cloud Shell** in the Azure portal, choose Bash, and run:

```bash
az account show --output table
az group show --name rg-mmaug-azurefundamentals --output table
az resource list --resource-group rg-mmaug-azurefundamentals --output table
```

These commands display your current subscription, resource group, and lab resources. They do not change anything.

## Troubleshooting

| Problem | Check | Safe response |
|---|---|---|
| Permission denied | Confirm the selected subscription and read the error details. | Ask the instructor to verify your assigned role. Do not attempt RBAC changes. |
| Region or VM size unavailable | Review the available options in the portal. | Use only an instructor-approved alternative. |
| Resource name unavailable | Check whether the name must be globally unique. | Change only the `<uniquevalue>` portion. |
| Deployment failed | Open the deployment details and select the failed operation. | Read the first specific error; correct that field and retry once. |
| Resource not visible | Check subscription, filters, and resource group. | Refresh the page and clear portal filters. |
| CLI command fails | Run `az account show` and review spelling. | Set the correct subscription with instructor guidance. |
| Web app does not load | Check deployment status and browse the HTTPS URL. | Refresh after a minute; inspect App Service deployment logs. |

## Official references

- [Azure portal documentation](https://learn.microsoft.com/azure/azure-portal/)
- [Create a Windows VM](https://learn.microsoft.com/azure/virtual-machines/windows/quick-create-portal)
- [Upload and download blobs in the portal](https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal)
- [Deploy files to Azure App Service](https://learn.microsoft.com/azure/app-service/deploy-zip)
- [Manage Azure resource groups with Azure CLI](https://learn.microsoft.com/azure/azure-resource-manager/management/manage-resource-groups-cli)

