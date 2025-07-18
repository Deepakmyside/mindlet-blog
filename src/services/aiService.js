// src/services/aiService.js

import API from ("@/api/axios");

const generateBlogContentWithAI = async (title, existingContent) => {
  if (!title.trim()) {
    throw new Error('Title is required to generate blog content.');
  }

  try {
    const response = await axios.post('/api/ai/generate-blog', {
      title: title,
      existingContent: existingContent,
    });
    return response.data.generatedContent;
  } catch (error) {
    console.error('AI Service Error:', error.response ? error.response.data : error.message);
    const errorMessage = error.response?.data?.message || 'Failed to generate content. Please try again.';
    throw new Error(errorMessage);
  }
};

export default generateBlogContentWithAI;