// This file would be used in a real backend implementation
// For now, it returns a mock response that the Bluetooth Print app can use

export function generateReceiptJSON(receiptData: any) {
  const items = [];

  // Title
  items.push({
    type: 0, // text
    content: "BARBERSHOP POS",
    bold: 1,
    align: 1, // center
    format: 2, // double height + width
  });

  // Address
  items.push({
    type: 0,
    content: "Jl. Contoh No. 123, Jakarta",
    bold: 0,
    align: 1,
    format: 0,
  });

  // Phone
  items.push({
    type: 0,
    content: "Tel: 021-1234567",
    bold: 0,
    align: 1,
    format: 0,
  });

  // Date and time
  const date = new Date().toLocaleDateString("id-ID");
  const time = new Date().toLocaleTimeString("id-ID");

  items.push({
    type: 0,
    content: `Date: ${date} Time: ${time}`,
    bold: 0,
    align: 1,
    format: 0,
  });

  // Customer info if available
  if (receiptData.customerName) {
    items.push({
      type: 0,
      content: `Customer: ${receiptData.customerName}`,
      bold: 0,
      align: 0,
      format: 0,
    });
  }

  // Separator
  items.push({
    type: 0,
    content: "--------------------------------",
    bold: 0,
    align: 1,
    format: 0,
  });

  // Services header
  items.push({
    type: 0,
    content: "SERVICES",
    bold: 1,
    align: 0,
    format: 0,
  });

  // Services items
  if (receiptData.services && receiptData.services.length > 0) {
    receiptData.services.forEach((service: any) => {
      items.push({
        type: 0,
        content: `${service.name}`,
        bold: 0,
        align: 0,
        format: 0,
      });
      items.push({
        type: 0,
        content: `${service.price}`,
        bold: 0,
        align: 2,
        format: 0,
      });
    });
  } else {
    items.push({
      type: 0,
      content: "No services",
      bold: 0,
      align: 0,
      format: 0,
    });
  }

  // Products header if any
  if (receiptData.products && receiptData.products.length > 0) {
    items.push({
      type: 0,
      content: "PRODUCTS",
      bold: 1,
      align: 0,
      format: 0,
    });

    // Products items
    receiptData.products.forEach((item: any) => {
      items.push({
        type: 0,
        content: `${item.product.name} x${item.quantity}`,
        bold: 0,
        align: 0,
        format: 0,
      });
      items.push({
        type: 0,
        content: `${item.product.price * item.quantity}`,
        bold: 0,
        align: 2,
        format: 0,
      });
    });
  }

  // Separator
  items.push({
    type: 0,
    content: "--------------------------------",
    bold: 0,
    align: 1,
    format: 0,
  });

  // Totals
  items.push({
    type: 0,
    content: `Subtotal: ${receiptData.subtotal}`,
    bold: 0,
    align: 2,
    format: 0,
  });

  items.push({
    type: 0,
    content: `Tax (10%): ${receiptData.tax}`,
    bold: 0,
    align: 2,
    format: 0,
  });

  items.push({
    type: 0,
    content: `TOTAL: ${receiptData.total}`,
    bold: 1,
    align: 2,
    format: 1,
  });

  // Payment method
  items.push({
    type: 0,
    content: `Payment: ${receiptData.paymentMethod}`,
    bold: 0,
    align: 0,
    format: 0,
  });

  // Footer
  items.push({
    type: 0,
    content: " ",
    bold: 0,
    align: 1,
    format: 0,
  });

  items.push({
    type: 0,
    content: "Thank you for your visit!",
    bold: 0,
    align: 1,
    format: 0,
  });

  items.push({
    type: 0,
    content: "Please come again",
    bold: 0,
    align: 1,
    format: 0,
  });

  return items;
}
