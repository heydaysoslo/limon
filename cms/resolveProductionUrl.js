export default function resolveProductionUrl(document) {
  return `http://localhost:3000/_preview/${document._id}`
}
