📘 Purchase Order Management API (NestJS + MongoDB)

A modular, scalable backend API built with NestJS, TypeScript, and MongoDB to manage complete Purchase Orders, Goods Receipt Notes (GRN), and PO Status workflows.
This project follows clean architecture principles using Modules, Controllers, Services, DTOs, and Mongoose Schemas.

🚀 Tech Stack

NestJS (v11)

Node.js (TypeScript)

MongoDB + Mongoose

Class Validator & Transformer

ts-node-dev

REST API Architecture

📦 Project Modules

🔹 1. Purchase Order Master

Manages PO header information:
PO Number
Supplier details
Order date
Total value
Expected delivery date

🔹 2. Purchase Order Details

Manages PO line items:
Product ID
Quantity
Rate
Amount
PO reference (Foreign Key)

🔹 3. GRN Master (Goods Receipt Note)

Captures receipt of purchased material:
GRN Number
Supplier
GRN Date
Linked Purchase Order

🔹 4. GRN Details

Line-item details of GRN:
Item received
Quantity received
Batch / Serial details
GRN reference

🔹 5. Purchase Order Status

Tracks workflow stages:
Created
Approved
Ordered
Received
Closed

📁 Folder Structure
src/
 ├── purchase-order-master/
 ├── purchase-order-detail/
 ├── grn-master/
 ├── grn-detail/
 ├── po-status/
 ├── app.module.ts
 ├── main.ts


Each module includes:

controller.ts
service.ts
schema.ts
dto.ts
module.ts


🛠️ Install Dependencies
npm install

▶️ Run in Development
npm run start:dev

🏗️ Build
npm run build

🚀 Start Production
npm run start:prod

📡 API Endpoints

📘 Purchase Order Master
Method	Endpoint	Description
POST	/po-master	Create Purchase Order
GET	/po-master	Get all POs
GET	/po-master/:po_no	Get PO by PO Number
PUT	/po-master/:po_no	Update PO
DELETE	/po-master/:po_no	Delete PO

📗 Purchase Order Details
Method	Endpoint	Description
POST	/po-detail	Create PO Detail
GET	/po-detail	Get all PO Details
GET	/po-detail/by-po/:poId	Get details by PO
PUT	/po-detail/:id	Update PO detail
DELETE	/po-detail/:id	Delete PO detail

📙 GRN Master
Method	Endpoint	Description
POST	/grn-master	Create GRN
GET	/grn-master	Get all GRNs
GET	/grn-master/:grn_no	Get GRN by number
📒 GRN Details

Method	Endpoint	Description
POST	/grn-detail	Create GRN Detail
GET	/grn-detail	Get all GRN details
GET	/grn-detail/by-grn/:grnId	Get details by GRN
PUT	/grn-detail/:id	Update GRN detail
DELETE	/grn-detail/:id	Delete GRN detail

📘 PO Status
Method	Endpoint	Description
POST	/po-status	Create PO status entry
GET	/po-status	Get all status records
GET	/po-status/:po_no	Get status by PO number
PUT	/po-status/:id	Update status
DELETE	/po-status/:id	Delete status
