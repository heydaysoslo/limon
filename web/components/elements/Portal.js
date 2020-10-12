import { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Portal extends Component {
  constructor() {
    super()
    // Use a ternary operator to make sure that the document object is defined
    this.el =
      typeof document !== `undefined` ? document.createElement('div') : null
  }

  componentDidMount = () => {
    // Use a ternary operator to make sure that the document object is defined
    const portalRoot =
      typeof document !== `undefined` ? document.getElementById('portal') : null
    if (portalRoot) {
      portalRoot.appendChild(this.el)
    }
  }

  componentWillUnmount = () => {
    // Use a ternary operator to make sure that the document object is defined
    const portalRoot =
      typeof document !== `undefined` ? document.getElementById('portal') : null
    portalRoot.removeChild(this.el)
  }

  render() {
    const { children } = this.props

    // Check that this.el is not null before using ReactDOM.createPortal
    if (this.el) {
      return ReactDOM.createPortal(children, this.el)
    } else {
      return null
    }
  }
}

// import { useEffect } from 'react'
// import { createPortal } from 'react-dom'

// const Portal = ({ children }) => {
//   const el =
//     typeof document !== `undefined` ? document.createElement('div') : null
//   useEffect(() => {
//     // Use a ternary operator to make sure that the document object is defined
//     const portalRoot = document.getElementById('portal')
//     portalRoot.appendChild(el)

//     return () => {
//       console.log('unmounting')
//       portalRoot.removeChild(el)
//     }
//   }, [])
//   if (!el) return null
//   return createPortal(children, el)
// }

// export default Portal
