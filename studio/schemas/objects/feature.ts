import {defineField, defineArrayMember} from 'sanity'

// Remove JSX and use plain object references
export const feature = defineField({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionHeader',
      title: 'Section Header',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'content',
      title: 'Feature Content',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    {
      name: 'showSectionHeader',
      title: 'Show Section Header',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      initialValue: false,
      fieldset: 'content',
    },
    {
      name: 'sectionHeader',
      title: 'Section Header',
      type: 'sectionHeader',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    },
    {
      name: 'wrapper',
      title: 'Wrapper',
      type: 'string',
      initialValue: 'none',
      fieldset: 'content',
      options: {
        list: ['light', 'dark', 'none'],
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      validation: (Rule: any) => Rule.required(),
      options: {
        spellCheck: false,
      },
    },
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      fieldset: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      fieldset: 'content',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      fieldset: 'content',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      fieldset: 'content',
      initialValue: 'READ MORE',
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      fieldset: 'content',
    },
    {
      name: 'reversed',
      title: 'Reverse Layout',
      type: 'boolean',
      description: 'If enabled, the image will appear on the left (or top on mobile)',
      initialValue: false,
      fieldset: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'Feature',
      media: 'image',
    },
    prepare({title, media}: {title: string; media: any}) {
      return {
        title: title || 'Feature',
        subtitle: 'Feature Section',
        media,
      }
    },
  },
})
