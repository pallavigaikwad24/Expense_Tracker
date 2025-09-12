// import type { Request, Response } from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const chatbotController = async (req: Request, res: Response) => {
//   try {
//     const { message } = req.body;
//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       throw new Error("Missing GEMINI_API_KEY in .env");
//     }

//     const genAI = new GoogleGenerativeAI(apiKey);

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     const result = await model.generateContent(
//       `You are a helpful assistant that extracts expenses from messages.
//     Return a JSON object like: { "amount": number, "category": string, "date": "YYYY-MM-DD" }
//     I have only Five categories: Food, Travel, Shopping, Bill, Other.
//     Add into other category if you can't find the above three category.
//     Message: "${message}"`
//     );

//     const response = await result.response;
//     const text = response.text();

//     const cleaned = text
//       .replace(/```json|```/g, "") // remove markdown block
//       .trim(); // remove extra whitespace

//     // Step 2: Parse the string into a JS object
//     const expense = JSON.parse(cleaned);
//     return res.status(200).json({ success: true, data: expense });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, error: "Failed to process input" });
//   }
// };

import type { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Retry wrapper
async function retryWithBackoff(
  fn: () => Promise<any>,
  retries = 3,
  baseDelay = 1000
) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.status === 503 && i < retries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        console.warn(`Gemini overloaded. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

export const chatbotController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GEMINI_API_KEY in .env");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await retryWithBackoff(() =>
      model.generateContent(
        `Today date is ${new Date().toISOString().split("T")[0]}.
        Extract a single expense from the message and return it as a JSON object: 
        { "amount": number, "category": string, "date": "YYYY-MM-DD" }. 
         Valid categories are: Food, Travel, Shopping, Bill, and Other. 
         Use "Other" if none match. If no date is mentioned, use current date. 
         If only the day is mentioned, use the current month and year. 
         If day and month are given, use the current year. 
         Format the date as YYYY-MM-DD. Return only the JSON. 
         message:"${message}"`
      )
    );

    const response = await result.response;
    const text = response.text();

    console.log("Raw AI response:", text);

    const cleaned = text.replace(/```json|```/g, "").trim();
    const expense = JSON.parse(cleaned);

    console.log("Extracted expense:", expense);

    return res.status(200).json({ success: true, data: expense });
  } catch (err: any) {
    console.error("Chatbot error:", err);

    // Handle known Gemini overload issue
    if (err?.status === 503) {
      return res.status(503).json({
        success: false,
        error:
          "Gemini AI is temporarily overloaded. Please try again in a few moments.",
      });
    }

    // Handle bad JSON or AI response issues
    if (err instanceof SyntaxError) {
      return res.status(500).json({
        success: false,
        error:
          "Failed to parse the AI's response. Please try again or check the input.",
      });
    }

    // Generic fallback
    return res.status(500).json({
      success: false,
      error: "Failed to process input. Please try again later.",
    });
  }
};
