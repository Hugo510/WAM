import { createSlice } from '@reduxjs/toolkit';
import { submitExamApi } from '../../services/api';

export const examSlice = createSlice({
    name: 'exam',
    initialState: {
        currentExam: null,
        examResults: null
    },
    reducers: {
        setCurrentExam: (state, action) => {
            state.currentExam = action.payload;
        },
        setExamResults: (state, action) => {
            state.examResults = action.payload;
        }
    }
});

export const { setCurrentExam, setExamResults } = examSlice.actions;
export default examSlice.reducer;

// Async action for exam submission
export const submitExam = (examId, answers) => async (dispatch) => {
    const response = await submitExamApi(examId, answers);
    if (response.success) {
        dispatch(setExamResults(response.data));
    }
};
