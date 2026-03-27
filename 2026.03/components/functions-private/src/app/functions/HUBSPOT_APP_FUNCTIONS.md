# HubSpot App Functions

## Overview

HubSpot functions are server-side JavaScript functions that execute within HubSpot's infrastructure, eliminating the need to manage external servers.

Functions are stored in the `src/app/functions/` directory of your HubSpot project.

## Structure

Each function component consists of two files:

1. **Javascript Component**: Contains the business logic of your function.
2. **Configuration File (`*-hsmeta.json`)**: Defines the function's metadata

## Types of App Functions

There are two variations:

1. **Private**: These functions are only accessible from within your app
2. **Endpoint**: These functions are publicly available and are accessed via an exposed endpoint
