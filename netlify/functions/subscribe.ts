import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';
import { insertEmailSubscriptionSchema } from '../../shared/schema';
import { z } from 'zod';

export const handler: Handler = async (event, context) => {
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
      const subscriptionData = insertEmailSubscriptionSchema.parse(JSON.parse(event.body || '{}'));
      
      // Check if already subscribed
      const existing = await storage.getEmailSubscriptions();
      if (existing.some(sub => sub.email === subscriptionData.email && sub.isActive)) {
        return {
          statusCode: 409,
          headers,
          body: JSON.stringify({ error: 'Email already subscribed' })
        };
      }
      
      const subscription = await storage.createEmailSubscription(subscriptionData);
      
      // Forward to email service webhook if configured
      const emailWebhookUrl = process.env.EMAIL_WEBHOOK_URL || process.env.MAILCHIMP_WEBHOOK_URL;
      if (emailWebhookUrl) {
        try {
          const response = await fetch(emailWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
          });
        } catch (webhookError) {
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Validation failed', details: error.errors })
      };
    } else {
      console.error('Email subscription failed:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to subscribe email' })
      };
    }
  }
};