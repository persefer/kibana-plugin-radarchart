export default function (kibana) {
    return new kibana.Plugin({
        uiExports: {
            visTypes: [
                'plugins/radar-chart/radar-chart'
            ]
        }
    });
};
