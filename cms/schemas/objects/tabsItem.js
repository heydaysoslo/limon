export default {
  name: "tabsItem",
  title: "Tab item",
  type: "object",
  fields: [
    {
      name: "defaultOpen",
      title: "Default open",
      description:
        "Toggle this if you want this particular item to be open by default. If not the first one be open by default",
      type: "boolean"
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "content",
      title: "Content",
      type: "editor",
      validation: Rule => Rule.required()
    }
  ]
};
