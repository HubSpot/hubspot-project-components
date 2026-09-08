# HubSpot SCIM

## Overview

SCIM (System for Cross-domain Identity Management) enables automated user provisioning and de-provisioning between your Identity Provider (IdP) and HubSpot. By setting up SCIM in your app, you can automatically create, update, and manage HubSpot users from your IdP, ensuring user accounts stay in sync and meeting IT admin and compliance requirements.

**Note:** This feature requires a HubSpot Professional or Enterprise account, and SSO must be enabled in your HubSpot account.

SCIM is configured in the `src/app/scim/` directory of your HubSpot project.

## Structure

SCIM consists of a configuration file:

1. **Configuration File (`scim-hsmeta.json`)**: Defines the SCIM configuration, including whether role synchronization is enabled

The configuration file defines:
- `roleSyncEnabled`: Whether to sync user roles from your IdP to HubSpot permission sets (requires exact name matching)

## Prerequisites

Before setting up SCIM:

- [Single sign-on (SSO)](https://knowledge.hubspot.com/account-security/set-up-single-sign-on-sso) must be enabled in your HubSpot account
- Set up [user permission sets](https://knowledge.hubspot.com/user-management/create-permission-sets) in HubSpot based on your IdP roles
- Have access to your DNS provider to verify your domain
- **Note:** There's a limit of one SCIM app per HubSpot account

## Using SCIM

After uploading your project with `hs project upload`:

1. Navigate to **Development** > **Projects** in HubSpot
2. Click your project name, then click the app name under *Project Components*
3. Under *App Features*, click the **scim** component
4. Add and verify your domain (required for production use)
5. Click the **Distribution** tab and install the app in your account
6. Copy the access token and use it with the Tenant URL `https://api.hubspot.com/scim/v2` in your IdP settings

Once configured, your IdP can automatically provision and manage HubSpot users. Users created through SCIM can only have their permissions edited in HubSpot (if permission set management is not configured); all other user information must be updated through your IdP.

## Resources

- [Set up SCIM for your app](https://developers.hubspot.com/docs/apps/developer-platform/add-features/scim): Complete guide to setting up SCIM
