import express from 'express';
import ssr from './ssr.mjs';

const app = express();
// const url = `${req.protocol}://${req.get('host')}/index.html`;
// const url = `http://localhost:3000/index.html`;
const url = `http://pathfinder-qa.edgenetworks.ai/home/profile`;


app.get('/', async (req, res, next) => {
  `${req.protocol}://${req.get('host')}/index.html`;
  const {html, ttRenderMs} = await ssr(url);
  // Add Server-Timing! See https://w3c.github.io/server-timing/.
  res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
  return res.status(200).send(html); // Serve prerendered page as response.
});

app.listen(8080, () => console.log('Server started: visit: http://localhost:8080. Press Ctrl+C to quit'));