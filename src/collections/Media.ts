import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '../public/uploads',
    mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'], // for .docx files
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/cv',
      method: 'get',
      handler: async (req) => {
        try {
          const cv = await req.payload.find({
            collection: 'media',
            where: {
              filename: {
                equals: 'danielcmadeley-developer-cv.docx',
              },
            },
            limit: 1,
          })

          if (!cv.docs?.[0]) {
            return Response.json({ error: 'CV not found' }, { status: 404 })
          }

          const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
          const fullUrl = `${baseUrl}${cv.docs[0].url}`

          // Return a redirect response
          return Response.redirect(fullUrl)
        } catch (error) {
          console.error('Error fetching CV:', error)
          return Response.json({ error: 'Internal server error' }, { status: 500 })
        }
      },
    },
  ],
}
