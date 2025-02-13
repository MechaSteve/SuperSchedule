# Super Schedule for Residio API

This app will provide a means for managing the schedules of multiple Residio thermostats.

The goal is to be able to select a "Super Schedule" that will update the schedules of all thermostats in a location.

The super shedules would be used for purposes like:
- Working from home vs. working in the office 9-5
- Having additional guests staying over (using a room that is normally unoccupied)
- Vacation with an actual schedule, rather than just a single hold temperature
- Party mode, with higher demand in common areas
- Airing out / Spring cleaning, low demand with windows open.

## Planned architechture

This app will implement a simmple back end API with AWS lambda, to make calls to the Honeywell API.

The static website will be build using AWS Amplify, Node.js, React, and Typescript.

The app will use dynomo DB to store schedules and user configuration.

The app will use AWS Cognito to manage user account login and credentials.

## App Storyboard

- Landing Page
    - Login / Register / Logout
    - Locations List
        - "Log in to see your locations and super schedules"
        - Table list of locations
            - ID
            - Name
            - Number of Devices
            - Number of Schedules
            - Button to view location (or just a drop-down to see super schedules)
        - Button to log in to Residio
- Location View
    - List of devices
        - ID
        - Name
        - Status
    - List of Schedules
        - Name
        - Description
        - Set (push schedules to devices)
        - Indicator that current schedule matches
        - Edit Button
        - Delete Button (with confirmation)
    - Button to save current schedule
- Schedule View / Edit
    - Only available by clicking on existing schedule or reading schedule?
    - Name
    - Description
    - Actual Schedule is ReadOnly
    - (maybe) view of schedule
        - lazy option is to just display the json

