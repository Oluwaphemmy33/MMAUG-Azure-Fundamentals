# Lab 4: Explore Azure Networking

**Time:** 10 minutes

## Objective

Trace the network path from the VM to its subnet, VNet, IP addresses, and NSG.

## What You Will Learn

- A **VNet** is a private network boundary in Azure.
- A **subnet** is a smaller address range within a VNet.
- A **NIC** is the VM's network interface.
- A private IP is used inside the virtual network; a public IP can be reached from the internet when security rules permit it.
- An **NSG** contains inbound and outbound traffic rules.

## Prerequisites

- Lab 3 has created or is creating `vm-mmaug-demo01`.
- No RDP connection is required.

## Architecture

See [the complete architecture diagram](../diagrams/azure-architecture.md).

`10.0.0.0/16` provides a large private address range for the VNet. `10.0.1.0/24` is a smaller range inside it for the workload subnet. The slash numbers describe how much of an IP address identifies the network; a larger slash number means a smaller range.

## Step-by-Step Instructions

1. Open `rg-mmaug-azurefundamentals` and select `vnet-mmaug-demo`.
2. On **Overview** or **Address space**, locate `10.0.0.0/16`.
3. Select **Subnets**, then open or identify `snet-workload` and confirm `10.0.1.0/24`.
4. Return to the Resource Group and open `vm-mmaug-demo01`.
5. Select **Networking** or **Network settings**, then open the attached network interface.
6. On the NIC overview or **IP configurations**, identify its private IP address.
7. If a public IP was created, open it and identify the IP address and assignment setting. Do not change either.
8. Open `nsg-mmaug-demo` from the NIC or Resource Group.
9. Select **Inbound security rules**. Observe the default deny rule and any instructor-approved rule.
10. Select **Outbound security rules**. Observe the default rules.

## What You Should See

- VNet address space: `10.0.0.0/16`
- Subnet range: `10.0.1.0/24`
- One NIC attached to `vm-mmaug-demo01`
- A private IP from the subnet range
- An NSG with default rules
- A public IP only if the lab policy allowed one

## Validation

```bash
az network vnet subnet show \
  --resource-group rg-mmaug-azurefundamentals \
  --vnet-name vnet-mmaug-demo \
  --name snet-workload \
  --query "{name:name, addressPrefix:addressPrefix}" \
  --output table
```

```bash
az network nsg rule list \
  --resource-group rg-mmaug-azurefundamentals \
  --nsg-name nsg-mmaug-demo \
  --output table
```

The first command should show the subnet. The second may show no custom rules; Azure's default NSG rules remain visible in the portal.

## Common Errors

| Issue | Safe action |
|---|---|
| VNet or NSG has a generated name | Return to the VM's Networking page and follow the linked resource. |
| No public IP is present | This is acceptable and safer when remote access is unnecessary. |
| RDP does not work | Do not add an internet-wide rule. The workshop does not require RDP. |

## Knowledge Check

1. What is the relationship between a VNet and a subnet?
2. Which IP type is normally used between resources inside a VNet?
3. What does an NSG do?

## Cleanup

Do not delete individual networking components. They will be removed with the Resource Group in Lab 8.

