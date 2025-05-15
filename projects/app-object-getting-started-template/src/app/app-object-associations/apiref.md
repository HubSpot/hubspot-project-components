note: as of writing this has yet to be implemented and is subject to change; this is a rough outline

Required fields marked with *

- `firstObjectType *`/`secondObjectType *` -- denotes the two objects being associated. At least one of these must be an App Object defined in this project and the other can also be an App Object defined in this project or can be a standard object. App Objects are referred to using the `uid` specified in their source file. Standard objects are referred to by `fullyQualifiedName`.  The ordering of these two fields is arbitrary because associations are bidirectional. Because of this, developer cannot define two source files that use the same pair of objects even if they switch the order.
- `firstToSecondLimit` -- sets a limit on how many secondObject records a firstObject record can be associated to; if not specified, there is no custom limit (referred to as "Many" Association Settings)
- `secondToFirstLimit ` -- sets a limit on how many firstObject records a secondObject record can be associated to; if not specified, there is no custom limit (referred to as "Many" in the Association Settings)
- `labels` -- list of developer-defined labels; same as when a customer defines custom labels for standard objects, except developers are defining them for associations to/from App Objects instead of customers. Customers cannot define custom labels for App Object associations.
- `firstLabel` / `secondLabel` -- sets a pair of labels for firstObject and secondObject; must both be specified for a label object if `sharedLabel` isn't specified; cannot be specified if `sharedLabel` is specified.
- `sharedLabel` -- sets a single label for both objects (i.e. they have the same relationship); must be specified for a label object if `firstLabel`/`secondLabel` aren't specified; cannot be specified if `firstLabel`/`secondLabel` are specified.
- `firstToSecondLabelLimit` / `secondToFirstLabelLimit` -- same as `firstToSecondLimit` / `secondToFirstLimit` but for the specific label. Cannot be greater than `firstToSecondLimit` / `secondToFirstLimit`
