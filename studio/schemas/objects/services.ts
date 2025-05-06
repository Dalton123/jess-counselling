import {defineField, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'

export const services = defineField({
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fieldsets: [
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
      name: 'header',
      title: 'Section Header',
      type: 'sectionHeader',
      hidden: ({parent}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'selectedServices',
      title: 'Selected Services',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
      validation: (Rule) => Rule.required().min(1),
      fieldset: 'content',
    }),
  ],
  preview: {
    select: {
      title: 'header.label',
    },
    prepare({title}) {
      return {
        title: title || 'Services Section',
        subtitle: 'Services Section',
      }
    },
  },
})
