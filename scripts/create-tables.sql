-- Create waitlist_entries table
CREATE TABLE IF NOT EXISTS waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  firm_name VARCHAR(255) NOT NULL,
  daily_broker VARCHAR(50) NOT NULL,
  biggest_headache VARCHAR(100) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create broker_integrations table
CREATE TABLE IF NOT EXISTS broker_integrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  broker_name VARCHAR(50) NOT NULL,
  api_key VARCHAR(255),
  api_secret VARCHAR(255),
  access_token TEXT,
  is_connected BOOLEAN DEFAULT FALSE,
  last_sync TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, broker_name)
);

-- Create portfolio_data table
CREATE TABLE IF NOT EXISTS portfolio_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  broker_name VARCHAR(50) NOT NULL,
  symbol VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  avg_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  pnl DECIMAL(12,2) NOT NULL,
  investment_type VARCHAR(20) DEFAULT 'equity',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, broker_name, symbol)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_broker_user_id ON broker_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_user_broker ON portfolio_data(user_id, broker_name);
CREATE INDEX IF NOT EXISTS idx_portfolio_symbol ON portfolio_data(symbol);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE broker_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public insert on waitlist_entries" ON waitlist_entries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own broker integrations" ON broker_integrations
  FOR ALL USING (auth.uid()::text = user_id);

CREATE POLICY "Allow users to view their own portfolio data" ON portfolio_data
  FOR ALL USING (auth.uid()::text = user_id);
