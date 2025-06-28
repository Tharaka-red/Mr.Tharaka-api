const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/download/ytmp3', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) return res.json({ status: false, message: "URL is missing" });

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.setHeader('Content-Disposition', `attachment; filename="audio.mp3"`);
    ytdl(videoUrl, { filter: 'audioonly' }).pipe(res);
  } catch (err) {
    res.json({ status: false, message: "Error downloading", error: err.message });
  }
});
