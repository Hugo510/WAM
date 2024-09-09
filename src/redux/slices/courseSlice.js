import { createSlice } from '@reduxjs/toolkit';
import { getCoursesApi } from '../../services/api';

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        currentCourse: null
    },
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
        setCurrentCourse: (state, action) => {
            state.currentCourse = action.payload;
        }
    }
});

export const { setCourses, setCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer;

// Async action to fetch courses
export const fetchCourses = () => async (dispatch) => {
    const response = await getCoursesApi();
    if (response.success) {
        dispatch(setCourses(response.data));
    }
};
