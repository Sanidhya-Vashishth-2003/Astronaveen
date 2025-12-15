// backend/routes/compatibilityRoutes.js
const express = require("express");
const router = express.Router();

/**
 * Demo compatibility engine.
 * Replace this with REAL astrology API later.
 */
async function callCompatibilityEngine({ p1, p2 }) {
  const day1 = parseInt(p1.dob.split("-")[2] || "1", 10);
  const day2 = parseInt(p2.dob.split("-")[2] || "1", 10);

  let baseScore = 70 + ((Math.abs(day1 - day2) % 5) - 2);
  if (baseScore > 95) baseScore = 95;
  if (baseScore < 55) baseScore = 55;

  return {
    score: baseScore,
    verdict:
      baseScore >= 80
        ? "Strong Compatibility"
        : baseScore >= 65
        ? "Balanced Compatibility"
        : "Needs Conscious Effort",
    summary:
      "This is a structured demo compatibility reading. In a real system, this would be calculated from both charts using proper Vedic matching.",

    strengths: [
      "Good emotional understanding when both express honestly.",
      "Potential for long-term support if mutual respect is maintained.",
      "Both can motivate each other towards goals when aligned.",
    ],

    challenges: [
      "Differences in expressing emotions can create misunderstandings.",
      "Ego clashes may happen if communication is not open.",
      "Needs healthy boundaries to avoid over-attachment or control.",
    ],

    emotional:
      "Emotionally, this match shows deep connection potential, but both partners must avoid silent expectations.",
    communication:
      "Communication may swing between very intense and very silent. Regular calm talks will help.",
    longTerm:
      "Long-term stability is possible if both partners grow together instead of trying to control each other.",
    advice: {
      together:
        "Focus on friendship inside the relationship. Celebrate each other's small wins.",
      individual:
        "Each partner should work on self-confidence and emotional independence.",
      remedies:
        "Simple shared rituals like walks, regular date nights and expressing gratitude act as modern remedies.",
    },
  };
}

// POST /api/compatibility
router.post("/", async (req, res) => {
  try {
    const {
      p1Name,
      p1Dob,
      p1Time,
      p1Place,
      p1Birthplace,
      p2Name,
      p2Dob,
      p2Time,
      p2Place,
      p2Birthplace,
    } = req.body;

    if (
      !p1Name ||
      !p1Dob ||
      !p1Time ||
      !p1Place ||
      !p1Birthplace ||
      !p2Name ||
      !p2Dob ||
      !p2Time ||
      !p2Place ||
      !p2Birthplace
    ) {
      return res.status(400).json({ msg: "All fields for both partners are required" });
    }

    const p1 = { name: p1Name, dob: p1Dob, time: p1Time, place: p1Place, birthplace: p1Birthplace };
    const p2 = { name: p2Name, dob: p2Dob, time: p2Time, place: p2Place, birthplace: p2Birthplace };

    const compatibility = await callCompatibilityEngine({ p1, p2 });

    return res.json({ partner1: p1, partner2: p2, compatibility });
  } catch (err) {
    console.error("Compatibility error:", err);
    return res.status(500).json({ msg: "Error calculating compatibility" });
  }
});

module.exports = router;
