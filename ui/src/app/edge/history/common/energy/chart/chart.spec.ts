import { History } from "src/app/edge/history/common/energy/chart/channels.spec";
import { ChartConfig, DATA, DummyConfig, LABELS } from "src/app/shared/edge/edgeconfig.spec";

import { sharedSetup, TestContext } from "../../../../../shared/test/utils.spec";
import { expectView } from "./chart.constants.spec";

describe('History EnergyMonitor', () => {
  const defaultEMS = DummyConfig.from(
    DummyConfig.Component.SOCOMEC_GRID_METER("meter0", "Netzzähler"),
    DummyConfig.Component.ESS_GENERIC_MANAGEDSYMMETRIC("ess0"),
    DummyConfig.Component.SOLAR_EDGE_PV_INVERTER("meter1", "Pv inverter")
  );

  let TEST_CONTEXT: TestContext;
  beforeEach(() =>
    TEST_CONTEXT = sharedSetup()
  );

  it('getChartData()', () => {
    {
      // Line - Chart
      expectView(defaultEMS, TEST_CONTEXT, 'line', History.DAY,
        {
          datasets: {
            data: [
              DATA('Erzeugung: 47,6 kWh', [null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, 0.002, 0.03, 0.027, 0.03, 0.039, 0.074, 0.093, 0.12, 0.12, 0.116, 0.106, 0.099, 0.101, 0.113, 0.131, 0.141, 0.131, 0.132, 0.105, 0.139, 0.165, 0.195, 0.255, 0.385, 0.458, 0.402, 0.428, 0.56, 0.615, 0.715, 0.7, 0.807, 0.796, 0.79, 0.813, 0.854, 0.832, 1.052, 1.427, 1.481, 1.765, 1.291, 1.625, 2.138, 1.686, 1.367, 1.562, 1.271, 1.176, 2.542, 2.91, 2.616, 2.193, 2.039, 2.376, 2.919, 3.862, 3.793, 4.309, 3.932, 4.126, 4.406, 4.757, 4.728, 5.231, 4.4, 4.169, 5.232, 5.77, 5.3, 6.327, 6.636, 4.573, 3.678, 3.422, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Beladung: 15,8 kWh', [null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.065, 0.063, 0.185, 0.262, 0.09500000000000003, 0.265, 0.48300000000000004, 0.537, 0.639, 0, 0, 0, 0, 0.18799999999999994, 0.701, 0.586, 0.881, 1.204, 1.282, 1.547, 0.988, 1.353, 1.94, 1.564, 1.2469999999999999, 1.4140000000000001, 1.0479999999999998, 0.2499999999999999, 1.9089999999999998, 2.7, 2.3810000000000002, 1.861, 1.729, 1.859, 1.6680000000000001, 3.225, 2.763, 3.847, 3.59, 2.3530000000000006, 4.143, 4.478999999999999, 4.382, 2.2329999999999997, 0.7170000000000005, 0.07699999999999996, 0.03200000000000003, 0.06099999999999994, 0.027000000000000135, 0.07099999999999973, 0.057000000000000384, 0.012000000000000455, 0.0259999999999998, 0.04800000000000004, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Entladung: 7,2 kWh', [null, null, null, 0.081, 0.244, 0.398, 0.221, 0.214, 0.214, 0.214, 0.308, 0.204, 0.108, 0.109, 0.108, 0.171, 0.197, 0.081, 0.084, 0.085, 0.16, 0.295, 0.188, 0.167, 0.165, 0.175, 0.337, 0.183, 0.093, 0.095, 0.095, 0.194, 0.251, 0.169, 0.122, 0.113, 0.156, 0.301, 0.303, 0.242, 0.204, 0.2, 0.266, 0.343, 0.135, 0.097, 0.096, null, null, null, null, 0.089, 0.089, 0.10900000000000001, 0.265, 0.20199999999999999, 0.175, 0.218, 0.178, 0.324, 0.331, 0.16100000000000003, 0.119, 0.11299999999999999, 0.136, 0.26, 0.10500000000000001, 0.066, 0.05099999999999999, 0.05600000000000001, 0.14100000000000001, 0.043999999999999984, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.17200000000000004, 0.30799999999999994, 0.27, 0.2589999999999999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Einspeisung: 15,6 kWh', [null, null, null, 0, 0, 0.006, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.004, 0, 0, 0, 0.004, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.005, 0, 0, 0, 0, 0, 0.001, 0.002, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.001, 0.004, 0, 0.004, 0, 0, 0, 0, 0.005, 0.013, 0.006, 0.004, 0.017, 0.015, 0.017, 0.011, 0, 0, 0, 0, 0.029, 0.015, 0.013, 0.019, 0.014, 0.007, 0.016, 0, 0.018, 0.022, 0, 0.012, 0.011, 0.007, 0, 0.033, 0.007, 0.003, 0.004, 0.011, 0, 0.038, 0, 0, 0.019, 0, 0.016, 0.014, 0.018, 0, 1.119, 3.453, 3.608, 3.941, 4.392, 3.786, 4.805, 4.688, 3.095, 2.32, 2.851, 3.058, 4.044, 5.011, 2.789, 6.53, 5.029, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Bezug: 0,9 kWh', [null, null, null, 0.031, 0.018, 0, 0.02, 0.016, 0.015, 0.014, 0.009, 0.02, 0.025, 0.025, 0.025, 0.021, 0.012, 0.009, 0.01, 0.011, 0.005, 0.003, 0, 0.015, 0.018, 0.023, 0, 0, 0, 0.002, 0.002, 0.003, 0.015, 0.008, 0.022, 0.027, 0.016, 0.003, 0.002, 0, 0.028, 0.027, 0.017, 0.001, 0, 0, 0, null, null, null, null, 0.011, 0.01, 0.004, 0.006, 0.007, 0.018, 0.008, 0.012, 0.009, 0.004, 0.013, 0.015, 0.012, 0, 0, 0, 0.002, 0, 0.005, 0.001, 0.03, 0.062, 0, 0, 0, 0, 0, 0, 0, 0, 0.015, 0.005, 0.004, 0.007, 0, 0, 0, 0, 0, 0, 0, 0.005, 0, 0, 0, 0, 0, 0, 0.021, 0, 0, 0, 0, 0, 0.003, 0, 0.004, 0, 0, 0.032, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Verbrauch: 24,4 kWh', [null, null, null, 0.112, 0.262, 0.392, 0.24, 0.23, 0.229, 0.227, 0.317, 0.224, 0.133, 0.135, 0.133, 0.192, 0.209, 0.09, 0.095, 0.096, 0.164, 0.297, 0.184, 0.182, 0.183, 0.198, 0.333, 0.183, 0.093, 0.097, 0.098, 0.197, 0.266, 0.177, 0.144, 0.14, 0.173, 0.304, 0.305, 0.237, 0.232, 0.227, 0.283, 0.344, 0.135, 0.096, 0.095, null, null, null, null, 0.102, 0.129, 0.14, 0.301, 0.248, 0.267, 0.319, 0.31, 0.452, 0.451, 0.28, 0.234, 0.226, 0.249, 0.39, 0.242, 0.199, 0.179, 0.166, 0.28, 0.239, 0.192, 0.187, 0.187, 0.19, 0.303, 0.146, 0.062, 0.062, 0.064, 0.887, 1.119, 1.07, 1.057, 0.596, 0.138, 0.233, 0.152, 0.209, 0.192, 0.202, 0.308, 0.254, 0.175, 0.122, 0.108, 0.137, 0.216, 0.947, 0.599, 0.203, 0.232, 0.328, 0.299, 0.52, 1.213, 0.641, 1.03, 0.442, 0.374, 1.758, 0.249, 0.26, 0.346, 1.879, 0.23, 0.484, 1.26, 1.317, 1.488, 1.451, 1.892, 1.466, 1.332, 0.523, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]),
              DATA('Ladezustand', History.DAY.dataChannelWithValues.result.data['_sum/EssSoc'])
            ],
            labels: LABELS(History.DAY.dataChannelWithValues.result.timestamps),
            options: History.LINE_CHART_OPTIONS('hour')
          }

        });
    }
    {

      // Line-Chart
      expectView(defaultEMS, TEST_CONTEXT, 'line', History.WEEK,
        {
          datasets: {
            data: [
              DATA('Erzeugung: 200,9 kWh', [0, 0, 0, 0, 0.06877777777777777, 0.10641666666666667, 0.24808333333333335, 0.9343333333333333, 2.7069166666666664, 4.60225, 6.1075, 7.152166666666667, 7.8105, 7.919833333333333, 7.5575, 5.898916666666667, 3.4225, 1.20825, 0.6315833333333334, 0.4348333333333333, 0.11625, 0.0555, 0, 0, 0, 0, 0, 0, 0.05566666666666666, 0.11616666666666667, 0.41533333333333333, 0.80975, 1.3233333333333333, 1.5246666666666668, 4.180416666666667, 2.5433333333333334, 2.1981666666666664, 4.257916666666667, 5.337583333333333, 3.255, 2.7370833333333335, 1.9298333333333333, 1.0460833333333333, 0.5075, 0.12633333333333333, 0.0575, 0, 0, 0, 0, 0, 0, 0.03266666666666666, 0.08233333333333333, 0.3933333333333333, 1.09875, 1.88925, 4.037166666666667, 6.144166666666667, 7.2335, 7.912333333333333, 7.1735, 7.83025, 6.541166666666667, 3.7155, 1.372, 0.4713333333333333, 0.29875, 0.12891666666666665, 0.0605, 0.0014166666666666668, 0, 0, 0, 0, 0, 0.07055555555555555, 0.126, 0.22975, 0.9369166666666666, 2.7914166666666667, 4.741666666666667, 6.264666666666667, 7.398416666666667, 7.854166666666667, 8.1385, 7.7740833333333335, 6.136583333333333, 3.59375, 0.9946666666666666, 0.39208333333333334, 0.3069090909090909, 0.12022222222222223, 0.0585, 0.00008333333333333333, 0, 0, 0, 0, 0, 0.04644444444444444, 0.123, 0.47733333333333333, 1.2674166666666666, 2.0323333333333333, 2.60675, 2.39825, 1.2404166666666667, 0.7430833333333333, 0.72275, 0.706, 2.8409166666666663, 3.1284166666666664, 1.23975, 0.7388333333333333, 0.3690833333333333, 0.11475, 0.05725, 0, 0, 0, 0, 0, 0, 0.03622222222222222, 0.11033333333333332, 0.41425, 1.2955833333333333, 2.0244166666666668, 1.6163333333333332, 1.624, 5.705, 4.2615, 2.9964166666666667, 4.293333333333333, 4.474083333333333, 2.6373333333333333, 0.5760833333333334, 0.7170833333333334, 0.3575, 0.16566666666666666, 0.061, 0, 0, 0, 0, 0, 0, 0.04122222222222222, 0.09633333333333333, 0.18325, 0.4275, 1.8598181818181818, 3.429, 1.2262857142857142, 2.923, 4.695, 4.4568, 5.333916666666667, 4.859545454545455, 2.6625, 2.284, 0.7131666666666666, 0.4491, 0.1561, 0.0615, 0.0006, 0]),
              DATA('Beladung: 38,7 kWh', [0, 0, 0, 0, 0, 0, 0.053916666666666696, 0.7623333333333333, 2.138083333333333, 2.88375, 0.040750000000000064, 0.05616666666666692, 0.06824999999999992, 0.05333333333333279, 0.052833333333333066, 0.06191666666666684, 0.05941666666666645, 0.06133333333333324, 0.041166666666666796, 0.27449999999999997, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.03533333333333333, 0.07091666666666663, 0.9209166666666666, 0.1278333333333337, 3.353, 0.12391666666666712, 0.05908333333333271, 0.05958333333333332, 0.039833333333333165, 0.0448333333333335, 0.05183333333333362, 0.06066666666666665, 0, 0.08024999999999993, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05283333333333329, 0.24774999999999991, 1.4625000000000001, 2.159, 0.05708333333333382, 0.05458333333333343, 0.052666666666666195, 0.06583333333333297, 0.053749999999999964, 0.057000000000000384, 0.2017500000000001, 0, 0.23058333333333333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.041166666666667, 3.0615000000000006, 0.07808333333333373, 0.0442499999999999, 0.06674999999999986, 0.051916666666667055, 0.04716666666666658, 0.054250000000000576, 0.049249999999999794, 0.051416666666666555, 0.0595, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.32333333333333336, 0.589, 1.2433333333333332, 2.029166666666667, 0.4844166666666667, 0, 0, 0, 0.03066666666666662, 2.34975, 0.07308333333333294, 0.06908333333333316, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2748333333333334, 1.13575, 0, 0.8175833333333332, 0.6326666666666667, 5.248833333333334, 1.257083333333333, 0, 0.8414166666666665, 0, 0.27624999999999966, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2515, 0.5249090909090908, 2.5081666666666664, 0.6641428571428571, 2.0005, 2.226888888888889, 1.0726000000000004, 0.020500000000000185, 0.12281818181818238, 0.04666666666666641, 0.04499999999999993, 0, 0.2635, 0, 0, 0, 0]),
              DATA('Entladung: 31,8 kWh', [0.16255555555555554, 0.15308333333333335, 0.13358333333333333, 0.23645454545454547, 0.16444444444444445, 0.15000000000000002, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8418333333333334, 0.40008333333333335, 0.3143333333333333, 0.87825, 0.15983333333333336, 0.15433333333333335, 0.12808333333333335, 0.13336363636363638, 0.12544444444444444, 0.10674999999999998, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.011833333333333584, 0, 0.6314166666666667, 0.3428333333333333, 0.1775, 0.24691666666666665, 0.32225, 0.20191666666666666, 0.17116666666666666, 0.15227272727272728, 0.13366666666666666, 0.1650833333333333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.17574999999999985, 0, 0.307, 0.30425, 0.8374166666666666, 0.5858333333333334, 0.233, 0.12245454545454545, 0.19341666666666665, 0.16675, 0.16018181818181818, 0.1677777777777778, 0.07708333333333334, 0.2829166666666666, 0.3085000000000002, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3293636363636363, 0.3361111111111111, 0.9013333333333333, 0.21000000000000002, 0.6339166666666667, 0.11658333333333333, 0.17658333333333334, 0.13425, 0.19072727272727272, 0.1686666666666667, 0.10341666666666666, 0, 0, 0, 0, 0, 0.13316666666666643, 1.2479166666666668, 0.5, 0, 0, 0, 0, 0.2433333333333333, 2.1755833333333334, 1.2095833333333335, 2.0555000000000003, 0.67025, 0.17266666666666666, 0.16391666666666665, 0.13858333333333334, 0.07441666666666667, 0.20381818181818182, 0.18944444444444444, 0.3955, 0, 0, 0.049249999999999794, 0, 0, 0, 0, 0.6410833333333334, 0, 0.3483333333333345, 0, 1.5750000000000002, 0.34658333333333335, 0.8439166666666669, 0.42374999999999996, 1.0724166666666668, 0.33325, 0.3395, 0.6474166666666666, 0.4916666666666667, 0.18208333333333335, 0.13436363636363638, 0.15433333333333332, 0.12583333333333332, 0.019250000000000017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3953333333333334, 0, 0.5301, 0.377875, 0.5781, 0.150375]),
              DATA('Einspeisung: 119,7 kWh', [0.0023333333333333335, 0, 0, 0, 0, 0, 0, 0.014166666666666666, 0.02808333333333333, 0.9546666666666667, 4.150583333333333, 6.431333333333333, 5.737583333333333, 5.6714166666666666, 5.873333333333333, 5.049083333333333, 3.122, 1.0374166666666667, 0.22808333333333333, 0.02, 0, 0, 0, 0.008333333333333333, 0.0030833333333333333, 0.008333333333333333, 0, 0.007727272727272728, 0, 0, 0.00275, 0.013833333333333335, 0.017416666666666667, 0.006083333333333333, 0.5646666666666667, 2.2251666666666665, 2.03375, 3.99725, 4.990083333333333, 3.0128333333333335, 2.4844166666666667, 1.378, 0.65975, 0, 0.001, 0.006916666666666667, 0.008166666666666666, 0, 0, 0, 0, 0, 0, 0, 0.004083333333333333, 0.010583333333333333, 0.011166666666666667, 1.261, 5.308833333333333, 6.604, 6.321166666666667, 6.488333333333333, 6.78425, 6.052083333333333, 2.5839166666666666, 0.529, 0.01616666666666667, 0.0055, 0, 0.0006666666666666666, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0024166666666666664, 0.0125, 0.7065, 5.835416666666667, 4.77025, 6.03925, 6.8445833333333335, 5.370333333333333, 4.490166666666667, 2.3506666666666667, 0.7650833333333333, 0.08583333333333333, 0.011454545454545455, 0, 0, 0.005666666666666667, 0, 0, 0, 0, 0, 0, 0, 0.0033333333333333335, 0.004083333333333333, 0.02033333333333333, 0.02316666666666667, 1.4106666666666667, 0.8588333333333333, 0.0015833333333333333, 0.006583333333333333, 0.010083333333333335, 0.3410833333333333, 2.9290833333333337, 1.1175833333333332, 0.48583333333333334, 0, 0, 0, 0.0006666666666666666, 0.017916666666666668, 0.004, 0, 0, 0.001, 0, 0, 0, 0.02358333333333333, 0.006416666666666667, 0.008166666666666666, 0.0031666666666666666, 0.009916666666666666, 2.7254166666666664, 1.83725, 2.63225, 2.2170833333333335, 0.529, 0, 0, 0, 0, 0, 0.0003333333333333333, 0, 0, 0.011416666666666665, 0.011083333333333334, 0, 0, 0, 0, 0.008333333333333333, 0.008818181818181819, 0.015333333333333334, 0.018857142857142857, 0.024833333333333332, 0.010888888888888889, 2.2174, 3.9214166666666666, 1.6248181818181817, 1.937, 1.789, 0.0195, 0.0143, 0, 0, 0.009, 0.018875]),
              DATA('Bezug: 2,4 kWh', [0, 0.011916666666666666, 0.01633333333333333, 0.00609090909090909, 0.015333333333333334, 0.011666666666666665, 0.0024166666666666664, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.02425, 0.004416666666666667, 0.0035833333333333333, 0, 0, 0, 0.04441666666666667, 0, 0.013111111111111112, 0.001, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0011666666666666668, 0, 0, 0, 0.0015833333333333333, 0.013333333333333334, 0.020416666666666666, 0.01125, 0.019727272727272725, 0.012444444444444445, 0.009583333333333334, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.007666666666666667, 0, 0.0023333333333333335, 0.0125, 0.01609090909090909, 0.02016666666666667, 0.014083333333333333, 0.006363636363636363, 0.01955555555555556, 0.04841666666666666, 0.011166666666666667, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.014222222222222221, 0.00225, 0, 0.0036666666666666666, 0.032916666666666664, 0.014666666666666666, 0.0135, 0.017363636363636362, 0.013333333333333334, 0.022083333333333333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0009166666666666666, 0, 0.0021666666666666666, 0, 0, 0, 0.0005, 0.04841666666666666, 0, 0.005555555555555556, 0.02716666666666667, 0.017333333333333333, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0023333333333333335, 0.008333333333333333, 0.003, 0.015916666666666666, 0.00325, 0, 0.004333333333333333, 0.001, 0, 0, 0.019545454545454546, 0.0017777777777777776, 0.006416666666666667, 0.017666666666666667, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.0058, 0.005625, 0, 0]),
              DATA('Verbrauch: 76,7 kWh', [0.16022222222222224, 0.16516666666666666, 0.14991666666666667, 0.24245454545454548, 0.24866666666666665, 0.2679166666666667, 0.19658333333333333, 0.15775, 0.5408333333333334, 0.7640833333333333, 1.9163333333333332, 0.6645833333333334, 2.0044166666666667, 2.1950833333333333, 1.63125, 0.7880833333333334, 0.24116666666666667, 0.1095, 0.3621666666666667, 0.14041666666666666, 0.9824166666666666, 0.4598333333333333, 0.31808333333333333, 0.8699166666666667, 0.157, 0.14616666666666667, 0.17258333333333334, 0.12590909090909091, 0.19444444444444445, 0.22383333333333336, 0.37725, 0.7250833333333334, 0.385, 1.39075, 0.26275, 0.19433333333333333, 0.10516666666666667, 0.201, 0.30775, 0.19716666666666666, 0.20083333333333334, 0.4910833333333333, 0.398, 0.42825, 0.75675, 0.3935, 0.16933333333333334, 0.24841666666666665, 0.3354166666666667, 0.22233333333333336, 0.1825, 0.1720909090909091, 0.179, 0.2568333333333333, 0.3364166666666667, 0.8403333333333334, 0.4155, 0.6171666666666666, 0.7785, 0.5746666666666667, 1.53875, 0.6193333333333334, 0.99225, 0.43191666666666667, 0.92975, 1.0189166666666667, 0.22433333333333333, 0.6004166666666666, 0.4410833333333333, 0.8973333333333333, 0.5895, 0.24541666666666664, 0.13836363636363638, 0.21366666666666664, 0.18075, 0.16654545454545452, 0.2578888888888889, 0.2514166666666667, 0.5236666666666666, 1.2431666666666668, 0.7379166666666667, 0.9735833333333334, 0.35125, 2.5838333333333336, 1.7480833333333332, 1.2421666666666666, 2.35675, 1.5921666666666667, 1.19375, 0.17808333333333334, 0.24683333333333335, 0.6248181818181818, 0.47044444444444444, 0.9619166666666666, 0.20433333333333334, 0.6376666666666666, 0.14958333333333335, 0.19125, 0.14783333333333334, 0.208, 0.22866666666666666, 0.24891666666666665, 0.1505, 0.6745, 0.7685, 0.5545833333333333, 0.50325, 0.5148333333333334, 1.9893333333333332, 1.2161666666666668, 0.6651666666666667, 0.15025, 0.12625, 0.05316666666666667, 0.4963333333333333, 2.54575, 1.3246666666666667, 2.115, 0.6698333333333334, 0.15458333333333335, 0.15975, 0.13916666666666666, 0.12266666666666667, 0.2029090909090909, 0.23122222222222222, 0.533, 0.15675, 0.13625, 2.067, 0.7903333333333333, 0.9883333333333334, 0.44608333333333333, 0.2790833333333333, 1.8005, 0.8198333333333334, 2.60525, 1.83225, 2.1533333333333333, 1.072, 1.2043333333333333, 0.6051666666666666, 1.13675, 0.3330833333333333, 0.3438333333333333, 0.6486666666666666, 0.48025, 0.17116666666666666, 0.15381818181818183, 0.19722222222222222, 0.22858333333333333, 0.22016666666666665, 0.16758333333333333, 1.3263636363636362, 0.9056666666666666, 0.5432857142857144, 0.8975, 2.457222222222222, 1.1668, 1.3920833333333333, 3.111909090909091, 0.6785, 0.451, 1.089, 0.1713, 0.6919, 0.444625, 0.5696, 0.1315]),
              DATA('Ladezustand', History.WEEK.dataChannelWithValues.result.data['_sum/EssSoc'])
            ],
            labels: LABELS(History.WEEK.dataChannelWithValues.result.timestamps),
            options: History.LINE_CHART_OPTIONS('day')
          }
        });
    }
    {

      // Bar-Chart Year
      expectView(defaultEMS, TEST_CONTEXT, 'bar', History.MONTH,
        {
          datasets: {
            data: [
              DATA('Erzeugung: 22.491 kWh', [908, 967, 900, 926, 403, 597, 957, null, 1579, 556, 852, 976, 1026, 724, 839, 749, 709, 978, 607, 790, 652, null, 1011, 697, 908, null, 1466, 808, 906, null]),

              // Only one of the two following datasets is shown in legend
              DATA('Direktverbrauch: 5.808,7 kWh', [191.524, 214.083, 198.811, 196.842, 184.218, 201.167, 175.916, null, 347.243, 166.862, 176.461, 218.586, 229.496, 228.661, 211.608, 217.075, 177.422, 179.495, 200.029, 229.434, 229.765, null, 360.727, 171.324, 206.255, null, 442.327, 225.59, 227.751, null]),
              DATA('Direktverbrauch: 5.808,7 kWh', [191.524, 214.083, 198.811, 196.842, 184.218, 201.167, 175.916, null, 347.243, 166.862, 176.461, 218.586, 229.496, 228.661, 211.608, 217.075, 177.422, 179.495, 200.029, 229.434, 229.765, null, 360.727, 171.324, 206.255, null, 442.327, 225.59, 227.751, null]),
              DATA('Beladung: 3.944,3 kWh', [113.476, 162.917, 150.189, 157.158, 149.782, 159.833, 155.084, null, 228.757, 128.138, 157.539, 59.414, 156.504, 107.339, 156.392, 158.925, 158.578, 121.505, 120.971, 154.566, 173.235, null, 204.273, 156.676, 143.745, null, 247.673, 157.41, 104.249, null]),
              DATA('Entladung: 3.394,4 kWh', [112.818, 126.532, 139.622, 133.212, 169.24, 98.705, 109.367, null, 204.267, 118.504, 121.261, 74.97, 144.175, 89.897, 141.582, 111.261, 122.274, 106.232, 139.405, 132.225, 143.86, null, 235.044, 63.914, 123.844, null, 242.102, 130.546, 59.571, null]),
              DATA('Einspeisung: 12.738 kWh', [603, 590, 551, 572, 69, 236, 626, null, 1003, 261, 518, 698, 640, 388, 471, 373, 373, 677, 286, 406, 249, null, 446, 369, 558, null, 776, 425, 574, null]),
              DATA('Bezug: 773 kWh', [16, 6, 3, 3, 5, 48, 4, null, 5, 26, 17, 62, 8, 66, 13, 21, 4, 3, 18, 27, 29, null, 118, 85, 2, null, 72, 28, 84, null]),
              DATA('Verbrauch: 9.976,1 kWh', [320.342, 346.615, 341.433, 333.054, 358.458, 347.872, 289.283, null, 556.51, 311.366, 314.722, 355.556, 381.671, 384.558, 366.19, 349.336, 303.696, 288.727, 357.434, 388.659, 402.625, null, 713.771, 320.238, 332.099, null, 756.429, 384.136, 371.322, null])
            ],
            labels: LABELS(History.MONTH.energyPerPeriodChannelWithValues.result.timestamps),
            options: ChartConfig.BAR_CHART_OPTIONS('day')
          }
        });
    }
    {

      // Bar-Chart - Year
      expectView(defaultEMS, TEST_CONTEXT, 'bar', History.YEAR,
        {
          datasets: {
            data: [
              DATA('Erzeugung: 68.466 kWh', [1912, 3816, 7165, 10452, 20841, 22491, 1546, null, null, null, null, null]),

              // Only one of the two following datasets is shown in legend
              DATA('Direktverbrauch: 22.466,2 kWh', [1597.394, 2056.891, 3150.228, 3720.697, 5506.053, 5808.6720000000005, 546.405, null, null, null, null, null]),
              DATA('Direktverbrauch: 22.466,2 kWh', [1597.394, 2056.891, 3150.228, 3720.697, 5506.053, 5808.6720000000005, 546.405, null, null, null, null, null]),
              DATA('Beladung: 15.296,8 kWh', [294.606, 1673.109, 3337.772, 3074.303, 2495.947, 3944.328, 372.595, null, null, null, null, null]),
              DATA('Entladung: 12.898,2 kWh', [208.491, 1339.036, 2911.126, 2555.138, 2123.751, 3394.43, 335.402, null, null, null, null, null]),
              DATA('Einspeisung: 30.703 kWh', [20, 86, 677, 3657, 12839, 12738, 627, null, null, null, null, null]),
              DATA('Bezug: 23.209 kWh', [9829, 4812, 2915, 2036, 2712, 773, 94, null, null, null, null, null]),
              DATA('Verbrauch: 58.573,4 kWh', [11634.885, 8207.927, 8976.354, 8311.835, 10341.804, 9976.102, 975.807, null, null, null, null, null])
            ],
            labels: LABELS(History.YEAR.energyPerPeriodChannelWithValues.result.timestamps),
            options: History.BAR_CHART_OPTIONS('month')
          }
        });
    }
    {
      // Bar-Chart: no config
      const EMS = DummyConfig.from();
      expectView(EMS, TEST_CONTEXT, 'bar', History.YEAR,
        {
          datasets: {
            data: [],
            labels: LABELS(History.YEAR.energyPerPeriodChannelWithValues.result.timestamps),
            options: History.BAR_CHART_OPTIONS('month')
          }
        });
    }
    {
      // Bar-Chart: no productionMeter
      const EMS = DummyConfig.from(
        DummyConfig.Component.SOCOMEC_GRID_METER("meter0", "Netzzähler"),
        DummyConfig.Component.ESS_GENERIC_MANAGEDSYMMETRIC("ess0")
      );

      expectView(EMS, TEST_CONTEXT, 'bar', History.YEAR,

        {
          datasets: {
            data: [
              DATA('Beladung: 15.296,8 kWh', [294.606, 1673.109, 3337.772, 3074.303, 2495.947, 3944.328, 372.595, null, null, null, null, null]),
              DATA('Entladung: 12.898,2 kWh', [208.491, 1339.036, 2911.126, 2555.138, 2123.751, 3394.43, 335.402, null, null, null, null, null]),
              DATA('Einspeisung: 30.703 kWh', [20, 86, 677, 3657, 12839, 12738, 627, null, null, null, null, null]),
              DATA('Bezug: 23.209 kWh', [9829, 4812, 2915, 2036, 2712, 773, 94, null, null, null, null, null]),
              DATA('Verbrauch: 58.573,4 kWh', [11634.885, 8207.927, 8976.354, 8311.835, 10341.804, 9976.102, 975.807, null, null, null, null, null])
            ],
            labels: LABELS(History.YEAR.energyPerPeriodChannelWithValues.result.timestamps),
            options: History.BAR_CHART_OPTIONS('month')
          }
        });
    }
    {
      // Bar-Chart: only gridMeter

      const EMS = DummyConfig.from(
        DummyConfig.Component.SOCOMEC_GRID_METER("meter0", "Netzzähler")
      );

      expectView(EMS, TEST_CONTEXT, 'bar', History.YEAR,
        {
          datasets: {
            data: [
              DATA('Einspeisung: 30.703 kWh', [20, 86, 677, 3657, 12839, 12738, 627, null, null, null, null, null]),
              DATA('Bezug: 23.209 kWh', [9829, 4812, 2915, 2036, 2712, 773, 94, null, null, null, null, null]),
              DATA('Verbrauch: 58.573,4 kWh', [11634.885, 8207.927, 8976.354, 8311.835, 10341.804, 9976.102, 975.807, null, null, null, null, null])
            ],
            labels: LABELS(History.YEAR.energyPerPeriodChannelWithValues.result.timestamps),
            options: History.BAR_CHART_OPTIONS('month')
          }
        });
    }
    {
      // Bar-Chart: only ess

      const EMS = DummyConfig.from(
        DummyConfig.Component.ESS_GENERIC_MANAGEDSYMMETRIC("ess0")
      );

      expectView(EMS, TEST_CONTEXT, 'bar', History.YEAR,
        {
          datasets: {
            data: [
              DATA('Beladung: 15.296,8 kWh', [294.606, 1673.109, 3337.772, 3074.303, 2495.947, 3944.328, 372.595, null, null, null, null, null]),
              DATA('Entladung: 12.898,2 kWh', [208.491, 1339.036, 2911.126, 2555.138, 2123.751, 3394.43, 335.402, null, null, null, null, null]),
              DATA('Verbrauch: 58.573,4 kWh', [11634.885, 8207.927, 8976.354, 8311.835, 10341.804, 9976.102, 975.807, null, null, null, null, null])
            ],
            labels: LABELS(History.YEAR.energyPerPeriodChannelWithValues.result.timestamps),
            options: History.BAR_CHART_OPTIONS('month')
          }
        });
    }
  });
});

