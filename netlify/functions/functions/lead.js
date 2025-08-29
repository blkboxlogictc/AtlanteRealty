"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const storage_1 = require("../../server/storage");
const schema_1 = require("../../shared/schema");
const zod_1 = require("zod");
const handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
    };
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }
    try {
        if (event.httpMethod === 'POST') {
            const leadData = schema_1.insertLeadSchema.parse(JSON.parse(event.body || '{}'));
            const lead = await storage_1.storage.createLead(leadData);
            // Forward to CRM webhook if configured
            const webhookUrl = process.env.CRM_WEBHOOK_URL;
            if (webhookUrl) {
                try {
                    const response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(lead)
                    });
                }
                catch (webhookError) {
                    console.error('CRM webhook failed:', webhookError);
                    // Don't fail the request if webhook fails
                }
            }
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, leadId: lead.id })
            };
        }
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Validation failed', details: error.errors })
            };
        }
        else {
            console.error('Lead creation failed:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to create lead' })
            };
        }
    }
};
exports.handler = handler;
