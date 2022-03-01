import express from "express";
import jwtMiddleware from "express-jwt";
import createTransactionValidator from "../middlewares/createTransactionValidator";
import updateTransactionValidator from "../middlewares/updateTransactionValidator";
import getTransactionsFilter from "../middlewares/getTransactionsFilter";
import {
  getTransactionSummary,
  getAllTransactions,
  createTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transaction.controller";

const router = express.Router();

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Get all transactions and filter by options.
 *     parameters:
 *       - in: query
 *         name: dateFrom
 *         required: false
 *         type: string
 *         example: 26/02/2022
 *       - in: query
 *         name: dateTo
 *         required: false
 *         type: string
 *         example: 26/02/2022
 *       - in: query
 *         name: marketCode
 *         required: false
 *         type: string
 *         example: M-EUR
 *       - in: query
 *         name: countryIsoCode
 *         required: false
 *         type: string
 *         example: "ESP"
 *     responses:
 *       422:
 *         description: Returns false success, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"_id\" is not allowed
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       200:
 *         description: Returns an array of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: array
 *                   description: Contains service information.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60edfd01aea9375a24057720
 *                       transactionDate:
 *                         type: string
 *                         example: "27/02/2022"
 *                       unit:
 *                         type: number
 *                         example: 100
 *                       productReference:
 *                         type: string
 *                         example: "41432"
 *                       countryIsoCode:
 *                         type: string
 *                         example: "ESP"
 *                       transactionCode:
 *                         type: number
 *                         example: 0
 *                   message:
 *                     type: string
 *                     example: Request successful
 */
router.route("/summary").get(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  getTransactionsFilter,
  getTransactionSummary
);

/**
 * @swagger
 * /transactions/:
 *   get:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Gets all resources.
 *     responses:
 *       422:
 *         description: Returns false success, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"_id\" is not allowed
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       200:
 *         description: Returns an array of resources.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: array
 *                   description: Contains service information.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60edfd01aea9375a24057720
 *                       transactionDate:
 *                         type: string
 *                         example: "27/02/2022"
 *                       unit:
 *                         type: number
 *                         example: 100
 *                       productReference:
 *                         type: string
 *                         example: "41432"
 *                       countryIsoCode:
 *                         type: string
 *                         example: "ESP"
 *                       transactionCode:
 *                         type: number
 *                         example: 0
 *                   message:
 *                     type: string
 *                     example: Request successful
 */
router.route("/").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getAllTransactions);

/**
 * @swagger
 * /transactions/create:
 *   post:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Adds a new resource.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              transactionDate:
 *                type: string
 *                example: "27/02/2022"
 *              unit:
 *                type: number
 *                example: 100
 *              productReference:
 *                type: string
 *                example: "41432"
 *              countryIsoCode:
 *                type: string
 *                example: "ESP"
 *              transactionCode:
 *                type: number
 *                example: 0
 *     responses:
 *       422:
 *         description: Returns false success, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"_id\" is required
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       400:
 *         description: Returns false success, status code 400, error code, the error message if the process fails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 11000
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *       200:
 *         description: Returns a transaction object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     transactionDate:
 *                       type: string
 *                       example: "27/2/2022"
 *                     unit:
 *                       type: number
 *                       example: 100
 *                     productReference:
 *                       type: string
 *                       example: "41432"
 *                     countryIsoCode:
 *                       type: string
 *                       example: "ESP"
 *                     transactionCode:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Request successful
 */
router.route("/create").post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  createTransactionValidator,
  createTransaction
);

/**
 * @swagger
 * /transactions/{_id}:
 *   get:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Gets one resource.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         type: string
 *         example: 621baca581f40c2984808014
 *     responses:
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       200:
 *         description: Returns a resource object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     transactionDate:
 *                       type: string
 *                       example: "27/02/2022"
 *                     unit:
 *                       type: number
 *                       example: 100
 *                     productReference:
 *                       type: string
 *                       example: "41432"
 *                     countryIsoCode:
 *                       type: string
 *                       example: "ESP"
 *                     transactionCode:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Request successful
 *       202:
 *         description: Returns null in the field of data if the resource does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: null
 *                   description: Contains service information.
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Request successful
*/
router.route("/:_id").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getTransactionById);

/**
 * @swagger
 * /transactions/update/{_id}:
 *   put:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Updates one resource.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         type: string
 *         example: 621baca581f40c2984808014
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              transactionDate:
 *                type: string
 *                example: "27/02/2022"
 *              unit:
 *                type: number
 *                example: 100
 *              productReference:
 *                type: string
 *                example: "41432"
 *              countryIsoCode:
 *                type: string
 *                example: "ESP"
 *              transactionCode:
 *                type: number
 *                example: 0
 *     responses:
 *       422:
 *         description: Returns false success, status code 422, internal error code 422, "Invalid request data" message, and specifies where the error is.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 422
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *                 error:
 *                   type: string
 *                   example: \"_id\" must be a string
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       400:
 *         description: Returns false success, status code 400, error code, the error message if the process fails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 11000
 *                 message:
 *                   type: string
 *                   example: Something went wrong
 *       200:
 *         description: Returns an updated resource object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     transactionDate:
 *                       type: string
 *                       example: "27/02/2022"
 *                     unit:
 *                       type: number
 *                       example: 100
 *                     productReference:
 *                       type: string
 *                       example: "41432"
 *                     countryIsoCode:
 *                       type: string
 *                       example: "ESP"
 *                     transactionCode:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Request successful
 *       202:
 *         description: Returns null in the field of data if the resource does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: null
 *                   description: Contains service information.
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Request successful
*/
router.route("/update/:_id").put(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), updateTransactionValidator, updateTransaction);

/**
 * @swagger
 * /transactions/delete/{_id}:
 *   delete:
 *     tags:
 *       - transaction
 *     security:
 *       - jwt: []
 *     summary: Deletes a new resource.
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         type: string
 *         example: 621baca581f40c2984808014
 *     responses:
 *       401:
 *         description: Returns false success, status code 401, internal error code 401, "Unauthorized access" message when Authorization Bearer is invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: false
 *                 code:
 *                   type: number
 *                   description: internal error code.
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 *       200:
 *         description: Returns a transaction object in the field of data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: Contains service information.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     transactionDate:
 *                       type: string
 *                       example: "27/02/2022"
 *                     unit:
 *                       type: number
 *                       example: 100
 *                     productReference:
 *                       type: string
 *                       example: "41432"
 *                     countryIsoCode:
 *                       type: string
 *                       example: "ESP"
 *                     transactionCode:
 *                       type: number
 *                       example: 0
 *                 message:
 *                   type: string
 *                   example: Request successful
 *       202:
 *         description: Returns null in the field of data if the resource does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Represents the response to the petition.
 *                   example: true
 *                 data:
 *                   type: null
 *                   description: Contains service information.
 *                   example: null
 *                 message:
 *                   type: string
 *                   example: Request successful
*/
router.route("/delete/:_id").delete(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), deleteTransaction);

module.exports = router;