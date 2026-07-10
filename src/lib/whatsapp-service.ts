// ─── Meta Cloud API WhatsApp Notification Service ───────────────────────────
// Sends templated WhatsApp notifications for order confirmations, shipments, and deliveries

interface WhatsAppVariables {
  [key: string]: string;
}

interface WhatsAppNotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendWhatsAppNotification(
  phoneNumber: string,
  templateName: string,
  variables: WhatsAppVariables
): Promise<WhatsAppNotificationResponse> {
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
  const BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;

  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN || !BUSINESS_ACCOUNT_ID) {
    console.error('[v0] WhatsApp credentials missing');
    return { success: false, error: 'WhatsApp credentials not configured' };
  }

  try {
    // Clean phone number - remove any non-digits and ensure it's in E.164 format
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    // Build template parameters
    const templateParameters = {
      body: {
        parameters: Object.values(variables).map((value) => ({
          type: 'text',
          text: value,
        })),
      },
    };

    // Call Meta Graph API
    const url = `https://graph.instagram.com/v18.0/${PHONE_NUMBER_ID}/messages`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: formattedPhone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en_US',
          },
          ...templateParameters,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[v0] WhatsApp API error:', error);
      return {
        success: false,
        error: error.error?.message || 'Failed to send WhatsApp message',
      };
    }

    const result = await response.json();
    return {
      success: true,
      messageId: result.messages?.[0]?.id,
    };
  } catch (error) {
    console.error('[v0] WhatsApp service error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Predefined template notifications
export async function sendOrderConfirmationNotification(
  phoneNumber: string,
  orderData: {
    orderId: string;
    customerName: string;
    totalAmount: string;
    estimatedDelivery: string;
  }
): Promise<WhatsAppNotificationResponse> {
  return sendWhatsAppNotification(phoneNumber, 'ORDER_CONFIRMED', {
    customer_name: orderData.customerName,
    order_id: orderData.orderId,
    total_amount: orderData.totalAmount,
    estimated_delivery: orderData.estimatedDelivery,
  });
}

export async function sendDispatchNotification(
  phoneNumber: string,
  shipmentData: {
    orderId: string;
    trackingId: string;
    trackingUrl: string;
  }
): Promise<WhatsAppNotificationResponse> {
  return sendWhatsAppNotification(phoneNumber, 'DISPATCHED', {
    order_id: shipmentData.orderId,
    tracking_id: shipmentData.trackingId,
    tracking_url: shipmentData.trackingUrl,
  });
}

export async function sendDeliveryNotification(
  phoneNumber: string,
  deliveryData: {
    orderId: string;
    trackingId: string;
  }
): Promise<WhatsAppNotificationResponse> {
  return sendWhatsAppNotification(phoneNumber, 'DELIVERED', {
    order_id: deliveryData.orderId,
    tracking_id: deliveryData.trackingId,
  });
}
