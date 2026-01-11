import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import { generateInvoiceNumber } from '../utils/invoice.js';

export const getBalance = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findByEmail(email);
    
    // In rare case user is deleted after token issuance but before this call
    if (!user) {
        return res.status(401).json({
            status: 108,
            message: "Token tidak tidak valid atau kadaluwarsa",
            data: null
        });
    }

    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: {
        balance: user.balance
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null
    });
  }
};

export const topUp = async (req, res) => {
  try {
    const { top_up_amount } = req.body;
    const email = req.user.email;

    // Validation
    // Check if amount is number and >= 0 (Requirement says "not less than 0", usually > 0 is better but complying with request)
    // "Amount only can be number and it can not less than 0" -> >= 0.
    // If input is "abc", Number("abc") is NaN.
    if (typeof top_up_amount !== 'number' || top_up_amount < 0) {
      return res.status(400).json({
        status: 102,
        message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
        data: null
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
         return res.status(401).json({
            status: 108,
            message: "Token tidak tidak valid atau kadaluwarsa",
            data: null
        });
    }

    // Process Top Up
    // 1. Update Balance
    await User.updateBalance(email, top_up_amount);
    
    // 2. Create Transaction Record
    const invoiceNumber = generateInvoiceNumber();
    await Transaction.create({
        invoice_number: invoiceNumber,
        email: email,
        transaction_type: 'TOPUP',
        description: 'Top Up balance',
        total_amount: top_up_amount
    });

    // 3. Get Updated Balance (or just calculate)
    // To be safe, fetch again or add local. Adding local is faster, but fetching ensures consistency.
    // Since we just updated, let's fetch.
    const updatedUser = await User.findByEmail(email);

    res.status(200).json({
      status: 0,
      message: "Top Up Balance berhasil",
      data: {
        balance: updatedUser.balance
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null
    });
  }
};
