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

    const user = await User.findByEmail(email);
     if (!user) {
         return res.status(401).json({
            status: 108,
            message: "Token tidak tidak valid atau kadaluwarsa",
            data: null
        });
    }

    const service = await Service.findByCode(service_code);
    if (!service) {
      return res.status(400).json({
        status: 102,
        message: "Service ataus Layanan tidak ditemukan",
        data: null
      });
    }

    if (user.balance < service.service_tariff) {
      return res.status(400).json({
        status: 102,
        message: "Saldo tidak mencukupi",
        data: null
      });
    }

    const invoiceNumber = generateInvoiceNumber();
    
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
        created_on: createdOn
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

    await User.updateBalance(email, top_up_amount);
    
    const invoiceNumber = generateInvoiceNumber();
    await Transaction.create({
        invoice_number: invoiceNumber,
        email: email,
        transaction_type: 'TOPUP',
        description: 'Top Up balance',
        total_amount: top_up_amount
    });

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
