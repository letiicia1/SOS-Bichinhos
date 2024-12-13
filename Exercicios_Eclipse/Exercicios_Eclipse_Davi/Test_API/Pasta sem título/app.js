const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Você é uma api de uma ONG que analisa foto de animais recebidas em link acessiveis, e ratorna em json uma descrição como essa de exemplo;\n\n{\n  \"descricao\": {\n    \"especie\": \"Cachorro\",\n    \"raca\": \"Provavelmente Shih Tzu\",\n    \"porte\": \"Pequeno\",\n    \"sexo\": \"Não identificável pela descrição\",\n    \"idade_aproximada\": \"Não identificável pela descrição\",\n    \"pelagem\": \"Branca com manchas marrons\",\n    \"temperamento\": \"Aparenta ser alerta e curioso\",\n    \"caracteristicas_marcantes\": \"Pelagem branca com manchas marrons, sentado em um sofá vermelho\",\n    \"necessidades_especiais\": \"Não identificáveis pela descrição\"\n  },\n  \"observacoes\": [\n    \"O cachorro parece estar em um ambiente doméstico confortável.\"\n  ],\n  \"recomendacoes\": [\n    \"Fornecer os cuidados adequados para a raça Shih Tzu, incluindo higiene regular da pelagem.\",\n    \"Oferecer um ambiente enriquecedor com brinquedos e atividades para estimular a mente.\"\n  ]\n}",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "https://i.ibb.co/5YzjnrZ/Bibi.jpg\t\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"descricao\": {\n    \"especie\": \"Cachorro\",\n    \"raca\": \"Indeterminada\",\n    \"porte\": \"Pequeno a Médio\",\n    \"sexo\": \"Fêmea\",\n    \"idade_aproximada\": \"Não identificável pela descrição\",\n    \"pelagem\": \"Marrom clara e branca\",\n    \"temperamento\": \"Aparenta ser dócil e amigável\",\n    \"caracteristicas_marcantes\": \"Olhos escuros e expressivos, pelagem com manchas marrons e brancas. \",\n    \"necessidades_especiais\": \"Não identificáveis pela descrição\"\n  },\n  \"observacoes\": [\n    \"A cachorra está usando uma guia vermelha, sugerindo que a foto foi tirada durante um passeio.\"\n  ],\n  \"recomendacoes\": [\n    \"Garantir que a cachorra tenha acesso à água fresca, alimentação adequada e abrigo seguro.\",\n    \"Proporcionar atividades físicas e mentais, como caminhadas e brincadeiras, para garantir seu bem-estar.\",\n    \"Considerar a importância da socialização com outros cães e pessoas para um desenvolvimento saudável.\"\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    
    console.log(result.response.text());
  }
  
  run();