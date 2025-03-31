import {defineField} from 'sanity'

export const hero = defineField({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The small text displayed above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The main heading text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the heading',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image (if not using the animated waves)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'useWaveAnimation',
      title: 'Use Wave Animation',
      type: 'boolean',
      description: 'Toggle between background image or animated waves',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}: {title: string; media: any}) {
      return {
        title: title || 'Hero Section',
        subtitle: 'Hero Section',
        media,
      }
    },
  },
})
