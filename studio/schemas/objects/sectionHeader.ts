import React from 'react'
import {defineField, defineType, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  fields: [
    defineField({
      name: 'topSpacing',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: ['none', 'small', 'medium', 'large'],
      },
    }),
    defineField({
      name: 'bottomSpacing',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: ['none', 'small', 'medium', 'large'],
      },
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
    }),
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
            {title: 'H1', value: 'h1'},
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
      name: 'link',
      title: 'Link',
      type: 'object',
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
    }),
    defineField({
      name: 'buttonHorizontalPosition',
      title: 'Button Horizontal Position',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'buttonVerticalPosition',
      title: 'Button Vertical Position',
      type: 'string',
      options: {
        list: ['top', 'center', 'bottom'],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title:
          title.find((block: any) => block._type === 'block')?.children[0].text || 'Section Header',
        subtitle: 'Section Header Component',
      }
    },
  },
})
