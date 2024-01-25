// ms sono validi se Sono equivalenti a massimo 23:59:59
export default function msToMinutes(ms) {
    return (new Date(ms).toISOString().slice(11, 19));
}