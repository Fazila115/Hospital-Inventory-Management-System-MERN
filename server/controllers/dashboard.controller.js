import Item from "../models/item.model.js";

// oerview platform data for dashboard
export const getDashboardData = async (req, res) => {
  try {
    const totalItems = await Item.countDocuments();
    const totalStock = await Item.aggregate([{ $group: { _id: null, total: { $sum: "$stock" } } }]);
    const outOfStock = await Item.countDocuments({ stock: 0 });
    const lowStock = await Item.countDocuments({ stock: { $lte: Number(process.env.LOW_STOCK_THRESHOLD), $gt: 0 } });
    const totalSuppliers = (await Item.distinct("supplier")).length;

    const today = new Date();
    const warningLimit = new Date();
    warningLimit.setDate(today.getDate() + 30);

    const expiredCount = await Item.countDocuments({ expiryDate: { $lt: today } });
    const expiringSoon = await Item.countDocuments({ expiryDate: { $gte: today, $lte: warningLimit } });

    res.json({
      success: true,
      data: {
        totalItems,
        totalStock: totalStock[0]?.total || 0,
        outOfStock,
        lowStock,
        totalSuppliers,
        expiredCount,
        expiringSoon
      }

    });
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
