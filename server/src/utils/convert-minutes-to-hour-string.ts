//1080: 18:00

export function convertMinutesToHourString(minutesAmount: number){
    const hours = Math.floor(minutesAmount/60);
    const minutesLeft = minutesAmount%60;


    return `${String(hours).padStart(2,'0')}:${String(minutesLeft).padStart(2,'0')}`;
}