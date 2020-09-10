import MdTouchApp from "react-icons/lib/md/touch-app";
import MdCallToAction from "react-icons/lib/md/call-to-action";

export default {
  name: "button",
  title: "Button",
  type: "object",
  icon: MdTouchApp,
  fields: [
    {
      name: "link",
      title: "Link",
      type: "link"
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      description: "This determines the button style.",
      options: {
        list: [
          { value: "primary", title: "Primary" },
          { value: "secondary", title: "Secondary" }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: "title",
      linkTitle: "link.title"
    },
    prepare({ title, linkTitle }) {
      return {
        title: title || linkTitle || "No title",
        media: MdTouchApp
      };
    }
  }
};
