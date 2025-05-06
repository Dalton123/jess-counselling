import {defineField, defineArrayMember} from 'sanity'

export const accordion = defineField({
  name: 'accordion',
  title: 'Accordion',
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
      title: 'Accordion Content',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'topSpacing',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: ['small', 'medium', 'large'],
      },
      fieldset: 'spacing',
    }),
    defineField({
      name: 'bottomSpacing',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: ['small', 'medium', 'large'],
      },
      fieldset: 'spacing',
    }),
    defineField({
      name: 'showSectionHeader',
      title: 'Show Section Header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'header',
      title: 'Section Header',
      type: 'sectionHeader',
      fieldset: 'sectionHeader',
      hidden: ({parent}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'wrapper',
      title: 'Wrapper',
      type: 'string',
      initialValue: 'none',
      fieldset: 'content',
      options: {
        list: ['light', 'dark', 'none'],
      },
    }),
    defineField({
      name: 'allowMultipleOpen',
      title: 'Allow Multiple Open Items',
      description: 'If enabled, multiple accordion items can be open at the same time',
      type: 'boolean',
      initialValue: false,
      fieldset: 'content',
    }),
    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [defineArrayMember({type: 'accordionItem'})],
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'header.label',
      items: 'items',
    },
    prepare({title, items = []}) {
      return {
        title: title || 'Accordion',
        subtitle: `Accordion with ${items.length} item${items.length === 1 ? '' : 's'}`,
      }
    },
  },
})
