export const services = {
  name: 'services',
  title: 'Services Section',
  type: 'object',
  fields: [
    {
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      initialValue: 'SERVICES',
    },
    {
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      initialValue: 'We Provide a Range of',
    },
    {
      name: 'sectionStyledTitle',
      title: 'Section Styled Title',
      type: 'string',
      initialValue: 'Psychological Services',
    },
    {
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'string',
      initialValue: '/services',
    },
    {
      name: 'viewAllText',
      title: 'View All Text',
      type: 'string',
      initialValue: 'VIEW ALL SERVICES',
    },
    {
      name: 'selectedServices',
      title: 'Selected Services',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'sectionStyledTitle',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Services Section',
        subtitle: subtitle || 'Services component',
      }
    },
  },
}
