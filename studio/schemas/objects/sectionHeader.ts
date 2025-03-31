import React from 'react'
import {defineField, defineType, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The small gradient label text that appears above the title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {
                title: 'Styled',
                value: 'styled',
                component: StyledText,
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'string',
      description: 'Optional link for the "View All" button',
    }),
    defineField({
      name: 'viewAllText',
      title: 'View All Text',
      type: 'string',
      description: 'Text for the "View All" button',
      initialValue: 'VIEW ALL',
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
    prepare({title}) {
      return {
        title: title || 'Section Header',
        subtitle: 'Section Header Component',
      }
    },
  },
})
