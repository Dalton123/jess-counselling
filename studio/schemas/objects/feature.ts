import {defineField, defineArrayMember} from 'sanity'

// Remove JSX and use plain object references
export const feature = defineField({
  name: 'feature',
  title: 'Feature',
  type: 'object',
  fieldsets: [
    {
      name: 'spacing',
      title: 'Spacing',
      options: {collapsible: true, collapsed: false},
    },
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
    defineField({
      name: 'topSpacing',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: ['none', 'small', 'medium', 'large'],
      },
      fieldset: 'spacing',
    }),
    defineField({
      name: 'bottomSpacing',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: ['none', 'small', 'medium', 'large'],
      },
      fieldset: 'spacing',
    }),
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
    },
    {
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      fieldset: 'content',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'object',
      fieldset: 'content',
      fields: [
        {
          name: 'href',
          title: 'URL',
          type: 'string',
        },
        {
          name: 'text',
          title: 'Link Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'reversed',
      title: 'Reverse Layout',
      type: 'boolean',
      description: 'If enabled, the image will appear on the left (or top on mobile)',
      initialValue: false,
      fieldset: 'content',
    },
    {
      name: 'removeMinHeight',
      title: 'Remove Minimum Height',
      type: 'boolean',
      description: 'If enabled, removes the minimum height constraints for more flexible sizing',
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
