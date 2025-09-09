import Bulletin from "../models/bulletin.model.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js"; // adjust the path accordingly

// Get all bulletins
export const getAllBulletins = async (req, res) => {
  try {
    const bulletins = await Bulletin.find().populate("blog").sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "All bulletins fetched successfully",
      data: bulletins,
    });
  } catch (error) {
    console.error("Error fetching bulletins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bulletins",
    });
  }
};

// Get latest 10 bulletins
export const getLatestBulletins = async (req, res) => {
  try {
    const latestBulletins = await Bulletin.find()
      .populate("blog")
      .sort({ date: -1 })
      .limit(10);
    res.status(200).json({
      success: true,
      message: "Latest bulletins fetched successfully",
      data: latestBulletins,
    });
  } catch (error) {
    console.error("Error fetching latest bulletins:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch latest bulletins",
    });
  }
};

// Create a new bulletin with image upload
export const createBulletin = async (req, res) => {
  try {
    const { heading, subHeading, content, blog } = req.body;
    let imageUrl;
    // Validate and sanitize blog field
    let blogId = undefined;
    if (
      blog &&
      typeof blog === "string" &&
      blog.trim() !== "" &&
      mongoose.Types.ObjectId.isValid(blog)
    ) {
      blogId = blog;
    }

    // Upload image to Cloudinary
    if (req.files && req.files.image) {
      const uploadResult = await uploadImageToCloudinary(
        req.files.image,
        process.env.FOLDER_NAME
      );
      imageUrl = uploadResult.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    if (!heading || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newBulletin = new Bulletin({
      heading,
      subHeading,
      content,
      blog: blogId,
      imageUrl,
    });
    await newBulletin.save();

    res.status(201).json({
      success: true,
      message: "New bulletin created successfully",
      data: newBulletin,
    });
  } catch (error) {
    console.error("Error creating bulletin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create bulletin",
    });
  }
};

// Edit bulletin by ID
export const editBulletin = async (req, res) => {
  try {
    const bulletinId = req.params.id;
    let updates = { ...req.body };

    // If new image provided, upload it and update imageUrl
    if (req.files && req.files.image) {
      const uploadResult = await uploadImageToCloudinary(
        req.files.image,
        process.env.FOLDER_NAME
      );
      updates.imageUrl = uploadResult.secure_url;
    }

    const updatedBulletin = await Bulletin.findByIdAndUpdate(
      bulletinId,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBulletin) {
      return res.status(404).json({
        success: false,
        message: "Bulletin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bulletin edited successfully",
      data: updatedBulletin,
    });
  } catch (error) {
    console.error("Error editing bulletin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to edit bulletin",
    });
  }
};

// Delete bulletin by ID
export const deleteBulletin = async (req, res) => {
  try {
    const bulletinId = req.params.id;

    const deletedBulletin = await Bulletin.findByIdAndDelete(bulletinId);

    if (!deletedBulletin) {
      return res.status(404).json({
        success: false,
        message: "Bulletin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bulletin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bulletin:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete bulletin",
    });
  }
};
