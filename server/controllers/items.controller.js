import Item from "../models/item.model.js";

// 1. add item
const createItem = async (req, res) => {
  try {
    const { title, description, brand, category, supplier, stock, price, contact, expiryDate } = req.body;
    const item = await Item.create({
      title,
      description,
      price,
      stock,
      supplier,
      category,
      brand,
      contact, 
      expiryDate
    });
    res.status(201).json({
      success: true,
      item
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. get all items
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      items
    });
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 3. get single item by id
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.json(item);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. update item by id
const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. delete item by id
const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. low stock items
const lowStockItems = async (req, res) => {
  try {
    const threshold = Number(process.env.LOW_STOCK_THRESHOLD);
    const items = await Item.find({ stock: { $lte: threshold, $gt: 0 } });
    res.json({
      success: true,
      data: {
        threshold,
        count: items.length,
        items
      },
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
};

// 7. out of stock items
const outOfStockItems = async (req, res) => {
  try {
    const items = await Item.find({ stock: 0 });
    res.json({
      success: true,
      data: {
        count: items.length,
        items
      }
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
};

// 8. restock item by id
const restockItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await Item.findById(req.params.id);

    item.stock = Number(quantity);
    await item.save();

    res.json({
      success: true,
      message: `Item restocked successfully! New stock: ${item.stock}`,
      item
    });
  }
  catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 9. get all suppliers with their items
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Item.aggregate([
      {
        $group: {
          _id: "$supplier",
          contacts: { $addToSet: "$contact" },
          items: {
            $push: {
              id: "$_id",
              title: "$title",
              price: "$price",
              stock: "$stock",
              category: "$category"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: "$_id",
          contacts: 1,
          items: 1
        }
      },
      { $sort: { name: 1 } }
    ]);

    res.status(200).json({ success: true, suppliers });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 10. get expired items
const getExpiredItems = async (req, res) => {
  try {
    const today = new Date();

    const items = await Item.find({ expiryDate: { $lt: today } });

    // format dates
    const formattedItems = items.map(item => ({
      ...item._doc,
      expiryDate: item.expiryDate.toLocaleDateString('en-GB') // "dd/mm/yyyy"
    }));

    res.json({ success: true, items: formattedItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// 11. get expiry soon
const getExpiringSoon = async (req, res) => {
  try {
    const days = Number(process.env.EXPIRY_WARNING_DAYS) || 30;

    const today = new Date();
    const limit = new Date();
    limit.setDate(today.getDate() + days);

    const items = await Item.find({ expiryDate: { $gte: today, $lte: limit } });

    const formattedItems = items.map(item => ({
      ...item._doc,
      expiryDate: item.expiryDate.toLocaleDateString('en-GB') // "dd/mm/yyyy"
    }));

    res.json({ success: true, items: formattedItems, days });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  lowStockItems,
  outOfStockItems,
  restockItem,
  getSuppliers,
  getExpiredItems,
  getExpiringSoon
}
