import axios from 'axios';

async function getMotivationalQuotes() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quotes = [response.data.content];
    return quotes;
  } catch (error) {
    console.error(`Error fetching quotes: ${error.message}`);
    return [];
  }
}

export{
  getMotivationalQuotes
}