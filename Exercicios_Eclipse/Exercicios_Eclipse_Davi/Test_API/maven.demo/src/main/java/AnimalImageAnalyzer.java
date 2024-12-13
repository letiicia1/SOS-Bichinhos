import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.huggingface.transformers.Pipeline;
import org.huggingface.transformers.TextGenerationPipeline;
import org.huggingface.transformers.gpt2.GPT2Model;
import org.huggingface.transformers.gpt2.GPT2Tokenizer;

import static spark.Spark.*;

public class AnimalImageAnalyzer {

    public static void main(String[] args) {
        // Configuração da porta (opcional)
        port(8080);

        // Carregar o modelo GPT-2 (apenas uma vez)
        GPT2Model model = GPT2Model.fromPretrained("gpt2");
        GPT2Tokenizer tokenizer = GPT2Tokenizer.fromPretrained("gpt2");
        TextGenerationPipeline pipeline = new TextGenerationPipeline(model, tokenizer);

        // Rota para POST /analyze
        post("/analyze", (request, response) -> {
            try {
                // 1. Recebe os dados da imagem em JSON
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(request.body());
                String imageDescription = jsonNode.get("descricao").asText();

                // 2. Gera a análise usando o modelo GPT-2
                String jsonAnalise = gerarAnalise(pipeline, imageDescription);

                // 3. Retorna a análise como JSON
                response.type("application/json");
                return jsonAnalise;

            } catch (Exception e) {
                e.printStackTrace();
                response.status(500); // Internal Server Error
                return "{\"erro\": \"Erro ao processar a solicitação.\"}";
            }
        });
    }

    private static String gerarAnalise(TextGenerationPipeline pipeline, String imageDescription) {
        // Prompt para o modelo GPT-2
        String prompt = "Analise a descrição de um animal e gere um JSON com a seguinte estrutura:\n" +
                "{\n" +
                "  \"descricao\": {\n" +
                "    \"especie\": \"\",\n" +
                "    \"raca\": \"\",\n" +
                "    \"porte\": \"\",\n" +
                "    \"sexo\": \"\",\n" +
                "    \"idade_aproximada\": \"\",\n" +
                "    \"pelagem\": \"\",\n" +
                "    \"temperamento\": \"\",\n" +
                "    \"caracteristicas_marcantes\": \"\",\n" +
                "    \"necessidades_especiais\": \"\"\n" +
                "  },\n" +
                "  \"observacoes\": [],\n" +
                "  \"recomendacoes\": []\n" +
                "}\n" +
                "\n" +
                "Descrição da Imagem: " + imageDescription;

        // Gera a saída do modelo
        String generatedText = pipeline.predict(prompt, 100, 0.7, 0.9, 1.0).get(0).toString();

        // Extrai o JSON da resposta do modelo
        // (Pode ser necessário ajustar a lógica de acordo com a saída real do modelo)
        int start = generatedText.indexOf("{");
        int end = generatedText.lastIndexOf("}") + 1;
        String jsonAnalise = generatedText.substring(start, end);

        return jsonAnalise;
    }
}