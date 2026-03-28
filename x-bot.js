// x-bot.js
const { TwitterApi } = require('twitter-api-v2');
const cron = require('node-cron');

function startXBot() {
  console.log("🤖 Booting up X-Bot Broadcasting Engine...");

  // Initialize the X API Client
  const xClient = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET,
  });

  const broadcastTemplates = [
    "Just ran a scan on the latest Solana deployments. Volume is picking up, but seeing a lot of unlocked LPs. Make sure you're checking contract authorities before jumping in.",
    "The 1-hour volume on the top trending pairs is shifting fast right now. Always fascinating watching the capital rotation in real-time.",
    "Friendly reminder: If the mint authority isn't revoked, it's not a safe play. We automatically filter those out on the terminal for a reason.",
    "Seeing some heavily concentrated dev wallets in the new launches today. If a dev holds 30%, you are their exit liquidity. Trade smart.",
    "Market feels a bit chaotic today. Best play is usually to sit back, watch the live feeds, and wait for the high-trust setups to come to you."
  ];

  // 1. Package the tweeting logic into a reusable function
  async function broadcastTweet() {
    try {
      const randomIndex = Math.floor(Math.random() * broadcastTemplates.length);
      let tweetText = broadcastTemplates[randomIndex];
      tweetText += "\n\nTracking the live data here: pumplab-frontend.vercel.app";

      await xClient.v2.tweet(tweetText);
      console.log(`[X-Bot] Successfully broadcasted stealth marketing tweet.`);
    } catch (error) {
      console.error("[X-Bot] Failed to post tweet. Check API keys or limits.", error.message);
    }
  }

  // 2. 🔥 FIRE IMMEDIATELY ON BOOT (For Testing)
  console.log("🛠️ Firing test tweet immediately...");
  broadcastTweet();

  // 3. Schedule the normal 4-hour rotation
  cron.schedule('0 */4 * * *', broadcastTweet);
  console.log("✅ X-Bot is live and scheduled to broadcast every 4 hours.");
}

module.exports = { startXBot };
