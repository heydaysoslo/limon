# sanity-gatsby-portfolio-studio

## Commands

### `yarn export`

Exports production dataset so that it can be imported
as dummy data for new projects.

### `yarn deploy:graphql`

Deploys GraphQL db. This needs to be done every time you
change the schema. You also need to restart the server
afterwards.

### `yarn deploy:sanity`

Deploys sanity to the sanity cloud.

## Dashboard

### Netlify widget

Check `/cms/daskboardConfig.js` under netlify and add correct values

## `heydays-config.js`

This is the config file for our sanity setup.
Here you can add menus or order page for custom types.
It also has some helper functions.

## Desk structure

This is where you control the order of the desk.

One off pages like `siteSettings` are added as `hiddenDocTypes`
and manually placed into the deskstructure. There is also an
automatic handler for custom types with order pages ex. `Person`.

## Visually customizing sanity

In `/cms/custom` you'll find templates for customizing things like
logo, font, colors and icons.
