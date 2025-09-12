import { Router } from "express";
import { expenseAllController } from "../controllers/Dashboard/expenseAllController.js";
import { addExpenseController } from "../controllers/Dashboard/addExpenseController.js";
import { chatbotController } from "../controllers/Dashboard/chatBotController.js";
const router = Router();

router.get("/expenseall", expenseAllController);
router.post("/addExpense", addExpenseController);
router.post("/chatbot", chatbotController);

export default router;