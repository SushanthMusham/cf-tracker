const axios = require("axios");

const CF_BASE_URL = "https://codeforces.com/api";

const fetchCFStats = async (handle) => {
  // fetch submissions
  const statusRes = await axios.get(
    `${CF_BASE_URL}/user.status?handle=${handle}`
  );

  if (statusRes.data.status !== "OK") {
    throw new Error("Failed to fetch user submissions from Codeforces");
  }

  const submissions = statusRes.data.result;

  // ---------- Deduplicate solved problems ----------
  const solvedSet = new Set();
  let totalSolved = 0;
  const ratingWiseSolved = {};
  const tagWiseSolved = {};

  for (const sub of submissions) {
  console.log(sub.verdict);
  break;
}

  for (const sub of submissions) {
    if (sub.verdict !== "OK") continue;
    if (!sub.problem) continue;

    const problem = sub.problem;
    const uniqueKey = `${problem.contestId}-${problem.index}`;

    if (solvedSet.has(uniqueKey)) continue;

    solvedSet.add(uniqueKey);
    totalSolved++;

    // Rating wise
    if (problem.rating) {
      ratingWiseSolved[problem.rating] =
        (ratingWiseSolved[problem.rating] || 0) + 1;
    }

    // Tag wise
    if (problem.tags && problem.tags.length > 0) {
      problem.tags.forEach((tag) => {
        tagWiseSolved[tag] = (tagWiseSolved[tag] || 0) + 1;
      });
    }
  }

  // ---------- Fetch rating history ----------
  const ratingRes = await axios.get(
    `${CF_BASE_URL}/user.rating?handle=${handle}`
  );

  if (ratingRes.data.status !== "OK") {
    throw new Error("Failed to fetch user rating history from Codeforces");
  }

  const ratingHistory = ratingRes.data.result.map((contest) => ({
    contest: contest.contestName,
    rating: contest.newRating,
    date: new Date(contest.ratingUpdateTimeSeconds * 1000),
  }));

  const currentRating =
    ratingHistory.length > 0
      ? ratingHistory[ratingHistory.length - 1].rating
      : null;

  const maxRating =
    ratingHistory.length > 0
      ? Math.max(...ratingHistory.map((r) => r.rating))
      : null;

    

  return {
    totalSolved,
    ratingWiseSolved,
    tagWiseSolved,
    ratingHistory,
    currentRating,
    maxRating,
  };
  
};

module.exports = { fetchCFStats };
