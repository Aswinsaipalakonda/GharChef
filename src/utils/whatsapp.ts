export interface CustomerOrderDetails {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
  items: Array<{
    name: string;
    weight: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentStatus: string;
  orderId: string;
}

export const SELLER_CONFIG = {
  sellerName: "Bhagya's Healthy Bakes",
  whatsappNumber: "919876543210", // Primary seller WhatsApp number
  upiId: "bhagyashealthybakes@upi", // Dynamic UPI payment receiver ID
};

export function generateWhatsAppOrderUrl(order: CustomerOrderDetails): string {
  const itemLines = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* (${item.weight}) x ${item.quantity} - ₹${item.price * item.quantity}`
    )
    .join('\n');

  const textPayload = `🍰 *NEW ORDER - BHAGYA'S HEALTHY BAKES* 🍰
-----------------------------------------
📌 *Order ID*: #${order.orderId}
📅 *Date*: ${new Date().toLocaleDateString('en-IN')}

👤 *Customer Details*:
• Name: ${order.customerName}
• Phone: ${order.phone}
• Address: ${order.address}, ${order.city} - ${order.pincode}
${order.notes ? `• Special Instructions: ${order.notes}\n` : ''}
📦 *Order Items*:
${itemLines}

-----------------------------------------
💳 *Total Amount Paid*: ₹${order.totalAmount}
✅ *Payment Method*: UPI QR Code Scanned & Confirmed
-----------------------------------------
Thank you for choosing healthy bakes! Please dispatch our fresh order soon.`;

  return `https://wa.me/${SELLER_CONFIG.whatsappNumber}?text=${encodeURIComponent(textPayload)}`;
}
