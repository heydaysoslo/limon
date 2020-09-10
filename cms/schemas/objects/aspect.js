export default {
  name: "aspect",
  title: "Aspect ratio",
  description: "This setting only affects iPad and upwards screen sizes",
  type: "string",
  // validation: Rule => Rule.required(), // can't apply this in all cases wait for conditional fields
  options: {
    list: [
      { value: "original", title: "Original" },
      { value: "landscape", title: "Landscape" },
      { value: "portrait", title: "Portrait" }
    ],
    direction: "horizontal",
    layout: "radio"
  }
};
