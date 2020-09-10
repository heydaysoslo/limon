export default {
  name: "address",
  title: "Address",
  type: "object",
  options: {
    collapsible: true
  },
  fields: [
    {
      name: "streetAddress",
      title: "Street Address",
      type: "string"
    },
    {
      name: "postCode",
      title: "Post Code",
      type: "string"
    },
    {
      name: "city",
      title: "City",
      type: "string",
      description:
        "The locality in which the street address is, and which is in the region. For example, Mountain View."
    },
    {
      name: "region",
      title: "Region",
      type: "string",
      description:
        "The region in which the locality is, and which is in the country. For example, California or another appropriate first-level https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country"
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      description:
        "The country. For example, USA. You can also provide the two-letter http://en.wikipedia.org/wiki/ISO_3166-1 ISO 3166-1 alpha-2 country code."
    }
  ]
};
