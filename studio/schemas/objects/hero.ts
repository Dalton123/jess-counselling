import {defineArrayMember, defineField} from 'sanity'
import {StyledText} from '../../components/StyledText'

export const hero = defineField({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fieldsets: [
    {
      name: 'content',
      title: 'Content',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'callToAction',
      title: 'Call to Action',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'background',
      title: 'Background',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'The small text displayed above the heading',
      fieldset: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
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
              {
                title: 'Styled',
                value: 'styled',
                component: StyledText,
              },
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
      description: 'The main heading text',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
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
              {
                title: 'Styled',
                value: 'styled',
                component: StyledText,
              },
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
      description: 'Supporting text below the heading',
    }),
    defineField({
      name: 'showCTA',
      title: 'Show Call to Action Button',
      type: 'boolean',
      description: 'Toggle to show/hide the CTA button',
      initialValue: true,
      fieldset: 'callToAction',
    }),
    defineField({
      name: 'link',
      title: 'Button Link',
      type: 'object',
      description: 'Button text and URL',
      fieldset: 'callToAction',
      fields: [
        {
          name: 'href',
          title: 'URL',
          type: 'string',
          description:
            'Where the button should link to (e.g., /contact, #contact-form, mailto:email)',
          placeholder: '/contact',
        },
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text displayed on the button',
          placeholder: 'Get in touch',
        },
      ],
      hidden: ({parent}: {parent: any}) => !parent?.showCTA,
    }),
    defineField({
      name: 'ctaStyle',
      title: 'Button Style',
      type: 'string',
      description: 'Visual style of the button',
      fieldset: 'callToAction',
      options: {
        list: [
          {title: 'Light (Default)', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Teal', value: 'teal'},
        ],
      },
      initialValue: 'light',
      hidden: ({parent}: {parent: any}) => !parent?.showCTA,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional background image (if not using the animated waves)',
      fieldset: 'background',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'useWaveAnimation',
      title: 'Use Wave Animation',
      type: 'boolean',
      description: 'Toggle between background image or animated waves',
      initialValue: true,
      fieldset: 'background',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({title, media}: {title: any; media: any}) {
      return {
        title: title.map((item: any) => item.children[0].text).join(' ') || 'Hero Section',
        subtitle: 'Hero Section',
        media,
      }
    },
  },
})
