import { ParsedQs } from 'qs';
import { SelectQueryBuilder } from 'typeorm';

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


