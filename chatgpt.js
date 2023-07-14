require('dotenv').config();

const chat = async (char, question) => {
    return new Promise(async (resolve, reject) => {
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        //Creates the OpenAI instance
        const openai = new OpenAIApi(configuration);
        
        try 
        {
            const response = await await openai.createChatCompletion({
                model:"gpt-3.5-turbo",
                messages:[
                    {"role": "system","content": `You are ${char} from Heathers the musical. You are to answer the question as this character. Do not break character. Please return your answer formatted with HTML including a <p> tag for new paragraphs.`},
                    {"role": "user", "content":`Hi ${char} ${question}`}
                ]
            });

            resolve(response.data.choices[0].message.content);

        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
};

module.exports = chat;
