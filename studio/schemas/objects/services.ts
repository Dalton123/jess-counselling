import {defineField, defineArrayMember} from 'sanity'

export const services = defineField({
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionHeader',
      title: 'Section Header',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'content',
      title: 'Services Content',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'showSectionHeader',
      title: 'Show Section Header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'SERVICES',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'We Provide a Range of',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'sectionStyledTitle',
      title: 'Section Styled Title',
      type: 'string',
      initialValue: 'Psychological Services',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'string',
      initialValue: '/services',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'viewAllText',
      title: 'View All Text',
      type: 'string',
      initialValue: 'VIEW ALL SERVICES',
      fieldset: 'sectionHeader',
      hidden: ({parent}: {parent: any}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'selectedServices',
      title: 'Selected Services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
      validation: (Rule: any) => Rule.required().min(1),
      fieldset: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
    },
    prepare({title}: {title: string}) {
      return {
        title: title || 'Services Section',
        subtitle: 'Services Section',
      }
    },
  },
})
