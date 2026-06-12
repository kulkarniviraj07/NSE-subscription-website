-- ============================================================
-- Migration: Add bse_code column to companies table
-- Run against: nse_subscription database
-- ============================================================

ALTER TABLE companies
    ADD COLUMN IF NOT EXISTS bse_code VARCHAR(20);

-- NSE symbol → BSE scrip code mappings (50 Nifty50 stocks)
UPDATE companies SET bse_code = '532667' WHERE symbol = 'SUZLON';
UPDATE companies SET bse_code = '532892' WHERE symbol = 'WOCKPHARMA';
UPDATE companies SET bse_code = '500257' WHERE symbol = 'LUPIN';
UPDATE companies SET bse_code = '517334' WHERE symbol = 'MOTHERSON';
UPDATE companies SET bse_code = '500325' WHERE symbol = 'RELIANCE';
UPDATE companies SET bse_code = '532540' WHERE symbol = 'TCS';
UPDATE companies SET bse_code = '500209' WHERE symbol = 'INFY';
UPDATE companies SET bse_code = '500180' WHERE symbol = 'HDFCBANK';
UPDATE companies SET bse_code = '532174' WHERE symbol = 'ICICIBANK';
UPDATE companies SET bse_code = '500112' WHERE symbol = 'SBIN';
UPDATE companies SET bse_code = '500510' WHERE symbol = 'LT';
UPDATE companies SET bse_code = '500875' WHERE symbol = 'ITC';
UPDATE companies SET bse_code = '500696' WHERE symbol = 'HINDUNILVR';
UPDATE companies SET bse_code = '532454' WHERE symbol = 'BHARTIARTL';
UPDATE companies SET bse_code = '532215' WHERE symbol = 'AXISBANK';
UPDATE companies SET bse_code = '500247' WHERE symbol = 'KOTAKBANK';
UPDATE companies SET bse_code = '500034' WHERE symbol = 'BAJFINANCE';
UPDATE companies SET bse_code = '532500' WHERE symbol = 'MARUTI';
UPDATE companies SET bse_code = '500114' WHERE symbol = 'TITAN';
UPDATE companies SET bse_code = '500820' WHERE symbol = 'ASIANPAINT';
UPDATE companies SET bse_code = '500103' WHERE symbol = 'ULTRACEMCO';
UPDATE companies SET bse_code = '507685' WHERE symbol = 'WIPRO';
UPDATE companies SET bse_code = '532555' WHERE symbol = 'NTPC';
UPDATE companies SET bse_code = '532898' WHERE symbol = 'POWERGRID';
UPDATE companies SET bse_code = '500312' WHERE symbol = 'ONGC';
UPDATE companies SET bse_code = '500570' WHERE symbol = 'TATAMOTORS';
UPDATE companies SET bse_code = '532921' WHERE symbol = 'ADANIPORTS';
UPDATE companies SET bse_code = '524715' WHERE symbol = 'SUNPHARMA';
UPDATE companies SET bse_code = '532755' WHERE symbol = 'TECHM';
UPDATE companies SET bse_code = '532281' WHERE symbol = 'HCLTECH';
UPDATE companies SET bse_code = '533278' WHERE symbol = 'COALINDIA';
UPDATE companies SET bse_code = '500470' WHERE symbol = 'TATASTEEL';
UPDATE companies SET bse_code = '500228' WHERE symbol = 'JSWSTEEL';
UPDATE companies SET bse_code = '532187' WHERE symbol = 'INDUSINDBK';
UPDATE companies SET bse_code = '532978' WHERE symbol = 'BAJAJFINSV';
UPDATE companies SET bse_code = '512599' WHERE symbol = 'ADANIENT';
UPDATE companies SET bse_code = '500790' WHERE symbol = 'NESTLEIND';
UPDATE companies SET bse_code = '500124' WHERE symbol = 'DRREDDY';
UPDATE companies SET bse_code = '505200' WHERE symbol = 'EICHERMOT';
UPDATE companies SET bse_code = '500300' WHERE symbol = 'GRASIM';
UPDATE companies SET bse_code = '500087' WHERE symbol = 'CIPLA';
UPDATE companies SET bse_code = '500182' WHERE symbol = 'HEROMOTOCO';
UPDATE companies SET bse_code = '516034' WHERE symbol = 'HDFCLIFE';
UPDATE companies SET bse_code = '540719' WHERE symbol = 'SBILIFE';
UPDATE companies SET bse_code = '500825' WHERE symbol = 'BRITANNIA';
UPDATE companies SET bse_code = '532488' WHERE symbol = 'DIVISLAB';
UPDATE companies SET bse_code = '544028' WHERE symbol = 'TRENT';
UPDATE companies SET bse_code = '508869' WHERE symbol = 'APOLLOHOSP';
UPDATE companies SET bse_code = '500331' WHERE symbol = 'PIDILITIND';
UPDATE companies SET bse_code = '539254' WHERE symbol = 'BEL';
UPDATE companies SET bse_code = '541154' WHERE symbol = 'HAL';
UPDATE companies SET bse_code = '500096' WHERE symbol = 'DABUR';
UPDATE companies SET bse_code = '500550' WHERE symbol = 'SIEMENS';
