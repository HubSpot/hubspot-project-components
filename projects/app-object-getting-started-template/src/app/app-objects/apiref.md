Required fields are marked with *

- `name *` -- the programmatic name the developer wants to use for this App Object. Must be `UPPER_SNAKE_CASE`. The resulting fullyQualifiedName of the object will be of the form `a<appId>_<name>`
- `appPrefix` -- App Object names displayed to customers in the CRM will represent the combination of appPrefix and either the singularForm/pluralForm of the object name (e.g. "appPrefix": "Vroom", "singularForm": "Car", then the singular display name to customers will be "Vroom Car")
- `description` -- the description of the object, shown to customers in locations such as the Object Settings UI. Max length of 72 characters.
- `singularForm *` -- label shown to customer to refer to this object in singular tense. Must be only letters and spaces, with the first letter of each word capatalized (e.g. "My Object", "Object", "A Cool Object"). Max lenghth of 50.
- `pluralForm *` -- label shown to customer to refer to this object in plural tense. Same pattern/length restrictions as singularForm.
- `properties *` -- list of developer-defined properties; properties are defined with the same fields as our [public Properties API](https://developers.hubspot.com/docs/guides/api/crm/properties) with a few exceptions listed in the bullets below. The resulting properties will have `a<appId>_` prefixed to the provided name but that prefix should not be provided by the developer it is added automatically.
  - we do not have the field `displayOrder` because it is deprecated and doesn't do anything on the public API
  - we do not have the fields `referencedObjectType` or `externalOptions`
  - we have an additional boolean field `readOnlyValue`. It defaults to `false`. If `true`, customer won't be able to modify the value of the property (i.e. it can only be written by the integrator)
  - `formField` defaults to false (I believe this is the same behavior as the public API, but that's not explicit in the API reference)
  - `name` must be `lower_snake_case`
  - `label` must start with a capital letter, can only be comprised of letters and spaces, and the first letter of each word can optionally be uppercase, must all other letters must be lowercase
  - `groupName`, if provided, must be lowercase letters and digits possibly separated by single underscores or dots (e.g. `widget_activity`, `some.widget.info.2`, `characteristics`)
  - `value` on an option must be `lower_snake_case`
  - `label` on an option must follow the same pattern for `label` on the property itself described above
- `primaryDisplayLabelPropertyName *` -- name of property that should be used as the primary display property as described [here](https://knowledge.hubspot.com/object-settings/create-custom-objects#:~:text=object%27s%20singular%20name.-,Primary%20display%20property,-%3A%20the%20property%20used). Should match name provided by developer in `properties` list (i.e. it should not include the generated `a<appId>_` prefix. That will be handled automatically)
- `secondaryDisplayLabelPropertyNames *` -- list of names of properties that should be used as secondary display properties as described [here](https://knowledge.hubspot.com/object-settings/create-custom-objects#:~:text=to%20the%20property.-,Secondary%20properties,-%3A%20additional%20identifying%20properties). Should match name provided by developer in `properties` list (i.e. they should not include the generated `a<appId>_` prefix. That will be handled automatically). This list can be empty but it must be provided, and can have up to a maximum of two properties.
- `settings *` -- contains flags for enabling/disabling functionality as described below
  - `hasRecordPage *` -- boolean flag; determines whether this App Object will have a record page. If `false`, the index page will still exist but it will not link to any record page
  - `allowsUserCreatedRecords *` -- boolean flag; determines whether customer will be able to create records or whether records are only able to be created by the developer. For instance, setting this to `false` will disable the "Create Record" button on the index page. This is still being actively worked on and will be more robust before being introduced to production install customers.
  - `hasEngagements *` -- boolean flag; determines whether the App Object will have engagements functionality. If not, the record page will have associated functionality removed (e.g. the activity buttons, activity cards, activity-related timeline filtering, etc). _Timeline filtering is not currently working but will be later in the beta._

The following cannot be changed once deployed:

- App Object cannot be deleted or have its name changed
- Properties cannot be deleted or have the following fields changed:
  - `name`
  - `type`
  - `fieldType`
  - `hasUniqueValue`
  - Options cannot be removed or have their `value` changed
- `hasEngagements` cannot be turned off once its turned on

