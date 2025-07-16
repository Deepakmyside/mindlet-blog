const express = require('express');
const router = express.Router(); 
const axios = require('axios'); 

router.post('/generate-blog', async (req, res) => {
    try {
        const { title, existingContent } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required to generate blog content.' });
        }

        let prompt = `Write a comprehensive and engaging blog post based on the following title: "${title}".`;
        if (existingContent && existingContent.trim().length > 0) {
            prompt = `Continue and expand the following blog content, making it comprehensive and engaging, based on the title: "${title}". Existing content: "${existingContent}"`;
        }

        // --- START OF GEMINI SPECIFIC CODE ---
        const geminiResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: prompt }]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 1000,
                    temperature: 0.7,
                    topP: 1,
                    topK: 1,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const generatedText = geminiResponse.data.candidates[0].content.parts[0].text;
        // --- END OF GEMINI SPECIFIC CODE ---

        res.status(200).json({ generatedContent: generatedText });

    } catch (error) {
        console.error('Error generating AI content:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Failed to generate content from AI.', error: error.response ? error.response.data.message : error.message });
    }
});

module.exports = router; 