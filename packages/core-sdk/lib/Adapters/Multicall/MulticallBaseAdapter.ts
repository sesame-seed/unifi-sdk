import {
  IMulticallAdapter,
  ExecutionResponse,
  IAdapter,
  IMulticallExecuteOptions,
} from "../../Types";

import * as Throttle from "promise-parallel-throttle";
import { GenericUseCase } from "../../Entities";

export class MulticallBaseAdapter implements IMulticallAdapter {
  constructor(protected adapter: IAdapter) {}

  get isMulticallSupported(): boolean {
    return this.adapter.blockchainConfig.multicall?.supported;
  }

  protected groupResultsByAmount(size: number) {
    return (results: ExecutionResponse[]): ExecutionResponse[][] => {
      const groupedResults: ExecutionResponse[][] = [];
      while (results.length !== 0) {
        groupedResults.push(results.splice(0, size));
      }
      return groupedResults;
    };
  }

  async executeGrouped(
    useCaseGroups: GenericUseCase[][],
    options: IMulticallExecuteOptions = {}
  ): Promise<ExecutionResponse[][]> {
    const useCases: GenericUseCase[] = useCaseGroups.reduce(
      (list, group) => [...list, ...group],
      []
    );
    if (useCaseGroups.length === 0) {
      return [];
    }
    return this.execute(useCases, options).then(
      this.groupResultsByAmount(useCaseGroups[0].length)
    );
  }

  async execute(
    useCases: GenericUseCase[],
    options: IMulticallExecuteOptions = {}
  ): Promise<ExecutionResponse[]> {
    const promises: Throttle.Tasks<ExecutionResponse> = useCases.map(
      (useCase) => () =>
        useCase.execute(this.adapter, { blockHeight: options.blockHeight })
    );
    const { taskResults } = await Throttle.raw<ExecutionResponse>(promises, {
      maxInProgress: 2,
    });
    return taskResults;
  }
}
