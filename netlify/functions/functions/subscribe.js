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
            const subscriptionData = schema_1.insertEmailSubscriptionSchema.parse(JSON.parse(event.body || '{}'));
            // Check if already subscribed
            const existing = await storage_1.storage.getEmailSubscriptions();
            if (existing.some(sub => sub.email === subscriptionData.email && sub.isActive)) {
                return {
                    statusCode: 409,
                    headers,
                    body: JSON.stringify({ error: 'Email already subscribed' })
                };
            }
            const subscription = await storage_1.storage.createEmailSubscription(subscriptionData);
            // Forward to email service webhook if configured
            const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL || process.env.MAILCHIMP_WEBHOOK_URL;
            if (emailWebhookUrl) {
                try {
                    const response = await fetch(emailWebhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(subscription)
                    });
                }
                catch (webhookError) {
                    console.error('Email service webhook failed:', webhookError);
                }
            }
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, subscriptionId: subscription.id })
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
            console.error('Email subscription failed:', error);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to subscribe email' })
            };
        }
    }
};
exports.handler = handler;
