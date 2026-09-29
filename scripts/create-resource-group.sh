#!/usr/bin/env bash
set -euo pipefail

RESOURCE_GROUP="rg-mmaug-azurefundamentals"
LOCATION="swedencentral"

echo "Active Azure context:"
az account show --query '{subscription:name, tenant:tenantId, user:user.name}' --output table

echo
read -r -p "Create ${RESOURCE_GROUP} in ${LOCATION}? Type CREATE to continue: " confirmation
if [[ "${confirmation}" != "CREATE" ]]; then
  echo "No changes made."
  exit 1
fi

az group create \
  --name "${RESOURCE_GROUP}" \
  --location "${LOCATION}" \
  --output table

az group show \
  --name "${RESOURCE_GROUP}" \
  --query '{name:name, location:location, state:properties.provisioningState}' \
  --output table

