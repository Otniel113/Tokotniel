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
      status: 120, // Internal Server Error placeholder status code? Or just standard 500? 
      // The requirement didn't specify 500 format. I will stick to a similar JSON structure.
      message: "Internal Server Error",
      data: null
    });
  }
};
