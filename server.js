























const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ady_zone_haiti'
};

// Configuration Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// ============================================================
//  ROUTES PRODUITS
// ============================================================

// GET /api/products - Récupérer tous les produits actifs
app.get('/api/products', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT p.*, c.slug as category_slug FROM products p JOIN categories c ON p.category_id = c.id WHERE p.is_active = 1 ORDER BY p.created_at DESC'
    );
    await connection.end();

    // Transformer pour correspondre au format frontend
    const products = rows.map((row) => ({
      id: `db-${row.id}`,
      name: row.name,
      price: row.price,
      category: row.category_slug,
      description: row.description,
      rating: parseFloat(row.rating),
      image: row.image,
      imageColor: row.image_color,
      gender: row.gender
    }));

    res.json(products);
  } catch (error) {
    console.error('Erreur récupération produits:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/products - Ajouter un produit
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, description, image, gender } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // Récupérer l'ID de la catégorie
    const [categories] = await connection.execute(
      'SELECT id FROM categories WHERE slug = ?',
      [category]
    );

    if (categories.length === 0) {
      await connection.end();
      return res.status(400).json({ error: 'Catégorie invalide' });
    }

    const categoryId = categories[0].id;

    // Insérer le produit
    const [result] = await connection.execute(
      'INSERT INTO products (name, price, category_id, description, image, gender, rating) VALUES (?, ?, ?, ?, ?, ?, 5.0)',
      [name, price, categoryId, description, image, gender]
    );

    await connection.end();

    res.json({
      success: true,
      productId: result.insertId,
      message: 'Produit ajouté avec succès'
    });
  } catch (error) {
    console.error('Erreur ajout produit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/products/:id - Supprimer un produit
app.delete('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id.replace('db-', '');

    const connection = await mysql.createConnection(dbConfig);
    await connection.execute(
      'UPDATE products SET is_active = 0 WHERE id = ?',
      [productId]
    );
    await connection.end();

    res.json({ success: true, message: 'Produit supprimé' });
  } catch (error) {
    console.error('Erreur suppression produit:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============================================================
//  ROUTES COMMANDES
// ============================================================

// POST /api/orders - Créer une commande et envoyer email
app.post('/api/orders', async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // Insérer le client
    const [customerResult] = await connection.execute(
      'INSERT INTO customers (name, address, phone, email, notes) VALUES (?, ?, ?, ?, ?)',
      [customer.name, customer.address, customer.phone, customer.email || null, customer.notes || null]
    );

    const customerId = customerResult.insertId;

    // Insérer la commande
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (customer_id, total, status, payment_method) VALUES (?, ?, ?, ?)',
      [customerId, total, 'pending', paymentMethod]
    );

    const orderId = orderResult.insertId;

    // Insérer les articles de la commande
    for (const item of items) {
      const productId = item.id.startsWith('db-') ? item.id.replace('db-', '') : null;
      await connection.execute(
        'INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, productId, item.name, item.price, item.quantity, item.price * item.quantity]
      );
    }

    await connection.end();

    // Envoyer l'email de notification
    const itemsList = items.map((item) =>
    `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} HTG`
    ).join('\n');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `🛍️ Nouvelle commande #${orderId} - Danow-Shop`,
      text: `
NOUVELLE COMMANDE REÇUE

Commande #${orderId}
Date: ${new Date().toLocaleString('fr-FR')}

CLIENT:
Nom: ${customer.name}
Adresse: ${customer.address}
Téléphone: ${customer.phone}
Email: ${customer.email || 'N/A'}

ARTICLES COMMANDÉS:
${itemsList}

TOTAL: ${total} HTG

Méthode de paiement: ${paymentMethod === 'moncash' ? 'MonCash' : 'WhatsApp'}

---
Danow-Shop - Système de gestion des commandes
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      orderId,
      message: 'Commande enregistrée et email envoyé'
    });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/orders - Récupérer toutes les commandes (pour le dashboard admin)
app.get('/api/orders', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT 
        o.id,
        o.total,
        o.status,
        o.payment_method,
        o.created_at,
        c.name as customer_name,
        c.phone as customer_phone,
        c.address as customer_address
      FROM orders o
      JOIN customers c ON o.customer_id = c.id
      ORDER BY o.created_at DESC
      LIMIT 50
    `);
    await connection.end();

    res.json(rows);
  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ============================================================
//  DÉMARRAGE SERVEUR
// ============================================================

app.listen(PORT, () => {
  console.log(`✅ Serveur Danow-Shop démarré sur http://localhost:${PORT}`);
  console.log(`📦 Base de données: ${dbConfig.database}`);
  console.log(`📧 Email admin: ${process.env.ADMIN_EMAIL}`);
});