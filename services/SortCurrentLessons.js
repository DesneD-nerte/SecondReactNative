export default function sortCurrentLessonsByDate(currentLessons) {
    currentLessons.sort((a, b) => {
        const dateA = a.beginDate;
        const dateB = b.beginDate;
        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        
        return 0;
    })
}