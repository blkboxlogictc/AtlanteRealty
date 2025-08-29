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
      // Check if there's an ID parameter for single agent lookup
      const pathSegments = event.path.split('/');
      const agentId = pathSegments[pathSegments.length - 1];
      
      if (agentId && agentId !== 'agents') {
        // Get single agent
        const agent = await storage.getAgent(agentId);
        if (!agent) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Agent not found' })
          };
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(agent)
        };
      } else {
        // Get all agents
        const agents = await storage.getAgents();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(agents)
        };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch agents' })
    };
  }
};