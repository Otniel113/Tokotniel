import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data: services
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500, // Internal Server Error
      message: "Internal Server Error",
      data: null
    });
  }
};
