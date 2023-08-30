import { ChartDataSets } from "chart.js";
import { ChartOptions } from "src/app/edge/history/shared";

import { DummyConfig } from "../../edge/edgeconfig.spec";
import { QueryHistoricTimeseriesDataResponse } from "../../jsonrpc/response/queryHistoricTimeseriesDataResponse";
import { QueryHistoricTimeseriesEnergyPerPeriodResponse } from "../../jsonrpc/response/queryHistoricTimeseriesEnergyPerPeriodResponse";
import { HistoryUtils } from "../../service/utils";
import { TestContext } from "../../test/utils.spec";
import { AbstractHistoryChart } from "../chart/abstracthistorychart";
import { TextIndentation } from "../modal/modal-line/modal-line";
import { Converter } from "./converter";
import { OeFormlyField, OeFormlyView } from "./oe-formly-component";

export class OeFormlyViewTester {

  public static apply(view: OeFormlyView, context: OeFormlyViewTester.Context): OeFormlyViewTester.View {
    return {
      title: view.title,
      lines: view.lines
        .map(line => OeFormlyViewTester.applyField(line, context))
        .filter(line => line)
    };
  };

  private static applyField(field: OeFormlyField, context: OeFormlyViewTester.Context): OeFormlyViewTester.Field {
    switch (field.type) {
      /**
       * OeFormlyField.Line 
       */
      case 'children-line':
        let tmp = OeFormlyViewTester.applyLineWithChildren(field, context);

        // Prepare result
        let result: OeFormlyViewTester.Field.ChildrenLine = {
          type: field.type,
          name: tmp.value
        };

        // Apply properties if available
        if (field.indentation) {
          result.indentation = field.indentation;
        }

        // Recursive call for children
        if (field.children) {
          result.children = field.children
            ?.map(child => OeFormlyViewTester.applyField(child, context));
        }

        return result;

      case "channel-line": {
        let tmp = OeFormlyViewTester.applyLineOrItem(field, context);
        if (tmp == null) {
          return null; // filter did not pass
        }

        // Read or generate name
        let name: string;
        if (typeof (field.name) === 'function') {
          name = field.name(tmp.rawValue);
        } else {
          name = field.name;
        }

        // Prepare result
        let result: OeFormlyViewTester.Field.ChannelLine = {
          type: field.type,
          name: name
        };

        // Apply properties if available
        if (tmp.value !== null) {
          result.value = tmp.value;
        }
        if (field.indentation) {
          result.indentation = field.indentation;
        }

        // Recursive call for children

        return result;
      }

      /**
       * OeFormlyField.Item
       */
      case "item": {
        let tmp = OeFormlyViewTester.applyLineOrItem(field, context);
        if (tmp == null) {
          return null; // filter did not pass
        }

        return {
          type: field.type,
          value: tmp.value
        };
      }

      /**
       * OeFormlyField.Info
       */
      case "info-line": {
        return {
          type: field.type,
          name: field.name
        };
      }

      /**
       * OeFormlyField.Horizontal
       */
      case "horizontal-line": {
        return {
          type: field.type
        };
      }
    }
  }

  /**
   * Common method for Line and Item as they share some fields and logic.
   * 
   * @param field the field 
   * @param context the test context
   * @returns result or null
   */
  private static applyLineOrItem(field: OeFormlyField.ChannelLine | OeFormlyField.Item, context: OeFormlyViewTester.Context):
   /* result */ { rawValue: number | null, value: string }
   /* filter did not pass */ | null {

    // Read value from channels
    let rawValue = field.channel && field.channel in context ? context[field.channel] : null;

    // Apply filter
    if (field.filter && field.filter(rawValue) === false) {
      return null;
    }

    // Apply converter
    let value: string = field.converter
      ? field.converter(rawValue)
      : rawValue === null ? null : "" + rawValue;

    return {
      rawValue: rawValue,
      value: value
    };
  }
}

export namespace OeChartTester {

  export type Context = {
    energyChannel: { [id: string]: number[] }[]
    powerChannel: { [id: string]: number[] }[]
  }[]

  export type View = {
    datasets: {
      data: OeChartTester.Dataset.Data[],
      labels: OeChartTester.Dataset.LegendLabel,
      options: OeChartTester.Dataset.Option
    }
  }

  export type Dataset =
    | Dataset.Data
    | Dataset.LegendLabel
    | Dataset.Option

  export namespace Dataset {

    export type Data = {
      type: 'data',
      label: string | Converter,
      value: number[] | null
    }

    export type LegendLabel = {
      type: 'label',
      timestamps: Date[]
    }
    export type Option = {
      type: 'option',
      options: ChartOptions
    }
  }
}

export class OeChartTester {

  public static apply(chartData: HistoryUtils.ChartData, chartType: 'line' | 'bar', channels: DummyConfig.OeChannels, testContext: TestContext): OeChartTester.View {

    let channelData = OeChartTester.getChannelDataByCharttype(chartType, channels);

    // Set historyPeriod manually with passed timestamps
    testContext.service.historyPeriod.next({
      from: new Date(channelData.result.timestamps[0] ?? 0),
      to: new Date(channelData.result.timestamps.reverse()[0] ?? 0),
      getText: () => testContext.service.historyPeriod.value.getText(testContext.translate)
    });

    // Fill Data
    let configuration = AbstractHistoryChart.fillChart(chartType, chartData, channelData, channels.energyChannelWithValues);
    let data: OeChartTester.Dataset.Data[] = OeChartTester.convertChartDatasetsToDatasets(configuration.datasets);
    let labels: OeChartTester.Dataset.LegendLabel = OeChartTester.convertChartLabelsToLegendLabels(configuration.labels);
    let options: OeChartTester.Dataset.Option = OeChartTester.convertChartDataToOptions(chartData, chartType, testContext, channels);

    return {
      datasets: {
        data: data,
        labels: labels,
        options: options
      }
    };
  };

  /**
   * Converts chartLabels to legendLabels
   * 
   * @param labels the labels
   * @returns legendlabels
   */
  public static convertChartLabelsToLegendLabels(labels: Date[]): OeChartTester.Dataset.LegendLabel {
    return {
      type: 'label',
      timestamps: labels
    };
  }

  /**
   * Converts chartData to Dataset
   * 
   * @param datasets the datasets
   * @returns data from a chartData dataset
   */
  public static convertChartDatasetsToDatasets(datasets: ChartDataSets[]): OeChartTester.Dataset.Data[] {
    let fields: OeChartTester.Dataset.Data[] = [];

    for (let dataset of datasets) {
      fields.push(
        {
          type: 'data',
          label: dataset.label,
          value: dataset.data as number[]
        });
    }

    return fields;
  }

  /**
   * Converts chartData to chartOptions
   * 
   * @param chartObject the chartObject
   * @param chartType the chartType
   * @param testContext the testContext
   * @param channels the channels
   * @returns dataset options
   */
  public static convertChartDataToOptions(chartData: HistoryUtils.ChartData, chartType: 'line' | 'bar', testContext: TestContext, channels: DummyConfig.OeChannels): OeChartTester.Dataset.Option {

    let channelData: QueryHistoricTimeseriesDataResponse | QueryHistoricTimeseriesEnergyPerPeriodResponse = OeChartTester.getChannelDataByCharttype(chartType, channels);
    let displayValues = chartData.output(channelData.result.data);
    let legendOptions: any[] = [];

    displayValues.forEach(displayValue => {
      let yAxis = chartData.yAxes.find(yaxis => yaxis?.yAxisId == (displayValue?.yAxisId ?? chartData.yAxes[0].yAxisId));
      let label = AbstractHistoryChart.getTooltipsLabelName(displayValue.name, yAxis?.unit, typeof displayValue.nameSuffix == 'function' ? displayValue.nameSuffix(channels.energyChannelWithValues) : null);
      legendOptions.push(AbstractHistoryChart.getLegendOptions(label, displayValue));
    });

    return {
      type: 'option',
      options: AbstractHistoryChart.getOptions(chartData, chartType, testContext.service, testContext.translate, legendOptions, channelData.result)
    };
  }

  private static getChannelDataByCharttype(chartType: 'line' | 'bar', channels: DummyConfig.OeChannels): QueryHistoricTimeseriesEnergyPerPeriodResponse | QueryHistoricTimeseriesDataResponse {
    switch (chartType) {
      case 'line':
        return channels.dataChannelWithValues;
      case 'bar':
        return channels.energyPerPeriodChannelWithValues;
    }
  }
}

export namespace OeFormlyViewTester {

  export type Context = { [id: string]: number | null };

  export type View = {
    title: string,
    lines: Field[]
  }

  export type Field =
    | Field.InfoLine
    | Field.Item
    | Field.ChannelLine
    | Field.ChildrenLine
    | Field.HorizontalLine;

  export namespace Field {

    export type InfoLine = {
      type: 'info-line',
      name: string
    }

    export type Item = {
      type: 'item',
      value: string
    }

    export type ChannelLine = {
      type: 'channel-line',
      name: string,
      value?: string,
      indentation?: TextIndentation,
    }

    export type ChildrenLine = {
      type: 'children-line',
      name: string,
      indentation?: TextIndentation,
      children?: Field[]
    }

    export type HorizontalLine = {
      type: 'horizontal-line',
    }
  }

  export function applyLineWithChildren(field: OeFormlyField.ChildrenLine, context: Context): { rawValue: number | null, value: string }
    | null {

    let value: string | null = null;
    let rawValue: number | null = null;

    if (typeof field.name == 'object') {
      rawValue = typeof field.name == 'object' ? (field.name.channel.toString() in context ? context[field.name.channel.toString()] : null) : null;
      value = field.name.converter(rawValue);
    }

    if (typeof (field.name) === 'string') {
      value = field.name;
    }

    return {
      rawValue: rawValue,
      value: value
    };
  }
}