#!/usr/bin/env bash
set -euo pipefail

RESOURCE_GROUP="rg-mmaug-azurefundamentals"

echo "WARNING: This permanently deletes the Resource Group and every resource inside it."
echo "Active Azure context:"
az account show --query '{subscription:name, tenant:tenantId, user:user.name}' --output table

echo
echo "Deletion target and contents:"
az group show --name "${RESOURCE_GROUP}" --output table
az resource list --resource-group "${RESOURCE_GROUP}" --output table

echo
read -r -p "Type the exact Resource Group name to continue: " confirmation
if [[ "${confirmation}" != "${RESOURCE_GROUP}" ]]; then
  echo "Name did not match. No resources were deleted."
  exit 1
fi

az group delete --name "${RESOURCE_GROUP}"

echo
echo "Check again after deletion completes. Expected final result: false"
az group exists --name "${RESOURCE_GROUP}"

