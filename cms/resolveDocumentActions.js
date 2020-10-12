// import the default document actions
import defaultResolve from 'part:@sanity/base/document-actions'

import { publishToWebsite } from './actions/publishToWebsite'

export default function resolveDocumentActions(props) {
  return [...defaultResolve(props), publishToWebsite]
}
