export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/radar_chart/radar_chart'
            ]
        }
    });
};
