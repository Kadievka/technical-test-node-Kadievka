import express from "express";
import jwtMiddleware from "express-jwt";
import createCountryValidator from "../middlewares/createCountryValidator";
import updateCountryValidator from "../middlewares/updateCountryValidator";
import {
  getAllCountries,
  createCountry,
  getCountryByIsoCode,
  updateCountry,
  deleteCountry,
} from "../controllers/country.controller";

const router = express.Router();

/**
 * @swagger
 * /countries/:
 *   get:
 *     tags:
 *       - country
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
 *         description: Returns a pagination of the resource.
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
 *                       isoCode:
 *                         type: string
 *                         example: ESP
 *                       name:
 *                         type: string
 *                         example: España
 *                   message:
 *                     type: string
 *                     example: Request successful
 */
router.route("/").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getAllCountries);


/**
 * @swagger
 * /countries/create:
 *   post:
 *     tags:
 *       - country
 *     security:
 *       - jwt: []
 *     summary: Adds a new resource.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              isoCode:
 *                type: string
 *                required: true
 *                example: ESP
 *              name:
 *                type: string
 *                required: true
 *                example: España
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
 *                   example: \"isoCode\" is required
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
 *         description: Returns a country object in the field of data.
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
 *                     isoCode:
 *                       type: string
 *                       example: ESP
 *                     name:
 *                       type: string
 *                       example: España
 *                 message:
 *                   type: string
 *                   example: Request successful
 */
router.route("/create").post(
  jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  createCountryValidator,
  createCountry
);

/**
 * @swagger
 * /countries/{isoCode}:
 *   get:
 *     tags:
 *       - country
 *     security:
 *       - jwt: []
 *     summary: Gets one resource.
 *     parameters:
 *       - in: path
 *         name: isoCode
 *         required: true
 *         type: string
 *         example: ESP
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
 *                     isoCode:
 *                       type: string
 *                       example: ESP
 *                     name:
 *                       type: string
 *                       example: España
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
router.route("/:isoCode").get(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), getCountryByIsoCode);

/**
 * @swagger
 * /countries/update/{isoCode}:
 *   put:
 *     tags:
 *       - country
 *     security:
 *       - jwt: []
 *     summary: Updates one resource.
 *     parameters:
 *       - in: path
 *         name: isoCode
 *         required: true
 *         type: string
 *         example: ESP
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              isoCode:
 *                type: string
 *                required: false
 *                example: ESP
 *              name:
 *                type: string
 *                required: false
 *                example: España
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
 *                   example: \"isoCode\" must be a string
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
 *                     isoCode:
 *                       type: string
 *                       example: ESP
 *                     name:
 *                       type: string
 *                       example: España
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
router.route("/update/:isoCode").put(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), updateCountryValidator, updateCountry);

/**
 * @swagger
 * /countries/delete/{isoCode}:
 *   delete:
 *     tags:
 *       - country
 *     security:
 *       - jwt: []
 *     summary: Deletes a new resource.
 *     parameters:
 *       - in: path
 *         name: isoCode
 *         required: true
 *         type: string
 *         example: ESP
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
 *         description: Returns a country object in the field of data.
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
 *                     isoCode:
 *                       type: string
 *                       example: ESP
 *                     name:
 *                       type: string
 *                       example: España
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
router.route("/delete/:isoCode").delete(jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }), deleteCountry);

module.exports = router;