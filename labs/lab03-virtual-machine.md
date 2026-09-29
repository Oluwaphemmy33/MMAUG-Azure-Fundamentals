# Lab 3: Deploy a Windows Virtual Machine

**Time:** 30 minutes

> **COST NOTICE:** A VM, managed disk, and public IP can incur charges. Create them only with instructor approval and complete Lab 8.

## Objective

Deploy a small Windows VM and observe the networking resources Azure creates around it.

## What You Will Learn

- A VM is a software-defined computer in Azure.
- An image supplies the starting operating system.
- A size defines compute capacity and price.
- A managed OS disk stores the operating system.
- A network interface connects the VM to a subnet.
- An NSG filters network traffic.

## Prerequisites

- `rg-mmaug-azurefundamentals` exists.
- The instructor has approved a Windows image, VM size, and credentials policy.
- You have a unique, private password ready. Never paste it into notes, chat, screenshots, or source files.

## Architecture

```text
vnet-mmaug-demo (10.0.0.0/16)
`-- snet-workload (10.0.1.0/24)
    `-- VM network interface -- vm-mmaug-demo01
             |-- private IP
             |-- optional public IP
             `-- nsg-mmaug-demo
```

## Step-by-Step Instructions

1. Search for **Virtual machines** in the portal.
2. Select **Create** > **Azure virtual machine**.
3. On **Basics**, select the bootcamp subscription and `rg-mmaug-azurefundamentals`.
4. Enter `vm-mmaug-demo01` as the VM name.
5. Select **Sweden Central**, unless the instructor specifies an approved alternative.
6. Keep the availability option selected by the instructor. Availability Zones are separate datacenter locations within a region; they are not required for this short lab.
7. Select a currently supported Windows Server image approved by the instructor, such as **Windows Server 2022 Datacenter: Azure Edition - x64 Gen2**.
8. Select the smallest instructor-approved size that is available. Do not choose a premium, GPU, or high-memory size.
9. For the administrator account, enter `<USERNAME>` and `<CREATE-YOUR-OWN-STRONG-PASSWORD>`. Replace both placeholders privately in the portal.
10. Under inbound port rules, choose **None** unless the instructor explicitly authorizes temporary RDP access. The lab does not require signing in to the VM.
11. Open **Disks**. Keep the instructor-approved default OS disk and delete-with-VM behavior. Do not add data disks.
12. Open **Networking**.
13. Create or select `vnet-mmaug-demo` with address space `10.0.0.0/16`.
14. Create or select `snet-workload` with range `10.0.1.0/24`.
15. Set the NIC network security group to **Advanced**, create `nsg-mmaug-demo`, and add no inbound rules unless instructed.
16. Use an instructor-approved public IP setting. A public IP is optional for this inspection lab.
17. Check **Delete public IP and NIC when VM is deleted** if the option is shown. The Resource Group cleanup still remains mandatory.
18. Leave unmentioned settings at bootcamp-approved defaults.
19. Select **Review + create** and read any warnings.
20. After validation passes, confirm the estimated hourly cost with the instructor, then select **Create**.
21. While deployment runs, begin Lab 4. Return when the deployment reports success.

## What You Should See

The deployment should create a VM, OS disk, network interface, VNet, subnet, NSG, and possibly a public IP. Names for the disk, NIC, and IP may be generated from the VM name.

## Validation

Open the VM overview and confirm **Provisioning state: Succeeded**. The power state should show **Running**.

Optional read-only CLI checks:

```bash
az vm show \
  --resource-group rg-mmaug-azurefundamentals \
  --name vm-mmaug-demo01 \
  --show-details \
  --query "{name:name, location:location, powerState:powerState, privateIps:privateIps, publicIps:publicIps}" \
  --output table
```

```bash
az resource list \
  --resource-group rg-mmaug-azurefundamentals \
  --output table
```

## Common Errors

| Issue | Safe action |
|---|---|
| Size unavailable or quota exceeded | Ask the instructor for an approved size or region; do not repeatedly retry. |
| Password validation fails | Create a stronger unique password privately. Do not share it. |
| Policy denies a public IP or image | Follow the bootcamp policy and use the instructor's approved configuration. |
| Deployment fails | Open **Deployment details**, select the failed operation, and read the first specific error. |
| VM cannot be found | Clear filters and confirm the subscription and Resource Group. |

## Knowledge Check

1. Which component stores the VM operating system?
2. Which component connects the VM to the subnet?
3. Why is RDP from the entire internet risky?

## Cleanup

Keep the VM for Lab 4. If the class pauses for a long break, select **Stop** and confirm **Stopped (deallocated)**. Deleting the Resource Group in Lab 8 is the final cleanup.

