import { HorizontalBar } from 'react-chartjs-2';
const graphData = (borci: any[]) => {
    return {
        labels: borci.map(borec => borec.jmeno),
        datasets: [
            {
                label: "Výhry",
                scaleFontColor: "#FFFFFF",
                backgroundColor: borci.map(() => "#" + Math.floor(Math.random() * 16777215).toString(16)),
                hoverBackgroundColor: borci.map(() => "#" + Math.floor(Math.random() * 16777215).toString(16)),
                data: borci.map(borec => borec.vyhry)
            }
        ]
    }
};
export const getBarGraph = (borci: any[]) => {
    return <HorizontalBar data={graphData(borci)} options={{
        title: {
            display: true,
            text: "Koho má tato aplikace nejradši",
            fontSize: 24
        },
        legend: {
            display: false,
            position: "right"
        }

    }} />
}