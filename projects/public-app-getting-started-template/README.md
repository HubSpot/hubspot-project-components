# HubSpot Getting Started Project Template

This is a project containing a public app, so developers can get up and running on HubSpot Developer Projects.

## Set up
NOTE: You need to be a super-admin in the developer account, where you will be uploading your app.

1. Run `hs project upload --account=<dev-acct-id>` to build and deploy the project to your developer account.
2. Retrieve the install URL located in your app's auth tab.
3. Use that install URL to install the app in a developer test account of your choice.
![public-app-1](https://github.com/HubSpot/hubspot-project-components/assets/25392256/3d1b742a-81bc-44f9-b83c-a347963f96da)

4. Once the app is installed in the developer test portal, navigate to the related object's record customization page. For example, if your UIE extension card will appear on Contacts record pages, navigate to the Contacts record customization page.
5. Scroll down to Data Management, expand the Objects navigation item, and select the appropriate object.
6. Select the Record Customization tab, and choose the specified layout.
![public-app-2](https://github.com/HubSpot/hubspot-project-components/assets/25392256/13d5e992-9037-40db-b18b-da195892689b)

7. You can either update the default view or create a team view. Then add the UI Extension card to it.
![public-app-3](https://github.com/HubSpot/hubspot-project-components/assets/25392256/acb3283b-09ac-493d-aab3-a8f8102785ba)

8. ***For webhooks:*** Navigate to the `webhooks.json` config file and update the `targetUrl` setting to a url that you want the webhooks to get sent to
9. Once the project is built and deployed with a webhook configuration, navigate to the objects that you have subscribed to in the CRM. For example, in this project only webhook subscriptions on the contact object were created, so navigate to the contacts tab in the CRM.
<img width="1792" alt="public-app-4" src="https://github.com/HubSpot/hubspot-project-components/assets/25392256/5707c77f-0431-4fe9-90e7-91e711293519">
10. Verify that the webhook subscriptions work by creating/updating/deleting a contact and confirm that your specified webhook URL received the event

## Gotchas
Public app UI extensions currently only render for enterprise portals (non-enterprise portals are a work in progress)
