import MdControlPoint from "react-icons/lib/md/control-point";
export default {
  name: "accordion",
  title: "Accordion",
  type: "object",
  icon: MdControlPoint,
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "accordionItem"
        }
      ]
    }
  ],
  preview: {
    select: {
      items: "items"
    },
    prepare({ items }) {
      const title =
        items.map(item => item.title && item.title).join(", ") || "Accordion";
      return {
        title,
        media: MdControlPoint
      };
    }
  }
};
