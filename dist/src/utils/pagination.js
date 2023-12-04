"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = exports.getRequestPaginationInfo = void 0;
const DEFAULT_ITEM_PER_PAGE = 25;
const DEFAULT_PAGE = 0;
const DEFAULT_ORDER_TYPE = 'ASC';
const getRequestPaginationInfo = (query) => {
    var _a;
    return {
        orderType: (_a = query.orderType) !== null && _a !== void 0 ? _a : DEFAULT_ORDER_TYPE,
        orderBy: query.orderBy || '',
        page: query.page ? +query.page - 1 : DEFAULT_PAGE,
        itemsPerPage: query.itemsPerPage
            ? +query.itemsPerPage
            : DEFAULT_ITEM_PER_PAGE,
    };
};
exports.getRequestPaginationInfo = getRequestPaginationInfo;
const pagination = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!options) {
        return {
            data: yield query.getMany(),
        };
    }
    const total = yield query.clone().getCount();
    let dataList = query
        .clone()
        .offset((options.page - 1) * options.itemsPerPage)
        .limit(options.itemsPerPage);
    if (options.orderBy) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataList = dataList.orderBy(options.orderBy, options.orderType);
    }
    const itemList = yield dataList.getMany();
    return {
        data: itemList,
        meta: Object.assign({ totalItems: total, currentItems: itemList.length, totalPages: Math.ceil(total / options.itemsPerPage) }, options),
    };
});
exports.pagination = pagination;
