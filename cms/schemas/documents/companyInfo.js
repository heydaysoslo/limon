import MdBusiness from "react-icons/lib/md/business";

export default {
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  liveEdit: false,
  __experimental_actions: ["update", "publish" /*'create', 'delete'*/],
  icon: MdBusiness,
  fieldsets: [
    { name: "offices", title: "Offices" },
    { name: "contact", title: "Contact" },
    {
      name: "location",
      title: "Location",
      description:
        "These fields are used to tell google where the business is located."
    }
  ],
  fields: [
    {
      name: "name",
      title: "Company name",
      type: "string",
      fieldset: "contact"
    },
    {
      name: "email",
      title: "Email",
      type: "email",
      fieldset: "contact"
    },
    {
      name: "phone",
      title: "Phone number",
      type: "string",
      fieldset: "contact"
    },
    {
      name: "address",
      title: "Address",
      type: "address",
      fieldset: "location"
    },
    {
      name: "lat",
      title: "Latitude",
      description:
        "Follow a pattern similar to: 59.926919. You can find the coordinates if you go to https://maps.google.com",
      type: "string",
      fieldset: "location"
    },
    {
      name: "lng",
      title: "Longitude",
      description:
        "Follow a pattern similar to: 59.926919. You can find the coordinates if you go to https://maps.google.com",
      type: "string",
      fieldset: "location"
    },
    {
      name: "orgNumber",
      title: "Organization number",
      type: "string",
      fieldset: "contact"
    },
    {
      name: "social",
      title: "Social",
      type: "social"
    },
    {
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        {
          name: "office",
          title: "Office",
          type: "office"
        }
      ]
    }
  ]
};
