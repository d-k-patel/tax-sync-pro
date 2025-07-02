import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get user from session
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { broker = "all", period = "fy2023-24", language = "en" } = body

    // Mock tax optimization data - in production, this would analyze real portfolio data
    const opportunities = [
      {
        id: "1",
        type: "loss_harvesting",
        priority: "high",
        title: language === "gu" ? "નુકસાન હાર્વેસ્ટિંગ તક" : "Tax Loss Harvesting Opportunity",
        description:
          language === "gu"
            ? "HDFC બેંકમાં ₹15,000 નુકસાન બુક કરીને ICICI બેંકમાં ₹12,000 નફો ઓફસેટ કરો"
            : "Book ₹15,000 loss in HDFC Bank to offset ₹12,000 gain in ICICI Bank",
        potentialSavings: 3600,
        actionRequired:
          language === "gu"
            ? "HDFC બેંક શેર વેચો અને 31 દિવસ પછી ફરીથી ખરીદો"
            : "Sell HDFC Bank shares and repurchase after 31 days",
        deadline: "2024-03-31T00:00:00Z",
        riskLevel: "low",
        implemented: false,
      },
      {
        id: "2",
        type: "ltcg_exemption",
        priority: "medium",
        title: language === "gu" ? "LTCG મુક્તિ ઓપ્ટિમાઇઝેશન" : "LTCG Exemption Optimization",
        description:
          language === "gu"
            ? "₹1 લાખની LTCG મુક્તિ સંપૂર્ણ રીતે ઉપયોગ કરવા માટે કેટલાક શેર વેચો"
            : "Sell some shares to fully utilize ₹1 lakh LTCG exemption",
        potentialSavings: 10000,
        actionRequired:
          language === "gu"
            ? "TCS અથવા Infosys શેરનો ભાગ વેચો અને તરત જ ફરીથી ખરીદો"
            : "Sell portion of TCS or Infosys shares and immediately repurchase",
        deadline: "2024-03-31T00:00:00Z",
        riskLevel: "low",
        implemented: false,
      },
      {
        id: "3",
        type: "wash_sale_warning",
        priority: "high",
        title: language === "gu" ? "વોશ સેલ ચેતવણી" : "Wash Sale Warning",
        description:
          language === "gu"
            ? "Reliance શેર 30 દિવસની અંદર ખરીદ્યા પછી વેચ્યા - ટેક્સ બેનિફિટ નકારાઈ શકે"
            : "Reliance shares sold and repurchased within 30 days - tax benefit may be denied",
        potentialSavings: 0,
        actionRequired: language === "gu" ? "ભવિષ્યમાં 31 દિવસનો ગેપ રાખો" : "Maintain 31-day gap in future transactions",
        riskLevel: "medium",
        implemented: false,
      },
      {
        id: "4",
        type: "year_end_planning",
        priority: "medium",
        title: language === "gu" ? "વર્ષાંત ટેક્સ પ્લાનિંગ" : "Year-end Tax Planning",
        description:
          language === "gu"
            ? "માર્ચ પહેલા વધારાના ₹48,000 LTCG બુક કરી શકો છો"
            : "You can book additional ₹48,000 LTCG before March without tax",
        potentialSavings: 4800,
        actionRequired:
          language === "gu"
            ? "નફામાં રહેલા શેરનો ભાગ વેચો અને પોર્ટફોલિયો રીબેલેન્સ કરો"
            : "Sell portion of profitable shares and rebalance portfolio",
        deadline: "2024-03-31T00:00:00Z",
        riskLevel: "low",
        implemented: false,
      },
    ]

    const insights = [
      {
        id: "1",
        title: language === "gu" ? "પોર્ટફોલિયો કાર્યક્ષમતા" : "Portfolio Tax Efficiency",
        description:
          language === "gu"
            ? "તમારો પોર્ટફોલિયો 68% ટેક્સ કાર્યક્ષમ છે, જે ઉદ્યોગ સરેરાશ કરતાં વધારે છે"
            : "Your portfolio is 68% tax efficient, above industry average of 52%",
        impact: "positive",
        value: "68%",
        category: "tax",
      },
      {
        id: "2",
        title: language === "gu" ? "અનરિયલાઇઝ્ડ ગેઇન્સ" : "Unrealized Gains Analysis",
        description:
          language === "gu"
            ? "તમારી પાસે ₹2.4 લાખ અનરિયલાઇઝ્ડ LTCG છે જેનો ઉપયોગ ટેક્સ પ્લાનિંગ માટે થઈ શકે"
            : "You have ₹2.4L unrealized LTCG that can be used for tax planning",
        impact: "neutral",
        value: 240000,
        category: "opportunity",
      },
      {
        id: "3",
        title: language === "gu" ? "સેક્ટર એલોકેશન રિસ્ક" : "Sector Allocation Risk",
        description:
          language === "gu"
            ? "IT સેક્ટરમાં 45% એલોકેશન ટેક્સ રિસ્ક વધારે છે"
            : "45% allocation in IT sector increases tax concentration risk",
        impact: "negative",
        value: "45%",
        category: "risk",
      },
      {
        id: "4",
        title: language === "gu" ? "હોલ્ડિંગ પીરિયડ ઓપ્ટિમાઇઝેશન" : "Holding Period Optimization",
        description:
          language === "gu"
            ? "8 શેર 1 વર્ષની નજીક છે - LTCG બેનિફિટ માટે થોડા દિવસ વધુ રાખો"
            : "8 stocks are near 1-year mark - hold few more days for LTCG benefit",
        impact: "positive",
        value: "8 stocks",
        category: "opportunity",
      },
    ]

    const scenarios = [
      {
        id: "1",
        name: language === "gu" ? "આક્રમક ટેક્સ ઓપ્ટિમાઇઝેશન" : "Aggressive Tax Optimization",
        description:
          language === "gu"
            ? "મહત્તમ ટેક્સ બચત માટે બધી તકોનો ઉપયોગ કરો"
            : "Utilize all opportunities for maximum tax savings",
        potentialSavings: 62000,
        riskLevel: "medium",
        strategies: [
          language === "gu" ? "તમામ લોસ હાર્વેસ્ટિંગ તકો અમલ કરો" : "Implement all loss harvesting opportunities",
          language === "gu" ? "LTCG મુક્તિ સંપૂર્ણ ઉપયોગ કરો" : "Fully utilize LTCG exemption",
          language === "gu" ? "પોર્ટફોલિયો રીબેલેન્સિંગ" : "Strategic portfolio rebalancing",
        ],
        timeline: language === "gu" ? "3 મહિના" : "3 months",
      },
      {
        id: "2",
        name: language === "gu" ? "કન્ઝર્વેટિવ એપ્રોચ" : "Conservative Approach",
        description: language === "gu" ? "ઓછા જોખમ સાથે સ્થિર ટેક્સ બચત" : "Steady tax savings with minimal risk",
        potentialSavings: 28000,
        riskLevel: "low",
        strategies: [
          language === "gu" ? "માત્ર ઉચ્ચ પ્રાથમિકતાની તકો" : "Only high-priority opportunities",
          language === "gu" ? "લાંબા ગાળાના હોલ્ડિંગ જાળવો" : "Maintain long-term holdings",
          language === "gu" ? "ક્રમિક અમલીકરણ" : "Gradual implementation",
        ],
        timeline: language === "gu" ? "6 મહિના" : "6 months",
      },
      {
        id: "3",
        name: language === "gu" ? "યર-એન્ડ સ્પ્રિન્ટ" : "Year-end Sprint",
        description:
          language === "gu" ? "માર્ચ પહેલા ઝડપી ટેક્સ ઓપ્ટિમાઇઝેશન" : "Quick tax optimization before March deadline",
        potentialSavings: 45000,
        riskLevel: "high",
        strategies: [
          language === "gu" ? "તાત્કાલિક લોસ બુકિંગ" : "Immediate loss booking",
          language === "gu" ? "LTCG હાર્વેસ્ટિંગ" : "LTCG harvesting",
          language === "gu" ? "ટેક્સ-લોસ કેરી ફોરવર્ડ" : "Tax-loss carry forward optimization",
        ],
        timeline: language === "gu" ? "1 મહિનો" : "1 month",
      },
    ]

    const summary = {
      potentialSavings: opportunities.reduce((sum, opp) => sum + opp.potentialSavings, 0),
      implementedSavings: opportunities
        .filter((opp) => opp.implemented)
        .reduce((sum, opp) => sum + opp.potentialSavings, 0),
      taxEfficiencyScore: 68,
      opportunitiesCount: opportunities.length,
    }

    return NextResponse.json({
      opportunities,
      insights,
      scenarios,
      summary,
      success: true,
    })
  } catch (error) {
    console.error("Error in tax optimizer API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
