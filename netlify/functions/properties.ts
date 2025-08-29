import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      // Check if this is for featured properties
      if (event.path.includes('/featured')) {
        const properties = await storage.getFeaturedProperties();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(properties)
        };
      }

      // Check if there's an ID parameter for single property lookup
      const pathSegments = event.path.split('/');
      const propertyId = pathSegments[pathSegments.length - 1];
      
      if (propertyId && propertyId !== 'properties') {
        // Get single property
        const property = await storage.getProperty(propertyId);
        if (!property) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Property not found' })
          };
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(property)
        };
      } else {
        // Get all properties
        const properties = await storage.getProperties();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(properties)
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch properties' })
    };
  }
};