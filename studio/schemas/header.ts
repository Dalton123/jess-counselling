import {defineField, defineType} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            defineField({
              name: 'name',
              title: 'Link Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'Internal links must start with / (e.g., /contact). External links should include https://',
              validation: (Rule) => Rule.required().custom((value) => {
                if (!value) return 'URL is required'
                if (value.startsWith('http') || value.startsWith('mailto:') || value.startsWith('tel:')) {
                  return true // External links are fine as-is
                }
                if (!value.startsWith('/')) {
                  return 'Internal URLs must start with / (e.g., /contact not contact)'
                }
                return true
              }),
            }),
            defineField({
              name: 'submenu',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'subLink',
                  title: 'Subpage Link',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'Subpage Name',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'url',
                      title: 'Subpage URL',
                      type: 'string',
                      description: 'Internal links must start with / (e.g., /contact). External links should include https://',
                      validation: (Rule) => Rule.required().custom((value) => {
                        if (!value) return 'URL is required'
                        if (value.startsWith('http') || value.startsWith('mailto:') || value.startsWith('tel:')) {
                          return true // External links are fine as-is
                        }
                        if (!value.startsWith('/')) {
                          return 'Internal URLs must start with / (e.g., /contact not contact)'
                        }
                        return true
                      }),
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call To Action Button',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'string',
          description: 'Internal links must start with / (e.g., /contact). External links should include https://',
          validation: (Rule) => Rule.required().custom((value) => {
            if (!value) return 'URL is required'
            if (value.startsWith('http') || value.startsWith('mailto:') || value.startsWith('tel:')) {
              return true // External links are fine as-is
            }
            if (!value.startsWith('/')) {
              return 'Internal URLs must start with / (e.g., /contact not contact)'
            }
            return true
          }),
        }),
      ],
    }),
  ],
})
