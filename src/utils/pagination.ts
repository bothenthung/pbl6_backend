import { ParsedQs } from 'qs';
import { BaseEntity, FindManyOptions, FindOptionsOrder, Like, SelectQueryBuilder } from 'typeorm';
import { TSort } from '../types/dto/common';

interface IPaginationQuery {
  take: number;
  skip: number;
  order: {
    [key: string]: TSort;
  };
}

export const parsePaginationQuery = (query: ParsedQs) => {
  const returnData: IPaginationQuery = {
    take: 10,
    skip: 0,
    order: {
      createdAt: "DESC"
    }
  };

  if (query.limit) returnData.take = +query.limit;
  if (query.page && query.limit) returnData.skip = (+query.page - 1) * (+query.limit);
  if (query.orderBy) returnData.order = {
    [query.orderBy.toString()]: (query.sort as TSort) || "DESC"
  };

  return returnData;
};

export const parseQuery = <T extends BaseEntity>(query: ParsedQs, managerQuery: FindManyOptions<T>) => {
  const returnData: FindManyOptions<T> = {
    ...managerQuery
  };

  if (query.limit) returnData.take = +query.limit || 10;
  if (query.page && query.limit) returnData.skip = ((+query.page - 1) * (+query.limit)) || 0;
  if (query.orderBy) returnData.order = {
    [query.orderBy.toString()]: (query.sort as TSort) || "DESC"
  } as FindOptionsOrder<T>;

  if (query.searchBy && query.search) returnData.where = {
    ...returnData.where,
    [query.searchBy as string]: Like(`%${query.search}%`)
  };

  return returnData;
};

export interface IQueryOptions {
  orderType: 'ASC' | 'DESC';
  orderBy: string;
  page: number;
  itemsPerPage: number;
}

const DEFAULT_ITEM_PER_PAGE = 25;
const DEFAULT_PAGE = 0;
const DEFAULT_ORDER_TYPE = 'ASC';

export const getRequestPaginationInfo = (
  query: ParsedQs
): IQueryOptions => {
  return {
    orderType:
      (query.orderType as IQueryOptions['orderType']) ?? DEFAULT_ORDER_TYPE,
    orderBy: query.orderBy as string || '',
    page: query.page ? +query.page - 1 : DEFAULT_PAGE,
    itemsPerPage: query.itemsPerPage
      ? +query.itemsPerPage
      : DEFAULT_ITEM_PER_PAGE,
  };
};

export const pagination = async <T>(
  query: SelectQueryBuilder<any>,
  options: IQueryOptions
) => {

  if (!options) {
    return {
      data: await query.getMany(),
    };
  }
  const total = await query.clone().getCount();

  let dataList = query
    .clone()
    .offset((options.page - 1) * options.itemsPerPage)
    .limit(options.itemsPerPage);

  if (options.orderBy) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataList = dataList.orderBy(options.orderBy as any, options.orderType);
  }

  const itemList = await dataList.getMany();

  return {
    data: itemList,
    meta: {
      totalItems: total,
      currentItems: itemList.length,
      totalPages: Math.ceil(total / options.itemsPerPage),
      ...options,
    },
  };
};


