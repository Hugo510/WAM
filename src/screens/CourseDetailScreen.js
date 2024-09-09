import React from 'react';
import { useSelector } from 'react-redux';

const CourseDetailScreen = () => {
    const currentCourse = useSelector(state => state.course.currentCourse);

    return (
        <View>
            <Text>{currentCourse.title}</Text>
            <Text>{currentCourse.description}</Text>
            {/* Aquí se muestra el contenido y puzzles */}
        </View>
    );
};

export default CourseDetailScreen;
