import PDFDocument from 'pdfkit';
import { IOrder } from '@/models/Order';

export async function generateInvoicePDF(order: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
      });

      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      // Header
      doc.fontSize(24).font('Helvetica-Bold').text('INVOICE', 50, 50);
      doc.fontSize(10).font('Helvetica');

      // Company info
      doc.fontSize(12).text('DERMFIX', 50, 100);
      doc.fontSize(10).text('Preventive Skin Science', 50, 115);
      doc.text('www.dermfix.com', 50, 130);
      doc.text('hello@dermfix.com', 50, 145);

      // Invoice details
      const invoiceX = 350;
      doc
        .fontSize(11)
        .text(`Invoice #: ${order._id}`, invoiceX, 100)
        .text(`Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}`, invoiceX, 115)
        .text(
          `Payment Status: ${order.paymentStatus}`,
          invoiceX,
          130
        );

      // Customer info
      doc.fontSize(12).font('Helvetica-Bold').text('Bill To:', 50, 180);
      doc
        .fontSize(10)
        .font('Helvetica')
        .text(order.customerDetails.name, 50, 200)
        .text(order.customerDetails.email, 50, 215)
        .text(order.customerDetails.phone, 50, 230)
        .text(
          `${order.customerDetails.address}, ${order.customerDetails.city}, ${order.customerDetails.state} ${order.customerDetails.pincode}`,
          50,
          245
        );

      // Items table header
      const tableTop = 300;
      const col1 = 50;
      const col2 = 280;
      const col3 = 380;
      const col4 = 480;

      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .text('Product', col1, tableTop)
        .text('Qty', col2, tableTop)
        .text('Price', col3, tableTop)
        .text('Total', col4, tableTop);

      // Draw line
      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      // Items
      let yPosition = tableTop + 30;
      let subtotal = 0;

      for (const item of order.items) {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        doc
          .fontSize(10)
          .font('Helvetica')
          .text(item.name, col1, yPosition, { width: 200 })
          .text(item.quantity.toString(), col2, yPosition)
          .text(`₹${item.price.toFixed(2)}`, col3, yPosition)
          .text(`₹${itemTotal.toFixed(2)}`, col4, yPosition);

        yPosition += 25;
      }

      // Draw line before totals
      doc
        .moveTo(50, yPosition + 10)
        .lineTo(550, yPosition + 10)
        .stroke();

      yPosition += 25;

      // Totals
      const tax = order.tax || 0;
      const shipping = order.shipping || 0;
      const total = order.totalAmount;

      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .text('Subtotal:', col3, yPosition)
        .text(`₹${subtotal.toFixed(2)}`, col4, yPosition);

      yPosition += 20;

      doc
        .fontSize(10)
        .text(`Tax (${order.taxPercentage || 18}%):`, col3, yPosition)
        .text(`₹${tax.toFixed(2)}`, col4, yPosition);

      yPosition += 20;

      doc.text('Shipping:', col3, yPosition).text(`₹${shipping.toFixed(2)}`, col4, yPosition);

      yPosition += 20;

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .text('Total:', col3, yPosition)
        .text(`₹${total.toFixed(2)}`, col4, yPosition);

      // Footer
      yPosition += 60;
      doc
        .fontSize(9)
        .font('Helvetica')
        .text('Payment Reference:', 50, yPosition)
        .text(order.razorpayPaymentId || 'N/A', 50, yPosition + 15)
        .text(`Tracking ID: ${order.trackingId}`, 50, yPosition + 30);

      // Thank you message
      doc
        .fontSize(10)
        .text(
          'Thank you for your purchase! For any queries, please contact hello@dermfix.com',
          50,
          yPosition + 60,
          {
            align: 'center',
            width: 500,
          }
        );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
