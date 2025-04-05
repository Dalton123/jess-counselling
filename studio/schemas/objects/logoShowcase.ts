import {defineField, defineType, defineArrayMember} from 'sanity'

export const logoShowcase = defineType({
  name: 'logoShowcase',
  title: 'Logo Showcase',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title above the logos',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional description text',
    }),
    defineField({
      name: 'darkBackground',
      title: 'Dark Background',
      type: 'boolean',
      description: 'Display logos on a dark background (logos will show as white)',
      initialValue: true,
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logo',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              description: 'Used for alt text and accessibility',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Website URL',
              type: 'url',
              description: 'Optional link to company website',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      logos: 'logos',
    },
    prepare({title, logos = []}) {
      return {
        title: title || 'Logo Showcase',
        subtitle: `${logos.length} logo${logos.length === 1 ? '' : 's'}`,
      }
    },
  },
})
