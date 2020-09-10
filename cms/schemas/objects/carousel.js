import MdViewCarousel from "react-icons/lib/md/view-carousel";

export default {
  name: "carousel",
  title: "Carousel",
  type: "object",
  icon: MdViewCarousel,
  fields: [
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "mainImage",
          title: "Image",
          type: "mainImage"
        }
      ]
    },
    {
      name: "aspectRatio",
      title: "Aspect Ratio",
      type: "aspect"
    }
  ],
  preview: {
    prepare: () => ({
      title: "Carousel"
    })
  }
};
