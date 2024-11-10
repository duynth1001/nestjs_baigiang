import axios from 'axios';

export const sendRequests = async (url, totalRequests = 100000, batchSize = 10000) => {
  const results = [];

  for (let i = 0; i < totalRequests; i += batchSize) {
    // Tạo một batch với số lượng request là batchSize
    const batch = Array.from({ length: Math.min(batchSize, totalRequests - i) }, () =>
      axios.get(url)
    );

    // Chờ batch hiện tại hoàn thành
    try {
      const batchResults = await Promise.all(batch);
      results.push(...batchResults);
    } catch (error) {
      console.error('Error in batch:', error);
    }
  }

  return results;
};