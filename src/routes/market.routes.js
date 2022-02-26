import express from "express";
import jwtMiddleware from "express-jwt";
import createMarketValidator from "../middlewares/createMarketValidator";
import updateMarketValidator from "../middlewares/updateMarketValidator";
import {
  getAllMarkets,
  createMarket,
  getMarketByCode,
  updateMarket,
  deleteMarket,
} from "../controllers/market.controller";

const router = express.Router();

/**
 * @swagger
 * /markets/:
 *   get:
 *     tags:
 *       - market
 *     security:
 *       - jwt: []
 *     summary: Gets all resources.
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
 *                       id:
 *                         type: string
 *                         example: 60edfd01aea9375a24057720
 *                       marketCode:
 *                         type: string
 *                         example: M-112-A2
 *                       name:
 *                         type: string
 *                         example: Market-112-A2
 *                       countryIsoCodes:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "ESP"
 *                   message:
 *                     type: string
 *                     example: Request successful
 */
router.route("/").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getAllMarkets);


/**
 * @swagger
 * /markets/create:
 *   post:
 *     tags:
 *       - market
 *     security:
 *       - jwt: []
 *     summary: Adds a new resource.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              marketCode:
 *                type: string
 *                required: true
 *                example: M-112-A2
 *              name:
 *                type: string
 *                required: true
 *                example: Market-112-A2
 *              countryIsoCodes:
 *                type: array
 *                items:
 *                  type: string
 *                  example: "ESP"
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
 *                   example: \"marketCode\" is required
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
 *         description: Returns a market object in the field of data.
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
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     marketCode:
 *                       type: string
 *                       example: M-112-A2
 *                     name:
 *                       type: string
 *                       example: Market-112-A2
 *                     countryIsoCodes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ESP"
 *                 message:
 *                   type: string
 *                   example: Request successful
 */
router.route("/create").post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  createMarketValidator,
  createMarket
);

/**
 * @swagger
 * /markets/{marketCode}:
 *   get:
 *     tags:
 *       - market
 *     security:
 *       - jwt: []
 *     summary: Gets one resource.
 *     parameters:
 *       - in: path
 *         name: marketCode
 *         required: true
 *         type: string
 *         example: M-112-A2
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
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     marketCode:
 *                       type: string
 *                       example: M-112-A2
 *                     name:
 *                       type: string
 *                       example: Market-112-A2
 *                     countryIsoCodes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ESP"
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
router.route("/:marketCode").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getMarketByCode);

/**
 * @swagger
 * /markets/update/{marketCode}:
 *   put:
 *     tags:
 *       - market
 *     security:
 *       - jwt: []
 *     summary: Updates one resource.
 *     parameters:
 *       - in: path
 *         name: marketCode
 *         required: true
 *         type: string
 *         example: M-112-A2
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              marketCode:
 *                type: string
 *                required: false
 *                example: M-112-A2
 *              name:
 *                type: string
 *                required: false
 *                example: Market-112-A2
 *              countryIsoCodes:
 *                type: array
 *                items:
 *                  type: string
 *                  example: "ESP"
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
 *                   example: \"marketCode\" must be a string
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
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     marketCode:
 *                       type: string
 *                       example: M-112-A2
 *                     name:
 *                       type: string
 *                       example: Market-112-A2
 *                     countryIsoCodes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ESP"
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
router.route("/update/:marketCode").put(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), updateMarketValidator, updateMarket);

/**
 * @swagger
 * /markets/delete/{marketCode}:
 *   delete:
 *     tags:
 *       - market
 *     security:
 *       - jwt: []
 *     summary: Deletes a new resource.
 *     parameters:
 *       - in: path
 *         name: marketCode
 *         required: true
 *         type: string
 *         example: M-112-A2
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
 *         description: Returns a market object in the field of data.
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
 *                     id:
 *                       type: string
 *                       example: 60edfd01aea9375a24057720
 *                     marketCode:
 *                       type: string
 *                       example: M-112-A2
 *                     name:
 *                       type: string
 *                       example: Market-112-A2
 *                     countryIsoCodes:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "ESP"
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
router.route("/delete/:marketCode").delete(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), deleteMarket);

module.exports = router;