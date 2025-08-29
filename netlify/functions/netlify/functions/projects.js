"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const storage_1 = require("../../server/storage");
const handler = async (event, context) => {
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
            // Check if there's an ID parameter for single project lookup
            const pathSegments = event.path.split('/');
            const projectId = pathSegments[pathSegments.length - 1];
            if (projectId && projectId !== 'projects') {
                // Get single project
                const project = await storage_1.storage.getProject(projectId);
                if (!project) {
                    return {
                        statusCode: 404,
                        headers,
                        body: JSON.stringify({ error: 'Project not found' })
                    };
                }
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(project)
                };
            }
            else {
                // Get all projects
                const projects = await storage_1.storage.getProjects();
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(projects)
                };
            }
        }
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    catch (error) {
        console.error('Failed to fetch projects:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Failed to fetch projects' })
        };
    }
};
exports.handler = handler;
