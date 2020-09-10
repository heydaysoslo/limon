import React from "react";
import PropTypes from "prop-types";
import { withDocument } from "part:@sanity/form-builder";
import FormField from "part:@sanity/components/formfields/default";
import PatchEvent, { set, unset } from "part:@sanity/form-builder/patch-event";
import AsyncSelect from "react-select/async";
import { setIfMissing } from "part:@sanity/form-builder/patch-event";
import styled from "styled-components";

/**
 * Usage:
 *
 * fields: [
    {
      name: "video",
      title: "video",
      type: "string",
      inputComponent: Vimeo
    }
  ],
 *
 */

// 4. Create a Sanity PatchEvent based on a change in time value
const createPatchFrom = value =>
  PatchEvent.from(value === "" ? unset() : set(value));

class VimeoInput extends React.Component {
  // 5. Declare shape of React properties
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string
    }).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  input = React.createRef();
  video = React.createRef();

  // 6. Called by the Sanity form-builder when this input should receive focus
  focus = () => {
    this.input.current.focus();
  };

  loadOptions = (inputValue, callback) => {
    const vimeo = {
      VIMEO_CLIENT_ID: "e327a7eba9200f498a945051bc34a725ec4c167a",
      VIMEO_CLIENT_SECRET:
        "RO1eymhpQ/Pk0nRfKI1tiodCDVuxjRsmwotCbDczOL98iNjhbZR/2uDjkCsIbIsqHShF8uiACo+rnA8CQcNlAwASzxy1rMoXMnjEbCYRctpNmnrL50qiXvU7119UkzDt",
      VIMEO_ACCESS_TOKEN: "ed833f6728e60874c1172c3516dd71c5"
    };

    fetch("https://api.vimeo.com/me/videos", {
      headers: {
        Authorization: `Bearer ${vimeo.VIMEO_ACCESS_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(res => {
        callback([
          { label: "No video", value: "" },
          ...res.data.map(item => ({
            value: item,
            label: item.name
          }))
        ]);
      });
  };

  handleInputChange = newValue => {
    const { onChange, type } = this.props;
    onChange(
      createPatchFrom(JSON.stringify(newValue)).prepend(
        setIfMissing({ _type: type.name })
      )
    );
    return newValue;
  };

  addVideo = () => {
    if (this.video.current) {
      const { value } = this.props;
      const videoEl = this.video.current.querySelector("video");
      if (videoEl) {
        videoEl.parentNode.removeChild(videoEl);
      }
      const newVideo = document.createElement("video");
      newVideo.setAttribute("controls", true);
      newVideo.setAttribute("muted", true);
      const source = document.createElement("source");
      const videoUrl =
        value && value.length > 0 && JSON.parse(value).value.files
          ? JSON.parse(value).value.files.filter(vid => vid.quality === "sd")[0]
              .link
          : "";
      if (value) {
        source.setAttribute("src", videoUrl);
      }
      newVideo.appendChild(source);
      this.video.current.appendChild(newVideo);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.value !== prevProps.value) {
      this.addVideo();
    }
  };

  render = () => {
    const { type, value, document } = this.props;
    const video =
      value && value.length > 0 && JSON.parse(value).value.files
        ? JSON.parse(value).value.files.filter(vid => vid.quality === "sd")[0]
        : "";
    return (
      // 8. Use FormField if you want title and description rendered like any other input field
      <FormField label={type.title} description={type.description}>
        <div
          style={{
            minHeight:
              !value || JSON.parse(value).value === "" ? "400px" : "0px"
          }}
        >
          <AsyncSelect
            cacheOptions
            loadOptions={this.loadOptions}
            defaultOptions
            onChange={this.handleInputChange}
            ref={this.input}
            value={value && JSON.parse(value)}
          />
        </div>
        {video && (
          <Wrapper value={value}>
            <div ref={this.video}>
              <video controls muted>
                <source src={video.link} type={video.type} />
              </video>
            </div>
          </Wrapper>
        )}
      </FormField>
    );
  };
}

const Wrapper = styled.div`
  video {
    width: 100%;
    max-width: 100%;
    margin-top: 10px;
  }
`;

export default withDocument(VimeoInput);
