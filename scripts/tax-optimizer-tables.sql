-- Tax Opportunities Table
CREATE TABLE IF NOT EXISTS tax_opportunities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('loss_harvesting', 'gain_booking', 'wash_sale_warning', 'ltcg_exemption', 'year_end_planning')),
    priority VARCHAR(10) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    potential_savings DECIMAL(15,2) NOT NULL DEFAULT 0,
    description TEXT NOT NULL,
    action_required TEXT NOT NULL,
    deadline DATE,
    stocks JSONB NOT NULL DEFAULT '{}',
    implementation_status VARCHAR(20) DEFAULT 'pending' CHECK (implementation_status IN ('pending', 'in_progress', 'completed', 'rejected')),
    ai_recommendation TEXT,
    tax_implications JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax Scenarios Table
CREATE TABLE IF NOT EXISTS tax_scenarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    potential_savings DECIMAL(15,2) NOT NULL DEFAULT 0,
    strategies JSONB NOT NULL DEFAULT '[]',
    risk_level VARCHAR(10) NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax Insights Table
CREATE TABLE IF NOT EXISTS tax_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    impact VARCHAR(10) NOT NULL CHECK (impact IN ('positive', 'negative', 'neutral')),
    value DECIMAL(15,2),
    change_percentage DECIMAL(5,2),
    insight_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tax Optimization History Table
CREATE TABLE IF NOT EXISTS tax_optimization_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES tax_opportunities(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tax_opportunities_user_id ON tax_opportunities(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_opportunities_type ON tax_opportunities(type);
CREATE INDEX IF NOT EXISTS idx_tax_opportunities_priority ON tax_opportunities(priority);
CREATE INDEX IF NOT EXISTS idx_tax_opportunities_status ON tax_opportunities(implementation_status);
CREATE INDEX IF NOT EXISTS idx_tax_opportunities_deadline ON tax_opportunities(deadline);

CREATE INDEX IF NOT EXISTS idx_tax_scenarios_user_id ON tax_scenarios(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_scenarios_risk_level ON tax_scenarios(risk_level);

CREATE INDEX IF NOT EXISTS idx_tax_insights_user_id ON tax_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_insights_type ON tax_insights(insight_type);

CREATE INDEX IF NOT EXISTS idx_tax_optimization_history_user_id ON tax_optimization_history(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_optimization_history_opportunity_id ON tax_optimization_history(opportunity_id);

-- Row Level Security (RLS) Policies
ALTER TABLE tax_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_optimization_history ENABLE ROW LEVEL SECURITY;

-- Policies for tax_opportunities
CREATE POLICY "Users can view their own tax opportunities" ON tax_opportunities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tax opportunities" ON tax_opportunities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tax opportunities" ON tax_opportunities
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tax opportunities" ON tax_opportunities
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for tax_scenarios
CREATE POLICY "Users can view their own tax scenarios" ON tax_scenarios
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tax scenarios" ON tax_scenarios
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tax scenarios" ON tax_scenarios
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tax scenarios" ON tax_scenarios
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for tax_insights
CREATE POLICY "Users can view their own tax insights" ON tax_insights
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tax insights" ON tax_insights
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tax insights" ON tax_insights
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tax insights" ON tax_insights
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for tax_optimization_history
CREATE POLICY "Users can view their own tax optimization history" ON tax_optimization_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tax optimization history" ON tax_optimization_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert sample data for testing
INSERT INTO tax_opportunities (user_id, type, priority, potential_savings, description, action_required, deadline, stocks, ai_recommendation, tax_implications) VALUES
(
    (SELECT id FROM auth.users LIMIT 1),
    'loss_harvesting',
    'high',
    18500.00,
    'Offset INFY gains with HDFC losses',
    'Sell HDFC before March 31st to harvest tax loss',
    '2024-03-31',
    '{"sell": {"symbol": "HDFC", "quantity": 75, "currentLoss": -5231.25}, "offset": {"symbol": "INFY", "quantity": 50, "currentGain": 6575}}',
    'Highly recommended as HDFC shows continued weakness in technical indicators. Selling now and repurchasing after 30+ days could reset your cost basis while preserving your portfolio allocation.',
    '{"beforeOptimization": 65750, "afterOptimization": 47250, "savings": 18500}'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'gain_booking',
    'medium',
    10000.00,
    'Book LTCG gains under ₹1L exemption',
    'Consider booking INFY gains to utilize LTCG exemption',
    '2024-03-31',
    '{"sell": {"symbol": "INFY", "quantity": 50, "currentGain": 65750}}',
    'Recommended to utilize your annual{"symbol":"INFY","quantity":50,"currentGain":65750}}',
    'Recommended to utilize your annual LTCG exemption of ₹1 lakh. You''ve used 0% of your exemption this financial year.',
    '{"beforeOptimization": 10000, "afterOptimization": 0, "savings": 10000}'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'wash_sale_warning',
    'high',
    0.00,
    'Wash sale rule violation risk',
    'Wait 30 days before repurchasing HDFC if sold for tax loss',
    NULL,
    '{"sell": {"symbol": "HDFC", "quantity": 75, "currentLoss": -5231.25}}',
    'Critical warning: Repurchasing HDFC within 30 days will invalidate your tax loss claim. Consider similar alternatives like ICICI or AXIS for the interim period.',
    '{}'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'ltcg_exemption',
    'medium',
    8500.00,
    'Utilize remaining LTCG exemption',
    'Book partial gains from TCS to use remaining exemption',
    '2024-03-31',
    '{"sell": {"symbol": "TCS", "quantity": 25, "currentGain": 85000}}',
    'You have ₹85,000 remaining in your LTCG exemption. Booking these gains now will save you ₹8,500 in taxes.',
    '{"beforeOptimization": 8500, "afterOptimization": 0, "savings": 8500}'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'year_end_planning',
    'high',
    25000.00,
    'Year-end tax optimization bundle',
    'Implement combined strategy before March 31st',
    '2024-03-31',
    '{"sell": {"symbol": "Multiple", "quantity": 0}}',
    'Comprehensive year-end strategy combining loss harvesting, LTCG exemption, and strategic gain deferral could save approximately ₹25,000 in taxes.',
    '{"beforeOptimization": 85000, "afterOptimization": 60000, "savings": 25000}'
);

-- Insert sample tax scenarios
INSERT INTO tax_scenarios (user_id, name, description, potential_savings, strategies, risk_level) VALUES
(
    (SELECT id FROM auth.users LIMIT 1),
    'Conservative Tax Saving',
    'Low-risk tax optimization focusing on LTCG exemption and minimal portfolio changes',
    15000.00,
    '["LTCG Exemption Utilization", "Selective Loss Harvesting"]',
    'low'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Balanced Optimization',
    'Moderate approach balancing tax savings with portfolio strategy',
    32000.00,
    '["Strategic Loss Harvesting", "LTCG/STCG Balancing", "Gain Deferral"]',
    'medium'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Aggressive Tax Planning',
    'Maximum tax savings with significant portfolio restructuring',
    62000.00,
    '["Complete Loss Harvesting", "Portfolio Restructuring", "Strategic Timing"]',
    'high'
);

-- Insert sample tax insights
INSERT INTO tax_insights (user_id, title, description, impact, value, insight_type) VALUES
(
    (SELECT id FROM auth.users LIMIT 1),
    'LTCG vs STCG Distribution',
    'Your portfolio has a healthy balance of long-term and short-term gains',
    'positive',
    NULL,
    'portfolio_analysis'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Tax Loss Harvesting Potential',
    'You have significant unrealized losses that could offset gains',
    'positive',
    45000.00,
    'loss_harvesting'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Wash Sale Risk',
    '3 recent transactions have potential wash sale implications',
    'negative',
    3.00,
    'compliance'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'Year-End Deadline',
    '45 days remaining to implement tax strategies for this financial year',
    'neutral',
    45.00,
    'deadline'
),
(
    (SELECT id FROM auth.users LIMIT 1),
    'LTCG Exemption Utilization',
    'You''ve used only 15% of your annual LTCG exemption',
    'negative',
    15.00,
    'exemption_usage'
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_tax_opportunities_updated_at BEFORE UPDATE ON tax_opportunities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tax_scenarios_updated_at BEFORE UPDATE ON tax_scenarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tax_insights_updated_at BEFORE UPDATE ON tax_insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
