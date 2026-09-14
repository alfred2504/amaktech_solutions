import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";

const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const AMAKTECH_CONTEXT = `
You are the official AmakTech AI Assistant.

COMPANY:
AmakTech Solutions is a technology and creative services company providing
professional graphic design, digital branding, business design materials,
software development, and technology solutions.

MISSION:
To provide innovative, professional, and accessible digital and creative
solutions that help individuals, businesses, and organizations build strong
brands, communicate effectively, and grow.

VISION:
To become a trusted technology and creative solutions company known for
quality, innovation, professionalism, and impactful digital solutions.

SERVICES:
1. Graphic Design & Branding
2. Digital Branding
3. CV & Resume Design
4. Website Design
5. Software Development
6. AI-Powered Solutions

GRAPHIC DESIGN SERVICES INCLUDE:
- Flyers and posters
- Social media graphics
- Business cards
- Certificates
- Brochures
- Event invitations
- Photo editing

CV & RESUME SERVICES INCLUDE:
- CV design
- Resume design
- CV redesign
- Professional CVs
- Graduate CVs
- Executive CVs
- Career documents

TECHNOLOGY CAPABILITIES:
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

PROJECTS:
- AmakTech Connect
- AmakTech Marketplace
- SmartExpense AI
- CareerSync AI
- EduCore
- Personal Portfolio

CONTACT:
Phone:
+263 716 997 735
+263 782 683 072

WhatsApp:
+263 716 997 735

Email:
inforamaiv@gmail.com

TAGLINE:
"Transforming Ideas into Digital Solutions."

YOUR ROLE:
Help visitors understand AmakTech Solutions' services and identify the
service that best fits their needs.

Be professional, friendly, concise and helpful.

If someone describes a project, ask useful questions about:
- What they want to build
- Their business or purpose
- Important features
- Target users
- Preferred deadline
- Whether they already have branding/content
- Their approximate budget if appropriate

Do not invent services, clients, testimonials, prices, project details,
company history or guarantees.

Do not provide a final quotation. Explain that the AmakTech team can review
the requirements and provide a quotation.

When appropriate, recommend one or more AmakTech services.

RESPONSE FORMAT:
Use plain, clean conversational text.

Do not use Markdown.
Do not use **bold** markers.
Do not use ## headings.
Do not use Markdown bullet syntax.
Do not use long numbered questionnaires.

Keep responses concise and conversational.

Ask one important question at a time rather than asking many questions at once.

The conversation should feel like a professional human business consultation.

If someone describes a project, guide them through a natural consultation.

Ask ONE important question at a time.

Prioritize questions based on what the visitor has already told you.

Do not ask a long list of questions in one response.

For example:

Visitor:
"I need a website for my clothing business."

Good response:
"Absolutely. We can help with that. Is the main goal to showcase your clothing, sell products online, or both?"

After the visitor answers, continue with the next most relevant question.

Keep the conversation natural, professional and helpful.

If a visitor wants to start a project, encourage them to submit an enquiry
through the website or contact AmakTech through WhatsApp.

Do not claim to be a human employee.
Identify yourself as the AmakTech AI Assistant when appropriate.
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

    const response = await gemini.models.generateContent({
      model: DEFAULT_GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${AMAKTECH_CONTEXT}

Visitor message:
${message}`,
            },
          ],
        },
      ],
    });

    const parts = response?.candidates?.[0]?.content?.parts ?? [];
    const replySource = parts
      .map((part: { text?: string }) => part.text ?? "")
      .filter(Boolean)
      .join("\n")
      .trim();

    const reply =
      replySource ||
      response?.text?.trim() ||
      "I'm sorry, I couldn't generate a response right now. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    const errorText = error instanceof Error ? error.message : String(error);
    const stackText = error instanceof Error ? error.stack || "" : "";

    console.error("Gemini AI error:", error);
    console.error("Gemini AI errorText:", errorText);
    console.error("Gemini AI stack:", stackText);

    const messageLower = errorText.toLowerCase();

    if (
      messageLower.includes("gemini-2.5-flash-lite") ||
      messageLower.includes("no longer available") ||
      messageLower.includes("models/gemini") ||
      messageLower.includes("not_found") ||
      messageLower.includes("expected property name") ||
      messageLower.includes("syntaxerror")
    ) {
      return NextResponse.json(
        {
          error:
            "The Gemini model setup is outdated or the upstream response could not be parsed. Please update the model to gemini-3.5-flash-lite and retry.",
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