const WEEKDAYS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export default {
  name: 'companyInfo',
  title: 'Company Info',
  type: 'document',
  liveEdit: false,
  __experimental_actions: ['update', 'publish' /*'create', 'delete'*/],
  fieldsets: [
    { name: 'offices', title: 'Offices' },
    { name: 'contact', title: 'Contact' },
    {
      name: 'location',
      title: 'Location',
      description:
        'These fields are used to tell google where the business is located.'
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Company name',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
      fieldset: 'contact'
    },
    {
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'address',
      fieldset: 'location'
    },
    {
      name: 'openingHours',
      title: 'Opening Hours',
      description:
        'Remember to update Opening Hours Data if you make a change here',
      type: 'editorMinimal'
    },
    {
      name: 'openingHoursData',
      title: 'Opening Hours Data',
      description: 'Used to calculate if you are open',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: WEEKDAYS.map(day => ({
        name: day,
        title: day,
        type: 'object',
        fields: [
          {
            name: 'from',
            title: 'from',
            description: 'The hour you open. eg. 14:30',
            type: 'string',
            validation: Rule =>
              Rule.required().custom(time => {
                if (time.length === 5 && time.split('')[2] === ':') {
                  return true
                } else {
                  return 'Follow this format [hour][hour]:[minute][minute] eg. 14:30'
                }
              })
          },
          {
            name: 'to',
            title: 'to',
            description: 'The hour you close. eg. 22:00',
            type: 'string',
            validation: Rule =>
              Rule.required().custom(time => {
                if (time.length === 5 && time.split('')[2] === ':') {
                  return true
                } else {
                  return 'Follow this format [hour][hour]:[minute][minute] eg. 14:30'
                }
              })
          }
        ]
      }))
    },
    {
      name: 'lat',
      title: 'Latitude',
      description:
        'Follow a pattern similar to: 59.926919. You can find the coordinates if you go to https://maps.google.com',
      type: 'string',
      fieldset: 'location'
    },
    {
      name: 'lng',
      title: 'Longitude',
      description:
        'Follow a pattern similar to: 59.926919. You can find the coordinates if you go to https://maps.google.com',
      type: 'string',
      fieldset: 'location'
    },
    {
      name: 'orgNumber',
      title: 'Organization number',
      type: 'string',
      fieldset: 'contact'
    },
    {
      name: 'social',
      title: 'Social',
      type: 'social'
    },
    {
      name: 'offices',
      title: 'Offices',
      type: 'array',
      of: [
        {
          name: 'office',
          title: 'Office',
          type: 'office'
        }
      ]
    }
  ]
}
