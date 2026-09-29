# Instructor Guide

## Session goal

Lead beginners through one small Azure environment in 120 minutes. Explain terms at the moment students encounter them; avoid a separate lecture.

## Before the session

- Confirm every participant can sign in and see the correct subscription.
- Confirm the bootcamp policy permits resource creation in `Sweden Central`.
- Check quota and availability for a low-cost Windows VM size.
- Confirm whether students may create App Service plans and public IP addresses.
- Publish this repository and replace `<REPOSITORY-URL>` in Lab 6 if students will clone it.
- Assign each participant a lowercase unique suffix for Storage and Web App names.
- Decide whether students will deploy the VM or inspect an instructor-prepared VM.
- Set a hard cleanup checkpoint before the session ends.

## Teaching sequence

| Minute | Instructor checkpoint |
|---:|---|
| 0-10 | Portal sign-in, subscription check, service search |
| 10-20 | Create and validate resource group |
| 20-50 | Create VM and explain generated networking resources while deployment runs |
| 50-60 | Inspect VNet, subnet, NIC, IPs, and NSG |
| 60-80 | Create private Blob container; upload and download sample file |
| 80-105 | Create App Service and deploy the static page |
| 105-110 | Find creation operations in Activity Log |
| 110-115 | Run the final checklist |
| 115-120 | Delete the resource group and confirm deletion |

## Facilitation notes

- Pair students if sign-in or permissions consume more than five minutes.
- Ask students to start Lab 4 while the VM deployment completes.
- If VM deployment is still running at minute 45, switch to the prepared demonstration VM.
- Do not spend live time troubleshooting individual account policy. Record the error and pair the learner with a working environment.
- App Service creation and ZIP deployment are the second time risk. Demonstrate from one instructor account if participant permissions block it.
- Keep the portal zoom level readable and narrate the current subscription and resource group before selecting **Create**.

## Key explanations

- **Resource group:** a lifecycle container for related Azure resources. Deleting it removes everything inside.
- **Virtual machine:** a computer hosted in Azure that the customer still manages at the operating-system level.
- **VNet and subnet:** a private network and a smaller address range inside it.
- **NSG:** a rule list that permits or denies network traffic.
- **Blob container:** a private grouping for object files inside a Storage account.
- **App Service:** a managed platform that runs a web application without managing a server operating system.
- **Activity Log:** the subscription-level record of control-plane actions such as creating or deleting a resource.

## Knowledge checks and answers

1. What is the purpose of a Resource Group?  
   **Answer:** To organize related resources and manage their lifecycle, access, and costs together.
2. What is the difference between a VNet and a subnet?  
   **Answer:** A VNet is the overall private network; a subnet is a smaller address range within it.
3. What does an NSG control?  
   **Answer:** Allowed and denied inbound and outbound network traffic.
4. Why is the Blob container private?  
   **Answer:** Private access prevents unauthenticated internet users from reading its files.
5. How is App Service different from a VM?  
   **Answer:** App Service manages the platform and operating system; with a VM, the customer manages the guest operating system.
6. Why delete unused lab resources?  
   **Answer:** To stop avoidable charges and reduce security exposure.

## Common beginner mistakes

- Selecting the wrong subscription.
- Creating a second resource group because the existing one is not visible through a filter.
- Entering spaces or uppercase characters in a Storage account name.
- Zipping the parent folder instead of the contents containing `index.html`.
- Assuming a stopped VM has no compute charge; a VM must show **Stopped (deallocated)** to stop compute billing.
- Deleting only the VM and leaving disks, IP addresses, or App Service plans behind.

## Emergency time-saving path

If the class is more than ten minutes behind, skip participant VM creation and let students inspect an instructor-prepared VM. Preserve Blob Storage, App Service, Activity Log, validation, and cleanup because these provide broader hands-on coverage.

## Final instructor check

- Every student can explain one relationship between two Azure resources.
- No credentials were shared or stored.
- Every participant initiated deletion of `rg-mmaug-azurefundamentals`.
- The instructor confirms no student lab resource group remains.

