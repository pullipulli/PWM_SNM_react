export default function msToMinutes(ms) {
    return (new Date(ms).toISOString().slice(11, 19));
}