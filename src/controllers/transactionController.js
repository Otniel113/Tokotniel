import User from '../models/User.js';

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
