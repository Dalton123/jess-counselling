import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'richTextModule',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          {title: 'Small', value: 'small'},
          {title: 'Medium', value: 'medium'},
          {title: 'Large', value: 'large'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'textAlignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'padding',
      title: 'Section Padding',
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
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      content: 'content',
    },
    prepare({content}: {content: any[]}) {
      return {
        title: 'Rich Text',
        subtitle:
          content &&
          content[0]?.children
            ?.map((child: {text: string}) => child.text)
            .join(' ')
            .substring(0, 50) + '...',
      }
    },
  },
})
