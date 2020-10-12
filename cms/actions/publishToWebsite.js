import React from 'react'

export function publishToWebsite() {
  const [isDialogOpen, setDialogOpen] = React.useState(false)

  return {
    label: `Publish to website`,
    onHandle: () => {
      fetch(
        'https://api.vercel.com/v1/integrations/deploy/QmdR6S5oBzM5JpVTdHwFCynFJoH7WRsRtdri8M2fXH7PER/TDkE1m3q3K',
        {
          method: 'POST'
        }
      )
      setDialogOpen(true)
      setTimeout(() => {
        setDialogOpen(false)
      }, 2000)
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
