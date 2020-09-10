/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import GoogleSearchResult from "./GoogleSearchResult";
import TwitterCard from "./TwitterCard";
import FacebookShare from "./FacebookShare";

class SeoPreviews extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  };

  static defaultProps = {
    document: null
  };

  render() {
    const { options } = this.props;
    const { displayed } = this.props.document;
    const {
      title,
      excerpt: description = [],
      mainImage: openGraphImage,
      seo
    } = displayed;

    const displayTitle = seo && seo.title ? seo.title : title;
    const displayDescription =
      seo && seo.description ? seo.description : description;
    const displayImage = seo && seo.image ? seo.image : openGraphImage;

    const content = {
      title: displayTitle,
      description: displayDescription,
      image: displayImage,
      isSeo: seo && seo.description
    };

    return (
      <>
        <GoogleSearchResult
          content={content}
          document={displayed}
          options={options}
        />
        <TwitterCard content={content} document={displayed} options={options} />
        <FacebookShare
          content={content}
          document={displayed}
          options={options}
        />
      </>
    );
  }
}

export default SeoPreviews;
