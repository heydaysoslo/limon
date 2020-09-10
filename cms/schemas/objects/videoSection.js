import Vimeo from "../../custom/components/Vimeo";
import MdMovie from "react-icons/lib/md/movie";

export default {
  name: "videoSection",
  title: "Video Section",
  type: "object",
  fields: [
    {
      name: "video",
      title: "Video",
      type: "string",
      inputComponent: Vimeo
    }
  ],
  preview: {
    select: {
      video: "video"
    },
    prepare({ video }) {
      const data = video && JSON.parse(video);
      return {
        title: data && data.label ? data.label : "Video",
        media: MdMovie,
        subtitle: "Video section"
      };
    }
  }
};
