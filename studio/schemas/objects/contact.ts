import {defineField, defineType, defineArrayMember} from 'sanity'
import {StyledText} from '../../components/StyledText'

export const contact = defineType({
  name: 'contact',
  title: 'Contact Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
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
      description: 'Text with optional styled text using the "Styled" mark for italic parts',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      description: 'Contact phone number displayed in the section',
      initialValue: '+1 800 432 45 34',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Background image for the left side of the contact section',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'formDisclaimer',
      title: 'Form Disclaimer',
      type: 'string',
      description: 'Text displayed above the form (e.g., privacy notice)',
      initialValue: 'Your email address will not be published. Required fields are marked *',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the submit button',
      initialValue: 'MAKE AN APPOINTMENT',
    }),
    defineField({
      name: 'successTitle',
      title: 'Success Message Title',
      type: 'string',
      description: 'Title displayed after successful form submission',
      initialValue: 'Thank you!',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      description: 'Message displayed after successful form submission',
      initialValue: 'Your message has been sent successfully.',
    }),
    defineField({
      name: 'emailRecipient',
      title: 'Email Recipient',
      type: 'string',
      description: 'Email address where form submissions will be sent (not shown to users)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'Contact Section',
    },
    prepare() {
      return {
        title: 'Contact Section',
        subtitle: 'Appointment form with contact details',
      }
    },
  },
})
