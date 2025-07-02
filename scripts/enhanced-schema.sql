-- Enhanced database schema for TaxSync Pro

-- Drop existing tables if they exist
DROP TABLE IF EXISTS tax_opportunities CASCADE;
DROP TABLE IF EXISTS portfolio_data CASCADE;
DROP TABLE IF EXISTS broker_integrations CASCADE;
DROP TABLE IF EXISTS waitlist_entries CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;

-- Create user profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  firm_name VARCHAR(255),
  phone VARCHAR(20),
  language_preference VARCHAR(5) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
  subscription_plan VARCHAR(50) DEFAULT 'starter',
  subscription_status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Enhanced waitlist_entries table
CREATE TABLE waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firm_name VARCHAR(255) NOT NULL,
  daily_broker VARCHAR(50) NOT NULL,
  biggest_headache VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  city VARCHAR(100),
  experience_years INTEGER,
  client_count INTEGER,
  status VARCHAR(20) DEFAULT 'pending',
  position INTEGER,
  referral_code VARCHAR(50),
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  onboarded_at TIMESTAMP WITH TIME ZONE
);

-- Enhanced broker_integrations table
CREATE TABLE broker_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  broker_name VARCHAR(50) NOT NULL,
  broker_display_name VARCHAR(100),
  api_key VARCHAR(255),
  api_secret VARCHAR(255),
  access_token TEXT,
  refresh_token TEXT,
  user_session TEXT,
  is_connected BOOLEAN DEFAULT FALSE,
  connection_status VARCHAR(20) DEFAULT 'disconnected',
  last_sync TIMESTAMP WITH TIME ZONE,
  sync_status VARCHAR(20),
  sync_frequency INTEGER DEFAULT 300, -- seconds
  auto_sync_enabled BOOLEAN DEFAULT TRUE,
  rate_limit_remaining INTEGER DEFAULT 1000,
  rate_limit_reset TIMESTAMP WITH TIME ZONE,
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, broker_name)
);

-- Enhanced portfolio_data table
CREATE TABLE portfolio_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  broker_name VARCHAR(50) NOT NULL,
  symbol VARCHAR(50) NOT NULL,
  exchange VARCHAR(10) DEFAULT 'NSE',
  isin VARCHAR(20),
  quantity INTEGER NOT NULL,
  avg_price DECIMAL(12,4) NOT NULL,
  current_price DECIMAL(12,4) NOT NULL,
  ltp DECIMAL(12,4),
  pnl DECIMAL(15,4) NOT NULL,
  pnl_percentage DECIMAL(8,4),
  investment_type VARCHAR(20) DEFAULT 'equity',
  sector VARCHAR(50),
  market_cap BIGINT,
  tax_category VARCHAR(10),
  holding_period INTEGER,
  purchase_date DATE,
  potential_tax_liability DECIMAL(12,2),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, broker_name, symbol, exchange)
);

-- Tax opportunities table
CREATE TABLE tax_opportunities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  opportunity_id VARCHAR(50) NOT NULL,
  type VARCHAR(30) NOT NULL, -- loss_harvesting, gain_booking, wash_sale_warning
  priority VARCHAR(10) NOT NULL, -- high, medium, low
  potential_savings DECIMAL(12,2) NOT NULL,
  tax_savings DECIMAL(12,2),
  description TEXT NOT NULL,
  action_required TEXT,
  loss_stock_symbol VARCHAR(50),
  loss_amount DECIMAL(12,2),
  loss_quantity INTEGER,
  gain_stock_symbol VARCHAR(50),
  gain_amount DECIMAL(12,2),
  gain_quantity INTEGER,
  deadline DATE,
  is_executed BOOLEAN DEFAULT FALSE,
  executed_at TIMESTAMP WITH TIME ZONE,
  execution_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, opportunity_id)
);

-- Transaction history table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  broker_name VARCHAR(50) NOT NULL,
  transaction_id VARCHAR(100) NOT NULL,
  order_id VARCHAR(100),
  symbol VARCHAR(50) NOT NULL,
  exchange VARCHAR(10) DEFAULT 'NSE',
  transaction_type VARCHAR(10) NOT NULL, -- buy, sell
  quantity INTEGER NOT NULL,
  price DECIMAL(12,4) NOT NULL,
  amount DECIMAL(15,4) NOT NULL,
  charges DECIMAL(10,4) DEFAULT 0,
  taxes DECIMAL(10,4) DEFAULT 0,
  net_amount DECIMAL(15,4),
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
  settlement_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, broker_name, transaction_id)
);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  type VARCHAR(30) NOT NULL, -- tax_opportunity, sync_error, price_alert, system
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR(10) DEFAULT 'medium', -- high, medium, low
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(500),
  action_label VARCHAR(100),
  metadata JSONB,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_at TIMESTAMP WITH TIME ZONE
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id VARCHAR(100),
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User settings table
CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  setting_key VARCHAR(100) NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, setting_key)
);

-- Price alerts table
CREATE TABLE price_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  symbol VARCHAR(50) NOT NULL,
  exchange VARCHAR(10) DEFAULT 'NSE',
  alert_type VARCHAR(20) NOT NULL, -- price_above, price_below, percentage_change
  target_value DECIMAL(12,4) NOT NULL,
  current_value DECIMAL(12,4),
  is_active BOOLEAN DEFAULT TRUE,
  is_triggered BOOLEAN DEFAULT FALSE,
  triggered_at TIMESTAMP WITH TIME ZONE,
  notification_method VARCHAR(20) DEFAULT 'email', -- email, sms, push
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  report_type VARCHAR(50) NOT NULL, -- capital_gains, tax_summary, portfolio_analysis
  report_name VARCHAR(255) NOT NULL,
  parameters JSONB,
  file_path VARCHAR(500),
  file_size INTEGER,
  status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, failed
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_subscription ON user_profiles(subscription_plan, subscription_status);

CREATE INDEX idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_status ON waitlist_entries(status);
CREATE INDEX idx_waitlist_created_at ON waitlist_entries(created_at);
CREATE INDEX idx_waitlist_position ON waitlist_entries(position);

CREATE INDEX idx_broker_user_id ON broker_integrations(user_id);
CREATE INDEX idx_broker_status ON broker_integrations(user_id, is_connected);
CREATE INDEX idx_broker_sync ON broker_integrations(last_sync);

CREATE INDEX idx_portfolio_user_broker ON portfolio_data(user_id, broker_name);
CREATE INDEX idx_portfolio_symbol ON portfolio_data(symbol);
CREATE INDEX idx_portfolio_updated ON portfolio_data(last_updated);
CREATE INDEX idx_portfolio_pnl ON portfolio_data(user_id, pnl);

CREATE INDEX idx_tax_opportunities_user ON tax_opportunities(user_id);
CREATE INDEX idx_tax_opportunities_priority ON tax_opportunities(user_id, priority);
CREATE INDEX idx_tax_opportunities_savings ON tax_opportunities(potential_savings);
CREATE INDEX idx_tax_opportunities_deadline ON tax_opportunities(deadline);

CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date);
CREATE INDEX idx_transactions_symbol ON transactions(user_id, symbol);
CREATE INDEX idx_transactions_broker ON transactions(user_id, broker_name);

CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created ON notifications(created_at);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

CREATE INDEX idx_price_alerts_user_active ON price_alerts(user_id, is_active);
CREATE INDEX idx_price_alerts_symbol ON price_alerts(symbol);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Allow public insert on waitlist_entries" ON waitlist_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own broker integrations" ON broker_integrations
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own portfolio data" ON portfolio_data
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own tax opportunities" ON tax_opportunities
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own transactions" ON transactions
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own notifications" ON notifications
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own audit logs" ON audit_logs
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own settings" ON user_settings
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage their own price alerts" ON price_alerts
  FOR ALL USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can view their own reports" ON reports
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_entries_updated_at BEFORE UPDATE ON waitlist_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_broker_integrations_updated_at BEFORE UPDATE ON broker_integrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tax_opportunities_updated_at BEFORE UPDATE ON tax_opportunities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_price_alerts_updated_at BEFORE UPDATE ON price_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO user_profiles (id, email, name, firm_name, language_preference) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'demo@taxsyncpro.com', 'Demo User', 'Demo CA Firm', 'en');

-- Insert sample broker integrations
INSERT INTO broker_integrations (user_id, broker_name, broker_display_name, is_connected, connection_status) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'zerodha', 'Zerodha', true, 'connected'),
('550e8400-e29b-41d4-a716-446655440000', 'upstox', 'Upstox', true, 'connected'),
('550e8400-e29b-41d4-a716-446655440000', 'groww', 'Groww', true, 'connected'),
('550e8400-e29b-41d4-a716-446655440000', 'angelone', 'Angel One', true, 'connected');
