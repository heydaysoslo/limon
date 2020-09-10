export default {
  name: "accordionItem",
  title: "Accordion item",
  type: "object",
  fields: [
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
