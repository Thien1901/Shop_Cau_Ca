
// Gemini AI disabled - using fallback descriptions
export const generateProductDescription = async (productName: string): Promise<string> => {
  // Return fallback description without AI
  return `Sản phẩm ${productName} chất lượng cao, phù hợp cho mọi người yêu câu cá. Độ bền tốt, hiệu suất cao. Một sản phẩm không thể thiếu trong bộ dụng cụ câu của bạn.`;
};
