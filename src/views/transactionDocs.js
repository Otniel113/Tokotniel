/**
 * @swagger
 * tags:
 *   name: Module Transaction
 *   description: Transaction and balance operations
 */

/**
 * @swagger
 * /balance:
 *   get:
 *     summary: Get user balance
 *     tags: [Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved balance
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
 *                   example: Get Balance Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 1000000
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

/**
 * @swagger
 * /topup:
 *   post:
 *     summary: Top up user balance
 *     tags: [Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - top_up_amount
 *             properties:
 *               top_up_amount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 1000000
 *     responses:
 *       200:
 *         description: Top Up successful
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
 *                   example: Top Up Balance berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     balance:
 *                       type: integer
 *                       example: 2000000
 *       400:
 *         description: Bad request (Validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
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

/**
 * @swagger
 * /transaction:
 *   post:
 *     summary: Create a transaction
 *     tags: [Module Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_code
 *             properties:
 *               service_code:
 *                 type: string
 *                 example: PULSA
 *     responses:
 *       200:
 *         description: Transaction successful
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
 *                   example: Transaksi berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     invoice_number:
 *                       type: string
 *                       example: INV17082023-001
 *                     service_code:
 *                       type: string
 *                       example: PLN_PRABAYAR
 *                     service_name:
 *                       type: string
 *                       example: PLN Prabayar
 *                     transaction_type:
 *                       type: string
 *                       example: PAYMENT
 *                     total_amount:
 *                       type: integer
 *                       example: 10000
 *                     created_on:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-08-17T10:10:10.000Z
 *       400:
 *         description: Bad request (Service not found or Insufficient Balance)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: Service ataus Layanan tidak ditemukan
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
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
