export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      of: [
        {type: 'hero'},
        {type: 'services'},
        // {type: 'testimonials'},
        // {type: 'contactForm'},
        // {type: 'textWithImage'},
      ],
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
    },
  ],
}
