import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { firebaseService } from "./firebase";

// Using Groq for fast, cost-effective AI inference with OpenAI-compatible API
const openai = new OpenAI({ 
  apiKey: process.env.GROQ_API_KEY || "",
  baseURL: "https://api.groq.com/openai/v1"
});

// Real Agency Data for Barbara AI
const agencyData = {
  destinations: [
    { name: "São Thomé das Letras", price: 1090, description: "Cidade histórica com trilhas, cavernas e espiritualidade" },
    { name: "Monte Verde", price: 999, description: "Vila europeia de montanha com clima friozinho e gastronomia" },
    { name: "Tiradentes", price: 1200, description: "Cidades históricas coloniais com arte e cultura" },
    { name: "Campos do Jordão", price: 1150, description: "Estância serrana com trilhas, restaurantes e paisagens" },
    { name: "Caxambu", price: 950, description: "Cidade das águas minerais com parques e tranquilidade" },
    { name: "Cabo Frio", price: 1300, description: "Praia paradisíaca com água cristalina" },
    { name: "Porto Seguro", price: 1400, description: "Descobrimento do Brasil com praias e história" },
  ],
  company: {
    name: "Rodabem Turismo",
    cnpj: "27.643.750/0019-0",
    location: "Esmeraldas, Minas Gerais",
    whatsapp: "+55 31 99085-8868",
    email: "contato@rodabemturismo.com",
    instagram: "@rodabemturismo",
    payment: "PIX, dinheiro e cartão de crédito (parcelamento disponível)",
    years: 9,
    customers: "10000+",
    trips: "500+",
    destinations: "100+"
  },
  testimonials: [
    "Maria Adriana: Agradecemos por tudo! Já fazia tempo que não saíamos.",
    "Rosa Pacheco: Parabéns pelo excelente trabalho, Daniel! Sempre tudo perfeito.",
    "Carla: Proporcionaram momentos que ficarão registrados para sempre em nossos corações.",
    "Shirlei: Parabéns pela organização e carinho conosco!",
  ]
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Firebase and await cache warming
  await firebaseService.initialize();

  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      
      // Build real agency data for Barbara
      const destList = agencyData.destinations.map(d => `${d.name} - R$ ${d.price}`).join('\n');
      
      const comprehensiveData = `DESTINOS DISPONÍVEIS:
${destList}

INFORMAÇÕES SOBRE DESTINOS:
${agencyData.destinations.map(d => `${d.name}: ${d.description}`).join('\n')}

DADOS DA AGÊNCIA:
- 9 anos de experiência
- Mais de 10.000 clientes satisfeitos
- 500+ viagens realizadas
- 100+ destinos parceiros
- Formas de pagamento: PIX, dinheiro e cartão (parcelamento disponível)
- WhatsApp para reservas: ${agencyData.company.whatsapp}

DEPOIMENTOS DE CLIENTES:
${agencyData.testimonials.join('\n')}`;
      
      const systemPrompt = `Você é Barbara, consultora especialista da Roda Bem Turismo. Seja SIMPÁTICA, ENVOLVENTE e faça o cliente se interessar pela viagem!

DADOS DISPONÍVEIS:
${comprehensiveData}

INFORMAÇÕES DA EMPRESA:
Formas de Pagamento: PIX, dinheiro e cartão de crédito (parcelamento disponível)
Reservas: WhatsApp (31) 99085-8868

COMO CONVERSAR:
✨ Seja calorosa e animada, mas objetiva
✨ Destaque o que torna cada destino ESPECIAL
✨ Use detalhes que despertem interesse (clima, atrações, experiências)
✨ Perguntas simples = respostas curtas mas amigáveis (2-3 linhas)
✨ Perguntas sobre destinos = seja mais descritiva e vendedora (3-5 linhas)
✨ SEMPRE mencione vagas quando perguntado
✨ Crie desejo de viajar com descrições envolventes

FORMATO DE LISTAS:
São Thomé das Letras - R$ 1090

Monte Verde - R$ 999

(Sem asteriscos, números ou emojis nas listas)

EXEMPLOS:

P: "olá"
R: "Olá! Bem-vindo à Roda Bem Turismo! Procurando por uma viagem incrível? Estou aqui pra te ajudar! 😊"

P: "formas de pagamento"
R: "Facilitamos pra você! Aceitamos PIX, dinheiro e cartão de crédito com parcelamento. Quer fazer sua reserva? Chama no WhatsApp: (31) 99085-8868"

P: "me fala sobre Monte Verde"
R: "Monte Verde é encantador! Uma charmosa vila de montanha com clima europeu, perfeita pra quem ama friozinho e romantismo. Tem trilhas, gastronomia deliciosa e aquela atmosfera aconchegante. Vale muito a pena! Temos vagas disponíveis 😊"

P: "quantas vagas tem Monte Verde 12/12?"
R: "Monte Verde 12/12 tem X vagas ainda! É uma ótima data, bem próxima das festas de fim de ano. Quer garantir a sua?"

SEJA ENVOLVENTE E CRIE DESEJO DE VIAJAR! 🌎`;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...history,
        { role: "user" as const, content: message }
      ];

      const response = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: messages,
        max_completion_tokens: 450,
        temperature: 0.6,
      });

      // Clean up formatting for better readability
      let cleanedMessage = response.choices[0].message.content || '';
      
      // Step 1: Remove list markers
      cleanedMessage = cleanedMessage
        .replace(/\*\s*/g, '')  // Remove asterisks
        .replace(/^\d+\.\s+/gm, '');  // Remove numbered lists
      
      // Step 2: Normalize all multiple newlines to single newline
      cleanedMessage = cleanedMessage
        .replace(/\n\n+/g, '\n');  // 2+ newlines → 1 newline
      
      // Step 3: Add exactly one blank line between destination items
      cleanedMessage = cleanedMessage
        .replace(/\n([A-ZÇÁÉÍÓÚÂÊÔÃÕ][a-zçáéíóúâêôãõ])/g, '\n\n$1');
      
      res.json({ 
        message: cleanedMessage 
      });
    } catch (error: any) {
      console.error('AI Chat error:', error);
      
      // Provide more helpful error messages
      let errorMessage = "Desculpe, estou tendo dificuldades técnicas no momento. Por favor, tente novamente em instantes.";
      
      if (error.message?.includes('API Key')) {
        errorMessage = "Estou passando por uma atualização técnica. Por favor, entre em contato pelo WhatsApp (31) 99085-8868.";
      }
      
      res.status(500).json({ error: errorMessage });
    }
  });

  // Feedback endpoint
  app.post("/api/feedback", async (req, res) => {
    try {
      const { name, email, rating, message } = req.body;
      
      // Store feedback in memory
      const feedback = await storage.createFeedback({
        name,
        email,
        rating,
        message,
      });

      res.json({ success: true, feedback });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erro ao enviar feedback" });
    }
  });

  // Get all feedback
  app.get("/api/feedback", async (_req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      res.json(feedback);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

