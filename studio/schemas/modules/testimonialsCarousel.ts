import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialsCarousel',
  title: 'Testimonials Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Optional title for the testimonials section',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'desktopSlidesPerView',
      title: 'Desktop Slides Per View',
      type: 'number',
      description: 'Number of testimonials to show at once on desktop (1-4)',
      validation: (Rule) => Rule.required().min(1).max(4),
      initialValue: 1,
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Enable automatic sliding',
      initialValue: true,
    }),
    defineField({
      name: 'delay',
      title: 'Delay Between Slides (ms)',
      type: 'number',
      description: 'Time between slide transitions in milliseconds (only if autoplay is enabled)',
      initialValue: 5000,
      hidden: ({parent}) => !parent?.autoplay,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      testimonialCount: 'testimonials.length',
    },
    prepare({title, testimonialCount}) {
      return {
        title: title || 'Testimonials Carousel',
        subtitle: `${testimonialCount || 0} testimonial${testimonialCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
