// backend/routes/kundaliRoutes.js
const express = require("express");
const router = express.Router();

/**
 * ✅ TODO: Replace this with REAL astrology engine / API.
 * For now it returns structured demo data so your UI behaves like a real astrologer.
 */
async function callAstrologyEngine({ name, dob, time, place, birthplace }) {
  // You will later:
  // - Convert dob + time + place -> timezone + coordinates
  // - Call some API (e.g. Prokerala / AstrologyAPI / custom Vedic engine)
  // - Map their response into this format.

  return {
    sunSign: "Leo ♌",
    moonSign: "Cancer ♋",
    ascendant: "Scorpio Rising (Vrishchik Lagna)",
    kundaliImageUrl:
      "https://via.placeholder.com/450x450.png?text=Kundali+Chart", // replace with real image from API

    behaviour: {
      summary:
        "Passionate, intense and protective. Strong emotional depth with a natural drive to lead and create impact.",
      strengths: [
        "High loyalty and devotion in relationships",
        "Courage to take bold decisions",
        "Ability to support others during tough times",
      ],
      challenges: [
        "Tendency to overthink and take things personally",
        "Can be stubborn about opinions",
        "Needs to consciously manage ego and expectations",
      ],
    },

    lifeAreas: {
      love: {
        present:
          "Love life shows intensity and deep emotions. You prefer loyal, long-term connections rather than casual bonds.",
        future:
          "Coming years show more stability in relationships if you communicate clearly and avoid assumptions.",
      },
      career: {
        present:
          "Chart supports leadership, management, entrepreneurship or fields where you can handle responsibility.",
        future:
          "Good growth is indicated if you stay consistent and avoid impulsive decisions about work or money.",
      },
      health: {
        present:
          "Stress and sleep cycle need attention. Emotional stress may show up in digestion or mood swings.",
        future:
          "Regular routine and grounding practices will strongly improve health in the next 1–2 years.",
      },
      finance: {
        present:
          "Earning potential is good, but expenses or impulsive spending must be controlled.",
        future:
          "Better financial stability shows up when you create a clear savings / investment plan.",
      },
    },

    dosha: {
      manglik:
        "Mild Manglik influence is indicated. Proper match-making and simple remedies before marriage are recommended.",
      kaalSarp: "No strong Kaal Sarp Yog seen in this pattern.",
      pitraDosha: "Some ancestral / family karma themes may show up emotionally.",
      other: "Chart suggests sensitivity around home and family matters.",
    },

    sadeSati: {
      status: "Middle Phase",
      description:
        "This is a karmic time for discipline and maturity. Responsibilities may feel heavy, but long-term rewards come through patience and honest effort.",
    },

    future: {
      next12Months:
        "Next 12 months show focus on career growth and inner emotional healing. Not the best phase for unnecessary risks, but good for building a strong base.",
      next3Years:
        "In the coming 2–3 years, there is potential for major life restructuring — change of work, city or relationship direction. Choices made now will shape long-term stability.",
    },

    remedies: {
      general:
        "Regular grounding (walking barefoot on earth, simple meditation) and keeping a disciplined routine will help a lot.",
      love:
        "Be clear and honest about your needs in relationships. Avoid testing people indirectly; communicate directly.",
      career:
        "Avoid procrastination. Break big goals into smaller tasks and keep upgrading skills.",
      spiritual:
        "Light a diya on Saturdays or Tuesdays with a small prayer for guidance and protection, if it aligns with your beliefs.",
    },

    lucky: {
      number: "1 and 9",
      color: "Deep maroon / gold tones",
      day: "Sunday",
    },
  };
}

// POST /api/kundali
router.post("/", async (req, res) => {
  try {
    const { name, dob, time, place, birthplace } = req.body;

    if (!name || !dob || !time || !place || !birthplace) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const astroData = await callAstrologyEngine({
      name,
      dob,
      time,
      place,
      birthplace,
    });

    return res.json({
      name,
      dob,
      time,
      place,
      birthplace,
      ...astroData,
    });
  } catch (err) {
    console.error("Kundali error:", err.message);
    res.status(500).json({ msg: "Error generating kundali" });
  }
});

module.exports = router;
