import {defineField, defineType, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'

export const infoGrid = defineType({
  name: 'infoGrid',
  title: 'Info Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'steps',
      title: 'Info Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Icon to display with this step',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'iconAlt',
              title: 'Icon Alt Text',
              type: 'string',
              description: 'Alternative text for the icon (important for accessibility and SEO)',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                  ],
                  lists: [{title: 'Bullet', value: 'bullet'}],
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
              description: 'Description text for this step',
            }),
          ],
          preview: {
            select: {
              title: 'id',
              media: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'showSectionHeader',
      title: 'Show Section Header',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sectionHeader',
      title: 'Section Header',
      type: 'sectionHeader',
      hidden: ({parent}) => !parent?.showSectionHeader,
    }),
    defineField({
      name: 'wrapper',
      title: 'Background Style',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'topSpacing',
      title: 'Top Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'bottomSpacing',
      title: 'Bottom Spacing',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      steps: 'steps',
    },
    prepare({steps}) {
      return {
        title: 'Info Grid',
        subtitle: steps?.length ? `${steps.length} items` : 'No items',
      }
    },
  },
})
