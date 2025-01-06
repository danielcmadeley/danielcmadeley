import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:primary/:secondary',
        destination: '/:primary/:secondary',
      },
    ]
  },
}

export default withPayload(nextConfig)
