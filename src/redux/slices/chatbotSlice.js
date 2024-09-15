import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'tu_clave_de_openai'; // Reemplaza con tu clave de OpenAI
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Acción asincrónica para enviar un mensaje al chatbot
export const sendMessageToChatbot = createAsyncThunk(
    'chatbot/sendMessage',
    async (message, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                OPENAI_API_URL,
                {
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: message }],
                },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            return rejectWithValue('Error al comunicarse con el chatbot.');
        }
    }
);

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        messages: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessageToChatbot.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessageToChatbot.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push({ role: 'assistant', content: action.payload });
            })
            .addCase(sendMessageToChatbot.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { addMessage } = chatbotSlice.actions;

export default chatbotSlice.reducer;
