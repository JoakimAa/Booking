export default function formatDate(time) {
    return new Date(time).toLocaleDateString('nb-NO', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }) 
}
    

