/**
 * @swagger
 * tags:
 *   name: Module Information
 *   description: Get information about services and banners
 */

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get list of services
 *     tags: [Module Information]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: Sukses
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       service_code:
 *                         type: string
 *                         example: PAJAK
 *                       service_name:
 *                         type: string
 *                         example: Pajak PBB
 *                       service_icon:
 *                         type: string
 *                         example: https://nutech-integrasi.app/dummy.jpg
 *                       service_tariff:
 *                         type: integer
 *                         example: 40000
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: Token tidak tidak valid atau kadaluwarsa
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 */
