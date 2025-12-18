const User = require('../models/User');
const CFStats = require('../models/CFStats');
const { fetchCFStats } = require('../services/cfService');

// Cache duration (6 hours)
const CACHE_DURATION = 6 * 60 * 60 * 1000; 

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.userId; 
    
    // 1. Move the forceRefresh logic inside the function
    const forceRefresh = req.query.refresh === "true";

    // Get user 
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check cached stats
    const existingStats = await CFStats.findOne({ userId });

    // 3. Move the conditional check here and include forceRefresh
    if (
      existingStats &&
      !forceRefresh &&
      Date.now() - new Date(existingStats.lastUpdated).getTime() < CACHE_DURATION
    ) {
      return res.status(200).json(existingStats);
    }

    // Fetch fresh stats from Codeforces
    const cfStatsData = await fetchCFStats(user.cfHandle);

    // save and update stats in DB
    const updatedStats = await CFStats.findOneAndUpdate(
      { userId },
      {
        userId,
        cfHandle: user.cfHandle,
        ...cfStatsData,
        lastUpdated: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(200).json(updatedStats);
  } catch (error) {
    console.error("Error fetching CF stats:", error);
    res.status(500).json({
      message: "Server error while fetching Codeforces stats"
    });
  }
};