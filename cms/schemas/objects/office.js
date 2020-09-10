export default {
  name: "office",
  title: "Office",
  type: "object",
  fieldsets: [{ name: "location", title: "Location" }],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "address",
      title: "Address",
      type: "address"
    },
    {
      name: "email",
      title: "Email",
      type: "email"
    },
    {
      name: "location",
      title: "Google maps url",
      type: "url",
      fieldset: "location"
    },
    {
      name: "lat",
      title: "Latitude",
      type: "string",
      fieldset: "location"
    },
    {
      name: "lng",
      title: "Longitude",
      type: "string",
      fieldset: "location"
    }
  ]
};
