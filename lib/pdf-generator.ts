import PDFDocument from "pdfkit"

interface TaxOptimizationReportData {
  user: {
    id: string
    email: string
    name: string
    firm_name: string
  }
  opportunities: any[]
  insights: any[]
  scenarios: any[]
  summary: {
    potentialSavings: number
    implementedSavings: number
    taxEfficiencyScore: number
  }
  language: "en" | "gu"
  generatedAt: string
}

export async function generateTaxOptimizationPDF(data: TaxOptimizationReportData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      })

      const chunks: Buffer[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)

      // Colors
      const colors = {
        primary: "#ea580c", // Orange-600
        secondary: "#1f2937", // Gray-800
        accent: "#059669", // Green-600
        danger: "#dc2626", // Red-600
        warning: "#d97706", // Amber-600
        muted: "#6b7280", // Gray-500
      }

      const text = {
        en: {
          title: "Tax Optimization Report",
          subtitle: "Comprehensive Tax Planning Analysis",
          generatedFor: "Generated for",
          generatedOn: "Generated on",
          executiveSummary: "Executive Summary",
          taxOpportunities: "Tax Optimization Opportunities",
          taxInsights: "Key Tax Insights",
          taxScenarios: "Recommended Tax Scenarios",
          potentialSavings: "Potential Tax Savings",
          implementedSavings: "Implemented Savings",
          taxEfficiency: "Tax Efficiency Score",
          priority: "Priority",
          type: "Type",
          savings: "Savings",
          description: "Description",
          actionRequired: "Action Required",
          deadline: "Deadline",
          riskLevel: "Risk Level",
          strategies: "Strategies",
          disclaimer: "Disclaimer",
          disclaimerText:
            "This report is generated based on the portfolio data available at the time of generation. Tax laws are subject to change, and individual circumstances may vary. Please consult with a qualified tax professional before implementing any tax strategies mentioned in this report.",
          confidential: "CONFIDENTIAL - For Internal Use Only",
          pageOf: "Page {current} of {total}",
        },
        gu: {
          title: "ટેક્સ ઓપ્ટિમાઇઝેશન રિપોર્ટ",
          subtitle: "વ્યાપક ટેક્સ પ્લાનિંગ વિશ્લેષણ",
          generatedFor: "માટે બનાવેલ",
          generatedOn: "તારીખ",
          executiveSummary: "કાર્યકારી સારાંશ",
          taxOpportunities: "ટેક્સ ઓપ્ટિમાઇઝેશન તકો",
          taxInsights: "મુખ્ય ટેક્સ અંતર્દૃષ્ટિ",
          taxScenarios: "ભલામણ કરેલ ટેક્સ સ્થિતિઓ",
          potentialSavings: "સંભવિત ટેક્સ બચત",
          implementedSavings: "અમલમાં મૂકાયેલ બચત",
          taxEfficiency: "ટેક્સ કાર્યક્ષમતા સ્કોર",
          priority: "પ્રાથમિકતા",
          type: "પ્રકાર",
          savings: "બચત",
          description: "વર્ણન",
          actionRequired: "જરૂરી પગલાં",
          deadline: "સમયમર્યાદા",
          riskLevel: "જોખમ સ્તર",
          strategies: "વ્યૂહરચનાઓ",
          disclaimer: "અસ્વીકરણ",
          disclaimerText:
            "આ રિપોર્ટ જનરેશનના સમયે ઉપલબ્ધ પોર્ટફોલિયો ડેટાના આધારે બનાવવામાં આવ્યો છે. ટેક્સ કાયદાઓ બદલાવાને પાત્ર છે, અને વ્યક્તિગત સંજોગો અલગ હોઈ શકે છે. આ રિપોર્ટમાં ઉલ્લેખિત કોઈપણ ટેક્સ વ્યૂહરચનાઓ અમલમાં મૂકતા પહેલા કૃપા કરીને લાયક ટેક્સ વ્યાવસાયિક સાથે સલાહ લો.",
          confidential: "ગોપનીય - માત્ર આંતરિક ઉપયોગ માટે",
          pageOf: "પૃષ્ઠ {current} / {total}",
        },
      }

      const t = text[data.language]

      // Helper functions
      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(amount)
      }

      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }

      // Header function
      const addHeader = () => {
        doc
          .rect(0, 0, doc.page.width, 80)
          .fill(colors.primary)
          .fillColor("white")
          .fontSize(24)
          .font("Helvetica-Bold")
          .text(t.title, 50, 25)
          .fontSize(12)
          .font("Helvetica")
          .text(t.subtitle, 50, 50)
          .fillColor(colors.secondary)
      }

      // Footer function
      const addFooter = () => {
        const pageHeight = doc.page.height
        doc
          .fontSize(8)
          .fillColor(colors.muted)
          .text(t.confidential, 50, pageHeight - 30, { align: "left" })
          .text(`${t.pageOf.replace("{current}", "1").replace("{total}", "1")}`, 50, pageHeight - 30, {
            align: "right",
          })
      }

      // Start document
      addHeader()

      // Document info
      doc
        .moveDown(3)
        .fontSize(12)
        .fillColor(colors.secondary)
        .text(`${t.generatedFor}: ${data.user.name}`, 50)
        .text(`${data.user.firm_name}`, 50)
        .text(`${t.generatedOn}: ${formatDate(data.generatedAt)}`, 50)
        .moveDown(2)

      // Executive Summary
      doc.fontSize(18).fillColor(colors.primary).font("Helvetica-Bold").text(t.executiveSummary, 50).moveDown(1)

      // Summary cards
      const summaryY = doc.y
      const cardWidth = 150
      const cardHeight = 80
      const cardSpacing = 20

      // Potential Savings Card
      doc
        .rect(50, summaryY, cardWidth, cardHeight)
        .stroke(colors.primary)
        .fillColor(colors.primary)
        .fontSize(10)
        .fillColor("white")
        .text(t.potentialSavings, 60, summaryY + 10, { width: cardWidth - 20 })
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(formatCurrency(data.summary.potentialSavings), 60, summaryY + 30, { width: cardWidth - 20 })
        .fillColor(colors.secondary)

      // Implemented Savings Card
      doc
        .rect(50 + cardWidth + cardSpacing, summaryY, cardWidth, cardHeight)
        .stroke(colors.accent)
        .fillColor(colors.accent)
        .fontSize(10)
        .fillColor("white")
        .text(t.implementedSavings, 60 + cardWidth + cardSpacing, summaryY + 10, { width: cardWidth - 20 })
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(formatCurrency(data.summary.implementedSavings), 60 + cardWidth + cardSpacing, summaryY + 30, {
          width: cardWidth - 20,
        })
        .fillColor(colors.secondary)

      // Tax Efficiency Card
      doc
        .rect(50 + (cardWidth + cardSpacing) * 2, summaryY, cardWidth, cardHeight)
        .stroke(colors.warning)
        .fillColor(colors.warning)
        .fontSize(10)
        .fillColor("white")
        .text(t.taxEfficiency, 60 + (cardWidth + cardSpacing) * 2, summaryY + 10, { width: cardWidth - 20 })
        .fontSize(16)
        .font("Helvetica-Bold")
        .text(`${data.summary.taxEfficiencyScore}/100`, 60 + (cardWidth + cardSpacing) * 2, summaryY + 30, {
          width: cardWidth - 20,
        })
        .fillColor(colors.secondary)

      doc.y = summaryY + cardHeight + 30

      // Tax Opportunities Section
      doc.fontSize(16).fillColor(colors.primary).font("Helvetica-Bold").text(t.taxOpportunities, 50).moveDown(1)

      // Opportunities table
      const tableY = doc.y
      const colWidths = [60, 80, 120, 80, 100, 80]
      const headers = [t.priority, t.type, t.description, t.savings, t.actionRequired, t.deadline]

      // Table header
      let currentX = 50
      doc.fontSize(10).font("Helvetica-Bold").fillColor("white")
      headers.forEach((header, i) => {
        doc.rect(currentX, tableY, colWidths[i], 25).fill(colors.secondary)
        doc.text(header, currentX + 5, tableY + 8, { width: colWidths[i] - 10 })
        currentX += colWidths[i]
      })

      // Table rows
      let currentY = tableY + 25
      doc.fillColor(colors.secondary).font("Helvetica").fontSize(9)

      data.opportunities.slice(0, 10).forEach((opportunity, index) => {
        const rowHeight = 30
        currentX = 50

        // Alternate row colors
        if (index % 2 === 0) {
          doc
            .rect(
              50,
              currentY,
              colWidths.reduce((a, b) => a + b, 0),
              rowHeight,
            )
            .fill("#f9fafb")
        }

        const rowData = [
          opportunity.priority?.toUpperCase() || "N/A",
          opportunity.type?.replace("_", " ").toUpperCase() || "N/A",
          opportunity.description || "N/A",
          formatCurrency(opportunity.potentialSavings || 0),
          opportunity.actionRequired || "N/A",
          opportunity.deadline ? formatDate(opportunity.deadline) : "N/A",
        ]

        rowData.forEach((data, i) => {
          doc.fillColor(colors.secondary).text(data, currentX + 5, currentY + 8, {
            width: colWidths[i] - 10,
            height: rowHeight - 10,
          })
          currentX += colWidths[i]
        })

        currentY += rowHeight
      })

      // Add new page for insights and scenarios
      doc.addPage()
      addHeader()
      doc.moveDown(3)

      // Tax Insights Section
      doc.fontSize(16).fillColor(colors.primary).font("Helvetica-Bold").text(t.taxInsights, 50).moveDown(1)

      data.insights.slice(0, 6).forEach((insight) => {
        const impactColor =
          insight.impact === "positive" ? colors.accent : insight.impact === "negative" ? colors.danger : colors.muted

        doc
          .fontSize(12)
          .font("Helvetica-Bold")
          .fillColor(colors.secondary)
          .text(`• ${insight.title}`, 60)
          .fontSize(10)
          .font("Helvetica")
          .fillColor(colors.muted)
          .text(insight.description, 70, doc.y, { width: 450 })

        if (insight.value) {
          doc
            .fontSize(11)
            .font("Helvetica-Bold")
            .fillColor(impactColor)
            .text(
              typeof insight.value === "number" && insight.value > 1000
                ? formatCurrency(insight.value)
                : insight.value.toString(),
              70,
              doc.y + 5,
            )
        }

        doc.moveDown(1)
      })

      doc.moveDown(1)

      // Tax Scenarios Section
      doc.fontSize(16).fillColor(colors.primary).font("Helvetica-Bold").text(t.taxScenarios, 50).moveDown(1)

      data.scenarios.forEach((scenario) => {
        const riskColor =
          scenario.riskLevel === "high"
            ? colors.danger
            : scenario.riskLevel === "medium"
              ? colors.warning
              : colors.accent

        doc
          .fontSize(14)
          .font("Helvetica-Bold")
          .fillColor(colors.secondary)
          .text(scenario.name, 50)
          .fontSize(10)
          .font("Helvetica")
          .fillColor(colors.muted)
          .text(scenario.description, 50, doc.y, { width: 500 })
          .moveDown(0.5)

        doc
          .fontSize(11)
          .font("Helvetica-Bold")
          .fillColor(colors.accent)
          .text(`${t.savings}: ${formatCurrency(scenario.potentialSavings)}`, 60)
          .fillColor(riskColor)
          .text(`${t.riskLevel}: ${scenario.riskLevel.toUpperCase()}`, 60)
          .fillColor(colors.secondary)
          .text(`${t.strategies}:`, 60)

        scenario.strategies.forEach((strategy: string) => {
          doc.fontSize(10).fillColor(colors.muted).text(`  • ${strategy}`, 70)
        })

        doc.moveDown(1.5)
      })

      // Disclaimer
      doc.addPage()
      addHeader()
      doc
        .moveDown(3)
        .fontSize(16)
        .fillColor(colors.primary)
        .font("Helvetica-Bold")
        .text(t.disclaimer, 50)
        .moveDown(1)
        .fontSize(11)
        .fillColor(colors.secondary)
        .font("Helvetica")
        .text(t.disclaimerText, 50, doc.y, { width: 500, align: "justify" })

      addFooter()
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}
