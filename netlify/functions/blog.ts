import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Check if there's a slug parameter for single blog post lookup
      const pathSegments = event.path.split('/');
      const slug = pathSegments[pathSegments.length - 1];
      
      if (slug && slug !== 'blog') {
        // Get single blog post
        const post = await storage.getBlogPost(slug);
        if (!post || !post.isPublished) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Blog post not found' })
          };
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(post)
        };
      } else {
        // Get all published blog posts
        const posts = await storage.getBlogPosts();
        const publishedPosts = posts.filter(post => post.isPublished);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(publishedPosts)
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch blog posts' })
    };
  }
};