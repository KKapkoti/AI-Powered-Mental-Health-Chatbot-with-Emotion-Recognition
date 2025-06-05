//controllers/memeController.js
const path = require("path");
const Jimp = require("jimp");
const memeTemplates = require("../memeTemplates");

exports.generateMeme = async (req, res) => {
    try {
        const testImage = new Jimp(256, 256, 0x000000FF); 
        await testImage.writeAsync("test.png"); // Save the image as 'test.png'
        console.log("Test image created!"); // Log success message
      } catch (error) {
        console.error("Error creating test image:", error);
      }
  const { template, topText, bottomText } = req.body;

  const found = memeTemplates.find(t => t.id === template);
  if (!found) return res.status(400).json({ error: "Invalid meme template." });

  const templatePath = path.join(__dirname, "..", "templates", `${template}.jpg`);
  console.log("Trying to load image from path:", templatePath);

  try {
    const image = await Jimp.read(templatePath);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    const maxWidth = image.bitmap.width - 40;

    // Top text
    image.print(
      font,
      20,
      20,
      {
        text: topText || "",
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_TOP,
      },
      maxWidth,
      image.bitmap.height
    );

    // Bottom text
    image.print(
      font,
      20,
      image.bitmap.height - 80,
      {
        text: bottomText || "",
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM,
      },
      maxWidth,
      60
    );

    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    res.set("Content-Type", "image/png");
    res.set("Content-Disposition", 'attachment; filename="meme.png"');
    res.send(buffer);
  } catch (err) {
    console.error("Meme generation error:", err);
    res.status(500).json({ error: "Error generating meme." });
  }
};
