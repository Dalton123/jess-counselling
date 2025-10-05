import {defineField, defineType} from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Jessica Wilkinson',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for meta description and blog listing preview',
      validation: (Rule) => Rule.max(160).warning('Keep it under 160 characters for SEO'),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Toggle to publish/unpublish this blog post on the live site',
      initialValue: false,
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (Optional Override)',
      type: 'text',
      rows: 2,
      description: 'If left empty, the excerpt will be used for SEO',
      validation: (Rule) => Rule.max(160).warning('Keep it under 160 characters for SEO'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      description: 'Optional tags for categorizing blog posts',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      publishedDate: 'publishedDate',
      published: 'published',
      media: 'featuredImage',
    },
    prepare({title, author, publishedDate, published, media}) {
      const date = publishedDate ? new Date(publishedDate).toLocaleDateString() : 'No date'
      return {
        title: title,
        subtitle: `${published ? '✅ Published' : '📝 Draft'} | ${date} | ${author || 'No author'}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedDateDesc',
      by: [{field: 'publishedDate', direction: 'desc'}],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedDateAsc',
      by: [{field: 'publishedDate', direction: 'asc'}],
    },
  ],
})
