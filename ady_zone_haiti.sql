
-- ============================================================
--  ADY ZONE HAITI — Base de données e-commerce
--  Compatible MySQL / MariaDB (Laragon)
--  Importez ce fichier dans phpMyAdmin ou via la console MySQL.
-- ============================================================

-- 1) Création de la base
CREATE DATABASE IF NOT EXISTS ady_zone_haiti
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ady_zone_haiti;

-- ============================================================
--  TABLE : categories
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug        VARCHAR(50)  NOT NULL,          -- electronics | medical | tennis
  name        VARCHAR(100) NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : products
--  Reflète le type Product du front (name, price, category,
--  description, rating, image, gender).
--  Prix stockés en gourdes (HTG), en entier.
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name         VARCHAR(200) NOT NULL,
  price        INT UNSIGNED NOT NULL,          -- montant en HTG
  category_id  INT UNSIGNED NOT NULL,
  description  TEXT         NULL,
  rating       DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  image        VARCHAR(500) NULL,              -- URL de l'image
  image_color  VARCHAR(40)  NULL DEFAULT 'bg-gray-200',
  gender       ENUM('men','women','unisex') NULL,  -- pour la catégorie tennis
  is_active    TINYINT(1)   NOT NULL DEFAULT 1,
  created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_category (category_id),
  KEY idx_products_name (name),
  CONSTRAINT fk_products_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : customers
--  Reflète UserInfo (name, address, phone, email, notes).
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name        VARCHAR(150) NOT NULL,
  address     VARCHAR(300) NOT NULL,
  phone       VARCHAR(40)  NOT NULL,
  email       VARCHAR(150) NULL,
  notes       TEXT         NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_customers_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : orders
--  Une commande passée par un client.
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_id     INT UNSIGNED NOT NULL,
  total           INT UNSIGNED NOT NULL,        -- total en HTG
  status          ENUM('pending','paid','shipped','cancelled') NOT NULL DEFAULT 'pending',
  payment_method  ENUM('moncash','whatsapp','cash') NOT NULL DEFAULT 'whatsapp',
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_customer (customer_id),
  KEY idx_orders_status (status),
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers (id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : order_items
--  Les lignes de chaque commande (snapshot du produit au moment
--  de l'achat, pour garder le prix/nom même si le produit change).
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id      INT UNSIGNED NOT NULL,
  product_id    INT UNSIGNED NULL,            -- NULL si produit supprimé
  product_name  VARCHAR(200) NOT NULL,        -- snapshot du nom
  unit_price    INT UNSIGNED NOT NULL,        -- snapshot du prix unitaire (HTG)
  quantity      INT UNSIGNED NOT NULL DEFAULT 1,
  line_total    INT UNSIGNED NOT NULL,        -- unit_price * quantity
  PRIMARY KEY (id),
  KEY idx_items_order (order_id),
  KEY idx_items_product (product_id),
  CONSTRAINT fk_items_order
    FOREIGN KEY (order_id) REFERENCES orders (id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_items_product
    FOREIGN KEY (product_id) REFERENCES products (id)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  TABLE : payments
--  Suivi des paiements (notamment MonCash).
--  ATTENTION : ne stockez JAMAIS la clé secrète ici.
--  La référence/transaction vient de votre serveur (API MonCash).
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id        INT UNSIGNED NOT NULL,
  provider        ENUM('moncash','cash') NOT NULL DEFAULT 'moncash',
  amount          INT UNSIGNED NOT NULL,        -- montant payé (HTG)
  status          ENUM('initiated','successful','failed') NOT NULL DEFAULT 'initiated',
  transaction_id  VARCHAR(120) NULL,            -- id renvoyé par MonCash
  reference       VARCHAR(120) NULL,            -- référence interne / orderId MonCash
  payer_phone     VARCHAR(40)  NULL,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_payments_order (order_id),
  UNIQUE KEY uq_payments_transaction (transaction_id),
  CONSTRAINT fk_payments_order
    FOREIGN KEY (order_id) REFERENCES orders (id)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
--  DONNÉES INITIALES (seed)
-- ============================================================

-- Catégories
INSERT INTO categories (slug, name) VALUES
  ('electronics', 'Électronique'),
  ('medical',     'Matériel médical'),
  ('tennis',      'Tennis & Sport')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Quelques produits d'exemple (vous importerez le reste depuis l'admin)
INSERT INTO products (name, price, category_id, description, rating, image, gender) VALUES
  ('iPhone 15 Pro 256 Go', 185000,
    (SELECT id FROM categories WHERE slug='electronics'),
    'Smartphone haut de gamme, puce A17 Pro, appareil photo 48MP.', 4.8,
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', NULL),
  ('Tensiomètre Pro Digital', 6500,
    (SELECT id FROM categories WHERE slug='medical'),
    'Tensiomètre numérique de qualité professionnelle pour usage domestique.', 4.6,
    'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=400&h=400&fit=crop', NULL),
  ('Raquette de Tennis Pro', 12000,
    (SELECT id FROM categories WHERE slug='tennis'),
    'Raquette légère pour joueurs intermédiaires et confirmés.', 4.7,
    'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=400&fit=crop', 'unisex');

-- Client + commande d'exemple
INSERT INTO customers (name, address, phone, email) VALUES
  ('Client Démo', 'Port-au-Prince, Haïti', '+509 4932 1962', 'demo@adyzone.ht');

INSERT INTO orders (customer_id, total, status, payment_method) VALUES
  (LAST_INSERT_ID(), 197000, 'pending', 'moncash');

SET @order_id = LAST_INSERT_ID();

INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, line_total) VALUES
  (@order_id, 1, 'iPhone 15 Pro 256 Go', 185000, 1, 185000),
  (@order_id, 3, 'Raquette de Tennis Pro', 12000, 1, 12000);

INSERT INTO payments (order_id, provider, amount, status, reference, payer_phone) VALUES
  (@order_id, 'moncash', 197000, 'initiated', CONCAT('ADY-', @order_id), '+509 4932 1962');

-- ============================================================
--  VUES UTILES (facultatif) — pour le tableau de bord admin
-- ============================================================

-- Nombre de produits et valeur du stock par catégorie
CREATE OR REPLACE VIEW v_stats_categories AS
SELECT
  c.slug,
  c.name,
  COUNT(p.id)            AS total_products,
  COALESCE(SUM(p.price),0) AS inventory_value_htg,
  COALESCE(ROUND(AVG(p.price)),0) AS avg_price_htg
FROM categories c
LEFT JOIN products p ON p.category_id = c.id AND p.is_active = 1
GROUP BY c.id, c.slug, c.name;

-- Récapitulatif des commandes
CREATE OR REPLACE VIEW v_orders_summary AS
SELECT
  o.id            AS order_id,
  cu.name         AS customer_name,
  cu.phone        AS customer_phone,
  o.total         AS total_htg,
  o.status,
  o.payment_method,
  o.created_at
FROM orders o
JOIN customers cu ON cu.id = o.customer_id
ORDER BY o.created_at DESC;
