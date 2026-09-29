# Lab Architecture

```mermaid
flowchart TB
    S[Azure Subscription] --> RG[Resource Group<br/>rg-mmaug-azurefundamentals]
    RG --> VNET[Virtual Network<br/>vnet-mmaug-demo<br/>10.0.0.0/16]
    VNET --> SUBNET[Subnet<br/>snet-workload<br/>10.0.1.0/24]
    SUBNET --> NIC[Network Interface]
    NSG[Network Security Group<br/>nsg-mmaug-demo] --> NIC
    PIP[Public IP<br/>temporary lab access] --> NIC
    NIC --> VM[Windows VM<br/>vm-mmaug-demo01]
    RG --> ST[Storage Account<br/>stmmaug unique value]
    ST --> BC[Private Blob Container<br/>labfiles]
    BC --> FILE[azure-fundamentals.txt]
    RG --> PLAN[App Service Plan<br/>asp-mmaug-demo]
    PLAN --> APP[Web App<br/>app-mmaug unique value]
    APP --> PAGE[index.html]
```

The resource group holds resources that share one lab lifecycle. The VNet address space is `10.0.0.0/16`; the subnet uses the smaller `10.0.1.0/24` range. The NSG filters traffic. The Storage account and App Service are separate services in the same resource group.

