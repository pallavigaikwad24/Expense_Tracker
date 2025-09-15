import { Router } from "express";
import { expenseAllController } from "../controllers/Dashboard/expenseAllController.js";
import { addExpenseController } from "../controllers/Dashboard/addExpenseController.js";
import { chatbotController } from "../controllers/Dashboard/chatBotController.js";
import { isAuthenticate } from "../middlewares/isAuthenticate.js";
const router = Router();

router.get("/expenseall/:email", isAuthenticate, expenseAllController);
router.post("/addExpense", isAuthenticate, addExpenseController);
router.post("/chatbot", isAuthenticate, chatbotController);

export default router;