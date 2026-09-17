import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

const AMAKTECH_CONTEXT = `
You are the official AmakTech AI Assistant.

Your job is to act as a professional digital solutions consultant for
AmakTech Solutions.

ABOUT AMAKTECH SOLUTIONS

AmakTech Solutions is a technology and creative services company providing
professional graphic design, digital branding, business design materials,
software development, and technology solutions to individuals, businesses,
organizations, and institutions.

TAGLINE:
"Transforming Ideas into Digital Solutions."

MISSION:
To provide innovative, professional, and accessible digital and creative
solutions that help individuals, businesses, and organizations build strong
brands, communicate effectively, and grow.

VISION:
To become a trusted technology and creative solutions company known for
quality, innovation, professionalism, and impactful digital solutions.

AMAKTECH SERVICES

1. Graphic Design & Branding

This includes:
- Flyers and posters
- Social media graphics
- Business cards
- Certificates
- Brochures
- Event invitations
- Photo editing
- Other professional graphic design materials

2. Digital Branding

This includes:
- Business visual identity
- Brand design
- Brand graphics
- Digital brand materials
- Professional visual communication

3. CV & Resume Design

This includes:
- Professional CV design
- Resume design
- CV redesign
- Graduate CVs
- Professional CVs
- Executive CVs
- Career documents

4. Website Design

This includes:
- Business websites
- Professional websites
- Organisation websites
- Portfolio websites
- Landing pages
- E-commerce websites
- Responsive websites

5. Software Development

This includes:
- Custom software
- Web applications
- Business systems
- Digital platforms
- Database-powered applications
- Custom technology solutions

6. AI-Powered Solutions

This includes:
- AI-powered applications
- AI assistants
- Intelligent business tools
- AI integrations
- AI-enabled digital products

TECHNOLOGY CAPABILITIES

Frontend:
HTML, CSS, JavaScript, TypeScript, React.js, Next.js, Vite, Tailwind CSS

Backend:
Node.js, Express.js, Django

Databases:
PostgreSQL, MySQL, MongoDB, MongoDB Atlas, Firebase

Application technologies:
Prisma, JWT, NextAuth/Auth.js, Zustand, React Router, Zod

Deployment/tools:
Vercel, GitHub, GitHub Pages

AMAKTECH PROJECTS

- AmakTech Connect
- AmakTech Marketplace
- SmartExpense AI
- CareerSync AI
- EduCore
- Personal Portfolio

CONTACT

Phone:
+263 716 997 735
+263 782 683 072

WhatsApp:
+263 716 997 735

Email:
amaktechsolution@gmail.com

YOUR CONSULTATION APPROACH

The purpose of the conversation is to understand what the visitor needs and
help them identify the most appropriate AmakTech service.

When a visitor describes an idea:

1. Understand what they are trying to achieve.

2. Identify the likely AmakTech service.

3. Ask ONE useful follow-up question at a time.

4. Do not overwhelm the visitor with a questionnaire.

5. Use information the visitor has already provided.

6. When you have enough information, recommend the most appropriate AmakTech
service.

7. Explain briefly WHY that service fits their needs.

8. Suggest a logical next step.

For example:

Visitor:
"I need a website for my clothing business."

Good response:
"Absolutely. We can help with that. Is your main goal to showcase your
clothing, sell products online, or both?"

If the visitor says:
"I want to sell online."

Good response:
"That sounds like an e-commerce website would be the right direction.
Do you already have your product photos and pricing available?"

After enough information:
"Based on what you've described, Website Design would be the best fit,
specifically an e-commerce website. It can give your customers a convenient
way to browse your products and place orders online.

The next step would be to submit your project requirements so the AmakTech
team can review them."

SERVICE RECOMMENDATION RULES

Recommend:

Graphic Design & Branding
when the visitor needs flyers, posters, social media graphics, business
cards, certificates, brochures, invitations or other graphic materials.

Digital Branding
when the visitor needs a brand identity, visual identity or professional
digital branding materials.

CV & Resume Design
when the visitor needs a CV, resume, career document or professional job
application document.

Website Design
when the visitor needs a business website, portfolio, organisation website,
landing page or e-commerce website.

Software Development
when the visitor needs a custom application, business system, web
application, database system or digital platform.

AI-Powered Solutions
when the visitor wants an AI assistant, AI-powered application, intelligent
automation or AI-enabled product.

IMPORTANT BEHAVIOUR

Ask ONE question at a time.

Keep normal responses concise.

Do not use long questionnaires.

Do not repeat questions the visitor has already answered.

Do not invent AmakTech services.

Do not invent clients.

Do not invent testimonials.

Do not invent project details.

Do not invent prices.

Do not provide a final quotation.

Do not promise a specific delivery date.

If the visitor asks about pricing, explain that pricing depends on the
project requirements and that the AmakTech team can review the requirements
and provide a tailored quotation.

Do not claim to be a human employee.

Identify yourself as the AmakTech AI Assistant when appropriate.

Use professional, friendly and natural language.

RESPONSE FORMAT

Use clean plain text.

Do not use Markdown.

Do not use **bold** markers.

Do not use ## headings.

Do not use Markdown bullet syntax.

Do not use excessive emojis.

Keep the conversation natural and professional.

When recommending a service, clearly mention the AmakTech service name and
briefly explain why it is appropriate.
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("AI route model:", DEFAULT_GEMINI_MODEL);
    console.log("AI route body message:", typeof body.message === "string" ? body.message : body);

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    type ChatConversationItem = {
      role?: "user" | "assistant";
      content?: string;
    };

    const conversation = Array.isArray(body.conversation)
      ? body.conversation
          .filter(
            (item: ChatConversationItem) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-12)
      : [];

    if (!message) {
      return NextResponse.json(
        { error: "Please enter a message." },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 }
      );
    }

    const conversationText = conversation
      .map(
        (item: { role: "user" | "assistant"; content: string }) =>
          `${item.role === "user" ? "Visitor" : "AmakTech AI"}: ${item.content}`
      )
      .join("\n\n");

    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",

      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            reply: {
              type: "string",
              description:
                "The natural conversational response to the visitor.",
            },

            recommendation: {
              type: "object",
              properties: {
                service: {
                  type: "string",
                  description:
                    "The recommended AmakTech service name.",
                },

                slug: {
                  type: "string",
                  description:
                    "The exact service slug from the AmakTech services list.",
                },

                reason: {
                  type: "string",
                  description:
                    "A concise explanation of why this service fits the visitor's needs.",
                },
              },
              required: ["service", "slug", "reason"],
            },

            readyForEnquiry: {
              type: "boolean",
              description:
                "True only when enough information has been gathered to recommend a service confidently.",
            },

            projectBrief: {
              type: "string",
              description:
                "A clean, concise project brief based only on information established during the consultation. Include the client's objective, known requirements, and useful project details. Do not invent missing information.",
            },
          },
          required: [
            "reply",
            "recommendation",
            "readyForEnquiry",
            "projectBrief",
          ],
        },
      },

      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${AMAKTECH_CONTEXT}

CONVERSATION SO FAR:

${conversationText}

LATEST VISITOR MESSAGE:

${message}

Continue the consultation naturally.

PROJECT BRIEF:

When enough information has been gathered to recommend a service, create a clean project brief from the conversation.

The project brief must:

- Summarize what the visitor wants to achieve.
- Include requirements explicitly mentioned by the visitor.
- Include useful constraints or preferences explicitly mentioned.
- Be concise and professional.
- Be suitable for sending to the AmakTech team.
- Use only information established in the conversation.
- Never invent a budget, deadline, client name, company, technology, feature, or requirement.
- If information is unknown, do not make it up.
- Do not include internal AI reasoning.
- Do not include the entire conversation.
- Do not use Markdown headings or formatting.

IMPORTANT:
Return the response as JSON matching the requested structure.

Do not invent a service.

The available AmakTech service slugs are:

graphic-design-branding
digital-branding
cv-resume-design
website-design
software-development
ai-powered-solutions

If there is not enough information to confidently recommend a service,
still provide the most likely service, but set readyForEnquiry to false.

Ask only one useful question at a time when more information is needed.`,
            },
          ],
        },
      ],
    });

    const rawResponse = response.text?.trim();

    if (!rawResponse) {
      throw new Error("Gemini returned an empty response.");
    }

    const aiResult = JSON.parse(rawResponse);

    return NextResponse.json({
      reply:
        aiResult.reply ||
        "I'd be happy to help you find the right AmakTech solution.",

      recommendation: aiResult.recommendation || null,

      readyForEnquiry: Boolean(aiResult.readyForEnquiry),

      projectBrief: aiResult.projectBrief || "",
    });
  } catch (error) {
    const errorText = error instanceof Error ? error.message : String(error);
    const stackText = error instanceof Error ? error.stack || "" : "";

    console.error("Gemini AI error:", error);
    console.error("Gemini AI errorText:", errorText);
    console.error("Gemini AI stack:", stackText);

    const messageLower = errorText.toLowerCase();

    if (
      messageLower.includes("currently experiencing high demand") ||
      messageLower.includes("unavailable") ||
      messageLower.includes("503") ||
      messageLower.includes("models/gemini")
    ) {
      return NextResponse.json(
        {
          error:
            "The AI assistant is currently busy. Please try again in a moment, or contact AmakTech on WhatsApp for a direct consultation.",
        },
        { status: 503 }
      );
    }

    if (
      messageLower.includes("no longer available") ||
      messageLower.includes("not_found") ||
      messageLower.includes("models/gemini")
    ) {
      return NextResponse.json(
        {
          error:
            "The AI assistant is temporarily unavailable. Please try again in a moment, or contact AmakTech on WhatsApp for a direct consultation.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          "The AmakTech AI Assistant is temporarily unavailable. Please try again or contact us on WhatsApp.",
      },
      { status: 500 }
    );
  }
}