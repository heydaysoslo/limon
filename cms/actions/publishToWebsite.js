import React from 'react'
import config from '../heydays-config'

export function publishToWebsite() {
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  return {
    label: `Publish to website`,
    onHandle: () => {
      fetch(config.buildHookUrl, {
        method: 'POST'
      })
      setDialogOpen(true)
      setTimeout(() => {
        setDialogOpen(false)
      }, 6000)
    },
    dialog: isDialogOpen && {
      type: 'modal',
      onClose: () => {
        setDialogOpen(false)
      },
      content: (
        <>
          <h1>Publishing to website…</h1>
          <p>Be patient as this may take up to 10 minutes</p>
        </>
      )
    }
  }
}
