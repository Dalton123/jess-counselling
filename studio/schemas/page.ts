import {defineField, defineType, defineArrayMember} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        defineArrayMember({type: 'hero'}),
        defineArrayMember({type: 'services'}),
        defineArrayMember({type: 'feature'}),
        defineArrayMember({type: 'sectionHeader'}),
        defineArrayMember({type: 'contact'}),
        defineArrayMember({type: 'logoShowcase'}),
        defineArrayMember({type: 'accordion'}),
        defineArrayMember({type: 'richTextModule'}),
        defineArrayMember({type: 'infoGrid'}),
        defineArrayMember({type: 'testimonialsCarousel'}),
        // defineArrayMember({type: 'contactForm'}),
        // defineArrayMember({type: 'textWithImage'}),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    }),
  ],
})
