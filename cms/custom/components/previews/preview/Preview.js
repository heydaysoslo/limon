/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state, react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

class Preview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object
  }

  static defaultProps = {
    document: null
  }

  state = {
    size: 'full'
  }

  setSize = size => {
    this.setState(state => ({ ...state, size }))
  }

  render() {
    const { displayed } = this.props.document

    const isLocal =
      window.location.host.includes('localhost') ||
      window.location.host.includes('.local')

    const url = `${isLocal ? 'http://localhost:3000/preview/' : '/preview'}${
      displayed._id
    }`
    console.log('Preview -> render -> url', url)

    if (!displayed._id) return null

    const sizes = {
      full: '100%',
      mobile: '375px',
      tablet: '768px',
      laptop: '1200px'
    }

    const icons = {
      full: '💯',
      mobile: '📱',
      tablet: '🏓',
      laptop: '💻'
    }

    const { size } = this.state

    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '0',
            left: '0',
            width: '100%',
            borderBottom: '1px solid black'
          }}
        >
          <h3>👀 Preview</h3>
          <div style={{ width: '200px' }}>
            <Select
              label="Select device…"
              options={Object.keys(sizes).map(size => ({
                label: `${icons[size]} ${size}`,
                value: size
              }))}
              width="200px"
              placeholder="Select device…"
              onChange={value => this.setSize(value.value)}
              defaultValue={size}
            ></Select>
          </div>
        </header>
        <iframe
          style={{
            width: sizes[size],
            border: size === 'full' ? 'none' : '1px solid black',
            margin: '0 auto',
            transition: 'width .3s ease',
            height: '100%',
            display: 'block'
          }}
          src={url}
          frameborder="0"
        ></iframe>
      </div>
    )
  }
}

export default Preview
