GharChef – Product Requirements Document (PRD)

Version: 1.0
Project Name: GharChef
Project Type: Multi-Vendor Homemade Food Marketplace
Platform: Web Application
Document Owner: Product Team

1. Introduction
   1.1 Project Overview

GharChef is a multi-vendor homemade food marketplace that connects talented home chefs (primarily women entrepreneurs) with customers looking for fresh, hygienic, and authentic homemade meals.

Unlike traditional food delivery platforms, GharChef focuses exclusively on home-cooked food prepared by verified home chefs. The platform enables women to start their own food businesses with minimal investment while giving customers access to healthy and regional homemade meals.

The platform serves four primary user groups:

Customers
Home Chefs (Sellers)
Delivery Partners
Administrators 2. Vision

Empower every home chef to build a sustainable food business while making authentic homemade food easily accessible to everyone.

3. Mission

Create India's most trusted homemade food marketplace by providing a secure, scalable, and user-friendly platform for home chefs and customers.

4. Goals
   Business Goals
   Enable women entrepreneurs to sell homemade food online.
   Build a trusted marketplace for homemade meals.
   Ensure food quality through seller verification.
   Provide seamless ordering and payment experiences.
   Support scalable business growth.
   User Goals
   Customers
   Discover homemade food easily.
   Order safely.
   Track orders.
   Receive quality food.
   Save favorite chefs.
   Sellers
   Open an online food shop.
   Manage products.
   Accept orders.
   Track earnings.
   Grow their business.
   Admin
   Manage the entire platform.
   Verify sellers.
   Monitor transactions.
   Handle disputes.
   Generate reports.
5. Technology Stack
   Frontend
   Next.js 15 (App Router)
   TypeScript
   Tailwind CSS
   shadcn/ui
   Backend
   Node.js
   Express.js
   Database
   PostgreSQL in Docker Desktop
   ORM
   Prisma
   Authentication
   Admin
   Email
   Password
   Seller
   Email
   Password
   Customer
   Firebase Mobile OTP
   Delivery Partner
   Firebase Mobile OTP
   Services
   Cloudinary
   Cashfree
   Google Maps API
   Firebase Authentication
   Resend Email
   Deployment
   Hostinger VPS
6. User Roles
   Customer

A customer purchases homemade food.

Seller (Home Chef)

A verified home chef who creates products and fulfills orders.

Delivery Partner

Responsible for delivering completed orders.

Admin

Controls and manages the complete platform.

7. Authentication Module
   Customer
   Mobile OTP Login
   Auto Account Creation
   Logout
   Session Management
   Seller
   Registration
   Email Verification
   Login
   Forgot Password
   Password Reset

Seller account remains inactive until admin approval.

Delivery Partner
Mobile OTP Login
Profile Completion
Admin Approval
Admin
Email Login
Password Login
Secure Session
Logout 8. Customer Module
Dashboard

Displays

Nearby Home Chefs
Recommended Foods
Categories
Trending Foods
Offers
Recently Added
Best Rated
Popular Sellers
Search

Search by

Food Name
Category
Seller
City
Cuisine

Filters

Veg
Non Veg
Price
Rating
Delivery Time
Distance
Availability

Sorting

Popular
Latest
Price Low to High
Price High to Low
Rating
Categories

Examples

Breakfast
Lunch
Dinner
Snacks
Desserts
Pickles
Beverages
Bakery
Healthy Food
Festival Specials
Product Details

Each product contains

Images
Name
Description
Ingredients
Preparation Time
Available Quantity
Price
Discount
Rating
Reviews
Seller Information
Delivery Estimate
Food Type
Spice Level

Actions

Add to Cart
Buy Now
Add to Wishlist
Share
Cart

Features

Add Item
Remove Item
Increase Quantity
Decrease Quantity
Coupon Application
Price Summary
Checkout

Customer selects

Delivery Address
Delivery Slot
Payment Method
Order Notes

Order Summary

Products
Taxes
Delivery Charges
Discounts
Final Amount
Payment

Supported

UPI
Cards
Net Banking
Wallets
Cash on Delivery (Optional)
Order Tracking

Statuses

Order Placed
Accepted
Preparing
Ready
Picked Up
Out For Delivery
Delivered
Cancelled
Wishlist
Save Food
Remove Food
Reviews

Customers can

Give Rating
Write Review
Upload Images
Notifications

Receive

Order Updates
Promotions
Offers
Delivery Updates
Profile

Manage

Name
Profile Picture
Mobile Number
Saved Addresses
Order History
Wishlist
Notification Preferences 9. Seller Module
Seller Registration

Information Required

Full Name
Email
Mobile Number
Password
Kitchen Address
Identity Proof
Bank Details
UPI ID
Profile Photo
Seller Verification

Admin verifies

Identity
Address
Profile

Only verified sellers can sell.

Seller Dashboard

Overview

Today's Sales
Total Orders
Revenue
Pending Orders
Products
Ratings
Monthly Earnings
Shop Management

Seller manages

Shop Name
Logo
Banner
Description
Address
Working Hours
Delivery Radius
Product Management

Seller can

Add Product
Edit Product
Delete Product
Disable Product
Duplicate Product
Product Information

Fields

Product Name
Images
Category
Description
Ingredients
Quantity
Preparation Time
Price
Discount
Food Type
Spice Level
Availability
Inventory

Manage

Stock
Sold Items
Low Stock Warning
Availability
Orders

Seller can

Accept
Reject
Start Preparing
Mark Ready
Complete Order
Coupons

Seller creates

Flat Discount
Percentage Discount
Free Delivery
Earnings

Seller can view

Daily Income
Weekly Income
Monthly Income
Yearly Income
Withdrawals
Reviews

Seller can

View Reviews
Reply to Reviews
Analytics

Shows

Sales
Visitors
Conversion Rate
Best Selling Products
Repeat Customers 10. Delivery Partner Module
Registration

Required

Mobile Number
OTP Verification
Name
Address
Identity Proof
Vehicle Details
Dashboard

Displays

Available Deliveries
Assigned Deliveries
Earnings
Completed Orders
Delivery Workflow

Partner

Accepts Delivery

↓

Navigates

↓

Picks Food

↓

Updates Status

↓

Delivers

↓

Customer OTP Verification

↓

Complete

Earnings

Displays

Daily Earnings
Weekly Earnings
Monthly Earnings 11. Admin Module
Dashboard

Displays

Total Customers
Total Sellers
Total Delivery Partners
Total Orders
Revenue
Pending Approvals
Active Sellers
Active Deliveries
User Management

Manage

Customers
Sellers
Delivery Partners

Actions

Approve
Reject
Suspend
Block
Delete
Seller Verification

Review

Identity Documents
Address
Profile

Approve or Reject

Product Management

Admin can

Remove Product
Feature Product
Disable Product
Category Management

Admin can

Create Category
Edit Category
Delete Category
Banner Management

Manage

Home Banner
Promotional Banner
Festival Banner
Coupon Management

Create

Platform Coupons
Festival Coupons
Referral Coupons
Order Management

View

Every Order
Payment Status
Delivery Status
Complaint Management

Handle

Customer Complaints
Seller Complaints
Refund Requests
Disputes
Reports

Generate

Revenue Report
Sales Report
Seller Report
Customer Report
Order Report
CMS

Manage

About
Contact
FAQ
Privacy Policy
Terms & Conditions 12. Notifications Module

Customer

Order Placed
Payment Success
Order Accepted
Order Delivered
Promotions

Seller

New Order
New Review
Withdrawal Status

Delivery Partner

New Delivery
Delivery Cancelled

Admin

New Seller
New Complaint
Failed Payments 13. Payment Workflow

Customer Places Order

↓

Cashfree Payment

↓

Payment Verification

↓

Order Created

↓

Seller Receives Order

↓

Seller Accepts

↓

Food Prepared

↓

Delivery Assigned

↓

Delivered

↓

Settlement

14. Order Workflow

Customer

↓

Add to Cart

↓

Checkout

↓

Payment

↓

Order Created

↓

Seller Accepts

↓

Preparing

↓

Ready

↓

Delivery Partner Pickup

↓

Out for Delivery

↓

Delivered

↓

Review

15. Seller Approval Workflow

Seller Registers

↓

Email Verification

↓

Document Submission

↓

Admin Review

↓

Approved

↓

Seller Dashboard Activated

16. Delivery Workflow

Order Ready

↓

Delivery Assigned

↓

Delivery Partner Accepts

↓

Pickup

↓

Navigation

↓

Customer Receives

↓

OTP Verification

↓

Delivered

17. Review Workflow

Customer Receives Food

↓

Rate Order

↓

Write Review

↓

Upload Images

↓

Seller Reply

18. Notification Workflow

System Event

↓

Notification Service

↓

Email / SMS / In-App Notification

↓

User Receives Notification

19. Functional Requirements
    Customer
    Register/Login
    Browse Products
    Search Products
    Filter Products
    Place Orders
    Track Orders
    Manage Profile
    Add Reviews
    Wishlist
    Notifications
    Seller
    Register
    Create Shop
    Manage Products
    Manage Inventory
    Accept Orders
    Track Earnings
    Create Coupons
    Analytics
    Reply Reviews
    Delivery Partner
    Login
    Accept Deliveries
    Update Status
    Complete Delivery
    Earnings Dashboard
    Admin
    Manage Users
    Verify Sellers
    Manage Categories
    Manage Orders
    Generate Reports
    Handle Complaints
    Manage Banners
    Platform Settings
20. Non-Functional Requirements
    Performance
    Fast page loading
    Optimized images
    Efficient API responses
    Responsive UI
    Security
    JWT Authentication
    Role-Based Access Control
    Password Encryption
    HTTPS
    Secure File Upload
    Input Validation
    Scalability
    Modular Architecture
    Service-Based Design
    Cloud Storage
    Optimized Database Access
    Reliability
    Error Logging
    Retry Mechanisms
    Backup Strategy
    Health Monitoring
    Accessibility
    Mobile Responsive
    Keyboard Navigation
    Readable Typography
    Accessible Color Contrast
21. Future Enhancements
    AI Food Recommendations
    Subscription Meal Plans
    Scheduled Orders
    Loyalty Program
    Referral Program
    Live Delivery Tracking
    Chat Between Customer and Seller
    Multi-Language Support
    Mobile Applications (Android & iOS)
    AI-Based Sales Insights
    Voice Search
    Recipe Stories
    Nutrition Information
    Kitchen Certification Badges
22. Project Milestones
    Phase 1 – Foundation
    Project setup
    Authentication
    Base architecture
    UI system
    Phase 2 – Customer Module
    Homepage
    Search
    Categories
    Product pages
    Cart
    Checkout
    Phase 3 – Seller Module
    Seller onboarding
    Shop management
    Product management
    Inventory
    Orders
    Phase 4 – Delivery Module
    Delivery dashboard
    Delivery workflow
    Status updates
    Phase 5 – Admin Module
    User management
    Seller verification
    Reports
    Platform management
    Phase 6 – Integrations
    Cashfree
    Firebase OTP
    Cloudinary
    Google Maps
    Resend
    Phase 7 – Testing & Deployment
    Functional testing
    Security testing
    Performance optimization
    VPS deployment
    Production launch
23. Success Metrics
    Verified seller onboarding rate
    Customer registration growth
    Daily active users
    Order completion rate
    Average order value
    Customer retention rate
    Seller retention rate
    Average seller earnings
    Delivery success rate
    Customer satisfaction rating
    Platform uptime
    Payment success rate
