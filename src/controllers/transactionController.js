import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import Service from '../models/Service.js';
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

export const createTransaction = async (req, res) => {
  try {
    const { service_code } = req.body;
    const email = req.user.email;

    // 1. Get User
    const user = await User.findByEmail(email);
     if (!user) {
         return res.status(401).json({
            status: 108,
            message: "Token tidak tidak valid atau kadaluwarsa",
            data: null
        });
    }

    // 2. Get Service
    const service = await Service.findByCode(service_code);
    if (!service) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null
      });
    }

    // 3. Check Balance
    if (user.balance < service.service_tariff) {
      // The requirement doesn't explicitely specify "Insufficient Balance" response status logic other than "no transaction".
      // Usually it's 400 with a message.
      // DDL.sql comment for transactions table: "(Boleh NULL jika transaksinya Topup)".
      // But for response format for insufficient balance, usually:
      // status: 102? or different?
      // I'll stick to 400 and a descriptive message.
      // Wait, request says: "If it insufficent then no transaction".
      // What is the response? Request doesn't provide "Insufficient Balance" JSON example.
      // I will assume standard error response.
      // However, typical competitive programming/tasks would have a specific status for this.
      // But based on provided info, I only have 102 (Service not found) and 108 (Auth).
      // I'll create a new error response or reuse one if appropriate.
      // Let's use 400 with status 102 (or maybe 103/104?)
      // Actually, looking at previous similar projects (Nutech usually), it might be separate.
      // But without instruction, I'll allow myself to return 400.
      return res.status(400).json({
        status: 102, // Reusing 102 as "Bad Request" generic or create new
        message: "Saldo tidak mencukupi",
        data: null
      });
    }

    // 4. Create Transaction
    const invoiceNumber = generateInvoiceNumber();
    
    // Deduct balance
    // Note: User.updateBalance adds amount. To deduct, pass negative?
    // User.js: 'UPDATE users SET balance = balance + ? ...'
    // So passing negative service_tariff works.
    await User.updateBalance(email, -service.service_tariff);

    const transactionData = {
        invoice_number: invoiceNumber,
        email: email,
        transaction_type: 'PAYMENT',
        description: service.service_name,
        total_amount: service.service_tariff,
        service_code: service.service_code
    };
    
    await Transaction.create(transactionData);

    // 5. Response
    // Need timestamp. Since we just inserted, we can generate one or fetch.
    // For specific requirement "created_on" in response, I can use the current time.
    const createdOn = new Date();

    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number: invoiceNumber,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: 'PAYMENT',
        total_amount: service.service_tariff,
        created_on: createdOn // or formatted ISO string if needed, requirement shows ISO format '2023-08-17T10:10:10.000Z'
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
