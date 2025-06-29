import React from 'react'
import {defineField, defineType, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  fieldsets: [
    {
      name: 'spacing',
      title: 'Spacing & Layout',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'content',
      title: 'Content',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'styling',
      title: 'Styling',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'wrapper',
      title: 'Background Wrapper',
      type: 'string',
      initialValue: 'none',
      fieldset: 'styling',
      options: {
        list: ['light', 'dark', 'none'],
      },
      description: 'Choose a background style for the section header',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      fieldset: 'styling',
      options: {
        list: [
          {title: 'Small (32rem)', value: 'sm'},
          {title: 'Medium (42rem)', value: 'md'},
          {title: 'Large (56rem)', value: 'lg'},
          {title: 'Extra Large (72rem)', value: 'xl'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'lg',
      description: 'Set the maximum width of the content area',
    }),
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
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
      fieldset: 'styling',
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'The small gradient label text that appears above the title',
      fieldset: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      fieldset: 'content',
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
    }),
    defineField({
      name: 'buttonHorizontalPosition',
      title: 'Button Horizontal Position',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
      fieldset: 'styling',
    }),
    defineField({
      name: 'buttonVerticalPosition',
      title: 'Button Vertical Position',
      type: 'string',
      options: {
        list: ['top', 'center', 'bottom'],
        layout: 'radio',
      },
      fieldset: 'styling',
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
