import {defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      description: 'Text to display in place of logo',
      initialValue: 'JESSICA',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
        defineField({
          name: 'width',
          title: 'Width',
          type: 'number',
          description: 'Optional: Specify width for the logo in pixels.',
          initialValue: 120,
        }),
        defineField({
          name: 'height',
          title: 'Height',
          type: 'number',
          description: 'Optional: Specify height for the logo in pixels.',
          initialValue: 60,
        }),
      ],
      description:
        'Optional: Upload a logo image. If provided, this will be used instead of the Logo Text.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'WhatsApp', value: 'whatsapp'},
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'showBackToTop',
      title: 'Show Back to Top Button',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
