/**
 * Generate Invoice Number
 * Format: INV + Date(YYYYMMDD) + - + Random
 */
const generateInvoiceNumber = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const unique = Math.floor(1000 + Math.random() * 9000);
    return `INV${dateStr}-${unique}`;
};

export { generateInvoiceNumber };
