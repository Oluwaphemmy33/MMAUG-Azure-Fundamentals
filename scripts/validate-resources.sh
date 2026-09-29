#!/usr/bin/env bash
set -euo pipefail

RESOURCE_GROUP="rg-mmaug-azurefundamentals"

echo "Active Azure context:"
az account show --query '{subscription:name, tenant:tenantId}' --output table

echo
echo "Resource Group:"
az group show \
  --name "${RESOURCE_GROUP}" \
  --query '{name:name, location:location, state:properties.provisioningState}' \
  --output table

echo
echo "Resources:"
az resource list \
  --resource-group "${RESOURCE_GROUP}" \
  --query '[].{name:name, type:type, location:location}' \
  --output table

